process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { apiRickAndMorty } from "@/app/lib/axios";
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import { extractIdFromUrl } from "@/app/lib/utils";
import { Episode } from '../../types/episodes';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());

  try {
    const response = await apiRickAndMorty.get('/episode', { params });
    const { info, results } = response.data;

    const filteredResults = results.map((ep: Episode) => ({
      id: ep.id,
      name: ep.name,
      air_date: ep.air_date,
      episode: ep.episode,
      characters: ep.characters.map((url: string) => extractIdFromUrl(url))
    }));

    return NextResponse.json({ 
      info, 
      results: filteredResults})

  } catch (error) {
    console.error('[GET_EPISODES_ERROR]:', error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.error || 'Erro ao buscar episódios na API externa';
      return NextResponse.json({ error: message }, { status });
    }

    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}