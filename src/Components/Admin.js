import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../Store/Actions/Location";
import { Button } from '@material-ui/core';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  hidden: {
    display: "none"
  },
  block: {
    display: "inline-block"
  }
});


const Adminbooking = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isTrue, setisTrue] = useState(false);
  const [uid, setuid] = useState("");
  const [index, setIndex] = useState("");
  const [slotNumber, setSlotnumber] = useState("");
  const [plateNo, setPlateno] = useState("");
  const [endTime, setendTime] = useState(new Date());
  const [startTime, setstartTime] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const firebaseKey = useSelector(state => state.location.firebaseKey);
  const bookings = useSelector(state => state.location.myBookings);
  const key = useSelector(state => state.location.keys);

  React.useEffect(() => {
    dispatch(Action.getBookings())
  }, []);

  const updateData = useCallback(() => {
    
    const updatedData = {
      uid: uid,
      index: index,
      fbkeys: key[index],
      startDate: startDate.toLocaleDateString(),
      startTime: startTime.toLocaleTimeString(),
      endTime: endTime.toLocaleTimeString(),
      plateNo: plateNo,
      slotNumber: slotNumber,
    }

    dispatch(Action.updateData(updatedData))
  }, [uid, index, plateNo, slotNumber, dispatch]);

  const handleslotChange = (e) => {
    setSlotnumber(e.target.value);
    console.log(e.target.value, "ss")
  };
  const handleDateChange = date => {
    setStartDate(date);
  };

  const handlePlateChange = (e) => {
    setPlateno(e.target.value);
    console.log(e.target.value, "ss")
  };

  const handleStartTime = time => {

    setstartTime(time)
  };

  const handleEndtime = time => {
    setendTime(time)
  }

  const deletePost = (index, uid, slotNo,firebaseKey) => {

    var Data = {
      uid: uid,
      id:slotNo,
      index: index,
      fbkeys: key[index],
      firebaseKey : firebaseKey
    }
    console.log(Data)

    dispatch(Action.deleteData(Data))
    dispatch(Action.updateBoolean(Data))
  };

  const updatePost = (index, uid) => {
    setisTrue(!isTrue);
    setuid(uid);
    setIndex(index)
  }




  return (

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Slot No</TableCell>
            <TableCell >Plate No</TableCell>
            <TableCell >Booking Date</TableCell>
            <TableCell >Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isTrue ?
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TableRow>
                <TableCell> <TextField onChange={handleslotChange} value={slotNumber} id="standard-basic" label="Edit slot Number 1-15" /> </TableCell>
                <TableCell>
                  <TextField onChange={handlePlateChange} value={plateNo} id="standard-basic" label="Edit Plate No" />
                </TableCell>
                <TableCell>

                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Update Booking Date"
                    onChange={handleDateChange}
                    value={startDate}
                    format="MM/dd/yyyy"
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <KeyboardTimePicker
                    onChange={handleStartTime}
                    value={startTime}
                    margin="normal"
                    id="time-picker"
                    label="Update Start Time"
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  /></TableCell>
                <TableCell>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    onChange={handleEndtime}
                    value={endTime}
                    label="Update End Time"
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  /></TableCell>
                <TableCell></TableCell>
                <TableCell> <Button onClick={updateData} color="primary">Update</Button></TableCell>
              </TableRow>
            </MuiPickersUtilsProvider>
            : bookings && bookings.map((value, index) => (
              <TableRow >
                <TableCell> {value.slotNo}</TableCell>
                <TableCell>
                  {value.plateNo}
                </TableCell>
                <TableCell>{value.startDate}</TableCell>
                <TableCell>{value.startTime}</TableCell>
                <TableCell>{value.endTime}</TableCell>
                <TableCell> <Button onClick={() => { deletePost(index, value.uid ,value.slotNo,value.firebaseKey) }} color="secondary">Delete</Button></TableCell>
                <TableCell> <Button onClick={() => { updatePost(index, value.uid) }} color="primary">Update</Button></TableCell>
              </TableRow>
            ))}


        </TableBody>
      </Table>
    </TableContainer>
  );
};




export default Adminbooking;