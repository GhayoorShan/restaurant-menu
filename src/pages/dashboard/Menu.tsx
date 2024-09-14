import React, { useState, useMemo, useCallback, Suspense } from "react";
import useFetch from "../../hooks/useFetch";
import { MenuData } from "../../utils/types";
import Button from "../../components/atoms/Button/";
import SearchField from "../../components/atoms/Search";
import { GoArrowLeft } from "react-icons/go";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch } from "react-redux";
import { clearBasket } from "../../redux/features/basket/basketSlice";
import ErrorBoundary from "../../components/organisms/ErrorBoundary";
const MENU_API_URL = import.meta.env.VITE_API_BASE_URL;
// Lazy load MenuItem component
const MenuItem = React.lazy(
  () => import("../../components/organisms/MenuItem")
);

const Menu: React.FC = () => {
  const { data: menuData, error } = useFetch<MenuData>(MENU_API_URL);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 500);
  const dispatch = useDispatch();

  const { items = [], categories = [] } = menuData || {};

  // Memoizing the filteredItems array to avoid recalculating on every render
  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      ),
    [debouncedQuery, items]
  );

  // Memoizing the handleReset
  const handleReset = useCallback(() => {
    dispatch(clearBasket());
  }, [dispatch]);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to fetch menu</p>;

  return (
    <div className="px-5 py-12 max-w-96">
      <div className="flex flex-col items-start gap-2">
        <Button icon={<GoArrowLeft size="35px" />} onClick={handleReset} />
        <div className="text-[26px] font-semibold">Search</div>
        <SearchField query={searchQuery} onSearch={setSearchQuery} />
      </div>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading items...</div>}>
          {categories.map((category) => {
            const categoryItems = filteredItems.filter(
              (item) => item.category_id === category.id
            );
            return (
              categoryItems.length > 0 && (
                <div key={category.id} className="my-4">
                  <h2 className="text-[26px] font-bold mb-4">
                    {category.name}
                  </h2>
                  {categoryItems.map((item) => (
                    <MenuItem key={item.id} item={item} />
                  ))}
                </div>
              )
            );
          })}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Menu;
