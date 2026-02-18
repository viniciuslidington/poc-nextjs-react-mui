'use client'

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Pagination, 
  Grid, 
  CircularProgress,
  Container 
} from '@mui/material';
import { apiInterna } from '@/app/lib/axios';
import { CharacterApi } from '@/app/types/character';
import CharacterInfos from './CharacterInfos';

export default function CharacterList(){
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
  const fetchCharacters = async ()=>{
      setLoading(true);
      try{
        const response = await apiInterna.get('/character',{params:{page:page}});
        const { info, results } = response.data;

        setCharacters(results)
        setTotalPages(info.pages)
      }catch(error){
        console.error('Erro ao buscar personagens: ', error)
      }finally{
        setLoading(false)
      }
    };
    fetchCharacters();
    },[page]);
  
  const handleChangePage = (event:React.ChangeEvent<unknown>, value: number)=> {
    setPage(value);
    window.scrollTo({top:0, behavior: 'smooth'});
  };

  if(loading){
    return (
      <Box sx={{display:'flex', justifyContent:'center', my:10}}>
        <CircularProgress size={60}/>
      </Box>
    )
  }

  return(
    <Container maxWidth='lg'>
      <Grid container spacing={4}>
        {characters.map((char:CharacterApi)=>(
          <Grid item xs={12} sm={6} md={4} key={char.id}>
            <CharacterInfos character={char}/>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color='primary'
          size='large'
          variant='outlined'
          shape='rounded'
        />
      </Box>
    </Container>
  )


}


