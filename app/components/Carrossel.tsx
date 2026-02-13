"use client"

import { Character, mockCharacters } from '../types/character';
import Carousel from 'react-material-ui-carousel';
import { Box, Typography} from '@mui/material';
import CardCharacterCarrossel from './CardCharacter';


function Carrossel() {
  return(
    <Box sx={{maxWidth:800, width:'100%', margin:'0 auto'}}>
      <Typography variant='h5' color='primary' sx={{ mb:2, fontWeight:'bold', textAlign:'center'}}>
        Characters
      </Typography>
      <Carousel
        animation='fade'
        indicators={false}
        navButtonsAlwaysVisible={true}
        interval={5000}
      >
        {mockCharacters.map((character:Character)=>{
          return(
            <CardCharacterCarrossel key={character.id} item={character}/>
          )

        })}
      </Carousel>
    </Box>

  );
}

export default Carrossel