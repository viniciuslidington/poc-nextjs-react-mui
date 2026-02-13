process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { apiRickAndMorty } from "@/app/lib/axios";
import { NextResponse } from "next/server";
import axios from 'axios';

export async function GET(request: Request) {
  try{
    
    const { searchParams } = new URL(request.url)
    const params = Object.fromEntries(searchParams.entries());

    const response = await apiRickAndMorty.get('/character', { params:params});

    return NextResponse.json(response.data);
    
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