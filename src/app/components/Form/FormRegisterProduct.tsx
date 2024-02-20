import React from 'react'
import InputWithLabel from '../Input/InputWithLabel'
import InputWithLabelNumber from '../Input/InputWithLabelNumber'
import { Button } from '@/components/ui/button'
import { revalidateTag } from 'next/cache'
import prisma from '@/lib/prisma'

const FormRegisterProduct = async () => {

    async function handleSubmit(formData: FormData){
        "use server"

        const name = formData.get('name')
        const price = formData.get('price')
        const qtd = formData.get('qtd')
        const codigoDeBarras = formData.get('codBarras')

        if (!name || !price || !qtd || !codigoDeBarras) {
            return
        }

        try {
            const response = await prisma.product.create({
                data: {
                    name: name as string,
                    price: parseFloat(price.toString()) as number,
                    qtd: parseFloat(qtd.toString()) as number,
                    codigoDeBarras: codigoDeBarras as string
                }
            })
            console.log(response)
            revalidateTag('get-products')
            console.log('Produto cadastrado com sucesso')
        } catch (err) {
            console.log('Erro ao cadastrar produto', err)
        }
    }

  return (
    <form action={handleSubmit} className='flex flex-col gap-3'>
        <InputWithLabel name='name' label='Nome do produto' type='text' placeholder='Digite o nome do produto' />
        <InputWithLabelNumber name='price' label='Preço do produto' type='number' placeholder='Digite o preço do produto' />
        <InputWithLabelNumber name='qtd' label='Quantidade de itens' type='number' placeholder='Digite a quantidade do produto' />
        <InputWithLabel name='codBarras' label='Código de barras do produto' type='text' placeholder='Digite o código do produto' />
        <Button className='w-full mt-3' type='submit'>Cadastrar produto</Button>
    </form>
  )
}

export default FormRegisterProduct
