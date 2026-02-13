process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { Container, Stack, Box, Typography, Grid } from '@mui/material';
import { ApiResponseEpisodes } from '../../types/episodes';
import EpisodesInfos from '@/app/components/episodes/EpisodesInfos';

async function getEpisodes() {
  const res = await fetch('https://rickandmortyapi.com/api/episode');

  if(!res.ok){
    throw new Error('Error searching episodes')
  }

  return res.json();
}


async function EpisodePage(){
  const data: ApiResponseEpisodes = await getEpisodes();
  
  return (
    <Container maxWidth='lg'>
      <Stack spacing={4} sx={{my:4}}>
        <Box sx={{textAlign:'center'}}>
          <Typography variant='h5' component='h1'gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Episodes Gallery
          </Typography>
          <Typography variant='h6' color='text.secundary'>
            The universe of episodes of Rick and Morty, each one better than the other, with a wide range of adventures, humor, and unexpected twists. From the interdimensional travels of Rick and Morty to the hilarious escapades of the Smith family, each episode offers a unique blend of science fiction, comedy, and social commentary. Explore the multiverse through these unforgettable episodes that have captivated audiences worldwide.
          </Typography>        
        </Box>
        <Grid container spacing={3}>
          {data.results.map((episode)=>
            <Grid 
              key={episode.id} 
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <EpisodesInfos episode={episode}/>
            </Grid>
          )}
        </Grid>
      </Stack>
    </Container>
  )
}

export default EpisodePage