export interface ProductProps{
    id: string;
    codigoDeBarras: string;
    name: string;
    price: number;
    qtd: number;
    createdAt: Date; 
    updatedAt: Date;
}


export interface ReportsProps{
    id: string;
    total: number;
    qtdItens: number;
    createdAt: Date;
    saleProducts: SaleProductsProps[];
}

export interface SaleProductsProps{
    id: string;
    saleId: string;
    productId: string;
    qtd: number;
    createAt?: Date;
    product: ProductProps;
}