// Menu.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Menu from "./Menu";
import { Provider } from "react-redux";
import { store, persistor } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { MenuData } from "../../utils/types";
import useFetch from "../../hooks/useFetch";

// Mock the fetch hook
vi.mock("../../hooks/useFetch", () => ({
  __esModule: true,
  default: vi.fn(),
}));

// Helper function to render the component with Redux and Redux Persist providers
// eslint-disable-next-line no-undef
const renderWithPersist = (component: JSX.Element) => {
  return render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {component}
      </PersistGate>
    </Provider>
  );
};

// Mock data for the menu
const mockMenuData: MenuData = {
  categories: [
    { id: "1", name: "Burgers", url: "burgers" },
    { id: "2", name: "Main courses", url: "main-courses" },
  ],
  items: [
    {
      id: "1",
      name: "Chicken & Avocado",
      price: 3500,
      discount_rate: 0.1,
      stock: { availability: 100 },
      description: "Test description",
      photo: "test.jpg",
      category_id: "1",
    },
    {
      id: "2",
      name: "Cheese Burger",
      price: 1500,
      discount_rate: 0.2,
      stock: { availability: 1 },
      description: "Test description",
      photo: "test.jpg",
      category_id: "1",
    },
  ],
};

describe("Menu Component", () => {
  // When we mock functions using Vitest's vi.fn() or vi.mock(), these mock functions can keep track of how many times
  // they've been called, the arguments they've been called with

  // eslint-disable-next-line no-undef
  afterEach(() => {
    // By calling vi.clearAllMocks() in an afterEach block, we ensure that all mock functions are reset after each test runs.
    vi.clearAllMocks();
  });

  it("renders loading indicator while fetching data", async () => {
    // Mock the fetch hook to simulate loading state
    const useFetchMock = vi.fn().mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    (useFetch as unknown as typeof useFetchMock) = useFetchMock;

    renderWithPersist(<Menu />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("displays an error message if fetch fails", async () => {
    const useFetchMock = vi.fn().mockReturnValue({
      data: null,
      loading: false,
      error: true,
    });
    (useFetch as unknown as typeof useFetchMock) = useFetchMock;

    renderWithPersist(<Menu />);

    expect(screen.getByText(/failed to fetch menu/i)).toBeInTheDocument();
  });

  it("renders menu categories and items", async () => {
    const useFetchMock = vi.fn().mockReturnValue({
      data: mockMenuData,
      loading: false,
      error: null,
    });
    (useFetch as unknown as typeof useFetchMock) = useFetchMock;

    renderWithPersist(<Menu />);

    await waitFor(() => {
      expect(screen.getByText("Burgers")).toBeInTheDocument();
      expect(screen.getByText("Chicken & Avocado")).toBeInTheDocument();
    });
  });

  it("filters items based on search query", async () => {
    const useFetchMock = vi.fn().mockReturnValue({
      data: mockMenuData,
      loading: false,
      error: null,
    });
    (useFetch as unknown as typeof useFetchMock) = useFetchMock;

    renderWithPersist(<Menu />);

    const searchInput = screen.getByPlaceholderText("Search for dishes...");

    fireEvent.change(searchInput, { target: { value: "Chicken" } });

    // Only the filtered item should be visible
    await waitFor(() => {
      expect(screen.getByText("Chicken & Avocado")).toBeInTheDocument();
      expect(screen.queryByText("Cheese Burger")).not.toBeInTheDocument();
    });
  });

  it("clears the basket when reset button is clicked", async () => {
    // Mock dispatch function
    const mockDispatch = vi.fn();
    store.dispatch = mockDispatch;

    // Mock the fetch hook to return menu data
    const useFetchMock = vi.fn().mockReturnValue({
      data: mockMenuData,
      loading: false,
      error: null,
    });
    (useFetch as unknown as typeof useFetchMock) = useFetchMock;

    renderWithPersist(<Menu />);

    // Simulate clicking the reset button
    fireEvent.click(screen.getByRole("button"));

    // Check if the dispatch function was called with the clearBasket action
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "basket/clearBasket",
      });
    });

    // Check that the local storage is cleared
    const basketData = localStorage.getItem("persist:basket");
    expect(basketData).not.toContain("Chicken & Avocado");
  });

  it("debounces search query input", async () => {
    // Mock the fetch hook to return menu data
    const useFetchMock = vi.fn().mockReturnValue({
      data: mockMenuData,
      loading: false,
      error: null,
    });
    (useFetch as unknown as typeof useFetchMock) = useFetchMock;

    renderWithPersist(<Menu />);

    const searchInput = screen.getByPlaceholderText("Search for dishes...");

    // Simulate typing into the search input
    fireEvent.change(searchInput, { target: { value: "Burger" } });

    // Wait for the debounce delay plus a small buffer
    await waitFor(
      () => {
        expect(screen.getByText("Cheese Burger")).toBeInTheDocument();
      },
      { timeout: 1000 } // Wait up to 1 second
    );
  }, 5000); // Test timeout of 5 seconds
});
