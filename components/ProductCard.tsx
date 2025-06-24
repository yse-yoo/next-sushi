'use client';

type Product = {
    id: number;
    name: string;
    image_path: string;
    price: number;
};

type Props = {
    product: Product;
    onOrder: () => void;
};

export default function ProductCard({ product, onOrder }: Props) {
    const priceWithTax = Math.round(product.price * 1.1);

    return (
        <div
            className="bg-white rounded shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
            onClick={onOrder}
        >
            <img src={product.image_path} alt={product.name} className="w-32 h-32 object-cover rounded mb-2" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
                ¥{product.price}（税込¥{priceWithTax}）
            </p>
            <button className="w-full bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded">注文</button>
        </div>
    );
}