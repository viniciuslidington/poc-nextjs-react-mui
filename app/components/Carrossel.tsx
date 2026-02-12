"use client"

import { Character, mockCharacters } from '../lib/character';
import Carousel from 'react-material-ui-carousel';
import { Box, Typography} from '@mui/material';
import CardCharacter from './CardCharacter';



function Carrossel() {
  return(
    <Box sx={{maxWidth:800, width:'100%', margin:'0 auto'}}>
      <Typography variant='h5' sx={{ mb:2, fontWeight:'bold', textAlign:'center'}}>
        Characters
      </Typography>
      <Carousel
        animation='slide'
        indicators={true}
        navButtonsAlwaysVisible={true}
        interval={5000}
      >
        {mockCharacters.map((character)=>{
          return(
            <CardCharacter key={character.id} item={character}/>
          )

        })}
      </Carousel>
    </Box>

  );
}

export default Carrossel