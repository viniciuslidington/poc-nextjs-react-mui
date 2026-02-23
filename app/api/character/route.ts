process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { apiRickAndMorty } from "@/app/lib/axios";
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import { extractIdFromUrl } from "@/app/lib/utils";
import { CharacterApi } from '../../types/character';

export async function GET(request: NextRequest) {
  try{
    
    const { searchParams } = new URL(request.url)
    const params = Object.fromEntries(searchParams.entries());

    const response = await apiRickAndMorty.get('/character', { params:params});
    const { info, results } = response.data;

    const filteredResults = results.map((character: CharacterApi) => ({
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        type: character.type,
        gender: character.gender,
        origin: {
          name: character.origin.name,
          id: extractIdFromUrl(character.origin.url)
        },
        location: {
          name: character.location.name,
          id: extractIdFromUrl(character.location.url)
        },
        image: character.image,
        episode: character.episode.map((url: string) => extractIdFromUrl(url))
    }));

    return NextResponse.json({info,
      results: filteredResults
    });
    
  }catch(error){
    console.error('Internal Error', error);
    
    if (axios.isAxiosError(error)){
      const status = error.response?.status || 500;

      const message = error.response?.data?.error || 'Erro ao buscar personagens na API externa';
      return NextResponse.json({ error: message }, { status });
    }

    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}