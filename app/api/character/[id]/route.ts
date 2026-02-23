process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import axios from "axios";
import { NextRequest, NextResponse } from "next/server"

import { apiRickAndMorty } from "@/app/lib/axios";
import { extractIdFromUrl } from "@/app/lib/utils";
import { CharacterApi } from "@/app/types/character";

const mapCharacter = (char: CharacterApi) => ({
  id: char.id,
  name: char.name,
  status: char.status,
  species: char.species,
  type: char.type,
  gender: char.gender,
  origin: {
    name: char.origin.name,
    origin_id: extractIdFromUrl(char.origin.url)
  },
  location: {
    name: char.location.name,
    location_id: extractIdFromUrl(char.location.url)
  },
  image: char.image,
  episode: char.episode.map((url: string) => extractIdFromUrl(url))
});

export async function GET(request:NextRequest, {params}: {params: Promise<{id:string}>}){

  const {id} = await params;
  if(!id){
    return NextResponse.json({error:"ID não fornecido"}, {status:400});
  }

  try{
    const response = await apiRickAndMorty.get(`/character/${id}`)
    const character = response.data;

    if (Array.isArray(character)){
      const filteredData = character.map((char)=> mapCharacter(char));
      return NextResponse.json(filteredData)
    }
    
    const filteredData = mapCharacter(character);
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