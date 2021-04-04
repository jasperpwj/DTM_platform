import React, {useState, useEffect}from "react";
import TopNavBar from "./navigation/TopNavBar";
import UnauthNavBar from "./navigation/UnauthNavBar";
import {createMuiTheme, makeStyles,ThemeProvider, CardMedia, CardActionArea } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
// import Background from '../test.png';
// import Background from '../pink.jpg';
import Background from '../blue.jpg';
import test from '../hhh.gif';


const authService = require("../services/auth.service");

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
        // backgroundColor: "lightgrey",
        // backgroundColor: "#64b5f6",
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
    },

    content: {
        flexGrow: 1,
        marginTop: theme.spacing(8),
        padding: theme.spacing(2),
        // backgroundColor: "#64b5f6",
        // backgroundImage: `url(${Background})`,
        // backgroundSize: 'cover',
    },

    paper: {
        // display: "inline-block",
        width: '33%',
        marginLeft: '33%',
        fontSize: '50px',
        fontFamily: 'Old Times American',
        fontSize: 40,
        // fontFamily: 'New Tegomin',
    },

    media: {
        height: 140,
    }

}));

const zhuti = createMuiTheme({
    typography: {
        fontFamily: [
            'Chilanka, cursive',
        ],
    }
});

var sectionStyle = {
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
    
    var sep = "-";
    var date = new Date();
    var year = date.getFullYear(); 
    var month = date.getMonth() + 1; 
    var day = date.getDate(); 
    if (month <= 9) {
        month = "0" + month;
    }
    if (day <= 9) {
        day = "0" + day;
    }

    var currentdate = year + sep + month + sep + day;

    return (
        // <ThemeProvider theme={zhuti}>
        <div className={classes.root} >
            <main className={classes.content}>
                {(isAuthenticated)? (<div/>):(<UnauthNavBar info = {navInfo} />)}
                <ThemeProvider theme={zhuti}>
                <div className={classes.toolbar}>
                    <Typography paragraph>
                        {/* This is home page */}
                    </Typography>
                </div>
                        <font color="010913">
                            <Typography variant="h3"> Today: {currentdate}</Typography>
                        </font>
                        
                        <br></br>
                        <br></br>
                        <Paper elevation={20} className={classes.paper}> 
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
                        {/* <img src={test} /> */}




                </ThemeProvider>
            </main>
        </div>
        // </ThemeProvider>
    )
}