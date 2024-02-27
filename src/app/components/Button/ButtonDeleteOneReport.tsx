'use client'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import React from 'react'
import Notification from '../Notifier/Notification'
import { useRouter } from 'next/navigation'

const ButtonDeleteOneReport = ({id} : { id : string}) => {

    const [loading, setLoading] = React.useState<boolean>(false)
    const router = useRouter()

    async function handleDeleteOneReport(){
        setLoading(true)
        try{
            await api.delete('/api/saleId', {
                params: {
                    saleId: id
                }
            })
            Notification('success', 'Relatório deletado com sucesso')
            router.replace('/relatorio')
        }catch{
            Notification('error', 'Erro ao deletar relatório')
        }finally{
            setLoading(false)
        }
    }

  return <Button onClick={handleDeleteOneReport} variant='destructive'>{loading ? 'Deletando relatório...' : 'Deletar este relatório'}</Button>
}

export default ButtonDeleteOneReport
