import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CategoryProducts.css';

import useDocumentTitle from '../../utils/useDocumentTitle';
import Loading from '../Loading/Loading';
import Product from '../Product/Product';
import { getCategoryProducts } from '../../features/products/productsSlice';

const CategoryProducts = () => {
  const { category } = useParams();
  useDocumentTitle(`${category} category products`);

  const dispatch = useDispatch();
  const { products, isLoading } = useSelector(state => state.products);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getCategoryProducts({ category, page }));
  }, [dispatch, category, page]);

  if (isLoading) return <Loading />;

  return (
    <section className="category__products">
      <h1 className="category__productsHeading">{category || 'Category'}</h1>
      <div className="category__productList">
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>

      <div className="category__productsBtnBox">
        {page > 1 && (
          <button
            className="category__productsBtn category__productsPrevious"
            onClick={() => setPage(page === 1 ? 1 : page - 1)}
          >
            Previous
          </button>
        )}
        <button
          className="category__productsBtn category__productsNext"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default CategoryProducts;
