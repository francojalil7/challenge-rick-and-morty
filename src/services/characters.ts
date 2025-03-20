import type { AxiosError } from "axios";
import { FetchedCharacterProps, GetCharactersParams } from "@/types/Charactets";
import { charactersApiInstance } from "@/config/api";

export const getCharacters = async(params?: GetCharactersParams): Promise<FetchedCharacterProps | AxiosError>=> {
    try {
        const response = await charactersApiInstance.get<FetchedCharacterProps>('/character', {
            params
        });
        return response.data as FetchedCharacterProps;
    } catch (e) {
        throw e as AxiosError;
    }
}