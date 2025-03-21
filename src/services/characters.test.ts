import { getCharacters } from './characters';
import { charactersApiInstance } from '@/config/api';
import { FetchedCharacterProps } from '@/types/Charactets';
import type { AxiosError } from 'axios';

jest.mock('@/config/api');

describe('getCharacters', () => {
  it('should return characters data when API call is successful', async () => {
    const mockData: FetchedCharacterProps = {
      info: {
        count: 826,
        pages: 42,
        next: 'https://rickandmortyapi.com/api/character?page=2',
        prev: null,
      },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          location: {
            name: 'Citadel of Ricks',
            url: 'https://rickandmortyapi.com/api/location/3',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/1'],
          url: 'https://rickandmortyapi.com/api/character/1',
          created: '2017-11-04T18:48:46.250Z',
        },
      ],
    };

    (charactersApiInstance.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getCharacters({ page: 1 });
    expect(result).toEqual(mockData);
    expect(charactersApiInstance.get).toHaveBeenCalledWith('/character', { params: { page: 1 } });
  });

  it('should return page 2 characters when page 2 is requested', async () => {
    const mockDataPage2: FetchedCharacterProps = {
      info: {
        count: 826,
        pages: 42,
        next: 'https://rickandmortyapi.com/api/character?page=3',
        prev: "https://rickandmortyapi.com/api/character?page=1",
      },
      results: [
        {
          id: 21,
          name: 'Aqua Morty',
          status: 'unknown',
          species: 'Human',
          type: 'Fish-Person',
          gender: 'Male',
          origin: {
            name: 'unknown',
            url: '',
          },
          location: {
            name: 'Citadel of Ricks',
            url: 'https://rickandmortyapi.com/api/location/3',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/21.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/10'],
          url: 'https://rickandmortyapi.com/api/character/21',
          created: '2017-11-04T22:39:48.055Z',
        },
      ],
    };

    (charactersApiInstance.get as jest.Mock).mockResolvedValue({ data: mockDataPage2 });

    const result = await getCharacters({ page: 2 });
    expect(result).toEqual(mockDataPage2);
    expect(charactersApiInstance.get).toHaveBeenCalledWith('/character', { params: { page: 2 } });
  });

  it('should throw an error when API call fails', async () => {
    const mockError: AxiosError = new Error('Network Error') as AxiosError;
    (charactersApiInstance.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getCharacters()).rejects.toThrow('Network Error');
    expect(charactersApiInstance.get).toHaveBeenCalledWith('/character', { params: undefined });
  });
});