import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditAccountFormDialog from "./EditAccount";
import ResetPasswordFormDialog from "./ChangePassword";
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined';
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import myPhoto from "../myPhoto.png";
import background from "../bkg.jpg";

const UserService = require("../services/user.service");


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        // margin: theme.spacing(10,3,2,15),
        // backgroundColor: "yellow",
        height: '100vh',
        backgroundSize: 'cover',

    },
    title: {
        margin: theme.spacing(10,3,2,15),
    },
    container: {
        backgroundColor: "white",
        margin: theme.spacing(5,90,-5,90),
    },
    typography: {
        fontSize: 30,
        fontWeight: 500,
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        padding: theme.spacing(2, 3, 4, 3),
        margin: theme.spacing(0,90,30,90),
        // marginTop: theme.spacing(8),
        backgroundColor: "white"
    },
    img: {
        width: "160px",
        height: "160px",
        marginTop: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(3, 0, 2, 0),
    },
    // test: {
    //     backgroundColor: "lightgreen",
    // }
}));

export default function AccountPage() {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        UserService.getUserProfile().then(res => {
            if(res) {
                setCurrentUser(res.data);
            }
        });
    }, []);

    const submit = (e) => {
        e.preventDefault();
        // if(!inputInfo === "") {
            
        //     window.location.reload()
        // }
    }


    return (
        <div className={classes.root} style={{backgroundImage:`url(${background})`}}>

            <Grid container spacing={2} justify="center">
                <Grid item xs={12} align="left" className={classes.title}>
                    <Typography variant='h2' className={classes.typography}>
                        Account
                    </Typography>
                </Grid>
                <Grid container item xs={12} justify="center" className={classes.container}>
                    <Avatar alt="user image" src ={myPhoto} className={classes.img}>
                    </Avatar>
                    <Grid item xs={12} className={classes.button}>
                        
                        {/* <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload
                        </Button> */}
                        {/*<form action="/profile" method="post" enctype="multipart/form-data">*/}
                        {/*    <input type="file" name="avatar" />*/}
                        {/*</form>*/}
                        {/*<label htmlFor="contained-button-file">*/}
                        {/*    <Button */}
                        {/*    onClick={submit}*/}
                        {/*    variant="contained" color="primary" component="span">*/}
                        {/*    Upload*/}
                        {/*    </Button>*/}
                        {/*</label>*/}

                    </Grid>
                </Grid>
                <Grid container className={classes.content} direction="column" justify="flex-start">
                    <Grid container justify="flex-end">
                        <EditAccountFormDialog/>
                    </Grid>
                    <Grid container justify="flex-end">
                        <p/>
                    </Grid>
                    <Grid container justify="flex-end">
                        <ResetPasswordFormDialog/>
                    </Grid>
                    <Grid container item>
                        <Typography paragraph className={classes.typography}>
                            {currentUser && currentUser.firstName} {currentUser && currentUser.lastName}
                        </Typography>
                    </Grid>
                    <Grid container item>
                        <AccountBoxOutlinedIcon/>
                        <Typography paragraph>
                            : {currentUser && currentUser.username}
                        </Typography>
                    </Grid>
                    <Grid container item>
                        <EmailOutlinedIcon/>
                        <Typography paragraph color="inherit">
                            : {currentUser && currentUser.email}
                        </Typography>
                    </Grid>
                    <Grid container item>
                        <PhoneAndroidOutlinedIcon/>
                        <Typography paragraph color="inherit">
                            : {currentUser && currentUser.phoneNumber}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    )
}