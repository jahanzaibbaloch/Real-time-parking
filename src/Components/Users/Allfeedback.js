import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../Store/Actions/Allfeedback";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 200,
        width: 300,
    },
    control: {
        padding: theme.spacing(2),
    },
}));





const Allfeedback = (props) => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(Action.getFeedback())
    }, []);

    const classes = useStyles();
    const feedbacks = useSelector(state => state.feedback.allfeedBack)
    console.log(feedbacks, "dsasdasa")
    const spacing = 6
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    {feedbacks.map(value => (
                        <Grid key={value.uid} item>
                            <Paper className={classes.paper}>
                                <div style={{ display:"flex", flexDirection: "column", alignItems: "center", justifyContent:"center", height: "80%", width: "100%" }}>
                                    <p>
                                        {value.feedback}
                                    </p>
                                </div>

                                <Divider></Divider>
                                <div style={{ height: "20%", width: "100%" ,display:"flex", flexDirection: "column", alignItems: "center", justifyContent:"center"}}>
                                    <Button color="secondary">Delete</Button>
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Allfeedback;