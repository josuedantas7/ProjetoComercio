import React, { Suspense } from 'react'
import TableListReports from '../components/Table/TableListReports'

const Relatorios = () => {
  return (
    <div>
        <h1 className="text-2xl text-center font-bold mt-12">Relatório das compras</h1>
        <div className="mt-8 w-[900px] max-[960px]:w-[90%] mx-auto border rounded-lg p-5 shadow-lg border-zinc-500">
            <TableListReports/>
        </div>
    </div>
  )
}

export default Relatorios