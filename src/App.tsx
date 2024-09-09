import "./App.css";
import Button from "./components/atoms/Button/Button";
import { useState } from "react";
import SearchField from "./components/atoms/Search/SearchField";
import DishCard from "./components/molecules/DishCard/DishCard";
import { GoArrowLeft } from "react-icons/go";
function App() {
  const handleBack = () => {
    console.log("Back button clicked");
  };

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };
  return (
    <div className="px-5 py-12">
      <div className="flex flex-col items-start gap-2">
        <Button icon={<GoArrowLeft size={"35px"} />} onClick={handleBack} />
        <div className="text-[26px] font-semibold">Search</div>
        <SearchField query={searchQuery} onSearch={handleSearch} />
      </div>
      <DishCard
        name="Dish"
        price="88"
        discountPrice="44"
        onAddToBasket={() => console.log("added")}
        image={null}
        description="Freshly made beetroot hummus served with fresh celery sticks Freshly made beetroot hummus served with fresh celery sticks..."
      />
    </div>
  );
}

export default App;
