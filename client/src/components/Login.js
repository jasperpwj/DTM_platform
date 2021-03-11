import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useAuth} from "../authentication/auth";
import axios from "axios";
import {Redirect} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import UnauthenticNavBar from "./navigation/UnauthNavBar";
const authService = require("../services/auth.service");

//specify the log in css style
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#ff3d00',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(4),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login(props) {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [emptyInput, setEmptyInput] = useState(false);
    const navInfo = {
        button: "login"
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email === "" || password === "") {
            setEmptyInput(true);
            setIsError(false);
        } else {
            setEmptyInput(false);
            try {
                authService.login(email, password)
                    .then(response => {
                        if(response) {
                            props.history.push("/");
                            window.location.reload();
                        }
                    }).catch(error => {
                    setIsError(true)
                })
            } catch(e) {
                console.log({Error: e})
            }
        }
    };

    return (
        <Container component='main' maxWidth="xs">
            <UnauthenticNavBar info={navInfo} />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VpnKeyOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In Your Account
                </Typography>
                {emptyInput?( <Alert severity='error'>Email address or password cannot be empty</Alert>):(<div><br/><br/></div>)}
                {isError?( <Alert severity='error'>Email address or password provided were incorrect</Alert>):(<div><br/><br/></div>)}
                <form className={classes.form}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='email'
                                variant='outlined'
                                label='Email Address'
                                id='email'
                                autoFocus
                                value={email}
                                onChange={e => {setEmail(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='password'
                                variant='outlined'
                                label='Password'
                                type='password'
                                id='password'
                                value={password}
                                onChange={e => {setPassword(e.target.value)}}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify='flex-start'>
                        <Grid item >
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Log In
                    </Button>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Link href="#" onClick={() => alert("Haven't implemented")} variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/sign-up" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <br/>
            <Box mt={10}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © DTM Platform Website '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </Container>
    )
}