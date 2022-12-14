import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './Reviews.css';

import useDocumentTitle from '../../utils/useDocumentTitle';
import Loading from '../Loading/Loading';
import Review from './Review/Review';
import { addItem } from '../../features/cart/cartSlice';
import { getProduct } from '../../features/product/productSlice';
import {
  getAllReviews,
  createReview,
} from '../../features/reviews/reviewsSlice';

const Reviews = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.user);
  const { product, isLoading } = useSelector(state => state.product);
  const { reviews } = useSelector(state => state.reviews);

  useDocumentTitle(product.name);

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    dispatch(getProduct(productId));
    dispatch(getAllReviews(productId));
  }, [dispatch, productId]);

  const handleCreateReview = e => {
    e.preventDefault();
    
    if (!review) return;
    dispatch(createReview({ productId, review, rating }));
    setReview('');
    setRating(1);

    window.location.reload();
  };

  if (isLoading) return <Loading />;

  return (
    <main className="reviews">
      <section className="reviews__productBox">
        <div className="reviews__product">
          <img
            className="reviews__productImg"
            src={product.photo}
            alt={product.name}
            crossOrigin="anonymous"
          />
          <div className="reviews__productDetail">
            <h1>{product.name}</h1>
            <div className="review_data">
              <p className="review__ratings">
                {new Array(Math.floor(product.ratingsAverage)).fill('⭐')}
              </p>
              <p className="review__quantity">
                {product.ratingsQuantity} ratings
              </p>
            </div>
            <div className="review__priceBox">
              <p className="review__price">
                <sup>$</sup>
                <span>{Math.trunc(product.price)}</span>
                <sup>{`${product.price}`.split('.')[1]}</sup>
              </p>
              <p className="review__discount">
                <span>{/* <strike>${product.priceDiscount}</strike> */}</span>
              </p>
            </div>
            <button
              className="review__addToCartBtn"
              onClick={() => dispatch(addItem({ ...product, amount: 1 }))}
            >
              <span>Add to Cart</span>
              <ShoppingCartOutlinedIcon
                sx={{
                  fontSize: '2.4rem',
                  marginLeft: '1rem',
                  color: 'var(--color-primary-black)',
                }}
              />
            </button>
          </div>
        </div>

        {isAuthenticated && (
          <div className="review__createReview">
            <form className="review__createForm" onSubmit={handleCreateReview}>
              <div className="form__control">
                <label>Enter your review</label>
                <textarea
                  placeholder="Enter your review"
                  value={review}
                  onChange={e => setReview(e.target.value)}
                ></textarea>
              </div>
              <div className="form__control">
                <label>Rate the product (1 - 5)</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </section>

      <section className="reviews__listBox">
        <h2>Customer's Review</h2>

        <div className="reviews__list">
          {reviews.map(review => (
            <Review key={review._id} id={review._id} {...review} />
          ))}
        </div>

        {/* <div className="reviews__paginateBtn">
          <button>Previous</button>
          <button>Next</button>
        </div> */}
      </section>
    </main>
  );
};

export default Reviews;
