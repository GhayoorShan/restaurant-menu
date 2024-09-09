import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import SearchField from "./SearchField";

describe("SearchField Component", () => {
  it("displays the correct query value", () => {
    render(<SearchField query="test" onSearch={() => {}} />);
    const input = screen.getByPlaceholderText(
      "Search for dishes..."
    ) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe("test");
  });

  it("calls onSearch with the correct value when the input changes", () => {
    const onSearchMock = vi.fn();
    render(<SearchField query="" onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(
      "Search for dishes..."
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "test query" } });
    expect(onSearchMock).toHaveBeenCalledWith("test query");
  });
});
