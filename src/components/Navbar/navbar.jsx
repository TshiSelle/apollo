import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import jslogo from "../../assets/javascript-svgrepo-com.svg";
import "./nav.css";
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";


const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const initialState = {
    "/": "var(--color-white)",
    "/Pages": "var(--color-white)",
    "/aboutUs": "var(--color-white)",
    "/blog": "var(--color-white)",
    "/contactUs" : "var(--color-white)",
  };

  
  let navigate = useNavigate();

  const [linkstate, setLinkstate] = useState(initialState);

  const changelinkColor = (x) => {
    handleCloseNavMenu();
    setLinkstate({
      ...initialState,
      [x]: "var(--color-primary)",
      
    });
    
    navigate(x , { replace: true });

  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [navcolor, setNavcolor] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setNavcolor(true);
    } else {
      setNavcolor(false);
    }
  };
  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener('scroll', changeBackground);
  });

  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: navcolor ? "var(--color-secondary)" : "black" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => changelinkColor("/")}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img src={jslogo} className="jslogo" />
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem  onClick={() => changelinkColor("/")}>
                <Typography  textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={() => changelinkColor("/Pages")}>
                <Typography textAlign="center">Pages</Typography>
              </MenuItem>
              <MenuItem onClick={() => changelinkColor("/aboutUs")}>
                <Typography textAlign="center">About Us</Typography>
              </MenuItem>
              <MenuItem onClick={() => changelinkColor("/blog")}>
                <Typography textAlign="center">Blog</Typography>
              </MenuItem>
              <MenuItem onClick={() => changelinkColor("/contactUs")}>
                <Typography textAlign="center">ContactUs</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={jslogo} className="jslogo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/" onClick={() => changelinkColor("/")}>
              <Button sx={{ my: 2, color: linkstate["/"], display: "block" }}>
                Home
              </Button>
            </Link>
            <Link to="/Pages" onClick={() => changelinkColor("/Pages")}>
              <Button
                sx={{ my: 2, color: linkstate["/Pages"], display: "block" }}
              >
                Pages
              </Button>
            </Link>
           
            <Link to="/blog" onClick={() => changelinkColor("/blog")}>
              <Button
                sx={{ my: 2, color: linkstate["/blog"], display: "block" }}
              >
                Blog
              </Button>
              
            </Link>
            <Link to="/aboutUs" onClick={() => changelinkColor("/aboutUs")}>
              <Button
                sx={{ my: 2, color: linkstate["/aboutUs"], display: "block" }}
              >
                About Us
              </Button>
            </Link>
            <Link to="/contactUs" onClick={() => changelinkColor("/contactUs")}>
              <Button
                sx={{ my: 2, color: linkstate["/contactUs"], display: "block" }}
              >
                Contact Us
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
