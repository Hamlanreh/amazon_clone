import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Review.css';

import {
  updateReview,
  deleteReview,
} from '../../../features/reviews/reviewsSlice';

const Review = ({ id, review, rating, user, createdAt }) => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector(state => state.user);

  const [showEdit, setShowEdit] = useState(false);
  const [editReview, setEditReview] = useState(review);
  const [editRating, setEditRating] = useState(rating);

  const handleEditReview = e => {
    e.preventDefault();
    if (!editReview) return;
    dispatch(
      updateReview({
        productId,
        reviewId: id,
        review: editReview,
        rating: editRating,
      })
    );
    setEditReview(editReview);
    setEditRating(editRating);
    setShowEdit(false);

    window.location.reload();
  };

  const handleDeleteReview = () => {
    dispatch(deleteReview({ productId, reviewId: id }));
    window.location.reload();
  };

  return (
    <article className="review">
      <div className="review__header">
        <div>
          <img
            className="review__userImg"
            src={require('../../../assets/images/default.jpg')}
            // src={require('../../../assets/images/${user.photo}')}
            alt="username"
          />
          <span className="review__username">{user.name}</span>
        </div>
        <div>
          <span>{new Date(createdAt).toDateString()}</span>
          {user._id === currentUser._id && (
            <>
              <span onClick={() => setShowEdit(!showEdit)}>
                <strong>Edit</strong>
              </span>
              <span onClick={handleDeleteReview}>
                <strong>Delete</strong>
              </span>
            </>
          )}
        </div>
      </div>

      <div>
        <p className="review__rating">
          {new Array(Math.floor(rating)).fill('⭐')}
        </p>
        <p className="review__detail">{review}</p>
      </div>

      {user._id === currentUser._id && showEdit && (
        <div>
          <form className="review__updateForm" onSubmit={handleEditReview}>
            <div className="form__control">
              <label>Enter updated review</label>
              <textarea
                placeholder="Enter your review"
                value={editReview}
                onChange={e => setEditReview(e.target.value)}
              ></textarea>
            </div>
            <div className="form__control">
              <label>Rate the product (1 - 5)</label>
              <input
                type="range"
                min="1"
                max="5"
                value={editRating}
                onChange={e => setEditRating(e.target.value)}
              />
            </div>
            <button type="submit">Update Review</button>
          </form>
        </div>
      )}
    </article>
  );
};

export default Review;
