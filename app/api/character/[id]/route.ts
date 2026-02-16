import axios from "axios";
import { NextRequest, NextResponse } from "next/server"

import { apiRickAndMorty } from "@/app/lib/axios";

export async function GET(request:NextRequest, {params}: {params: Promise<{id:string}>}){

  const {id} = await params;

  try{
    const response = await apiRickAndMorty.get(`/character/${id}`)

    return NextResponse.json(response.data)

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