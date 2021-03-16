import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import {Redirect}  from 'react-router-dom';
import Alert from "@material-ui/lab/Alert";
import UnauthenticNavBar from "./navigation/UnauthNavBar";


//specify the sign up css style
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(14),
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
        margin: theme.spacing(4, 0, 2),
    },
}));


export default function SignUp() {
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [registered, setRegistered] = useState(false);
    const [isError, setIsError] = useState(false);
    const [emptyInout, setEmptyInput] = useState(false);
    const [errorMsg, setErrorMsg] =useState([]);

    const navInfo = {
        button: "signUp"
    };

    const handleChange = (e)=> {
        const {id, value} = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg([]);
        if(userInfo.username === "" || userInfo.firstName === "" || userInfo.lastName === "" || userInfo.email === "" || userInfo.password === "") {
            setEmptyInput(true);
        } else {
            setEmptyInput(false);
            try {
                if(userInfo.password) {
                    const user = {
                        username: userInfo.username,
                        firstName: userInfo.firstName,
                        lastName: userInfo.lastName,
                        email: userInfo.email,
                        password: userInfo.password
                    };
                    try {
                        axios.post('http://localhost:4000/auth/sign-up', user)
                            .then(res => {
                                setRegistered(true);
                                setErrorMsg([])
                            })
                            .catch(error => {
                                console.log({Error: error.response.data});
                                setIsError(true);
                                setErrorMsg(preMsg => ([...preMsg, error.response.data.message]));
                            });
                    } catch(error) {
                        console.log(error);
                    }
                }
            } catch(e) {
                console.log({error: e})
            }
        }
    };


    return (
        <div>
            {registered? (
                <div>
                    <Redirect to='/login'/>
                </div>
            ):(
                <Container component="main" maxWidth="xs">
                    <UnauthenticNavBar info={navInfo} />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <PersonAddTwoToneIcon />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Create your account
                        </Typography>
                        {emptyInout? (<Alert severity="error">Each field cannot be empty</Alert>):(<div><br/><br/></div>)}
                        {isError? (errorMsg.map(message => <Alert severity="error"> {message}</Alert>)):(<div><br/><br/></div>)}
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="username"
                                        name="username"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        value={userInfo.username}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="first-name"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={userInfo.firstName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="last-name"
                                        name="lastName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        value={userInfo.lastName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="email"
                                        name="email"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        value={userInfo.email}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="input-password"
                                        name="password"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type="password"
                                        value={userInfo.password}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
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
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Log in
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
            )}
        </div>
    );
}