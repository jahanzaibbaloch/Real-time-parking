import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../Store/Actions/Location";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Button } from '@material-ui/core';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const Mybooking = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.location.userBookings);
  console.log(bookings && bookings , "User Data")

  React.useEffect(() => {
    dispatch(Action.getBookinguser())
  }, []);


  console.log(bookings + "USER");
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
          </TableRow>
        </TableHead>
        <TableBody>
          
          {bookings.map((value,index) => (
            <TableRow>
              <TableCell>{value.startDate}</TableCell>
              <TableCell>
          {value.plateNo}
              </TableCell>
              <TableCell>{value.startDate}</TableCell>
              <TableCell>{value.startTime}</TableCell>
              <TableCell>{value.endTime}</TableCell>
              <TableCell> <Button color="secondary">Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};




export default Mybooking;