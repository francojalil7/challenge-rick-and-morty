import { render, screen } from "@testing-library/react";
import { EpisodeList } from "./EpisodeList";
import { useEpisodes } from "@/hooks/useEpisodes";

jest.mock("@/hooks/useEpisodes");
jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("EpisodeList", () => {
  const mockEpisodes = [
    {
      id: 1,
      name: "Pilot Episode",
      air_date: "December 2, 2013",
      episode: "S01E01",
      characters: ["https://rickandmortyapi.com/api/character/1"],
      url: "https://rickandmortyapi.com/api/episode/1",
      created: "2017-11-10T12:56:33.798Z",
    },
    {
      id: 2,
      name: "Lawnmower Dog",
      air_date: "December 9, 2013",
      episode: "S01E02",
      characters: ["https://rickandmortyapi.com/api/character/1"],
      url: "https://rickandmortyapi.com/api/episode/2",
      created: "2017-11-10T12:56:33.916Z",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders empty state when select is true and no episodes", () => {
    (useEpisodes as jest.Mock).mockReturnValue({
      episodes: [],
      loading: false,
      error: false,
    });

    const config = {
      caption: "Episodes",
      data: ["1", "2"],
      select: true,
    };

    render(<EpisodeList config={config} />);

    expect(screen.getByText("noCoincidence")).toBeInTheDocument();
    expect(screen.getByText("season")).toBeInTheDocument();
    expect(screen.getByText("episodeName")).toBeInTheDocument();
    expect(screen.getByText("airDate")).toBeInTheDocument();
  });

  it("renders episodes when they are available", () => {
    (useEpisodes as jest.Mock).mockReturnValue({
      episodes: mockEpisodes,
      loading: false,
      error: false,
    });

    const config = {
      caption: "Episodes",
      data: ["1", "2"],
      select: true,
    };

    render(<EpisodeList config={config} />);

    expect(screen.getByText("S01E01")).toBeInTheDocument();
    expect(screen.getByText("S01E02")).toBeInTheDocument();
    expect(screen.getByText("December 2, 2013")).toBeInTheDocument();
    expect(screen.getByText("December 9, 2013")).toBeInTheDocument();
    expect(screen.getAllByText("2").length).toBeGreaterThan(0);
  });

  it("shows caption when select is false", () => {
    (useEpisodes as jest.Mock).mockReturnValue({
      episodes: mockEpisodes,
      loading: false,
      error: false,
    });

    const config = {
      caption: "Episodes",
      data: ["1", "2"],
      select: false,
    };

    render(<EpisodeList config={config} />);

    expect(screen.getByText("mustSelectCharacter")).toBeInTheDocument();
  });

  it("calls useEpisodes with correct parameters", () => {
    (useEpisodes as jest.Mock).mockReturnValue({
      episodes: mockEpisodes,
      loading: false,
      error: false,
    });

    const config = {
      caption: "Episodes",
      data: ["1", "2"],
      select: true,
    };

    render(<EpisodeList config={config} />);

    expect(useEpisodes).toHaveBeenCalledWith("1,2");
  });

  it("handles undefined data correctly", () => {
    (useEpisodes as jest.Mock).mockReturnValue({
      episodes: [],
      loading: false,
      error: false,
    });

    const config = {
      caption: "Episodes",
      data: undefined,
      select: true,
    };

    render(<EpisodeList config={config} />);

    expect(useEpisodes).toHaveBeenCalledWith(undefined);
    expect(screen.getByText("noCoincidence")).toBeInTheDocument();
  });
});
