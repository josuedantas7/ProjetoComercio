'use client'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import React, { FormEvent } from 'react'
import Notification from '../Notifier/Notification'

const ButtonDeleteAllReports = () => {

    const [loading, setLoading] = React.useState<boolean>(false)

    async function handleDeleteAllReports(e: FormEvent){
        e.preventDefault()
        setLoading(true)
        try{
            await api.delete('/api/sale')
            Notification('success', 'Relatórios deletados com sucesso')
        }catch{
            Notification('error', 'Erro ao deletar relatórios')
        }finally{
            setLoading(false)
        }
    }

  return <Button onClick={handleDeleteAllReports} className='mx-auto' variant='destructive'>{loading ? 'Deletando Relatórios...' : 'Deletar Relatórios'}</Button>
}

export default ButtonDeleteAllReports
