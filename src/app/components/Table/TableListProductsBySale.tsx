import { ReportsProps } from '@/app/Interfaces/allInterfaces'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import React from 'react'
import ButtonDeleteOneReport from '../Button/ButtonDeleteOneReport'

const TableListProductsBySale = async ({reportId} : {reportId : string}) => {

    const report : ReportsProps | null = await prisma.sale.findUnique({
        where: {
            id: reportId
        },
        include: {
            saleProducts: {
                include: {
                    product: true
                }
            }
        }
    })

    console.log(report)

    function formartPrice(price: number){
        return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(price)
    }

  return (
    <div className='w-full flex flex-col overflow-y-auto max-h-[500px]'>
        <div className='flex justify-between pr-4 pl-3'>
            {/* // head of table */}
            <p className='font-bold w-4/5 text-start'>Produtos:</p>
            <p className='font-bold text-end w-1/5'>Qtd</p>
        </div>
        <div className='overflow-y-auto max-h-[500px] flex flex-col gap-2'>
            {/* // list itens */}
            {report?.saleProducts.map((item, index) => (
                <div className='flex justify-between border rounded-md px-3 py-1' key={index}>
                    <p className='w-4/5'>{item.product.name}</p>
                    <p className='text-end w-1/5'>{item.qtd} Un</p>
                </div>
            ))}       
        </div>
        <div className='flex max-[570px]:flex-col justify-between mt-8 '>
            {/* // qtd Itens */}
            <div>
                <span className='font-bold text-md'>Quantida de Itens: </span>
                <span>{report?.qtdItens} Un</span>
            </div>
            {/* // total value  */}
            <div className='flex gap-1'>
                <span className='font-bold hidden min-[570px]:flex'>Valor total da compra: </span>
                <span className='font-bold flex min-[570px]:hidden'>Valor: </span>
                <span>{report?.total && formartPrice(report?.total)}</span>
            </div>
        </div>
        <div className='flex justify-center'>
            <ButtonDeleteOneReport id={reportId} />
        </div>
    </div>
  )
}

export default TableListProductsBySale
