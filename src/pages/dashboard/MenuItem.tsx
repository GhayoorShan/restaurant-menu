import React, { useEffect, useState } from "react";
import DishCard from "../../components/molecules/DishCard/DishCard";
import { Item } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addToBasket } from "../../redux/features/basket/basketSlice";
import useTruncate from "../../hooks/useTruncate";
import { TRUNCATE_LIMIT } from "../../utils/constants";

interface ItemCardProps {
  item: Item;
}

const MenuItem: React.FC<ItemCardProps> = ({ item }) => {
  const dispatch = useDispatch();
  const basketItems = useSelector((state: RootState) => state.basket.items);

  const basketItem = basketItems.find(
    (basketItem) => basketItem.id === item.id
  );

  const initialAvailableQuantity = basketItem
    ? (basketItem.availableQuantity ?? 0)
    : (item?.stock?.availability ?? 0);

  const [availability, setAvailability] = useState<number>(
    initialAvailableQuantity
  );
  const [isOutOfStock, setIsOutOfStock] = useState<boolean>(availability <= 0);

  useEffect(() => {
    setAvailability(initialAvailableQuantity);
    setIsOutOfStock(initialAvailableQuantity <= 0);
  }, [item, initialAvailableQuantity]);

  const handleAddToBasket = () => {
    if (availability > 0) {
      // Dispatch action to add item to basket
      dispatch(
        addToBasket({
          id: item.id,
          name: item.name,
          price: item.price - item.price * item.discount_rate,
          currentQuantity: 1,
          maxQuantity: item?.stock?.availability ?? 0,
          availableQuantity: availability - 1,
        })
      );

      // Update local availability state
      setAvailability((prevAvailability) => {
        const newAvailability = prevAvailability - 1;
        if (newAvailability <= 0) {
          setIsOutOfStock(true);
        }
        return newAvailability;
      });
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
