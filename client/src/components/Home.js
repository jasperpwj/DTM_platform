import React, {useState, useEffect}from "react";
import TopNavBar from "./navigation/TopNavBar";
import UnauthNavBar from "./navigation/UnauthNavBar";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
const authService = require("../services/auth.service");

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        // backgroundColor: "lightgrey",
    },

    content: {
        flexGrow: 1,
        marginTop: theme.spacing(8),
        padding: theme.spacing(2),
        backgroundColor: "yellow",

    },
}));


export default function Home(props) {
    const classes = useStyles();

    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(()=> {
        let currentUser = authService.getCurrentUser();
        if(currentUser) {
            setIsAuthenticated(true)
        }
    },[isAuthenticated]);


    const navBarInfo = {
        title: "Home"
    };
    const navInfo = {
        button: "home"
    };
    return (
        <div className={classes.root}>
            <main className={classes.content}>
                {(isAuthenticated)? (<div/>):(<UnauthNavBar info = {navInfo} />)}
                <div className={classes.toolbar}>
                    <Typography paragraph>
                        This is home page
                    </Typography>
                </div>
            </main>

        </div>
    )
}