'use client';

import { useEffect, useState } from 'react';
import { fetchCategories, fetchProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import CategoryTabs from '@/components/CategoryTabs';
import OrderList from '@/components/OrderList';
import Modal from '@/components/Modal';

export default function HomePage() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [orders, setOrders] = useState([]);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        (async () => {
            const { categories } = await fetchCategories();
            const { products } = await fetchProducts();
            setCategories(categories);
            setProducts(products);
            setCurrentCategory(categories[0]);
        })();
    }, []);

    const filtered = products.filter(p => p.category_id === currentCategory?.id);

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">メニュー</h1>
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
                            onOrder={() => setModalContent(product)}
                        />
                    ))}
                </div>
                <OrderList orders={orders} />
            </div>
            <Modal product={modalContent} onClose={() => setModalContent(null)} />
        </main>
    );
}