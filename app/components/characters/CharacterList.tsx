'use client'

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Pagination, 
  CircularProgress,
  Container,
  TextField 
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { apiInterna } from '@/app/lib/axios';
import { CharacterApi } from '@/app/types/character';
import CharacterInfos from './CharacterInfos';

export default function CharacterList(){
  const [inputName, setInputName] = useState("")
  const [name, setName] = useState("")
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setName(inputName);
    }, 500 );

    return () => clearTimeout(timer);
  }, [inputName])

  useEffect(()=> {
  const fetchCharacters = async ()=>{
      setLoading(true);
      try{
        const response = await apiInterna.get('/character',{params:{page:page,name:name}});
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
    },[page, name]);

  // Reseta para página 1 quando o filtro de nome mudar
  useEffect(() => {
    setPage(1);
  }, [name]);
  
  const handleChangePage = (event:React.ChangeEvent<unknown>, value: number)=> {
    setPage(value);
    window.scrollTo({top:0, behavior: 'smooth'});
  };

  return(
    <Container maxWidth='lg'>
      <Box sx={{ mb: 4, mt: 2 }}>
        <TextField
          fullWidth
          label="Filter by name"
          variant="outlined"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Digite o nome do personagem..."
        />
      </Box>

      {loading ? (
        <Box sx={{display:'flex', justifyContent:'center', my:10}}>
          <CircularProgress size={60}/>
        </Box>
      ):(
        <>
          <Grid container spacing={4}>
            {characters.map((char:CharacterApi)=>(
              <Grid key={char.id} size={{ xs: 12, sm: 6, md: 4 }} >
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
        </>
      )}
    </Container>
  )

}


