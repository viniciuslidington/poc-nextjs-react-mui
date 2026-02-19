process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { Container, Stack, Box, Typography } from '@mui/material';
import LocationList from '@/app/components/locations/LocationList';

async function LocationPage(){
  
  return (
    <Container maxWidth='lg'>
      <Stack spacing={4} sx={{my:4}}>
        <Box sx={{textAlign:'center'}}>
          <Typography variant='h5' component='h1'gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Location Gallery
          </Typography>
          <Typography variant='h6' color='text.secundary'>
            Locations where the episodes take place 
          </Typography>        
        </Box>
        <LocationList/>
      </Stack>
    </Container>
  )
}

export default LocationPage