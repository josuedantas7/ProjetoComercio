'use client'
import React, { MouseEvent, useEffect, useState } from 'react'
import InputWithLabel from '../Input/InputWithLabel'
import InputWithLabelNumber from '../Input/InputWithLabelNumber'
import { Button } from '@/components/ui/button'
import { ProductProps } from '@/app/Interfaces/allInterfaces'
import { api } from '@/lib/api'

const FormRegisterProduct = () => {

    const [name, setName] = useState<string>('')
    const [codigo, setCodigo] = useState<string>('')
    const [price, setPrice] = useState<number>(1)
    const [qtd, setQtd] = useState<number>(1)


    async function handleSubmit(e : any){
        e.preventDefault()
        const data : ProductProps = {
            name,
            codigoDeBarras: codigo,
            price,
            qtd
        }
        try {
          const response = await api.post('/api/product', {...data})
          console.log(response)  
        }catch{
            console.log('Erro ao cadastrar produto')
        }
    }


    useEffect(() => {
        if (isNaN(price)) {
            setPrice(1)
        }
        if (isNaN(qtd)) {
            setQtd(1)
        }
    }, [qtd,price])

  return (
    <form className='flex flex-col gap-3'>
        <InputWithLabel onChange={setName} label='Nome do produto' type='text' placeholder='Digite o nome do produto' />
        <InputWithLabelNumber onChange={setPrice} label='Preço do produto' type='number' placeholder='Digite o preço do produto' />
        <InputWithLabelNumber onChange={setQtd} label='Quantidade de itens' type='number' placeholder='Digite a quantidade do produto' />
        <InputWithLabel onChange={setCodigo} label='Código de barras do produto' type='text' placeholder='Digite o código do produto' />
        <Button onClick={handleSubmit} className='w-full mt-3' type='submit'>Cadastrar produto</Button>
    </form>
  )
}

export default FormRegisterProduct
