import { Stack, Typography } from "@mui/material";
import Carrossel from "./components/Carrossel";

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
    </Stack>
  );
}
