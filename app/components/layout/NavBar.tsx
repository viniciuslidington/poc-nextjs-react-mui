"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Characters", href: "/characters" },
    { label: "Episodes", href: "/episodes" },
    { label: "Locations", href: "/locations" },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: "bold" }}>
        Rick And Morty
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon/>
          </IconButton>

          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              flexGrow: 1,
            }}
          >
            <Box sx={{ mr: 2, display: "flex" }}>
              <Image
                src="/icons/icons8-rick-sanchez.svg"
                alt="Logo"
                width={40}
                height={40}
              />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: "bold" }}
              color="inherit"
            >
              Rick and Morty Characterverse
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {navItems.map((i) => (
              <Button
                key={i.label}
                color="inherit"
                component={Link}
                href={i.href}
              >
                {i.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Toolbar/>
    </>
  );
};

export default NavBar;
