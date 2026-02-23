"use client"
import React, { useEffect, useState } from 'react';
import { Box, Container, CircularProgress, Pagination  } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { apiInterna } from "@/app/lib/axios";
import type { Episode } from "@/app/types/episodes";
import EpisodesInfos from './EpisodesInfos';

export default function EpisodeList(){
  const [episode, setEpisode] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const featchEpisodes = async ()=>{
      setLoading(true);

      try{
        const response = await apiInterna.get('/episode',{params:{page:page}});
        const { info, results } = response.data;

        setEpisode(results)
        setTotalPages(info.pages)
      }catch(error){
        console.error('Erro ao buscar episodes: ', error)
      }finally{
        setLoading(false)
      }
    }
    featchEpisodes();
    },[page])

  const handleChangePage = (event:React.ChangeEvent<unknown>, value: number)=>{
    setPage(value);
    window.scrollTo({top:0, behavior:'smooth'})
  }

  if(loading){
    return (
      <Box sx={{display:'flex',justifyContent:'center', my:10}}>
        <CircularProgress size={60}/>
      </Box>
    )
  }

  return(
    <Container maxWidth='lg'>
      <Grid container spacing={4}>
        {episode.map((ep:Episode)=>(
          <Grid key={ep.id} size={{xs: 12, sm: 6, md: 4}}>
            <EpisodesInfos episode={ep}/>
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
