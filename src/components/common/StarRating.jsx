import { Star, StarHalf } from 'lucide-react';

const StarRating = ({ rating, size = 16 }) => {
  const stars = [];
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;

  for (let i = 0; i < full; i++) {
    stars.push(<Star key={`f${i}`} size={size} className="fill-yellow text-yellow" />);
  }
  if (hasHalf) {
    stars.push(<StarHalf key="h" size={size} className="fill-yellow text-yellow" />);
  }
  while (stars.length < 5) {
    stars.push(<Star key={`e${stars.length}`} size={size} className="text-gray-300" />);
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
};

export default StarRating;
