'use client';

import { useState } from 'react';

type Product = {
    id: number;
    name: string;
    image_path: string;
    price: number;
};

type Props = {
    product: Product | null;
    onClose: () => void;
};

export default function Modal({ product, onClose }: Props) {
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-96">
                <h3 className="text-center text-xl font-bold mb-2">{product.name}</h3>
                <img src={product.image_path} alt={product.name} className="w-32 mx-auto rounded mb-4" />
                <p className="text-center text-gray-600 mb-4">¥{product.price}</p>

                <div className="flex justify-center items-center gap-4 mb-4">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-sky-500 text-white px-3 py-1 rounded">-</button>
                    <span className="text-xl">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="bg-sky-500 text-white px-3 py-1 rounded">+</button>
                </div>

                <div className="flex justify-between gap-4">
                    <button className="w-1/2 bg-sky-600 text-white px-4 py-2 rounded">注文</button>
                    <button onClick={onClose} className="w-1/2 border border-sky-500 text-sky-600 px-4 py-2 rounded">もどる</button>
                </div>
            </div>
        </div>
    );
}