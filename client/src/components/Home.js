import React, {useState, useEffect}from "react";
import TopNavBar from "./TopNavBar";
import UnauthNavBar from "./navigation/UnauthNavBar";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

    content: {
        flexGrow: 1,
        marginTop: theme.spacing(8),
        padding: theme.spacing(2),

    },
}));


export default function Home() {
    const classes = useStyles();
    const [email] = useState(window.sessionStorage.getItem("userEmail"));
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(()=> {
        if(email) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

    },[email]);

    const navBarInfo = {
        title: "Home"
    };
    console.log(window.sessionStorage.getItem("userEmail"));
    console.log(isAuthenticated);
    return (
        <div className={classes.root}>
            {isAuthenticated? (<TopNavBar navInfo={navBarInfo}/>) : (<UnauthNavBar/>)}
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Typography paragraph>
                        This is home page
                    </Typography>
                </div>
            </main>

        </div>
    )
}