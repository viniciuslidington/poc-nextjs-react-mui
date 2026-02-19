import { Button, Stack, Typography } from "@mui/material";
import {Carrossel} from "./components/home/Carrossel";

export default function Home() {
  return (
    <Stack
      spacing={4}
      sx={{
        textAlign:"center",
        alignItems:"center",
        py:4
      }}
    >
      <Stack spacing={1}>
        <Typography 
          variant="h3" 
          component="h1" 
          color="primary" 
          sx={{fontWeight:'bold'}}
        >
          Welcome to the Rick and Morty Characterverse!
        </Typography>
        <Typography 
          variant="h6" 
          component="p"
          color="text.secondary"
        >
          Explore characters, episodes, and locations from the Rick and Morty universe.
        </Typography>

      </Stack>
      <Carrossel/>
      <Stack spacing={1} sx={{textAlign:'center'}}>
        <Typography variant="h5" component="h2" color="primary">
          Dive into the Multiverse!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover your favorite characters and their adventures across dimensions.
        </Typography>
        <Button variant="contained" color="primary" href="/characters">
          Explore Characters
        </Button>
        <Typography variant="body1" color="text.secondary">
          Relive every crazy adventure and iconic moment from the series.
        </Typography>
        <Button variant="contained" color="primary" href="/episodes">
          Explore Episodes
        </Button>
        <Typography variant="body1" color="text.secondary">
          Explore bizarre planets, alternate dimensions, and strange worlds.
        </Typography>
        <Button variant="contained" color="primary" href="/locations">
          Explore Locations
        </Button>
      </Stack>
    </Stack>
  );
}
