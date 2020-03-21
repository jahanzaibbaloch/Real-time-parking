import { CREATE_BOOKING, GET_BOOKING, GET_USER_DATA, DELETE_DATA_ADMIN, GET_SLOTS } from "../Actions/Location";


let initialState = {
    myBookings: [],
    userBookings: [],
    slots : [],
    keys: [],
    uids: [],
};

let Location = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BOOKING:
            return ({
                ...state,
            })
            case GET_SLOTS:
            return {
                ...state,
                slots:action.slots,
                firebaseKey : action.firebaseKey
            }
        case GET_USER_DATA:
            return ({
                ...state,
                userBookings: action.payload.BookingData,
            })
        case DELETE_DATA_ADMIN:
            console.log(action.Data.index)
            state.myBookings.splice(action.Data.index, 1)
            return ({
                ...state,
                myBookings: state.myBookings.concat(),
            })
        case GET_BOOKING:
            return ({
                ...state,
                myBookings: action.loadedBookings,
                keys: action.bookingKeys,
                uids: action.userId
            }
            )
    }
    return state;
}

export default Location;