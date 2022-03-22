import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-4 pb-12">
      <h3 className="text-xl mb-4 font-semibold border-b pb-4">
        カテゴリー
      </h3>
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className="text-sm cursor-pointer block pb-3 mb-2 hover:text-yellow-500">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
