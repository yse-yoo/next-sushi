'use client';

import { useEffect, useState } from 'react';
import { fetchCategories, fetchProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import CategoryTabs from '@/components/CategoryTabs';
import OrderList from '@/components/OrderList';
import Modal from '@/components/OrderForm';
import { Category } from '@/types/Category';
import { Product } from '@/types/Product';
import { Order } from '@/types/Order';
import Link from 'next/link';
import Image from 'next/image';
import TitleLink from '@/components/TitleLink';

export default function HomePage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        (async () => {
            const { categories } = await fetchCategories();
            const { products } = await fetchProducts();
            setCategories(categories);
            setProducts(products);
            setCurrentCategory(categories[0] || null);
        })();
    }, []);

    console.log('Categories:', categories);
    console.log('Products:', products);
    console.log('Current Category:', currentCategory);
    const filtered = products.filter(p => p.category_id === currentCategory?.id);

    return (
        <main className="p-4">
            <TitleLink />
            <CategoryTabs
                categories={categories}
                current={currentCategory}
                onSelect={setCurrentCategory}
            />
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {filtered.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onOrder={() => setProduct(product)}
                        />
                    ))}
                </div>
                <OrderList orders={orders} />
            </div>
            {product && (
                <Modal
                    product={product}
                    onClose={() => setProduct(undefined)}
                    onConfirm={(order) => {
                        setOrders(orders => [...orders, order]);
                        setProduct(undefined);
                    }}
                />
            )}
        </main>
    );
}