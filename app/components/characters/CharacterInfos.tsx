import { Card, CardContent, CardMedia, Box, Typography, Chip, Stack} from '@mui/material'
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
        transition:'transform 0.2s',
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
      <CardContent sx={{ flexGrow:1 }}>
        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'start', mb:1}}>
          <Typography variant='h6' component={'h2'} sx={{
            fontWeight:'bold', lineHeight:1.2
          }}>
            {character.name}
          </Typography>
          <Chip
            label={character.status}
            color={statusColor}
            size='small'
            variant='outlined'
          />
        </Box>
        <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              <strong>Espécie:</strong> {character.species}
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              <strong>Gênero:</strong> {character.gender}
            </Typography>

            {/* Já que mapeamos Origin e Location, vamos mostrar! */}
            <Typography variant="body2" color="text.secondary" noWrap>
              <strong>Origem:</strong> {character.origin?.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" noWrap>
               <strong>Local Atual:</strong> {character.location?.name}
            </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CharacterInfos