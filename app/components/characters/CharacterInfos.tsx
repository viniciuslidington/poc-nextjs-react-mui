import { Card, CardContent, CardMedia, Box, Typography, Chip} from '@mui/material'
import { CharacterApi } from '../../types/character';

const CharacterInfos = ({character} : {character:CharacterApi}) => {
  const statusColor =
    character.status === 'Alive' ? 'success' :
    character.status === 'Dead' ? 'error' : 'default';

  return (
    <Card 
      sx={{
        height:'100%',
        display:'flex',
        flexDirection:'column',
        transition:'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover':{
          transform:'scale(1.02)',
          boxShadow: 6,
        }
    }}>
      <CardMedia
        component='img'
        image={character.image}
        alt={character.name}
        height='300'
      />
      <CardContent sx={{ flexGrow: 12 }}>
        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'start', mb:1}}>
          <Typography variant='h6' component={'h2'} sx={{
            fontWeight:'bold', lineHeight:1.2
          }}>
            {character.name}
          </Typography>
          <Chip
            label={character.status}
            color={statusColor}
            size='medium'
            variant='outlined'
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default CharacterInfos