import prisma from "@/lib/prisma";

export async function DELETE(request: Request){


    const { searchParams } = new URL(request.url);

    const saleId = searchParams.get('saleId')

    if (!saleId) {
        return new Response('Sale id not found', { status: 400 });
    }


    try {
        await prisma.saleProduct.deleteMany({
            where: {
                saleId: saleId
            }
        });
        await prisma.sale.delete({
            where: {
                id: saleId
            }
        });
        return new Response('Sale and Sale-Product deleted', { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response('Error deleting sale', { status: 500 });
    }
}