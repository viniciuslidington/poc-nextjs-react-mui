// 1. Informações de paginação (reutilizável para outras rotas da API)
export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

// 2. Estrutura de um Episódio individual
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[]; // Lista de URLs (endpoints) dos personagens
  url: string;
  created: string; // Pode ser Date se você pretender converter o valor
}

// 3. Interface da Resposta Principal (Root Object)
export interface ApiResponseEpisodes {
  info: ApiInfo;
  results: Episode[];
}

export interface InternalResponseEp {
  id: number,
  name: string,
  air_date: string,
  episode: string,
  characters: string[]
}