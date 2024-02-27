import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

interface Product {
    id: string;
    codigoDeBarras: string;
    name: string;
    qtd: number;
    price: number;
    qtdVendida: number;
}

export async function POST(request: Request){
    try {
      const { Products, total }: { Products: Product[], total: number } = await request.json();
  
      if (!Array.isArray(Products) || !Products.length || typeof total !== 'number') {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
      }
  
      const sale = await prisma.sale.create({
        data: {
            total,
            qtdItens: Products.map((product) => product.qtdVendida).reduce((acc, qtd) => acc + qtd, 0)
        }
      });

      const saleProducts = await Promise.all(Products.map(product =>
        prisma.saleProduct.create({
            data: {
                qtd: product.qtdVendida,
                product: {
                    connect: { id: product.id }
                },
                sale: {
                    connect: { id: sale.id }
                },
            }
        })
      ));
    
  
      return NextResponse.json({ sale, saleProducts }, { status: 201 });
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ message: 'Error saving sale' }, { status: 500 });
    }
}

export async function GET(){
    try {
      const sales = await prisma.sale.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
  
      return NextResponse.json(sales, { status: 200 });
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ message: 'Error fetching sales' }, { status: 500 });
    }
}

export async function DELETE(){
  try {
    await prisma.saleProduct.deleteMany();
    await prisma.sale.deleteMany();
    return NextResponse.json({ message: 'Sales and Sale-Product deleted' }, { status: 200 });
  }catch{
    return NextResponse.json({ message: 'Error deleting sales' }, { status: 500 });
  }
}