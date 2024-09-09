import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button"; // Adjust the import path as necessary

describe("Button Component", () => {
  it("renders button with text", () => {
    render(<Button text="Click Me" onClick={() => {}} />);

    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders button with icon", () => {
    render(
      <Button icon={<span data-testid="icon">👍</span>} onClick={() => {}} />
    );

    const iconElement = screen.getByTestId("icon");
    expect(iconElement).toBeInTheDocument();
  });

  //   it("throws an error when neither text nor icon is provided", () => {
  //     expect(() => {
  //       render(<Button onClick={() => {}} />);
  //     }).toThrowError("Button must have either text or icon.");
  //   });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button text="Click Me" onClick={handleClick} />);

    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalled();
  });

  it("disables button when disabled prop is true", () => {
    render(<Button text="Click me" onClick={() => {}} disabled={true} />);
    const button = screen.getByRole("button");

    // Check if button is disabled
    expect(button).toBeDisabled();
  });

  it("applies custom className", () => {
    render(
      <Button text="Click me" onClick={() => {}} className="custom-class" />
    );
    const button = screen.getByRole("button");

    // Check if the custom className is applied
    expect(button).toHaveClass("custom-class");
  });
});
