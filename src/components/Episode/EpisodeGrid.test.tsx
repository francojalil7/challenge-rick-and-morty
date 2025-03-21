import { render, screen } from "@testing-library/react";
import { EpisodeGrid } from "./EpisodeGrid";
import { CharacterProps } from "../../types/Charactets";

jest.mock("next-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => (key === "titleEpisodeList" ? "Character " : key),
  }),
}));

jest.mock("./", () => ({
  EpisodeList: ({ config }: any) => (
    <div data-testid={`episode-list-${config.caption}`}>
      {config.caption}
      <span data-testid="episode-data">
        {config.data?.join(",") || "no-data"}
      </span>
      <span data-testid="select-status">{config.select.toString()}</span>
    </div>
  ),
}));

describe("EpisodeGrid", () => {
  const mockFirstCharacter: CharacterProps = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "rick.jpg",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      "https://rickandmortyapi.com/api/episode/3",
    ],
    url: "",
    created: "",
  };

  const mockSecondCharacter: CharacterProps = {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "morty.jpg",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/3",
      "https://rickandmortyapi.com/api/episode/4",
    ],
    url: "",
    created: "",
  };

  it("renders three episode lists", () => {
    render(<EpisodeGrid firstCharacter={null} secondCharacter={null} />);

    expect(screen.getByText("firstEpisodeList")).toBeInTheDocument();
    expect(screen.getByText("sharedEpisodeList")).toBeInTheDocument();
    expect(screen.getByText("secondEpisodeList")).toBeInTheDocument();
  });

  it("extracts episode numbers correctly from character data", () => {
    render(
      <EpisodeGrid firstCharacter={mockFirstCharacter} secondCharacter={null} />
    );

    const firstCharacterEpisodes = screen.getAllByTestId("episode-data")[0];
    expect(firstCharacterEpisodes.textContent).toBe("1,2,3");
  });

  it("calculates shared episodes correctly", () => {
    render(
      <EpisodeGrid
        firstCharacter={mockFirstCharacter}
        secondCharacter={mockSecondCharacter}
      />
    );

    const sharedEpisodes = screen.getAllByTestId("episode-data")[1];
    expect(sharedEpisodes.textContent).toBe("1,3");
  });

  it("sets select property correctly based on character presence", () => {
    render(
      <EpisodeGrid
        firstCharacter={mockFirstCharacter}
        secondCharacter={mockSecondCharacter}
      />
    );

    const selectStatuses = screen.getAllByTestId("select-status");
    expect(selectStatuses[0].textContent).toBe("true");
    expect(selectStatuses[1].textContent).toBe("true");
    expect(selectStatuses[2].textContent).toBe("true");
  });

  it("handles null characters correctly", () => {
    render(<EpisodeGrid firstCharacter={null} secondCharacter={null} />);

    const selectStatuses = screen.getAllByTestId("select-status");
    expect(selectStatuses[0].textContent).toBe("false");
    expect(selectStatuses[1].textContent).toBe("false");
    expect(selectStatuses[2].textContent).toBe("false");

    const episodeData = screen.getAllByTestId("episode-data");
    expect(episodeData[0].textContent).toBe("no-data");
    expect(episodeData[1].textContent).toBe("no-data");
    expect(episodeData[2].textContent).toBe("no-data");
  });

  it("renders correct titles for each list", () => {
    render(
      <EpisodeGrid
        firstCharacter={mockFirstCharacter}
        secondCharacter={mockSecondCharacter}
      />
    );

    expect(screen.getByText("Character 1")).toBeInTheDocument();
    expect(screen.getByText("titleSharedList")).toBeInTheDocument();
    expect(screen.getByText("Character 2")).toBeInTheDocument();
  });
});
