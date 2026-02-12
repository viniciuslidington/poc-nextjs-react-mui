process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { Container, Stack, Box, Typography, Grid } from '@mui/material';
import { ApiResponse } from '../types/character';
import CharacterInfos from '../components/CharacterInfos';

async function getCharacters() {
  const res = await fetch('https://rickandmortyapi.com/api/character');

  if(!res.ok){
    throw new Error('Falha ao buscar personagens')
  }
  
  return res.json();
}

async function CharacterPage(){
  const data: ApiResponse = await getCharacters();
  
  return (
    <Container maxWidth='lg'>
      <Stack spacing={4} sx={{my:4}}>
        <Box sx={{textAlign:'center'}}>
          <Typography variant='h5' component='h1'gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Galeria de Personagens
          </Typography>
          <Typography variant='h6' color='text.secundary'>
            Mostrando os primeiros resultados do universo
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