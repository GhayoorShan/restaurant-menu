import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import DishCard from "./DishCard";
import { CURRENCY } from "../../../utils/constants";

const defaultProps = {
  name: "Test Dish",
  description: "Test description",
  price: 50,
  discountPrice: 0.2, // 20% discount rate
  image: null,
  onAddToBasket: vi.fn(), // Using Vitest mock function
};

describe("DishCard Component", () => {
  it("renders the dish name, price, and description", () => {
    render(<DishCard {...defaultProps} />);

    // Check if name and description are displayed
    expect(screen.getByText("Test Dish")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();

    // Check if price is rendered (split between two <span> elements)
    const priceElements = screen.getAllByText(CURRENCY); // Finds all elements with "AED"
    expect(priceElements.length).toBeGreaterThan(0); // Ensure the currency appears

    const valueElement = screen.getByText("50");
    expect(valueElement).toBeInTheDocument(); // Ensure the price is rendered
  });

  it("does not show discount price if not provided", () => {
    render(<DishCard {...defaultProps} discountPrice={undefined} />);

    // Check if the regular price is shown
    expect(screen.getByText(CURRENCY)).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();

    // Ensure the discount price is not shown
    const discountPriceElement = screen.queryByText("40");
    expect(discountPriceElement).not.toBeInTheDocument();
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

  it("shows the discounted price when provided", () => {
    render(<DishCard {...defaultProps} discountPrice={0.2} price={100} />);

    // Check for both original and discounted price
    const currencyElements = screen.getAllByText(CURRENCY);
    expect(currencyElements.length).toBeGreaterThan(0);

    const discountedPriceElement = screen.getByText("80");
    expect(discountedPriceElement).toBeInTheDocument();

    const originalPriceElement = screen.getByText("100");
    expect(originalPriceElement).toBeInTheDocument();
  });

  it("displays 'Out of Stock' badge if the item is out of stock", () => {
    render(<DishCard {...defaultProps} isOutOfStock />);

    // Check if 'Out of Stock' badge is rendered
    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
  });
});
