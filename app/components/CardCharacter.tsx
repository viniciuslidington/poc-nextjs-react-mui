'use client'

import { Box, Card, CardMedia, Typography, Button } from "@mui/material"
import { Character } from "../types/character"

const CardCharacterCarrossel = ({item}:{item:Character}) => {
  return (
    <Card
      sx={{position:'relative', borderRadius:4, boxShadow:3, height:700}}
    >
      <CardMedia
        component='img'
        height="100%"
        image={item.image}
        alt={item.name}
        sx={{objectFit:'cover'}}
      />
      <Box
        sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))',
            color: 'white',
            p: 3,
            pt: 10, 
        }}
      >
        <Typography variant="h4" component="h2" sx={{fontWeight:'bold'}}>
          {item.name}
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, mb:2, color:'#4fc3f7'}}>
          {item.species} - {item.status}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
        >
          See Details
        </Button>
      </Box>
    </Card>
  )
}

export default CardCharacterCarrossel