'use client'
import { apiInterna } from '@/app/lib/axios';
import { LocationApi } from '@/app/types/location';
import { Box, CircularProgress, Container, Grid, Pagination } from '@mui/material';
import React, { useState, useEffect } from 'react';
import LocationInfos from './LocationInfo';

export default function LocationList(){
  const [location, setLocation] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchLocation = async() => {
      try{
        const response = await apiInterna.get('location', {params:{page:page}});
        const { info, results } = response.data;

        setLocation(results)
        setPageLimit(info.pages)
      }catch(e){
        console.error('Erro ao fetch locations', e)
      }finally{
        setLoading(false)
      }
    }
    fetchLocation();
    },[page])

  const handleChangePage = (event:React.ChangeEvent<unknown>, value: number)=>{
    setPage(value);
    window.scrollTo({top:0,behavior:'smooth'})
  }
  if(loading){
    return (
      <Box sx={{display:'flex',justifyContent:'center', my:10}}>
        <CircularProgress size={60}/>
      </Box>
    )
  }
  return (
    <Container maxWidth='lg'>
      <Grid container spacing={4}>
        {location.map((loc:LocationApi)=>(
          <Grid key={loc.id} size={{xs: 12, sm: 6, md: 4}}>
            <LocationInfos location={loc} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 4 }}>
        <Pagination
          count={pageLimit}
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

