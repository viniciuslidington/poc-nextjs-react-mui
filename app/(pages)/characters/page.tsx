process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { Container, Stack, Box, Typography, Grid } from '@mui/material';
import { ApiResponseCharacter } from '../../types/character';
import CharacterInfos from '../../components/characters/CharacterInfos';

async function getCharacters() {
  const res = await fetch('https://rickandmortyapi.com/api/character');

  if(!res.ok){
    throw new Error('Falha ao buscar personagens')
  }
  
  return res.json();
}

async function CharacterPage(){
  const data: ApiResponseCharacter = await getCharacters();
  
  return (
    <Container maxWidth='lg'>
      <Stack spacing={4} sx={{my:4}}>
        <Box sx={{textAlign:'center'}}>
          <Typography variant='h5' component='h1'gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Characters Gallery
          </Typography>
          <Typography variant='h6' color='text.secundary'>
            The universe of characters of Rick and Morty is vast and diverse, with a wide range of personalities, backgrounds, and stories. From the genius scientist Rick Sanchez to the adventurous Morty Smith, each character brings a unique flavor to the show. Explore their journeys, relationships, and the multiverse they inhabit in this comprehensive gallery.
          </Typography>        
        </Box>
        <Grid container spacing={3}>
          {data.results.map((data)=>
            <Grid 
                key={data.id} 
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <CharacterInfos character={data}/>
            </Grid>

          )}
        </Grid>

      </Stack>
    </Container>
  )
}

export default CharacterPage