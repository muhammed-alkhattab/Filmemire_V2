/* eslint-disable no-unused-vars */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { searchMovie } from "../../features/currentGenerOrCategory";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchToken, movie_APi, createSessionId } from "../../utills";
import { userSelector } from "../../features/auth";
import { setUser } from "../../features/auth";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  paddingleft: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar({ handleDrawerToggle }) {
  const drawerWidth = 240;
  const [query, setQuery] = React.useState("");
  const dispatch = useDispatch();
  const { user, isAuhtenticated } = useSelector(userSelector);
  const token = localStorage.getItem("token");
  const sessionId = localStorage.getItem("session_id");
  const nav = useNavigate();
  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (sessionId) {
          const { data: useData } = await movie_APi.get(
            `/account/session_id=${sessionId}`
          );
          dispatch(setUser(useData));
        } else {
          const session_Id = await createSessionId();
          const { data: useData } = await movie_APi.get(
            `/account/session_id=${session_Id}`
          );
          dispatch(setUser(useData));
        }
      }
    };
    loginUser();
  }, [token, dispatch, sessionId]);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Perform the desired action when Enter is pressed

      nav("/");
      dispatch(searchMovie(query));
      setQuery("");
    }
  };
  const handleProfile = () => {
    nav(`/profile/${user.id}`);
  };
  const handleChange = (e) => {
    const newval = e.target.value;
    setQuery(newval);
    nav('/');

    //dispatch(searchMovie(query));
  };
  React.useEffect(() => {
    const getData = setTimeout(() => {
     dispatch(searchMovie(query));
    }, 2000)

    return () => clearTimeout(getData)
  }, [dispatch, query])

  const Account = <Box display={"inline"}>
    <Typography variant="h7" sx={{display:{xs:'none'}}}>{user.username}</Typography>
    <IconButton
      size="large"
      edge="end"
      aria-label="account of current user"
      aria-haspopup="true"
      onClick={handleProfile}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
  </Box>;
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        height: "auto",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ ml: 3, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {SearchBar()}

        {!isAuhtenticated ? (
          <>
            <Button variant="contained" color="success" onClick={fetchToken}>
              LogIn
            </Button>
          </>
        ) : (
          Account
        )}
      </Toolbar>
    </AppBar>
  );

  function SearchBar() {
    return <Search sx={{ ml: { sm: 10, xs: 10 } }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={query}
        onKeyPress={handleKeyPress}
        onChange={handleChange} />
    </Search>;
  }
}
