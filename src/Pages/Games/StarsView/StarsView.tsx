import type { FC } from "react";
import { useEffect, useState } from "react";

import "./style.scss";

const NOT_SET_OPACITY = 0.6;

interface SarsViewProps {
  rating: number; // рейтинг который вычислился
  canSet?: boolean; // может ли пользователь менять рейтинг
  settedRating?: number; // значение заданное как-бы пользователем
  setCallback?: (rating: number) => void; // вызывается когда пользователь задал рейтинг
  starSize?: number; // Размер звездочки
}

const StarsView: FC<SarsViewProps> = ({
  rating,
  canSet,
  settedRating,
  setCallback,
  starSize = 30,
}) => {
  const [newRating, setRating] = useState(-1);
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
    if (settedRating) {
      if (settedRating > 0 && settedRating <= 5) {
        setRating(settedRating);
        userSetRating(true);
      }
    }
  }, [settedRating]);

  const [starHovered, setStarHovered] = useState(0);

  const getRate = () => (newRating >= 0 ? newRating : rating);

  // Calculating Percent of filling for every star
  const [ratingByStars, setRatingByStars] = useState([0, 0, 0, 0, 0]);

  const renewrRatingByStars = () =>
    setRatingByStars([
      getRate() <= 0 ? 0 : getRate() >= 1 ? 100 : (getRate() - 0) * 100,
      getRate() <= 1 ? 0 : getRate() >= 2 ? 100 : (getRate() - 1) * 100,
      getRate() <= 2 ? 0 : getRate() >= 3 ? 100 : (getRate() - 2) * 100,
      getRate() <= 3 ? 0 : getRate() >= 4 ? 100 : (getRate() - 3) * 100,
      getRate() <= 4 ? 0 : getRate() >= 5 ? 100 : (getRate() - 4) * 100,
    ]);

  useEffect(() => renewrRatingByStars(), [newRating, rating]);

  return (
    <div className="rating-view">
      <div className="rating-view__fill" onMouseLeave={() => setStarHovered(0)}>
        {ratingByStars.map((percent, i) => (
          <div
            className="rating-view__star-wrapper"
            style={{ width: `${starSize}px`, height: `${starSize}px` }}
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
      <div className="rating-view__back">
        {ratingByStars.map(() => (
          <div
            className="rating-view__star-wrapper"
            style={{ width: `${starSize}px`, height: `${starSize}px` }}
          >
            <div className="rating-view__star-no" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarsView;
