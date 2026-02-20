"use client";

import Image from 'next/image'
import Link from 'next/link'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box
          component={Link}
          href="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            flexGrow: 1,
          }}
        >
          <Box sx={{mr:2, display:'flex'}}>
            <Image src="/icons/icons8-rick-sanchez.svg" alt="Logo" width={40} height={40} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 'bold'}}
            color='primary'
          >
            Rick and Morty Characterverse
          </Typography>
        </Box>
        <Box sx={{ display:'flex'}}>
          <Button color="primary" component={Link} href="/">Home</Button>
          <Button color="primary" component={Link} href="/characters">Characters</Button>
          <Button color="primary" component={Link} href="/episodes">Episodes</Button>
          <Button color="primary" component={Link} href="/locations">Locations</Button>
        </Box>
        

      </Toolbar>
    </AppBar>
  );
}

export default NavBar