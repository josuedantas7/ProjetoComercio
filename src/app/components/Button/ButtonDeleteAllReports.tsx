'use client'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import React from 'react'

const ButtonDeleteAllReports = () => {

    async function handleDeleteAllReports(){
        try{
            const response = await api.delete('/api/sale')
        }catch{
            console.log('Error deleting reports')
        }
    }

  return <Button onClick={handleDeleteAllReports} className='mx-auto' variant='destructive'>Deletar Relatórios</Button>
}

export default ButtonDeleteAllReports
