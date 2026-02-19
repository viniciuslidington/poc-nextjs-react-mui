import { Card, CardContent, Box, Typography, Stack} from '@mui/material'
import { Episode } from '../../types/episodes'

const EpisodesInfos = ({episode}:{episode:Episode}) => {
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
      <CardContent sx={{flexGrow:1}}>
        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'start', mb:1}}>
          <Typography variant='h6' component={'h2'} sx={{fontWeight:'bold', lineHeight:1.2}}>
            {episode.name}
          </Typography>
        </Box>
        <Stack spacing={1}>
          <Typography variant='body2' color='text.secondary'>
            <strong>Air date:</strong> {episode.air_date}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <strong>Episode Code:</strong> {episode.episode}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <strong>Characters in this Episode:</strong> {episode.characters.length}
          </Typography>
        </Stack>
      </CardContent>

     
    </Card>
  )
}

export default EpisodesInfos