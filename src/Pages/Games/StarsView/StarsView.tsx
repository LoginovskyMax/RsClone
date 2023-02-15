import type { FC } from "react";
import { useEffect, useState } from "react";

import "./style.scss";

const NOT_SET_OPACITY = 0.6;

interface SarsViewProps {
  rating: number; // рейтинг который вычислился
  canSet?: boolean; // может ли пользователь менять рейтинг
  getSettedRating?: () => number; // автоматически вызывается и сетается возвр знач
  setCallback?: (rating: number) => void; // вызывается когда пользователь задал рейтинг
}

const StarsView: FC<SarsViewProps> = ({
  rating: rat,
  canSet,
  getSettedRating,
  setCallback,
}) => {
  const [rating, setRating] = useState(rat);
  const [isSetted, userSetRating] = useState(false);

  const setNewRating = (value: number) => {
    if (canSet) {
      setRating(value);
      userSetRating(true);

      if (setCallback) {
        setCallback(value);
      }
    }
  };

  useEffect(() => {
    if (getSettedRating) {
      const res = getSettedRating();

      if (res >= 0 && res <= 5) {
        setRating(res);
        userSetRating(true);
      }
    }
  }, []);

  const [starHovered, setStarHovered] = useState(0);

  // Calculating Percent of filling for every star
  const ratingByStars = [
    rating <= 0 ? 0 : rating >= 1 ? 100 : (rating - 0) * 100,
    rating <= 1 ? 0 : rating >= 2 ? 100 : (rating - 1) * 100,
    rating <= 2 ? 0 : rating >= 3 ? 100 : (rating - 2) * 100,
    rating <= 3 ? 0 : rating >= 4 ? 100 : (rating - 3) * 100,
    rating <= 4 ? 0 : rating >= 5 ? 100 : (rating - 4) * 100,
  ];

  return (
    <div className="rating-view">
      <div className="rating-view__back">
        {ratingByStars.map(() => (
          <div className="rating-view__star-wrapper">
            <div className="rating-view__star-no" />
          </div>
        ))}
      </div>
      <div className="rating-view__fill" onMouseLeave={() => setStarHovered(0)}>
        {ratingByStars.map((percent, i) => (
          <div
            className="rating-view__star-wrapper star-1"
            onMouseEnter={() => {
              if (canSet) setStarHovered(i + 1);
            }}
            onClick={() => setNewRating(i + 1)}
          >
            <div
              className="rating-view__star-yes"
              style={{
                transform: starHovered === i + 1 ? "scale(1.2)" : "none",
                width: starHovered < i + 1 ? `${percent}%` : "100%",
                opacity: isSetted || starHovered > i ? 1 : NOT_SET_OPACITY,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarsView;
