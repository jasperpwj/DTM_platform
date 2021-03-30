import React, {useState, useEffect}from "react";
import TopNavBar from "./navigation/TopNavBar";
import UnauthNavBar from "./navigation/UnauthNavBar";
import {createMuiTheme, makeStyles,ThemeProvider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
// import Background from '../test.png';
// import Background from '../pink.jpg';
import Background from '../blue.jpg';


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
        width: '50%',
        marginLeft: '25%',
        fontSize: '50px',
        fontFamily: 'Times New Roman',
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
                        This is home page
                    </Typography>
                </div>
                    <font color="red" >
                        <Typography variant="h3">{currentdate}</Typography>
                        <b>{currentdate}test</b>
                        <Paper elevation={3}></Paper>
                    </font>
                        <Typography variant="h3">{currentdate}</Typography>
                   
                        <Paper elevation={3} className={classes.paper}> 
                        
                            This is our test 
                            <br></br>
                            <b>hihihi</b>
                        
                        </Paper>
                </ThemeProvider>
            </main>
        </div>
        // </ThemeProvider>
    )
}