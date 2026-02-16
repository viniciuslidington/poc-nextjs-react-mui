import axios from "axios";
import { NextRequest, NextResponse } from "next/server"

import { apiRickAndMorty } from "@/app/lib/axios";
import { extractIdFromUrl } from "@/app/lib/utils";

export async function GET(request:NextRequest, {params}: {params: Promise<{id:string}>}){

  const {id} = await params;
  if(!id){
    return NextResponse.json({error:"ID não fornecido"}, {status:400});
  }

  try{
    const response = await apiRickAndMorty.get(`/character/${id}`)

    const character = response.data;

    const filteredData = {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      type: character.type,
      gender: character.gender,
      origin: {
        name: character.origin.name,
        origin_id: extractIdFromUrl(character.origin.url) 
      },
      location: {
        name: character.location.name,
        location_id: extractIdFromUrl(character.location.url)
      },
      image: character.image,
      episodes: character.episode.map((url: string) => extractIdFromUrl(url))
    };
    
    return NextResponse.json(filteredData)

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