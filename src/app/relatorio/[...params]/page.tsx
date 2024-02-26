import TableListProductsBySale from '@/app/components/Table/TableListProductsBySale'
import prisma from '@/lib/prisma'
import React from 'react'

const RelatorioId = async ({params} : { params : { params: string } }) => {

    const reportId = params.params[0]


    if (!reportId) {
        return <h1>Erro ao buscar relatório</h1>
    }

    function formatDate(date: Date) {
        return date.toLocaleDateString('pt-BR')
    }

    function formatPrice(price: number) {
        return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(price)
    }

  return (
    <div>
        <h1 className='text-center text-2xl text-gray-900 font-bold'>Relatório</h1>
        <div className="mt-8 w-[900px] max-[960px]:w-[90%] mx-auto border rounded-lg p-5 shadow-lg border-zinc-500">
            {
                reportId && (
                    <TableListProductsBySale reportId={reportId} />
                )
            }
        </div>
    </div>
  )
}

export default RelatorioId
