import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const codigoDeBarras = searchParams.get('codigoDeBarras');

    try {
        if (codigoDeBarras) {
            const product = await prisma.product.findFirst({
                where: {
                    codigoDeBarras: codigoDeBarras
                }
            });

            if (product) {
                return NextResponse.json(product, { status: 200 });
            } else {
                return NextResponse.json({ error: "Product not found" }, { status: 404 });
            }
        } else {
            const response = await prisma.product.findMany();
            return NextResponse.json(response, { status: 200 });
        }
    } catch (error) {
        console.error('Error getting products:', error);
        return NextResponse.json({ error: "Error getting products" }, { status: 500 });
    }
}


export async function POST(request: Request){
    
    const { codigoDeBarras, name, price, qtd } = await request.json()


    if (!codigoDeBarras || !name || !price) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    try {
        const response = await prisma.product.create({
            data: {
                codigoDeBarras,
                name,
                price: parseFloat(price),
                qtd: qtd || 1,
            }
        })
        return NextResponse.json(response, {status: 201})
    }catch{
        return NextResponse.json({ error: "Error creating product" }, { status: 500 })
    }
}


export async function PUT(request: Request){
    const { id, qtdVendida } = await request.json()

    if (!id || !qtdVendida) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    try {
        const product = await prisma.product.findFirst({
            where: {
                id: id
            }
        });

        if (product) {
            const response = await prisma.product.update({
                where: {
                    id: id
                },
                data: {
                    qtd: product.qtd - qtdVendida
                }
            })
            return NextResponse.json(response, {status: 200})
        } else {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
    }catch{
        return NextResponse.json({ error: "Error updating product" }, { status: 500 })
    }

}