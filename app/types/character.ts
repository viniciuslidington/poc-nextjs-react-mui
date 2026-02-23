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

export interface ApiResponseCharacter {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  },
  results: CharacterApi[],
}

export interface CharacterApiInterna {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown'; // Tipos estritos para melhor autocomplete
  species: string;
  type: string;
  gender: 'Male' | 'Female' | 'Genderless' | 'unknown';
  
  // Origin com ID numérico (diferente da API original)
  origin: {
    name: string;
    id: number; // ← Mudança: era 'url', agora é 'id'
  };
  
  // Location com ID numérico (diferente da API original)
  location: {
    name: string;
    id: number; // ← Mudança: era 'url', agora é 'id'
  };
  
  image: string;
  
  // Episodes como array de IDs (diferente da API original)
  episodes: number[]; // ← Mudança: era 'episode: string[]', agora é 'episodes: number[]'
}

export interface ApiInternaResponseCharacter {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: CharacterApiInterna[]; // ← Usa o novo tipo
}