'use client'
import React, { useEffect, useState } from 'react'
import InputWithLabelNumber from '@/app/components/Input/InputWithLabelNumber'
import { ProductProps } from '@/app/Interfaces/allInterfaces'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import InputWithLabel from '../Input/InputWithLabel'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { revalidateTag } from 'next/cache'



interface ExtendedProductProps extends ProductProps {
    qtdVendida: number;
}

const FormSearchItem = () => {

    const [qtd, setQtd] = useState<number>(1)
    const [codigo, setCodigo] = useState<string>('')
    const [listProducts, setListProducts] = useState<ExtendedProductProps[]>([])
    const [valorTotal, setValorTotal] = useState<number>(0)

    useEffect(() => {
        if (isNaN(qtd)) {
            setQtd(1)
        }
    }, [qtd,codigo])


    async function handleGetItem(e: any){
        e.preventDefault()

        try {
            const response = await api.get('/api/product', {
                params: {
                    codigoDeBarras: codigo
                }
            })
            setListProducts(listProducts => [...listProducts, {
                ...response.data,
                qtdVendida: qtd
            }])
            setCodigo('')
        } catch{
            console.log('Erro ao buscar produto')
        }
    }

    async function handleUpdateDataBase(e: any){
        e.preventDefault()
        try {
            for (let product of listProducts) {
                const response = await api.put('/api/product', {
                    id: product.id,
                    qtdVendida: product.qtdVendida
                })
            }
            
            const response = await api.post('/api/sale', {
                Products: listProducts,
                total: valorTotal
            })

            console.log(response)

            setListProducts([])
        } catch(err){
            console.log('Erro ao finalizar venda', err)
        }
    }


    function formatNumber(number : number){
        return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(number)
    }

    useEffect(() => {
        let total = 0
        for (let product of listProducts) {
            total += product.price * product.qtdVendida
        }
        setValorTotal(total)
    },[listProducts])

  return (
    <>
        <div className='flex flex-col gap-3'>
            <form className='flex flex-col gap-3' onSubmit={handleGetItem}>
                <div className="w-full">
                    <Label htmlFor="qtd">Quantidade de itens</Label>
                    <Input onChange={(e) => setQtd(parseFloat(e.target.value))} type='number' id='qtd' placeholder='Digite a quantidade do produto' />
                </div>
                <div className="w-full">
                    <Label htmlFor="codigo">Código do produto</Label>
                    <Input value={codigo} onChange={(e) => setCodigo(e.target.value)} type='text' id='codigo' placeholder='Digite o código do produto' />
                </div>
                <button type='submit' className='hidden'></button>
            </form>
            {listProducts.length > 0 && (
                <div className='flex justify-between font-bold pr-4'>
                    <p className='w-2/5'>Nome:</p>
                    <p className='w-1/5 text-center'>Preço:</p>
                    <p className='w-1/5 text-center'>Quantidade:</p>
                    <p className='w-1/5 text-end'>Valor total:</p>
                </div>
            )}
            <div className='overflow-y-auto max-h-[500px]'>
                {listProducts && listProducts.map((product, index) => (
                    <div className='flex justify-between' key={index}>
                        <p className='w-2/5'>{product.name}</p>
                        <p className='w-1/5 text-center'>{formatNumber(product.price)}</p>
                        <p className='w-1/5 text-center'>{product.qtdVendida}</p>
                        <p className='w-1/5 text-end'>{formatNumber(product.price * product.qtdVendida)}</p>
                    </div>
                ))}
            </div>
            {listProducts.length > 0 && (
                <div>
                    <p className='font-bold text-end mt-2'>Valor total: {formatNumber(valorTotal)}</p>
                </div>
            )}
        </div>
        {listProducts.length > 0 && (
            <Button className='w-full' onClick={handleUpdateDataBase}>Finalizar compras</Button>
        )}
    </>
  )
}

export default FormSearchItem
