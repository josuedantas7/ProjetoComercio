import prisma from '@/lib/prisma'
import React from 'react'

const TableListReports = async () => {

    const reports = await prisma.sale.findMany({
        include: {
            Products: true
        }
    })

    console.log(reports)


    function formatDate(date: Date) {
        return date.toLocaleDateString('pt-BR')
    }

    function formatPrice(price: number) {
        return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(price)
    }

    reports.map((report) => {
        console.log(report)
        console.log(formatDate(report.createdAt))
    })

  return (
    <div className='w-full flex flex-col overflow-y-auto max-h-[500px]'>
        <div className='flex justify-between font-bold pr-4 pl-3'>
            <p className='w-1/3'>ID</p>
            <p className='w-1/3 text-center'>Valor Total</p>
            <p className='w-1/3 text-end'>Data de compra</p>
        </div>
        <div className='overflow-y-auto max-h-[500px] flex flex-col gap-2'>
            {reports.map((report,index) => (
                <div className='flex justify-between border rounded-md px-3 py-1' key={index}>
                    <h1 className='w-1/3'>{index + 1}</h1>
                    <p className='w-1/3 text-center'>{formatPrice(report.total)}</p>
                    <p className='w-1/3 text-end'>{formatDate(report.createdAt)}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TableListReports
