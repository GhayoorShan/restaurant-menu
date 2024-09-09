import React from "react";
import useTruncate from "../../../hooks/useTruncate";
import { CURRENCY } from "../../../utils/constants";

type DishCardProps = {
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  image: string | null;
  onAddToBasket: () => void;
  isAvailable?: boolean;
};

const DishCard: React.FC<DishCardProps> = ({
  name,
  description = "",
  price,
  discountPrice,
  image,
  onAddToBasket,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isAvailable = true,
}) => {
  const truncatedDescription = useTruncate(description, 100);

  return (
    <div
      onClick={onAddToBasket}
      className="flex justify-between space-x-4 cursor-pointer py-5 border-b border-borderColor"
    >
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-primary">{name}</h4>
        {description && (
          <p className="text-sm text-gray-500">{truncatedDescription}</p>
        )}
        <div className="flex gap-4 text-sm">
          {discountPrice ? (
            <>
              <p>
                {CURRENCY}
                {price - price * discountPrice}
              </p>
              <p className="text-muted line-through">
                {CURRENCY} {price}
              </p>
            </>
          ) : (
            <p>
              {CURRENCY} {price}
            </p>
          )}
        </div>
      </div>
      <img
        src={image ?? "https://via.placeholder.com/100"}
        alt={name}
        className="w-24 h-24 rounded-md"
      />
    </div>
  );
};

export default DishCard;
