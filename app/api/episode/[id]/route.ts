process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { apiRickAndMorty } from "@/app/lib/axios";
import axios from 'axios';
import { extractIdFromUrl } from "@/app/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { Episode } from "@/app/types/episodes";

const mapEpisode = (episode:Episode) => ({
  id: episode.id,
  name: episode.name,
  air_date: episode.air_date,
  episode: episode.episode,
  characters: episode.characters.map((url:string)=> extractIdFromUrl(url))
})


export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}){
  try{
    const {id} = await params;
    if (!id) return NextResponse.json({error:"ID não fornecido"},{status:400})

    const response = await apiRickAndMorty.get(`/episode/${id}`)
    const episodes = response.data;

    if (Array.isArray(episodes)){
      const filteredEpisodes = episodes.map((ep)=> mapEpisode(ep))
      return NextResponse.json(filteredEpisodes)
    }

    const filterdEpisodes = mapEpisode(episodes)
    return NextResponse.json(filterdEpisodes)

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