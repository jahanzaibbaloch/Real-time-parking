import { GET_FEEDBACK, SET_FEEDBACK } from "../Actions/Allfeedback"

const initialState = {
    allfeedBack: [],
};


const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FEEDBACK:
            return {
                ...state
            }

        case GET_FEEDBACK:
            return {
                ...state,
                allfeedBack:action.allFeedback
            }
        default:
            return state;
    }
}
export default feedbackReducer;