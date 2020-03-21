import React, { useState, useCallback } from "react";
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../Store/Actions/Location";

const style = {
  center: {
    textAlign: "center",
    margin: "20px"
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  display: {
    display: "none"
  },
  displayOn: {
    display: "block"
  },
  margin: {
    marginTop: 25,
    marginBottom: 20,
    fontSize: 20
  }
}));



const Location = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setstarTime] = useState(new Date())
  const [endTime, setendtime] = useState(new Date());
  const [plateNo, setplateNo] = useState("");
  const [Booked, setBookedSlot] = useState("");
  const [index , setIndex] = useState('');
  console.log(Booked, "ppp")
  const key = useSelector(state => state.location.keys);
  const [slotOpen, setslotOpen] = useState(false);
  const dispatch = useDispatch();
  const firebaseKey = useSelector(state => state.location.firebaseKey);
  const BookedSlot = useSelector(state => state.location.slots);
  const slots = useSelector(state=> state.location.slots)
  console.log(BookedSlot.isReserved, " BOOLEAN")
  let Reserved = BookedSlot.map(value => value.isReserved);
  let isReserved = BookedSlot.isReserved;
  console.log(Reserved)
  const Setbooking = useCallback(() => {
    if (Reserved=== true) {
      alert ("Already Booked")
    }
    else {
      const BookedData = {
      startDate: selectedDate.toLocaleDateString(),
      startTime: startTime.toLocaleTimeString(),
      endTime: endTime.toLocaleTimeString(),
      firebaseKey:firebaseKey[index],
      plateNo: plateNo,
      slotNo: Booked,
    }
    console.log(BookedData)
    console.log(Booked)
    dispatch(Action.createBooking(BookedData));
    dispatch(Action.setBolean(BookedData));
    }
    
  }, [plateNo, Booked, dispatch]);




  const handleSlotToggle = () => {
    setslotOpen(!slotOpen);
  };

  React.useEffect(() => {
    dispatch(Action.getSlots())
}, []);

  const handleSlot =  (value , index)  => {
    const BookedSlot = slots.find(data => data === value);
    const Booked = BookedSlot.id;
    const Reserved = index;
    console.log(BookedSlot);
    console.log(Booked);
    console.log(index , "index")
   setBookedSlot(Booked);
   setIndex (Reserved);
  };

  const handlePlateChange = (e) => {
    setplateNo(e.target.value);
    console.log(e.target.value, "ss")
  };
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleStartTime = time => {
    setstarTime(time)
  };


  const handleEndtime = time => {
    setendtime(time)
  }
  const classes = useStyles();
  return (
    <div>
      <div className={style.center, classes.margin}>
        Book A Slot
            </div>
      <React.Fragment>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />

          <Grid container justify="space-around" spacing={3}>
            <Grid item xl={6} lg={6} md={6} sm={12} >
              <Paper className={classes.paper}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Reservation Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                /></Paper>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6}>
              <Paper className={classes.paper}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="From"
                  value={startTime}
                  onChange={handleStartTime}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6}>
              <Paper className={classes.paper}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="To"
                  value={endTime}
                  onChange={handleEndtime}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} >
              <Paper className={classes.paper}>
                <FormControl>
                  <InputLabel htmlFor="component-simple">Plate No :</InputLabel>
                  <Input id="component-simple" value={plateNo} onChange={handlePlateChange} />
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </React.Fragment>
      <div style={{ marginTop: 10, marginBottom: 10,display:"flex", flexDirection: "column", alignItems: "center" }}>
        <Button onClick={handleSlotToggle} variant="contained" color="primary">
          Check Slots
        </Button>
      </div>
      <div className={classes.margin, slotOpen ? classes.displayOn : classes.display}>
        <div style={{display:"flex", flexDirection: "column", alignItems: "center"}}>
          Select Slot
          </div>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  {slots.map((value,index) => (
                    <Grid key={value} item>
                      <Paper style={value.isReserved ? {backgroundColor:"green"} : {backgroundColor:"red"}} onClick={() => handleSlot(value,index)} className={classes.paper} /> {value.id}
                   </Grid> 
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </React.Fragment>

      </div>
      <div style={{display:"flex", flexDirection: "column", alignItems: "center",marginTop:10}}>
        <Button onClick={Setbooking} variant="contained" color="primary">
          Book A Slot
        </Button>
      </div>
    </div>
  )
};


export default Location;