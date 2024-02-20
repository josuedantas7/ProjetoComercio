import { ProductProps } from '@/app/Interfaces/allInterfaces'
import Link from 'next/link'
import React from 'react'

const TableListProducts = async () => {


    const allProducts: ProductProps[] = await fetch(`${process.env.HOST_URL}/api/product`, {
        method: 'GET',
        next: {
            tags: ['get-products']
        },
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());

    console.log(allProducts)

    function formatNumber(number : number){
        return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(number)
    }

  return (
    <div className='w-full flex flex-col overflow-y-auto max-h-[500px]'>
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
                        <p className='w-1/3 text-end pr-12'>{product.qtd} Un</p>
                    </Link>
                ))}
            </div>
    </div>
  )
}

export default TableListProducts
