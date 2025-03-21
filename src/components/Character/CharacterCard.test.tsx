import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterCard } from "./CharacterCard";

describe("CharacterCard", () => {
  const mockProps = {
    name: "Rick Sanchez",
    species: "Human",
    status: "Alive",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    onClick: jest.fn(),
    selected: false,
  };

  it("renders character information correctly", () => {
    render(<CharacterCard {...mockProps} />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Alive")).toBeInTheDocument();

    const image = screen.getByAltText("Rick Sanchez");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProps.image);
  });

  it("calls onClick when clicked", () => {
    render(<CharacterCard {...mockProps} />);

    const card = screen.getByText("Rick Sanchez").closest("div");
    fireEvent.click(card!);

    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("applies selected styles when selected prop is true", () => {
    const selectedProps = { ...mockProps, selected: true };
    const { container } = render(<CharacterCard {...selectedProps} />);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("ring-2");
    expect(card).toHaveClass("ring-blue-500");
  });

  it("does not apply selected styles when selected prop is false", () => {
    render(<CharacterCard {...mockProps} />);

    const card = screen.getByText("Rick Sanchez").closest("div");
    expect(card).not.toHaveClass("ring-blue-500");
  });

  it("truncates long character names", () => {
    const longNameProps = { ...mockProps, name: "Rick Sanchez Smith Johnson" };
    render(<CharacterCard {...longNameProps} />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(
      screen.queryByText("Rick Sanchez Smith Johnson")
    ).not.toBeInTheDocument();
  });

  it("applies correct badge color based on status", () => {
    render(<CharacterCard {...mockProps} />);

    const badge = screen.getByText("Alive");
    expect(badge).toHaveClass("bg-green-400");

    const deadProps = { ...mockProps, status: "Dead" };
    render(<CharacterCard {...deadProps} />);

    const deadBadge = screen.getByText("Dead");
    expect(deadBadge).toHaveClass("bg-gray-300");
  });
});
