import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';

import Loading from '../Loading/Loading';
import Category from './Category/Category';
import useDocumentTitle from '../../utils/useDocumentTitle';
import { getTopProducts } from '../../features/topProducts/topProductsSlice';

const Home = () => {
  const dispatch = useDispatch();
  useDocumentTitle('E-Commerce store for all top products');
  const { topProducts: categories, isLoading } = useSelector(
    state => state.topProducts
  );

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return (
    <main className="home">
      <img
        className="home__hero"
        src="https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg"
        alt="Amazon hero banner"
        crossOrigin="anonymous"
      />

      <section className="home__categoryList">
        {categories.map(category => (
          <Category
            key={category._id}
            category={category._id}
            products={category.products}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
