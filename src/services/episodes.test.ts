import { getEpisodes } from './episodes';
import { charactersApiInstance } from '@/config/api';
import { EpisodeProps } from '@/types/Episodes';
import type { AxiosError } from 'axios';

jest.mock('@/config/api');

describe('getEpisodes', () => {
  it('should return episodes data when API call is successful', async () => {
    const mockData: EpisodeProps[] = [
      { id: 1, name: 'Pilot', air_date: 'December 2, 2013', episode: 'S01E01', characters: [], url: '', created: '' },
    ];

    (charactersApiInstance.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getEpisodes('1');
    expect(result).toEqual(mockData);
  });

  it('should throw an error when API call fails', async () => {
    const mockError: AxiosError = new Error('Network Error') as AxiosError;
    (charactersApiInstance.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getEpisodes('1')).rejects.toThrow('Network Error');
  });
});