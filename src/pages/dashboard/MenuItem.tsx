import React from "react";
import DishCard from "../../components/molecules/DishCard/DishCard";
import { Item } from "../../utils/types";

interface ItemCardProps {
  item: Item;
}

const MenuItem: React.FC<ItemCardProps> = ({ item }) => {
  const handleAddToBasket = () => {};

  return (
    <div>
      <DishCard
        name={item.name}
        price={item.price}
        discountPrice={item.discount_rate}
        onAddToBasket={handleAddToBasket}
        image={item.photo || null}
        description={item.description}
      />
    </div>
  );
};

export default MenuItem;
