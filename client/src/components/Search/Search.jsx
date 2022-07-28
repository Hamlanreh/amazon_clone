import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Search.css';

import Loading from '../Loading/Loading';
import Product from '../Product/Product';
import { searchProducts } from '../../features/search/searchSlice';

const Search = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  const dispatch = useDispatch();
  const { search, isLoading } = useSelector(state => state.search);

  // const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(searchProducts(name));
  }, [dispatch, name]);

  if (isLoading) return <Loading />;

  return (
    <main className="search">
      <h1 className="search__heading">Search: {name}</h1>

      <div className="search__list">
        {search.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>

      {/* <div className="search__paginateBtn">
        <button onClick={() => setPage(page === 1 ? 1 : page - 1)}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div> */}
    </main>
  );
};

export default Search;
