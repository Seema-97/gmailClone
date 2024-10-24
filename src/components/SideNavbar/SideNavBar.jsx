import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import logo from "../../images/logo.png";
import "./SideNavBar.css";
import { Routes, useNavigate, Route } from "react-router-dom";
import { Button } from "@mui/material";
import Create from "../../pages/Create/Create";
import Gmail from "../../pages/Gmail/Gmail";
import InboxPage from "../../pages/InboxPage/InboxPage";
import Starred from "../../pages/Starred/Starred";
import SendEmail from "../../pages/SendEmail/SendEmail";
import AllMails from "../../pages/AllMails/AllMails";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import Edit from "@mui/icons-material/Edit";
import ModalComponent from "../ModalComponent/ModalComponent";
import MailView from "../../pages/MailView/MailView";
import { useMyContext } from "../../context/context";
import Trash from "../../pages/Trash/Trash";

const drawerWidth = 240;
const pages = [
  {
    pathName: "Gmail",
    routeLink: "/",
  },

  {
    pathName: "Create",
    routeLink: "/create",
  },
];

const sideNavMenuIconsTop = [
  <InboxIcon className="list-item-icon" />,
  <StarOutlineIcon className="list-item-icon" />,
  <SendOutlinedIcon className="list-item-icon" />,
  <EmailIcon className="list-item-icon" />,
  <DeleteIcon className="list-item-icon" />,
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(10)} + 10px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 10px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100%)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        // ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        // ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function SideNavbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isMenuIconClicked, setIsMenuIconClicked] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const myContextUse = useMyContext();
  const { mailViewOpen , setMailViewOpen} = myContextUse;

  console.log(mailViewOpen);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();

  const handleRoute = (path) => {
    navigate(path);
  };

  const toggleIsMenuIconClicked = () => {
    setIsMenuIconClicked((prev) => !prev);
  };

  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }} className="main-container">
      <CssBaseline />
      <AppBar position="fixed" open={open} className="header">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              toggleDrawer();
              toggleIsMenuIconClicked();
              console.log(isMenuIconClicked);
            }}
            edge="start"
            sx={[
              {
                marginRight: 4,
                color: "rgb(82,82,82)",
              },
            ]}
          >
            <MenuIcon />
          </IconButton>

          <Box nowrap="true" component="div" sx={{ display: "flex" }}>
            <img src={logo} width={"40px"} className="logo-icon" />

            <Box
              id="menu-appbar"
              sx={{ display: "flex", color: "rgb(82,82,82) " }}
            >
              {pages.map((page) => (
                <Button
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  nowrap="true"
                  sx={{
                    mr: 2,
                    fontWeight: 500,
                    color: "rgb(82,82,82) ",
                    textDecoration: "none",
                    fontSize: "20px",
                  }}
                  key={page.pathName}
                  onClick={() => {
                    handleRoute(page.routeLink);
                  }}
                >
                  {page.pathName}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className="drawer-container">
        <Drawer variant="permanent" open={open} className="drawer">
          <DrawerHeader className="drawer"></DrawerHeader>

          <Button
            variant="contained"
            className="compose-button"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "width 0.1s ease", // smooth transition for width change
            }}
            onClick={handleModalOpen}
            onMouseEnter={() => {
              if (!isMenuIconClicked) {
                handleDrawerOpen();
              }
            }}
            onMouseLeave={() => {
              if (!isMenuIconClicked) {
                handleDrawerClose();
              }
            }}
          >
            <Edit
              sx={{
                minWidth: 0,
                justifyContent: "center",
                marginRight: open ? 1 : 0, // Space when open, center when closed
              }}
            />
            <Typography
              sx={{
                display: open ? "block" : "none", // Completely hide the text when closed
              }}
            >
              Compose
            </Typography>
          </Button>

          <ModalComponent open={modalOpen} handleClose={handleModalClose} />

          <List className="side-nav-list">
            {[
              "Inbox",
              "Starred",
              "Sent",
              "All Mails",
              "Trash",
            ].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? "initial" : "center",
                  }}
                  onClick={() => {
                    handleRoute(text.toLowerCase());
                    setMailViewOpen(false)
                  }}
                  onMouseEnter={() => {
                    if (!isMenuIconClicked) {
                      handleDrawerOpen();
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMenuIconClicked) {
                      handleDrawerClose();
                    }
                  }}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: "auto",
                          },
                    ]}
                  >
                    {sideNavMenuIconsTop[index]}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                    ]}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "margin 0.3s ease",
        }}
        className={isMenuIconClicked ? "main-section-0" : "main-section-140"}
      >
        <DrawerHeader />
        <Routes>
          {mailViewOpen ? (
            <Route path="/mail view" element={<MailView />} />
          ) : (
            <>
              <Route path="/" element={<Gmail />} />
              <Route path="/create" element={<Create />} />
              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/starred" element={<Starred />} />
              <Route path="/sent" element={<SendEmail />} />
              <Route path="/all mails" element={<AllMails />} />
              <Route path='/trash' element= {<Trash/>} />
            </>
          )}
        </Routes>
      </Box>
    </Box>
  );
}
