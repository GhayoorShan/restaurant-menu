import React, { useEffect, useState } from "react";
import DishCard from "../../components/molecules/DishCard/DishCard";
import { Item } from "../../utils/types";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  updateAvailability,
} from "../../redux/features/basket/basketSlice";

interface ItemCardProps {
  item: Item;
}

const MenuItem: React.FC<ItemCardProps> = ({ item }) => {
  const dispatch = useDispatch();

  const initialAvailability = item?.stock?.availability ?? 0;
  const [availability, setAvailability] = useState<number>(initialAvailability);
  const [isOutOfStock, setIsOutOfStock] = useState<boolean>(availability === 0);

  useEffect(() => {
    setAvailability(initialAvailability);
    setIsOutOfStock(initialAvailability === 0);
  }, [item, initialAvailability]);

  const handleAddToBasket = () => {
    if (availability > 0) {
      dispatch(
        addToBasket({
          id: item.id,
          name: item.name,
          price: item.price - item.price * item.discount_rate,
          quantity: 1,
          maxQuantity: availability,
        })
      );

      dispatch(
        updateAvailability({
          id: item.id,
          quantity: availability - 1,
        })
      );

      setAvailability((prevAvailability) => {
        const newAvailability = prevAvailability - 1;
        if (newAvailability === 0) {
          setIsOutOfStock(true);
        }
        return newAvailability;
      });
    }
  };

  return (
    <div>
      <DishCard
        name={item.name}
        price={item.price}
        discountPrice={item.discount_rate}
        onAddToBasket={handleAddToBasket}
        image={item.photo || null}
        description={item.description}
        isOutOfStock={isOutOfStock}
      />
    </div>
  );
};

export default MenuItem;
