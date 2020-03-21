import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch,useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useLocation ,useHistory } from "react-router-dom";
import * as Action from "../../src/Store/Actions/Auth";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const Login = (props) => {
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const isLogin = useSelector(state => state.auth.isAuth);

    let { from } = location.state || { from: { pathname: "/" } };
    if(isLogin===true) {
        history.replace(from)
        history.push("/Locations")
    }
  
    const dispatch = useDispatch();
    const signInHandler = () => {

        const userData = {
            username: username.toString(),
            password: password.toString(),
        }
        dispatch(Action.signIn(userData))
    }


    const handleuserNameChange = (e) => {
        setUsername(e.target.value);
        console.log(e.target.value)
    };

    const handlepasswordChange = (e) => {
        setPassword(e.target.value);
        console.log(e.target.value)
    };
    return (
        <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3} >

            <h3>Parking App </h3>

            <Grid justify="center" alignItems="center" item xs={12}>
                <Paper style={{ width: "40%", margin: "auto" }} className={classes.paper}><TextField value={username} onChange={handleuserNameChange} id="standard-basic" label="Email" style={{ width: "70%" }} /></Paper>
            </Grid>

            <br>
            </br>
            <Grid justify="center" alignItems="center" item xs={12}>
                <Paper style={{ width: "40%", margin: "auto" }} className={classes.paper}><TextField value={password} onChange={handlepasswordChange} id="standard-basic" type="password" label="Password" style={{ width: "70%" }} /></Paper>
            </Grid>
            <span>
                <br>
                </br>
                <Button onClick={signInHandler} variant="contained" color="primary">
                    Sign-In
                </Button>
            </span>

        </Grid>

    )
};


export default Login;