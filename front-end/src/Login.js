import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        //backgroundColor: theme.palette.secondary.main,
        height: 200,
        width: 200
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const classes = useStyles();
    const [isLoginPage, setIsLoginPage] = useState(true);

    const [loginInput, setLoginInput] = useState({
        username: '',
        password: '',
    });

    const [registerInput, setRegisterInput] = useState({
        username: '',
        password: '',
        repassword: '',
        email: '',
        validEmail: true,
        passwordsMatch: true,
        validUsername: true,
        validPassword: true
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar
                    className={classes.avatar}
                    src="../images/blackTooth.png"
                ></Avatar>
                <Typography component="h1" variant="h5">
                    {isLoginPage ? "Login into Fintooth!" : "Sign up into Fintooth"}
                </Typography>
                <form className={classes.form} noValidate method='POST'>
                    {
                        isLoginPage ? "" :
                            (
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email" s
                                    value={registerInput.email}
                                    onChange={(event) => setRegisterInput({ ...registerInput, email: event.target.value })}
                                    onBlur={
                                        () => registerInput.email.includes("@") ?
                                            setRegisterInput({ ...registerInput, validEmail: true }) :
                                            setRegisterInput({ ...registerInput, validEmail: false })
                                    }
                                    error={!registerInput.validEmail}
                                    helperText={!registerInput.validEmail ? "Please enter a valid email" : ""}
                                />
                            )
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={isLoginPage ? loginInput.username : registerInput.username}
                        onChange={(event) => {
                            isLoginPage ?
                                setLoginInput({ ...loginInput, username: event.target.value }) :
                                setRegisterInput({ ...registerInput, username: event.target.value })
                        }
                        }
                        onBlur={
                            () => {
                                if (!isLoginPage) {
                                    (registerInput.username.length < 3 ||
                                        registerInput.username.length > 10 ||
                                        !registerInput.username.match(new RegExp(/^[a-z0-9_]+$/i))) ?
                                        setRegisterInput({ ...registerInput, validUsername: false }) :
                                        setRegisterInput({ ...registerInput, validUsername: true })
                                }
                            }
                        }
                        error={!registerInput.validUsername}
                        helperText={!registerInput.validUsername ? "Username can be from 3 to 10 characters and can contain only alphanumerical symbols and _" : ""}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={isLoginPage ? loginInput.password : registerInput.password}
                        onChange={(event) => {
                            isLoginPage ?
                                setLoginInput({ ...loginInput, password: event.target.value }) :
                                setRegisterInput({ ...registerInput, password: event.target.value })
                        }
                        }
                        onBlur={
                            () => {
                                if (!isLoginPage) {
                                        registerInput.password.length < 6 ?
                                        setRegisterInput({ ...registerInput, validPassword: false }) :
                                        setRegisterInput({ ...registerInput, validPassword: true })
                                }
                            }
                        }
                        error={!registerInput.validPassword}
                        helperText={!registerInput.validPassword ? "Password must be at least 6 characters" : ""}
                    />
                    {
                        isLoginPage ? "" :
                            (
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="repassword"
                                    label="Repeat Password"
                                    type="password"
                                    id="repassword"
                                    autoComplete="repeat-password"
                                    value={registerInput.repassword}
                                    onChange={(event) => setRegisterInput({ ...registerInput, repassword: event.target.value })}
                                    onBlur={
                                        () => registerInput.password === registerInput.repassword ?
                                            setRegisterInput({ ...registerInput, passwordsMatch: true }) :
                                            setRegisterInput({ ...registerInput, passwordsMatch: false })
                                    }
                                    error={!registerInput.passwordsMatch}
                                    helperText={!registerInput.passwordsMatch ? "Passwords don\'t match" : ""}
                                />
                            )
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isLoginPage ? "Login" : "Register"}
                    </Button>
                </form>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => setIsLoginPage(!isLoginPage)}
                >
                    {isLoginPage ? "I don't have an account!" : "I already have an account"}
                </Button>
            </div>
        </Container>
    );
};

export default Login;