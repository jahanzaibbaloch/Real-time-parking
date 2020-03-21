import firebase from "firebase";
export const GET_FEEDBACK = "GET_FEEDBACK";
export const SET_FEEDBACK = "SET_FEEDBACK";
export const DELETE_FEEDBACK = "DELETE_FEEDBACK";




export const setFeedback = (Feedback) => {
  return (dispatch) => {
    //firebase request,
    const database = firebase.database();
    database.ref("feedback").push({
      feedback:Feedback.myFeedback
    }).then(
      () => {
        dispatch({
          type: SET_FEEDBACK, Feedback
        });
      }
    )
  }
};


export const getFeedback = () => {
  return dispatch => {
    let database = firebase.database();
    database.ref("/feedback").on("value", snap => {
      let myFeedback = snap.val();
      let allFeedback = [];

      for (const key in myFeedback){
        allFeedback.push(myFeedback[key])
      }
      dispatch({
        type: GET_FEEDBACK, allFeedback
      })
    }
    )
  }
};



