"use client"

import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Typography} from '@mui/material';
import CardCharacterCarrossel from '../characters/CardCharacter';
import { apiInterna } from '@/app/lib/axios';
import type { CharacterApi } from '../../types/character';


export function Carrossel() {
  const [character, setCharacter] = useState<CharacterApi[]>([])

  useEffect(()=>{
    async function load() {
        const response = await apiInterna.get('character',{params:{page:1}})
        setCharacter(response.data.results)
    }

    load()
  },[])

  return(
    <Box sx={{maxWidth:800, width:'100%', margin:'0 auto'}}>
      <Typography variant='h5' color='primary' sx={{ mb:2, fontWeight:'bold', textAlign:'center'}}>
        Characters
      </Typography>
      <Carousel
        animation='fade'
        indicators={true}
        navButtonsAlwaysVisible={false}
        interval={5000}
      >
        {character.map((character:CharacterApi)=>{
          return(
            <CardCharacterCarrossel key={character.id} item={character}/>
          )

        })}
      </Carousel>
    </Box>

  );
}
