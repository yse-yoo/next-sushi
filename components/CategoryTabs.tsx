'use client';

import { Category } from "@/types/Category";

type Props = {
    categories: Category[];
    current: Category | null;
    onSelect: (cat: Category) => void;
};

export default function CategoryTabs({ categories, current, onSelect }: Props) {
    return (
        <div className="flex flex-wrap justify-center mb-6">
            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat)}
                    className={`flex-1 px-4 py-2 rounded m-1 transition
            ${current?.id === cat.id
                            ? 'bg-sky-600 text-white'
                            : 'bg-white hover:bg-sky-100'}`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}