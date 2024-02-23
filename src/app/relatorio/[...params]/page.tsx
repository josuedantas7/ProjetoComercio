import ProductId from '@/app/produto/[...params]/page'
import prisma from '@/lib/prisma'
import { format } from 'path'
import React from 'react'

const RelatorioId = async ({params} : { params : { params: string } }) => {

    const reportId = params.params[0]


    const report = await prisma.sale.findUnique({
        where: {
            id: reportId
        },
    })

    console.log(report)

    function formatDate(date: Date) {
        return date.toLocaleDateString('pt-BR')
    }

    function formatPrice(price: number) {
        return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(price)
    }

  return (
    <div>
        <h1 className='text-center text-2xl text-gray-900 font-bold'>Relatório: {report?.id}</h1>
    </div>
  )
}

export default RelatorioId
