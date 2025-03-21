import { renderHook, waitFor } from "@testing-library/react";
import { useEpisodes } from "./useEpisodes";
import { getEpisodes } from "../services/episodes";
import { EpisodeProps } from "@/types/Episodes";

jest.mock("../services/episodes");

describe("useEpisodes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return empty episodes array when no episode is provided", () => {
    const { result } = renderHook(() => useEpisodes());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(false);
    expect(result.current.episodes).toEqual([]);
  });

  it("should fetch episodes and update state with array response", async () => {
    const mockData: EpisodeProps[] = [
      {
        id: 1,
        name: "Pilot",
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

    (getEpisodes as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useEpisodes("1,2"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(false);
    expect(result.current.episodes).toEqual(mockData);
    expect(getEpisodes).toHaveBeenCalledWith("1,2");
  });

  it("should handle single episode response", async () => {
    const mockData: EpisodeProps = {
      id: 1,
      name: "Pilot",
      air_date: "December 2, 2013",
      episode: "S01E01",
      characters: ["https://rickandmortyapi.com/api/character/1"],
      url: "https://rickandmortyapi.com/api/episode/1",
      created: "2017-11-10T12:56:33.798Z",
    };

    (getEpisodes as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useEpisodes("1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(false);
    expect(result.current.episodes).toEqual([mockData]);
    expect(getEpisodes).toHaveBeenCalledWith("1");
  });

  it("should handle errors", async () => {
    (getEpisodes as jest.Mock).mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() => useEpisodes("1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
    expect(result.current.episodes).toEqual([]);
    expect(getEpisodes).toHaveBeenCalledWith("1");
  });

  it("should refetch when episode changes", async () => {
    const mockData1: EpisodeProps[] = [
      {
        id: 1,
        name: "Pilot",
        air_date: "December 2, 2013",
        episode: "S01E01",
        characters: [],
        url: "",
        created: "",
      },
    ];

    const mockData2: EpisodeProps[] = [
      {
        id: 2,
        name: "Lawnmower Dog",
        air_date: "December 9, 2013",
        episode: "S01E02",
        characters: [],
        url: "",
        created: "",
      },
    ];

    (getEpisodes as jest.Mock).mockImplementation(() => {
      return Promise.resolve([]);
    });

    const { result, rerender } = renderHook(
      ({ episodeId }: { episodeId?: string } = {}) => useEpisodes(episodeId)
    );

    expect(result.current.episodes).toEqual([]);

    (getEpisodes as jest.Mock).mockResolvedValueOnce(mockData1);

    rerender({ episodeId: "1" });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.episodes).toEqual(mockData1);
    });

    expect(getEpisodes).toHaveBeenCalledWith("1");

    (getEpisodes as jest.Mock).mockResolvedValueOnce(mockData2);

    rerender({ episodeId: "2" });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.episodes).toEqual(mockData2);
    });

    expect(getEpisodes).toHaveBeenCalledWith("2");
  });
});
