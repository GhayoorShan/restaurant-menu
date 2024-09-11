import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import MenuItem from "./MenuItem";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

import { Item } from "../../utils/types";

const defaultItem: Item = {
  id: "1",
  name: "Test Item",
  description: "Test Description",
  price: 100,
  discount_rate: 0.1,
  photo: null,
  stock: {
    availability: 5,
  },
  category_id: "",
};

const renderWithProvider = (component: JSX.Element) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("MenuItem Component", () => {
  it("renders the item name, price, and description", () => {
    renderWithProvider(<MenuItem item={defaultItem} />);
    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("AED 90"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("AED 100"))
    ).toBeInTheDocument();
  });

  it("does not show discount price if not provided", () => {
    const noDiscountItem = { ...defaultItem, discount_rate: 0 };
    renderWithProvider(<MenuItem item={noDiscountItem} />);

    expect(
      screen.getByText((content) => content.includes("AED 100"))
    ).toBeInTheDocument();
    expect(
      screen.queryByText((content) => content.includes("AED 90"))
    ).not.toBeInTheDocument();
  });

  it("adds item to basket when clicked", () => {
    const mockAddToBasket = vi.fn();
    store.dispatch = mockAddToBasket;

    renderWithProvider(<MenuItem item={defaultItem} />);

    fireEvent.click(screen.getByText("Test Item"));

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

  it("displays the placeholder image when no image is provided", () => {
    renderWithProvider(<MenuItem item={defaultItem} />);

    const img = screen.getByAltText("Test Item");
    expect(img).toHaveAttribute("src", "https://via.placeholder.com/100");
  });

  it("shows 'Out of Stock' badge if item is not available", () => {
    const outOfStockItem = { ...defaultItem, stock: { availability: 0 } };
    renderWithProvider(<MenuItem item={outOfStockItem} />);

    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
  });
});
