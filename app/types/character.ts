export interface Character {
  id:number;
  name:string;
  image:string;
  status:string;
  species:string;
}

export interface CharacterApi {
  id: number;
  name: string;
  status: string; // Poderia ser 'Alive' | 'Dead' | 'unknown' para ser mais estrito
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[]; // Array de strings (URLs)
  url: string;
  created: string;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  },
  results: CharacterApi[],
}

export const mockCharacters: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    status: "Alive",
    species: "Human"
  },
  {
    id: 2,
    name: "Morty Smith",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    status: "Alive",
    species: "Human"
  },
  {
    id: 3,
    name: "Summer Smith",
    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    status: "Alive",
    species: "Human"
  },
  {
    id: 4,
    name: "Beth Smith",
    image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
    status: "Alive",
    species: "Human"
  }
];