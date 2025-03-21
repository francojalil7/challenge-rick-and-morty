import { renderHook, waitFor } from "@testing-library/react";
import { useCharacters } from "./useCharacters";
import { getCharacters } from "../services/characters";
import { FetchedCharacterProps } from "@/types/Charactets";

jest.mock("../services/characters");

describe("useCharacters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return loading state initially", () => {
    const { result } = renderHook(() => useCharacters(1));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(false);
    expect(result.current.characters).toEqual([]);
    expect(result.current.totalPages).toBe(1);
  });

  it("should fetch characters and update state", async () => {
    const mockData: FetchedCharacterProps = {
      info: {
        count: 826,
        pages: 42,
        next: "https://rickandmortyapi.com/api/character?page=2",
        prev: null,
      },
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          origin: {
            name: "Earth (C-137)",
            url: "https://rickandmortyapi.com/api/location/1",
          },
          location: {
            name: "Citadel of Ricks",
            url: "https://rickandmortyapi.com/api/location/3",
          },
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          episode: ["https://rickandmortyapi.com/api/episode/1"],
          url: "https://rickandmortyapi.com/api/character/1",
          created: "2017-11-04T18:48:46.250Z",
        },
      ],
    };

    (getCharacters as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useCharacters(1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(false);
    expect(result.current.characters).toEqual(mockData.results);
    expect(result.current.totalPages).toBe(mockData.info.pages);
    expect(getCharacters).toHaveBeenCalledWith({ page: 1 });
  });

  it("should handle errors", async () => {
    (getCharacters as jest.Mock).mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() => useCharacters(1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
    expect(result.current.characters).toEqual([]);
    expect(getCharacters).toHaveBeenCalledWith({ page: 1 });
  });

  it("should refetch when page changes", async () => {
    const mockData1: FetchedCharacterProps = {
      info: { count: 826, pages: 42, next: "next-url", prev: null },
      results: [
        {
          id: 1,
          name: "Character 1",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          origin: { name: "Origin 1", url: "" },
          location: { name: "Location 1", url: "" },
          image: "",
          episode: [],
          url: "",
          created: "",
        },
      ],
    };

    const mockData2: FetchedCharacterProps = {
      info: { count: 826, pages: 42, next: "next-url-2", prev: "prev-url" },
      results: [
        {
          id: 2,
          name: "Character 2",
          status: "Dead",
          species: "Alien",
          type: "",
          gender: "Female",
          origin: { name: "Origin 2", url: "" },
          location: { name: "Location 2", url: "" },
          image: "",
          episode: [],
          url: "",
          created: "",
        },
      ],
    };

    (getCharacters as jest.Mock).mockResolvedValueOnce(mockData1);

    const { result, rerender } = renderHook((props = 1) =>
      useCharacters(props as number)
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.characters).toEqual(mockData1.results);
    expect(getCharacters).toHaveBeenCalledWith({ page: 1 });

    (getCharacters as jest.Mock).mockResolvedValueOnce(mockData2);
    rerender(2);

    await waitFor(() => {
      expect(result.current.characters).toEqual(mockData2.results);
    });

    expect(getCharacters).toHaveBeenCalledWith({ page: 2 });
  });
});
