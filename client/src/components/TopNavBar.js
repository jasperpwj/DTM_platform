import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import Divider from "@material-ui/core/Divider";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import FolderRoundedIcon from '@material-ui/icons/FolderRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import Link from "@material-ui/core/Link";

const drawerWidth = 200;

const useStyle = makeStyles((theme) => ({
    topBar: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },

}));

export default function TopNavBar(props) {
    const classes = useStyle();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        window.sessionStorage.setItem("userEmail", null);
    };

    return (
        <div className={classes.topBar}>
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleOpen}
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {props.navInfo.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant='permanent'
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolBar}>
                    <IconButton onClick={handleClose}>
                        <ChevronLeftIcon/>
                    </IconButton>

                </div>
                <Divider />
                <List>
                    <Link href='/'>
                        <ListItem button key='home'>
                            <ListItemIcon><HomeRoundedIcon /> </ListItemIcon>
                            <ListItemText primary='Home' />
                        </ListItem>
                    </Link>
                    <Link href='/account'>
                        <ListItem button key='account'>
                            <ListItemIcon><AccountBoxRoundedIcon /> </ListItemIcon>
                            <ListItemText primary='Account' />
                        </ListItem>
                    </Link>
                    <Link href='/projects'>
                        <ListItem button key='projects'>
                            <ListItemIcon><FolderRoundedIcon /> </ListItemIcon>
                            <ListItemText primary='Projects' />
                        </ListItem>
                    </Link>
                    <Link href='/dashboard'>
                        <ListItem button key='dashboard'>
                            <ListItemIcon><DashboardRoundedIcon /> </ListItemIcon>
                            <ListItemText primary='Dashboard' />
                        </ListItem>
                    </Link>
                    <Divider/>
                    <ListItem button key='logout' onClick={handleLogout}>
                        <ListItemIcon><ExitToAppRoundedIcon /> </ListItemIcon>
                        <ListItemText primary='Logout' />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}