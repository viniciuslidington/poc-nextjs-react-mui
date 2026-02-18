process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { apiRickAndMorty } from "@/app/lib/axios";
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import { extractIdFromUrl } from "@/app/lib/utils";
import { LocationApi } from "@/app/types/location";

export async function GET(request: NextRequest) {
  try{
    
    const { searchParams } = new URL(request.url)
    const params = Object.fromEntries(searchParams.entries());

    const response = await apiRickAndMorty.get('/location', { params:params});
    const { info, results } = response.data;

    const filteredResults = results.map((location: LocationApi) => ({
      id: location.id,
      name: location.name,
      type: location.type,
      dimension: location.dimension,
      residents: location.residents.map((resident)=> extractIdFromUrl(resident)),
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