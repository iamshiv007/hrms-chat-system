import axios from "axios"
import { newMessageFailed, newMessageRequest, newMessageSuccess } from "../slices/messageSlice";
import { twoPersonMessagesFailed, twoPersonMessagesRequest, twoPersonMessagesSuccess } from "../slices/messagesSlice";

// 1. New Message
export const newMessage = (messageData) => async (dispatch) => {
    dispatch(newMessageRequest());
    try {
        // Make API request for login
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/message/new`, messageData);
        dispatch(newMessageSuccess(data));
    } catch (error) {
        alert(error.response?.data.message)
        dispatch(newMessageFailed(error.response?.data.message));
    }
};

// 1. two Person Messages
export const twoPersonMessages = (messagesData) => async (dispatch) => {
    dispatch(twoPersonMessagesRequest());
    try {
        // Make API request for login
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/messages/two`, messagesData);
        dispatch(twoPersonMessagesSuccess(data));

    } catch (error) {
        alert(error.response?.data.message)
        dispatch(twoPersonMessagesFailed(error.response?.data.message));
    }
};