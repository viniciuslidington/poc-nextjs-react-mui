process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { Container, Stack, Box, Typography, Grid } from '@mui/material';
import { LocationApiResponse } from '../../types/location';
import LocationInfos from '../../components/locations/LocationInfo';

async function getLocation() {
  const res = await fetch('https://rickandmortyapi.com/api/location');

  if(!res.ok){
    throw new Error('Error searching episodes')
  }
  return res.json();
}


async function LocationPage(){
  const data: LocationApiResponse = await getLocation();
  
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
        <Grid container spacing={3}>
          {data.results.map((location)=>
            <Grid 
              key={location.id} 
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <LocationInfos location={location}/>
            </Grid>
          )}
        </Grid>
      </Stack>
    </Container>
  )
}

export default LocationPage