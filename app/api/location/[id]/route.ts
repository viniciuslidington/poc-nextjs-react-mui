process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { apiRickAndMorty } from "@/app/lib/axios";
import axios from 'axios';
import { extractIdFromUrl } from "@/app/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { LocationApi } from "@/app/types/location";


const mapLocation = (location:LocationApi) => ({
  id: location.id,
  name: location.name,
  type: location.type,
  dimension: location.dimension,
  residents: location.residents.map((resident)=> extractIdFromUrl(resident)),
})

export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}){
  try{
    const {id} = await params;
    if (!id) return NextResponse.json({error:"ID não fornecido"},{status:400})

    const response = await apiRickAndMorty.get(`/location/${id}`)
    const episodes = response.data;

    if (Array.isArray(episodes)){
      const filteredLocation = episodes.map((loc)=> mapLocation(loc))
      return NextResponse.json(filteredLocation)
    }

    const filteredLocation = mapLocation(episodes)
    return NextResponse.json(filteredLocation)

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