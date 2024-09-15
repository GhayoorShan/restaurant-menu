import React, { useEffect, useState } from "react";
import DishCard from "../../molecules/DishCard";
import { Item } from "../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addToBasket } from "../../../redux/features/basket/basketSlice";
import useTruncate from "../../../hooks/useTruncate";
import { TRUNCATE_LIMIT } from "../../../utils/constants";

interface ItemCardProps {
  item: Item;
}

const MenuItem: React.FC<ItemCardProps> = ({ item }) => {
  const dispatch = useDispatch();
  const basketItems = useSelector((state: RootState) => state.basket.items);

  // Finding the corresponding basket item
  const basketItem = basketItems.find(
    (basketItem) => basketItem.id === item.id
  );

  // Initial availability
  const initialAvailability =
    basketItem?.availableQuantity ?? item.stock?.availability ?? 0;

  const [availability, setAvailability] = useState<number>(initialAvailability);

  useEffect(() => {
    setAvailability(initialAvailability);
  }, [initialAvailability]);

  const isOutOfStock = availability <= 0;

  const handleAddToBasket = () => {
    if (availability > 0) {
      dispatch(
        addToBasket({
          id: item.id,
          name: item.name,
          price: item.price - item.price * item.discount_rate,
          currentQuantity: 1,
          maxQuantity: item.stock?.availability ?? 0,
          availableQuantity: availability - 1,
        })
      );
      setAvailability(availability - 1);
    }
  };

  return (
    <DishCard
      name={item.name}
      price={item.price}
      discountPrice={item.discount_rate}
      onAddToBasket={handleAddToBasket}
      image={item.photo || null}
      description={useTruncate(item.description, TRUNCATE_LIMIT)}
      isOutOfStock={isOutOfStock}
      currentQuantity={basketItem?.currentQuantity ?? 0}
    />
  );
};

export default MenuItem;
