import React, { useEffect, useState, useCallback, useMemo } from "react";
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

  // Memoizing basketItem lookup
  const basketItem = useMemo(
    () => basketItems.find((basketItem) => basketItem.id === item.id),
    [basketItems, item.id]
  );

  // Memoizing the initial available quantity
  const initialAvailableQuantity = useMemo(
    () => basketItem?.availableQuantity ?? item?.stock?.availability ?? 0,
    [basketItem, item?.stock?.availability]
  );

  const [availability, setAvailability] = useState<number>(
    initialAvailableQuantity
  );
  const [isOutOfStock, setIsOutOfStock] = useState<boolean>(availability <= 0);

  useEffect(() => {
    setAvailability(initialAvailableQuantity);
    setIsOutOfStock(initialAvailableQuantity <= 0);
  }, [initialAvailableQuantity]);

  // Memoizing the add to basket function
  const handleAddToBasket = useCallback(() => {
    // Dispatch action to add item to basket
    if (availability > 0) {
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
  }, [dispatch, availability, item]);

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
