'use client'

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Pagination, 
  Grid, 
  CircularProgress,
  Container,
  TextField 
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { apiInterna } from '@/app/lib/axios';
import { CharacterApi } from '@/app/types/character';
import CharacterInfos from './CharacterInfos';
import {
  charactersState,
  characterPageState,
  characterNameFilterState,
  characterTotalPagesState,
  characterLoadingState
} from '@/app/store/atomsCharacters';

export default function CharacterList(){
  const [inputName, setInputName] = useState("");
  
  // Estados do Recoil
  const [characters, setCharacters] = useRecoilState(charactersState);
  const [page, setPage] = useRecoilState(characterPageState);
  const [name, setName] = useRecoilState(characterNameFilterState);
  const [totalPages, setTotalPages] = useRecoilState(characterTotalPagesState);
  const [loading, setLoading] = useRecoilState(characterLoadingState);

  // Sincronizar input local com estado Recoil (debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      setName(inputName);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputName, setName]);

  // Buscar personagens
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await apiInterna.get('/character', {
          params: { page, name }
        });
        const { info, results } = response.data;

        setCharacters(results);
        setTotalPages(info.pages);
      } catch (error) {
        console.error('Erro ao buscar personagens: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page, name, setCharacters, setTotalPages, setLoading]);

  // Reseta para página 1 quando o filtro mudar
  useEffect(() => {
    setPage(1);
  }, [name, setPage]);

  // Sincronizar inputName com o estado Recoil ao montar o componente
  useEffect(() => {
    setInputName(name);
  }, [name]);
  
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
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
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            {characters.map((char: CharacterApi) => (
              <Grid key={char.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <CharacterInfos character={char} />
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
  );
}


