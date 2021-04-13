import React, {useState, useEffect}from "react";
import TopNavBar from "./navigation/TopNavBar";
import UnauthNavBar from "./navigation/UnauthNavBar";
import {makeStyles,ThemeProvider} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Background from '../bkg.jpg';
import test from '../home.gif';


const authService = require("../services/auth.service");

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
        // backgroundColor: "lightgrey",
        // backgroundColor: "#64b5f6",
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minWidth:1500
    },

    content: {
        flexGrow: 1,
        marginTop: theme.spacing(8),
        padding: theme.spacing(2),
        // minWidth: 1500,

        // backgroundColor: "#64b5f6",
        // backgroundImage: `url(${Background})`,
        // backgroundSize: 'cover',
    },

    paper: {
        // display: "inline-block",
        width: '33%',
        marginLeft: '33%',
        // minWidth: 200,
        fontSize: '50px',
        fontFamily: 'Old Times American',
        // fontSize: 40,
        // fontFamily: 'New Tegomin',
    },

    media: {
        height: 140,
    }

}));


let sectionStyle = {
    width: "100%",
    height: "400px",
  // makesure here is String确保这里是一个字符串，以下是es6写法
    backgroundImage: `url(${Background})` 
};

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
        // <ThemeProvider theme={zhuti}>
        <div className={classes.root} >
            <main className={classes.content}>
                {(isAuthenticated)? (<div/>):(<UnauthNavBar info = {navInfo} />)}
                <ThemeProvider>
                <div className={classes.toolbar}>
                    <Typography paragraph>
                        {/* This is home page */}
                    </Typography>
                </div>
                        <font color="010913">
                            <Typography variant="h3"> Today: {currentDate}</Typography>
                        </font>
                        
                        <br></br>
                        <br></br>
                        <Paper elevation={20} className={classes.paper} minWidth="200"> 
                            <br></br>  
                            <b>What is DTM ? </b>
                            <br></br>
                            <Typography variant="h6" component="p">
                            <br></br>
                            kan-ban style, <br></br>
                            more interactive, <br></br>
                            power devop team, <br></br>
                            customizable features, <br></br>
                            customer involvement<br></br>
                            <br></br>
                            "ALL WITH A DRAG !!"        <br></br>                       
                            <img src={test} width="200" height="100"/>           
                            </Typography>

                        </Paper>
                        <br></br>
                        <br></br>
                        <br></br>

                </ThemeProvider>
            </main>
        </div>
        // </ThemeProvider>
    )
}