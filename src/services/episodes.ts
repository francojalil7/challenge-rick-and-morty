import type { AxiosError } from "axios";
import { charactersApiInstance } from "@/config/api";
import { EpisodeProps } from "@/types/Episodes";

export const getEpisodes = async(episode?:string): Promise<EpisodeProps[] | AxiosError> => {
    try {
        const response = await charactersApiInstance.get<EpisodeProps[]>(`/episode/${episode}`);
        return response.data as EpisodeProps[];
    } catch (e) {
        throw e as AxiosError;
    }
}