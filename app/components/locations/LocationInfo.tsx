import { LocationApi } from '@/app/types/location';
import { CardContent, Card, Box, Typography, Chip, Stack } from '@mui/material';


const LocationInfos = ({location}:{location:LocationApi}) => {
  return (
    <Card
      sx={{
        heigth:'100%',
        display:'flex',
        flexDirection:'column',
        transition:'transform 0.2s',
        '&:hover':{
          transform:'scale(1.02)',
          boxShadow: 6,
        }
      }}
    >
      <CardContent sx={{flexGrow:1}}>
        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'start', mb:1}}>
          <Typography variant='h6' component={'h2'} sx={{fontWeight:'bold', lineHeight:1.2}}>
            {location.name}
          </Typography>
          <Chip 
            label={location.type}
            color='primary'
            size='small'
            variant='outlined'
          />
        </Box>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            <strong>Dimension:</strong> {location.dimension}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            <strong>Creatures living there:</strong> {location.residents.length}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default LocationInfos