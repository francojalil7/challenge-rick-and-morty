import { useEffect, useState } from "react";
import { getCharacters } from "../services/characters";
import { CharacterProps, FetchedCharacterProps } from "@/types/Charactets";

interface useCharacterProps {
  loading: boolean;
  characters: CharacterProps[];
  error: boolean;
  totalPages: number;
}

export const useCharacters = (page: number): useCharacterProps => {
  const [characters, setCharacters] = useState<CharacterProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCharacters({ page });
        const response = data as FetchedCharacterProps;
        setTotalPages(response.info.pages);
        setCharacters(response.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [page]);

  return { loading, error, characters, totalPages };
};
