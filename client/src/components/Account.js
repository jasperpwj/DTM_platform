import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import EditAccountFormDialog from "./EditAccount";
import ChangePasswordFormDialog from "./ChangePassword";
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import myPhoto from "../myPhoto.png";
import background from "../bkg.jpg";
const UserService = require("../services/user.service");
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
        backgroundSize: 'cover',
        minWidth: 900,
    },

    container: {
        backgroundColor: "white",
        opacity: 0.9,
        margin: theme.spacing(20,30,0,36),
        minWidth: 500,
        maxWidth: 800,
    },
    typography: {
        fontSize: 35,
        fontWeight: 500,
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        opacity: 0.9,
        padding: theme.spacing(2, 3, 4, 3),
        margin: theme.spacing(0,30,20,36),
        backgroundColor: "white",
        minWidth: 500,
        maxWidth: 800,
    },
    img: {
        width: "160px",
        height: "160px",
        marginTop: theme.spacing(6),
    },
    button: {
        margin: theme.spacing(3, 0, 2, 0),
    },
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

    return (
        <div className={classes.root} style={{backgroundImage:`url(${background})`}}>

            <Grid container spacing={2} justify="center">

                <Grid container item xs={12} justify="center" className={classes.container}>
                    <Avatar alt="user image" src ={myPhoto} className={classes.img}>
                    </Avatar>
                    <Grid item xs={12} className={classes.button}>
                    </Grid>
                </Grid>
                <Grid container className={classes.content} direction="column" justify="flex-start">
                    <Grid container justify="flex-end">
                        <EditAccountFormDialog/>
                        <ChangePasswordFormDialog/>
                    </Grid>
                    <Grid item align='left'>
                        <Typography variant='h2' component='h2' className={classes.typography}>
                            Account
                        </Typography>
                    </Grid>
                    <br/>
                    <Grid container item>
                        <Typography paragraph variant='h5' component='h3'>
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
                        <VpnKeyIcon/>
                        <Typography paragraph color="inherit">
                            : ******
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