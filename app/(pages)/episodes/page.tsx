process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { Container, Stack, Box, Typography } from '@mui/material';
import EpisodeList from '@/app/components/episodes/EpisodesList';

async function EpisodePage(){
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
        <EpisodeList/>
      </Stack>
    </Container>
  )
}

export default EpisodePage