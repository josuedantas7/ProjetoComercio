'use client'
import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import { useRouter } from 'next/navigation';

export default function Header() {

    const router = useRouter();
    
    const items = [
        { label: 'Produtos', icon: 'pi pi-home', command: () => router.push('/') },
        { label: 'Compras', icon: 'pi pi-chart-line', command: () => router.push('/compras')  },
    ];

    return (
        <div className="card">
            <TabMenu model={items} />
        </div>
    )
}