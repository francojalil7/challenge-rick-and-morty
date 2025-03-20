export type Status = "Alive" | "Dead" | "unknown"
export type Gender = "Male" | "Female" | "unknown"
export type Species = "Human" | "Alien" | "unknown"

export interface CharacterProps {
    id: number;
    name: string;
    status: Status;
    species: Species;
    type: string;
    gender: Gender;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
  }

type Prev = number | null
export interface InfoProps {
    count: number
    pages: number
    next: string
    prev: Prev
}

export interface FetchedCharacterProps {
    info: InfoProps
    results: CharacterProps[]
}

export interface GetCharactersParams {
    page?: number;
    name?: string;
    status?: Status;
    gender?: Gender;
    species?: Species;
  }
