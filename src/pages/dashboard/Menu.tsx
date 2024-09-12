import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { MenuData } from "../../utils/types";
import { MENU_API_URL } from "../../utils/constants";
import Button from "../../components/atoms/Button/Button";
import SearchField from "../../components/atoms/Search/SearchField";
import { GoArrowLeft } from "react-icons/go";
import useDebounce from "../../hooks/useDebounce";
import MenuItem from "./MenuItem";
import { useDispatch } from "react-redux";
import { clearBasket } from "../../redux/features/basket/basketSlice";

const Menu: React.FC = () => {
  const { data: menuData, error, loading } = useFetch<MenuData>(MENU_API_URL);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const dispatch = useDispatch();

  const { items = [], categories = [] } = menuData || {};

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const handleReset = async () => {
    dispatch(clearBasket());
  };
  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Failed to fetch menu</p>;

  return (
    <div className="px-5 py-12 max-w-96">
      <div className="flex flex-col items-start gap-2">
        <Button icon={<GoArrowLeft size={"35px"} />} onClick={handleReset} />
        <div className="text-[26px] font-semibold">Search</div>
        <SearchField query={searchQuery} onSearch={setSearchQuery} />
      </div>
      <div>
        {!loading &&
          !error &&
          categories.map((category) => {
            // Filtering the items that belong to this specific category
            const categoryItems = filteredItems.filter(
              (item) => item.category_id === category.id
            );
            // Only rendering the category if it has items to display
            return (
              categoryItems.length > 0 && (
                <div key={category.id} className="my-4">
                  <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                  {categoryItems.map((item) => (
                    <MenuItem key={item.id} item={item} />
                  ))}
                </div>
              )
            );
          })}
      </div>
    </div>
  );
};

export default Menu;
