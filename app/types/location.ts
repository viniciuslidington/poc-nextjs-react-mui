export interface InfoLocationApi {
    count: number,
    pages: number,
    next: string | null,
    prev: string | null,
}

export interface LocationApi {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface LocationApiResponse {
  info: InfoLocationApi;
  results: LocationApi[];
}