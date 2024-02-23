'use client'
import { ProductProps } from '@/app/Interfaces/allInterfaces'
import { api } from '@/lib/api'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const TableListProducts = () => {

    const [allProducts, setAllProducts] = useState<ProductProps[] | null>()

    useEffect(() => {
        async function getAllProducts(){
            const response = await api.get('/api/product')
            setAllProducts(response.data)
        }
        getAllProducts()
    },[])

    useEffect(() => {
        console.log(allProducts)
    },[allProducts])
    
    function formatNumber(number : number){
        return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(number)
    }

  return (
    <div className='w-full flex flex-col overflow-y-auto max-h-[500px]'>
            {!allProducts ? (
                <div className='w-full flex justify-center items-center'>
                    <p>Carregando...</p>
                </div>
            ) : allProducts?.length === 0 ? (
                <div className='w-full flex justify-center items-center'>
                    <p>Nenhum produto cadastrado</p>
                </div>
            ): (
                <>
                    {allProducts && allProducts.length > 0 && (
                        <div className='flex justify-between font-bold pr-4 pl-3'>
                            <p className='w-1/3'>Nome:</p>
                            <p className='w-1/3 text-center'>Preço:</p>
                            <p className='w-1/3 text-end'>Quantidade:</p>
                        </div>
                    )}
                    <div className='overflow-y-auto max-h-[500px] flex flex-col gap-2'>
                        {allProducts && allProducts.map((product, index) => (
                            <Link href={`/produto/${product.id}`} className='flex justify-between border rounded-md px-3 py-1' key={index}>
                                <p className='w-1/3'>{product.name}</p>
                                <p className='w-1/3 text-center'>{formatNumber(product.price)}</p>
                                <p className='w-1/3 text-end pr-12 max-[570px]:pr-0'>{product.qtd} Un</p>
                            </Link>
                        ))}
                    </div>
                </>
            )}
    </div>
  )
}

export default TableListProducts
