import React, { Suspense } from 'react'
import TableListReports from '../components/Table/TableListReports'
import ButtonReloadPage from '../components/Button/ButtonReloadPage'

const Relatorios = () => {
  return (
    <div>
        <div className='flex justify-center relative mt-12 w-[900px] max-[960px]:w-[90%] mx-auto'>
          <h1 className="text-2xl text-center font-bold">Relatório das compras</h1>
          <ButtonReloadPage/>
        </div>
        <div className="mt-8 w-[900px] max-[960px]:w-[90%] mx-auto border rounded-lg p-5 shadow-lg border-zinc-500">
            <TableListReports/>
        </div>
    </div>
  )
}

export default Relatorios