import { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ recipeId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = { rating, comment };
      await axios.post(`/api/reviews/add`, { ...reviewData, recipeId });
      // Refresh or show success message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rating</label>
        <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
      </div>
      <div>
        <label>Comment</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
