import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
const UserService = require("../services/user.service");

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


export default function AccountPage() {
    const classes = useStyles();
    const navBarInfo = {
        title: "Account"
    };
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        UserService.getUserProfile().then(res => {
            if(res) {
                setCurrentUser(res.data);
            }
        });
    }, []);

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Typography paragraph>
                        First Name: {currentUser && currentUser.firstName}
                    </Typography>
                    <Typography paragraph>
                        Last Name: {currentUser && currentUser.lastName}
                    </Typography>
                    <Typography paragraph>
                        Username: {currentUser && currentUser.username}
                    </Typography>
                    <Typography paragraph>
                        Email: {currentUser && currentUser.email}
                    </Typography>
                </div>
            </main>
        </div>
    )
}