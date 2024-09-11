import React from "react";
import { CURRENCY } from "../../../utils/constants";

type DishCardProps = {
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  image: string | null;
  onAddToBasket: () => void;
  isOutOfStock?: boolean;
  currentQuantity?: number;
};

const DishCard: React.FC<DishCardProps> = ({
  name,
  description = "",
  price,
  discountPrice,
  image,
  onAddToBasket,
  isOutOfStock = true,
  currentQuantity,
}) => {
  return (
    <div
      onClick={onAddToBasket}
      className="flex justify-between space-x-4 cursor-pointer py-5 border-b border-borderColor relative"
    >
      <div className=" flex flex-col gap-2">
        <h4 className="font-semibold text-primary">
          {currentQuantity ? `${currentQuantity} X ` : ""}
          {name}
        </h4>
        {description && <p className="text-sm text-gray-500">{description}</p>}
        <div className="flex gap-4 text-sm">
          {discountPrice ? (
            <>
              <p>
                {CURRENCY} {price - price * discountPrice}
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
      {isOutOfStock && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-md shadow-lg">
          Out of Stock
        </div>
      )}
    </div>
  );
};

export default DishCard;
