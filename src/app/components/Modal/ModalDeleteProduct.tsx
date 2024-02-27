'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { api } from "@/lib/api"

import { useRouter } from "next/navigation"
import Notification from "../Notifier/Notification"

export default function ModalDeleteProduct({id} : { id: string }) {

    const router = useRouter()

    async function deleteProduct(){
        try{
            const response = await api.delete('/api/product', {
                params: {
                    id: id
                }
            })
            router.replace('/')
            router.refresh()
            Notification('success', 'Produto deletado com sucesso')
        }catch{
            Notification('error', 'Erro ao deletar produto')
        }
    }

  return (
    <Dialog>
      <DialogTrigger className="w-1/2" asChild>
        <Button variant="destructive">Excluir Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Excluir item</DialogTitle>
          <DialogDescription>
            Se você excluir este item, ele será removido permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Cancelar</Button>
          <Button variant="destructive" onClick={deleteProduct}>Excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
