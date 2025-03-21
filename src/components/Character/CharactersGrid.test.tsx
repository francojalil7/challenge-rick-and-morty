import { render, screen, fireEvent } from "@testing-library/react";
import { CharactersGrid } from "./CharactersGrid";
import { useCharacters } from "@/hooks/useCharacters";

jest.mock("@/hooks/useCharacters");
jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("CharactersGrid", () => {
  const mockCharacters = [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: { name: "Earth", url: "" },
      location: { name: "Earth", url: "" },
      image: "rick.jpg",
      episode: [],
      url: "",
      created: "",
    },
    {
      id: 2,
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: { name: "Earth", url: "" },
      location: { name: "Earth", url: "" },
      image: "morty.jpg",
      episode: [],
      url: "",
      created: "",
    },
  ];

  beforeEach(() => {
    (useCharacters as jest.Mock).mockReturnValue({
      characters: mockCharacters,
      totalPages: 10,
      loading: false,
      error: false,
    });
  });

  it("renders characters grid with correct data", () => {
    const onSelectCharacter = jest.fn();
    render(
      <CharactersGrid onSelectCharacter={onSelectCharacter} initialPage={1} />
    );

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    expect(screen.getByText("selectCharacters")).toBeInTheDocument();
    expect(screen.getByText("previous")).toBeInTheDocument();
    expect(screen.getByText("next")).toBeInTheDocument();
  });

  it("calls onSelectCharacter when a character is clicked", () => {
    const onSelectCharacter = jest.fn();
    render(
      <CharactersGrid onSelectCharacter={onSelectCharacter} initialPage={1} />
    );

    fireEvent.click(screen.getByText("Rick Sanchez"));
    expect(onSelectCharacter).toHaveBeenCalledWith(mockCharacters[0]);

    fireEvent.click(screen.getByText("Rick Sanchez"));

    expect(onSelectCharacter).toHaveBeenCalledWith(null);
  });

  it("changes page when navigation buttons are clicked", () => {
    render(<CharactersGrid onSelectCharacter={jest.fn()} initialPage={2} />);

    fireEvent.click(screen.getByText("previous"));

    expect(useCharacters).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText("next"));

    expect(useCharacters).toHaveBeenCalledWith(2);
  });
});
