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

  if (error) return <div>Error: {error}</div>;

  const { items } = menuData || { items: [] };
  console.log("items", items);
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const handleReset = async () => {
    dispatch(clearBasket());
  };

  return (
    <div className="px-5 py-12">
      <div className="flex flex-col items-start gap-2">
        <Button icon={<GoArrowLeft size={"35px"} />} onClick={handleReset} />
        <div className="text-[26px] font-semibold">Search</div>
        <SearchField query={searchQuery} onSearch={setSearchQuery} />
      </div>
      <div>
        {!loading &&
          filteredItems.map((item) => <MenuItem key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default Menu;
