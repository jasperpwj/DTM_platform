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
    // const [currentDate, setCurrentDate] = useState;
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


    var date = new Date();
    var sep = "-";
    var year = date.getFullYear(); //获取完整的年份(4位)
    var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    var day = date.getDate(); //获取当前日
    if (month <= 9) {
        month = "0" + month;
    }
    if (day <= 9) {
        day = "0" + day;
    }
    var currentdate = year + sep + month + sep + day;
        
    

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                {(isAuthenticated)? (<div/>):(<UnauthNavBar info = {navInfo} />)}
                <div className={classes.toolbar}>
                    <Typography paragraph>
                        This is home page
                    </Typography>
                </div>
                    mytime: 
                    <b>{currentdate}</b>
                
            </main>

        </div>
    )
}