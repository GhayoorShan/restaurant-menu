import "./App.css";
import { FaArrowLeft } from "react-icons/fa";
import Button from "./components/atoms/Button/Button";
import { useState } from "react";
import SearchField from "./components/molecules/Search/SearchField";
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
      <Button icon={<FaArrowLeft />} onClick={handleBack} text={"uu"} />
      <div className="text-[26px] font-semibold">Search</div>
      <SearchField query={searchQuery} onSearch={handleSearch} />
    </div>
  );
}

export default App;
