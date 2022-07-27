import React from 'react';
import { Link } from 'react-router-dom';
import './Category.css';

import Product from '../../Product/Product';

const Category = ({ category, products }) => {
  return (
    <div className="category">
      <h2 className="category__heading">{category}</h2>

      <div className="category__list">
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>

      <button className="category__moreBtn">
        <Link
          className="category__moreLink"
          to={`/category/${category.toLowerCase()}`}
        >
          See more ({category.toLowerCase()}) product 👉
        </Link>
      </button>
    </div>
  );
};

export default Category;
