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
        backgroundColor: "red",

    },
}));


export default function NotFoundPage(props) {
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
                    <h2>404: Page Not Found</h2>
                </div>
            </main>

        </div>
    )
}