import React from 'react'
import InputWithLabel from '../Input/InputWithLabel'
import InputWithLabelNumber from '../Input/InputWithLabelNumber'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { revalidateTag } from 'next/cache'

interface ProductProps{
    id: string;
    codigoDeBarras: string;
    name: string;
    price: number;
    qtd: number;
}

const FormEditProduct = ({product} : {product : ProductProps}) => {

    async function handleSubmit(formData: FormData){
        "use server"

        const name = formData.get('name')
        const price = formData.get('price')
        const qtd = formData.get('qtd')
        const codigoDeBarras = formData.get('codBarras')

        try {
            const response = await prisma.product.update({
                where: {
                    id: product?.id
                },
                data: {
                    name: name ? name?.toString() : product?.name,
                    price: price ? parseFloat(price.toString()) : product?.price,
                    qtd: qtd ? parseInt(qtd.toString()) : product?.qtd,
                    codigoDeBarras: codigoDeBarras ? codigoDeBarras?.toString() : product?.codigoDeBarras
                }
            })
            revalidateTag('get-products')
        } catch (err) {
            console.log('Erro ao cadastrar produto', err)
        }
    }



  return (
    <form action={handleSubmit} className='flex flex-col gap-3'>
        <InputWithLabel name='name' label='Nome do produto' type='text' placeholder={product?.name} />
        <InputWithLabelNumber name='price' label='Preço do produto' type='number' placeholder={product?.price} />
        <InputWithLabelNumber name='qtd' label='Quantidade de itens' type='number' placeholder={product?.qtd} />
        <InputWithLabel name='codBarras' label='Código de barras do produto' type='text' placeholder={product?.codigoDeBarras} />
        <Button className='w-full mt-3' type='submit'>Salvar alteração</Button>
    </form>
  )
}

export default FormEditProduct
