'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

const ButtonSubmitRegisterProduct = () => {
    
    const { pending } = useFormStatus()

    return <Button className='w-full mt-3' type='submit'>{pending ? 'Carregando...' : 'Cadastrar produto'}</Button>
}

export default ButtonSubmitRegisterProduct
