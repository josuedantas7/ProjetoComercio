import prisma from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'
import ButtonDeleteAllReports from '../Button/ButtonDeleteAllReports';
import { ReportsProps } from '@/app/Interfaces/allInterfaces';

const TableListReports = async () => {

    const reports : ReportsProps[] = await prisma.sale.findMany({
        orderBy: {
            createdAt: 'asc'
        },
        include: {
            saleProducts: {
                include: {
                    product: true,
                },
            }
        }
    })

     reports.map(report => console.log(report.saleProducts))

    function formatDate(date: Date) {
        return date.toLocaleDateString('pt-BR')
    }

    function formatPrice(price: number) {
        return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(price)
    }

  return (
    <div className='w-full flex flex-col overflow-y-auto max-h-[500px]'>
        {reports.length > 0 ? (
            <>
                <div className='flex justify-between font-bold pr-4 pl-3'>
                    <p className='w-1/4'>ID</p>
                    <p className='w-1/4 text-center'>Valor Total</p>
                    <p className='w-1/4 text-center'>Qtd Itens</p>
                    <p className='w-1/4 text-end'>Data de compra</p>
                </div>
                <div className='overflow-y-auto max-h-[500px] flex flex-col gap-2'>
                    {reports.map((report,index) => (
                        <Link href={`/relatorio/${report.id}`} className='flex justify-between border rounded-md px-3 py-1' key={index}>
                            <h1 className='w-1/3'>{index + 1}</h1>
                            <p className='w-1/3 text-center'>{formatPrice(report.total)}</p>
                            <p className='w-1/3 text-center'>{report.qtdItens}</p>
                            <p className='w-1/3 text-end'>{formatDate(report.createdAt)}</p>
                        </Link>
                    ))}
                </div>
                <div className='w-full text-end mt-8'>
                        <p className='font-bold'>Valor total: {formatPrice(reports.reduce((acc, report) => acc + report.total, 0))}</p>
                </div>
            </>
        ): (
            <h1>Não há relatórios</h1>
        )}
        <div className='w-full flex justify-center'>
            <ButtonDeleteAllReports/>
        </div>
    </div>
  )
}

export default TableListReports
