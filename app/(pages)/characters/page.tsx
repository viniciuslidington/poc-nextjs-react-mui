process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { Container, Stack, Box, Typography } from '@mui/material';
import CharacterList from '@/app/components/characters/CharacterList';

async function CharacterPage(){
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
        <CharacterList/>
      </Stack>
    </Container>
  )
}

export default CharacterPage