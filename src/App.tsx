import "./App.css";
import { FaArrowLeft } from "react-icons/fa";
import Button from "./components/atoms/Button/Button";
function App() {
  const handleBack = () => {
    console.log("Back button clicked");
  };
  const handleClick = () => {
    console.log("Text only button clicked");
  };
  return (
    <>
      {" "}
      <Button icon={<FaArrowLeft />} onClick={handleBack} />
      <Button text="Click Me" onClick={handleClick} />
      <div className="text-3xl font-bold underline">Restaurant Menu</div>
    </>
  );
}

export default App;
