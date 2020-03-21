import firebase from "firebase";
export const CREATE_BOOKING = 'CREATE_BOOKING';
export const DELETE_BOOKING = "DELETE_BOOKING";
export const CHECK_BOOKING = 'CHECK_BOOKING';
export const GET_BOOKING = "GET_BOOKING";
export const GET_USER_DATA = "GET_USER_DATA";
export const DELETE_DATA_ADMIN = "DELETE_DATA_ADMIN";
export const UPDATE_DATA_ADMIN = "UPDATE_DATA_ADMIN";
export const GET_SLOTS = "GET_SLOTS";
export const SET_BOOLEAN = "SET_BOOLEAN";

export const checkBooking = (data) => {
  return { type: CHECK_BOOKING, data }
};

export const setBolean = (BookedData) => {
  console.log(BookedData, "NEW BOOLEAN TRY")
  let database = firebase.database()
  return (dispatch) => {
    database.ref(`/slots/${BookedData.firebaseKey}`).update({ isReserved: false, id: BookedData.slotNo })
  }
}


export const createBooking = (BookedData) => {
  return (dispatch) => {
    //firebase request,
    firebase.auth().onAuthStateChanged((user) => {
      let UID = user.uid
      const database = firebase.database();
      database.ref(`/bookings/${UID}`).push(
        {
          uid: UID,
          startDate: BookedData.startDate,
          startTime: BookedData.startTime,
          endTime: BookedData.endTime,
          plateNo: BookedData.plateNo,
          slotNo: BookedData.slotNo,
          firebaseKey:BookedData.firebaseKey,
        })
    })
    dispatch({
      type: CREATE_BOOKING, BookedData
    });
  }
};

export const getBookings = () => {
  return dispatch => {
    let database = firebase.database();
    database.ref("/bookings").on("value", snap => {
      let myBookings = snap.val();
      let loadedBookings = [];
      let bookingKeys = [];
      let userId = [];
      console.log(loadedBookings)
      for (var key in myBookings) {
        let obj = myBookings[key]
        userId.push(key)
        for (let key1 in obj) {
          loadedBookings.push(obj[key1])
          bookingKeys.push(key1)
        }
      }

      dispatch({
        type: GET_BOOKING,
        loadedBookings,
        userId,
        bookingKeys,
      })
    }
    )
  }
};


export const getBookinguser = () => {
  return dispatch => {
    firebase.auth().onAuthStateChanged((user) => {
      let uid = user.uid
      console.log(uid, "userid")
      firebase.database().ref(`bookings/${uid}`).on("value", snap => {
        let userBooking = snap.val();
        console.log('tttt', userBooking && userBooking)
        let BookingData = [];
        for (let key in userBooking) {
          BookingData.push(userBooking[key])
        }
        dispatch({ type: GET_USER_DATA, payload: { BookingData: BookingData } })
      })
    })
  }
};

export const deleteData = (Data) => {
  console.log(Data, "datadelete")
  return dispatch => {
    console.log(Data)
    firebase.database().ref(`bookings/${Data.uid}/${Data.fbkeys}`).remove();
    dispatch({ type: DELETE_DATA_ADMIN, Data: Data })
  }
};

export const updateData = (Data) => {
  console.log(Data)
  return dispatch => {
    firebase.database().ref(`bookings/${Data.uid}/${Data.fbkeys}`).update({ endTime: Data.endTime, plateNo: Data.plateNo, slotNo: Data.slotNumber, startDate: Data.startDate, startTime: Data.startTime })
  }
}

export const updateBoolean = (Data) => {
  return dispatch => {
    firebase.database().ref(`slots/${Data.firebaseKey}`).update({isReserved:true});
  }
}
export const getSlots = () => {
  return dispatch => {
    let database = firebase.database();
    database.ref("/slots").on("value", snap => {
      let myslots = snap.val();
      let slots = [];
      let firebaseKey = [];
      console.log(firebaseKey)
      for (const key in myslots) {
        slots.push(myslots[key])
        firebaseKey.push(key)
      }
      dispatch({
        type: GET_SLOTS, slots , firebaseKey
      })
    }
    )
  }
};