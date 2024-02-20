import FormEditProduct from '@/app/components/Form/FormEditProduct'
import prisma from '@/lib/prisma'
import React, { Suspense } from 'react'

const ProductId = async ({params} : { params : { params: string } }) => {

    const id = params.params[0]


    const productId = await prisma.product.findUnique({
        where: {
            id: id
        }
    })

    console.log(productId)

    return (
        <div>
                <h1 className="text-2xl text-center font-bold mt-12">Edita produto : {productId?.name}</h1>
                <div className="w-[900px] max-[960px]:w-[90%] mx-auto">
                    <Suspense fallback={<div>Carregando...</div>}>
                        {productId && <FormEditProduct product={productId}/>}
                    </Suspense>
                </div>
        </div>
    )
}

export default ProductId
