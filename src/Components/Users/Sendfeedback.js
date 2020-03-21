import React from "react"
import { useState, useCallback } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useDispatch,useSelector } from "react-redux";
import * as Action from "../../Store/Actions/Allfeedback";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));
const Sendfeedback = (props) => {
    const classes = useStyles();
    const [feedback, setfeedBack] = useState('Feedback');
    const dispatch = useDispatch();

    const Setfeedback = useCallback(() => {
        const feedBack = {
          myFeedback: feedback,
        }
        dispatch(Action.setFeedback(feedBack))
      }, [feedback,dispatch]);


    const handleChange = event => {
        setfeedBack(event.target.value);
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
            <div className={classes.root}>
                <TextField style={{width:400}}
                    id="outlined-multiline-static"
                    label="Feedback"
                    multiline
                    rows="4"
                    onChange={handleChange}
                    value={feedback}
                    variant="outlined"
                />
                <div>
                    <Button onClick={Setfeedback} color="primary">Submit</Button>
                </div>
                
                </div>
            </Container>
        </React.Fragment>
    )
};


export default Sendfeedback;