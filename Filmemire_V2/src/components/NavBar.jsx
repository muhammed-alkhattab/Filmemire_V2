/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";


import Box from "@mui/material/Box";
import genresIcons from "../assets/genres";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";

import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@mui/material";

import Toolbar from "@mui/material/Toolbar";

import { useGetGenresQuery } from "../services/TMDB";
import {  ListSubheader } from "@mui/material";
import { useDispatch } from "react-redux";
import { selectGenreOrCategory } from "../features/currentGenerOrCategory";
import SearchAppBar from "./search/Search";
const drawerWidth = 240;
const blueLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const NavBar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const [selectedGenre, setSelectedGenre] = React.useState(null);
  const categories = [
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
  ];
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { data } = useGetGenresQuery();
  const dispatche = useDispatch();
  const handleGenresQuery = (id) => {
    
    dispatche(selectGenreOrCategory(id))
    setSelectedGenre(id);

  };
  const GenresList = (
    <List>
      <ListSubheader>{"genres".toUpperCase()}</ListSubheader>
      {data?.genres.map(({ id, name }) => (
        
        <Link
          key={name}
          to={"/"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem key={id} disablePadding>
          <ListItemButton
        onClick={() => handleGenresQuery(id)}
        sx={{
          backgroundColor: selectedGenre === id ? "lightblue" : "transparent",
          transition: "background-color 0.3s ease",
        }}
        className={(selectedGenre === id)? "active" : "disabled"}
      >
            
              
              <ListItemIcon>
                <img
                  src={genresIcons[name.toLowerCase()]}
                  height={30}
                  width={30}
                />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        </Link>
    
   
      ))}
    </List>
  );
  const CategaryList = (
    <List>
      {categories.map(({ label, value }) => (
        <Link
          key={label}
          to={"/"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => dispatche(selectGenreOrCategory(value))}
            >
              <ListItemIcon>
                <img
                  src={genresIcons[label.toLowerCase()]}
                  height={30}
                  width={20}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
  const drawer = (
    <div>
      <Toolbar >
        <Box justifyContent={"center"} alignItems={"center"} sx={{overflow:'hidden'}}  >
          <Link to={"/"} >
            <img
              src={blueLogo}
              width={200}
              height={100}
              style={{ margin: 0, padding: 0 }}
            />
          </Link>
        </Box>
      </Toolbar>
      <Divider />
      <ListSubheader>{"categories".toUpperCase()}</ListSubheader>
      {CategaryList}
      <Divider />
      {GenresList}
    </div>
  );


  return (
    <Box sx={{width:{ sm:drawerWidth}}}>
      <SearchAppBar handleDrawerToggle={handleDrawerToggle} />
      <Box
    component="nav"
    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    aria-label="mailbox folders"
  >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={undefined}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Toolbar />
    </Box>
  );
};


export default NavBar;
