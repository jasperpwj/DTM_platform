import React, {useState, useEffect}from "react";
import UnauthNavBar from "./navigation/UnauthNavBar";
import {makeStyles,ThemeProvider} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Background from '../bkg.jpg';
import test from '../home.gif';
import Grid from "@material-ui/core/Grid";


const authService = require("../services/auth.service");

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        marginBottom: theme.spacing(0),
        minWidth:1500
    },
    content: {
        flexGrow: 1,
        marginTop: theme.spacing(8),
        padding: theme.spacing(2),
    },
    time: {
        marginTop: theme.spacing(2),
    },
    paper: {
        margin: theme.spacing(10),
        width: 500,
        height: 500,
        fontSize: '50px',
        fontFamily: 'Old Times American',
    },
    media: {
        height: 140,
    }
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
    const navInfo = {
        button: "home"
    };
    // get date
    let sep = "-";
    let date = new Date();
    let year = date.getFullYear(); 
    let month = date.getMonth() + 1; 
    let day = date.getDate(); 
    if (month <= 9) {
        month = "0" + month;
    }
    if (day <= 9) {
        day = "0" + day;
    }
    let currentDate = year + sep + month + sep + day;
    return (
        <div className={classes.root} >
            <Grid className={classes.content}>
                {(isAuthenticated)? (<div/>):(<UnauthNavBar info = {navInfo} />)}
                <Grid container justify='center'>
                    <Grid  item xs={12} className={classes.time}>
                        <Typography variant="h3" align='center'> Today: {currentDate}</Typography>
                    </Grid>
                    <Grid container item xs={12} justify='center'>
                        <Paper elevation={20} className={classes.paper}>
                            <br/>
                            <Typography variant="h3" component="h2">What is DTM ?</Typography>
                            <br/>
                            <Typography variant="h6" component="p">more interactive,</Typography>
                            <Typography variant="h6" component="p">KanBan style,</Typography>
                            <Typography variant="h6" component="p">more interactive,</Typography>
                            <Typography variant="h6" component="p">power DevOps team,</Typography>
                            <Typography variant="h6" component="p">customizable features,</Typography>
                            <Typography variant="h6" component="p">customer involvement</Typography>
                            <Typography variant="h6" component="p">"ALL WITH A DRAG !!"</Typography>
                            <img src={test} width="200" height="100"/>
                            <br/>
                        </Paper>
                    </Grid>

                </Grid>


            </Grid>
        </div>
    )
}