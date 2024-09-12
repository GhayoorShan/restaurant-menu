import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import DishCard from "./DishCard";
import { CURRENCY } from "../../../utils/constants";

const defaultProps = {
  name: "Test Dish",
  description: "Test description",
  price: 50,
  discountPrice: 40,
  image: null,
  onAddToBasket: vi.fn(), // Using Vitest mock function
};

describe("DishCard Component", () => {
  it("renders the dish name, price, and description", () => {
    render(<DishCard {...defaultProps} />);

    // Check if name, price, and description are displayed
    expect(screen.getByText("Test Dish")).toBeInTheDocument();
    expect(screen.getByText(`${CURRENCY} 50`)).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("does not show discount price if not provided", () => {
    render(<DishCard {...defaultProps} discountPrice={undefined} />);

    // Expect only the regular price to be shown, not the discount price
    expect(screen.getByText(`${CURRENCY} 50`)).toBeInTheDocument();
    expect(screen.queryByText(`${CURRENCY} 40`)).not.toBeInTheDocument();
  });

  it("calls onAddToBasket handler when clicked", () => {
    const onAddToBasket = vi.fn();
    render(<DishCard {...defaultProps} onAddToBasket={onAddToBasket} />);

    // Simulate clicking the card
    fireEvent.click(screen.getByText("Test Dish"));

    // Ensure the onAddToBasket function is called
    expect(onAddToBasket).toHaveBeenCalledTimes(1);
  });

  it("displays nothing when no image is provided", () => {
    render(<DishCard {...defaultProps} image={null} />);

    // Check if no img element is rendered
    const img = screen.queryByAltText("Test Dish");
    expect(img).toBeNull();
  });
});
