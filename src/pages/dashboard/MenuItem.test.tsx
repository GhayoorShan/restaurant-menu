import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import MenuItem from "./MenuItem";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Item } from "../../utils/types";
import { CURRENCY } from "../../utils/constants";

// Helper function to render the component with Redux Provider
// eslint-disable-next-line no-undef
const renderWithProvider = (component: JSX.Element) => {
  return render(<Provider store={store}>{component}</Provider>);
};

const defaultItem: Item = {
  id: "1",
  name: "Test Item",
  description: "Test Description",
  price: 100,
  discount_rate: 0.1,
  photo: "https://via.placeholder.com/100",
  stock: {
    availability: 5,
  },
  category_id: "",
};

describe("MenuItem Component", () => {
  it("renders the item name, price, and description", () => {
    renderWithProvider(<MenuItem item={defaultItem} />);

    // Check if item name and description are rendered
    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();

    // Find the currency elements
    const currencyElements = screen.getAllByText(CURRENCY);
    expect(currencyElements.length).toBeGreaterThan(0);

    // Check for the discounted price
    const discountedPriceElement = screen.getByText("90");
    expect(discountedPriceElement).toBeInTheDocument();

    // Check for the original price (strikethrough)
    const originalPriceElement = screen.getByText("100");
    expect(originalPriceElement).toBeInTheDocument();
  });

  it("does not show discount price if not provided", () => {
    const noDiscountItem = { ...defaultItem, discount_rate: 0 };
    renderWithProvider(<MenuItem item={noDiscountItem} />);

    // Find the regular price
    const regularPriceElement = screen.getByText("100");
    expect(regularPriceElement).toBeInTheDocument();

    // Ensure the discounted price is not rendered
    const discountedPriceElement = screen.queryByText("90");
    expect(discountedPriceElement).not.toBeInTheDocument();
  });

  it("adds item to basket when clicked", () => {
    const mockAddToBasket = vi.fn();
    store.dispatch = mockAddToBasket;

    renderWithProvider(<MenuItem item={defaultItem} />);

    // Simulate clicking the card
    fireEvent.click(screen.getByText("Test Item"));

    // Check if the dispatch function was called with the expected payload
    expect(mockAddToBasket).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          id: "1",
          name: "Test Item",
          price: 90,
          availableQuantity: 4,
          maxQuantity: 5,
          currentQuantity: 1,
        }),
      })
    );
  });

  it("shows 'Out of Stock' badge if item is not available", () => {
    const outOfStockItem = { ...defaultItem, stock: { availability: 0 } };
    renderWithProvider(<MenuItem item={outOfStockItem} />);

    // Check if 'Out of Stock' badge is displayed
    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
  });
});
