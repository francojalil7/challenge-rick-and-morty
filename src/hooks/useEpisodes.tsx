import { useEffect, useState } from "react";
import { getEpisodes } from "../services/episodes";
import { EpisodeProps, FetchedEpisodeProps } from "@/types/Episodes";

interface useEpisodeProps {
  loading: boolean;
  episodes: EpisodeProps[];
  error: boolean;
}

export const useEpisodes = (episode?: string): useEpisodeProps => {
  const [episodes, setEpisodes] = useState<EpisodeProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!episode) return setEpisodes([]);
    console.log("adsjkdsajk");
    const fetch = async () => {
      try {
        const data = await getEpisodes(episode);
        const response = data as EpisodeProps[];
        console.log("🚀 ~ fetch ~ response:", [response]);

        if (Array.isArray(response)) {
          setEpisodes(response);
        } else {
          setEpisodes([response]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [episode]);

  return { loading, error, episodes };
};
