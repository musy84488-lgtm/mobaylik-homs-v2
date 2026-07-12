import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'sm',
  showValue = false,
  reviewCount,
  className,
}: StarRatingProps) {
  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <Star
          key={i}
          className={cn(sizes[size], 'fill-yellow-400 text-yellow-400')}
        />
      );
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(
        <StarHalf
          key={i}
          className={cn(sizes[size], 'fill-yellow-400 text-yellow-400')}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={cn(sizes[size], 'text-gray-300')}
        />
      );
    }
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">{stars}</div>
      {showValue && (
        <span className="text-sm text-gray-600 font-medium mr-1">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-gray-400">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
