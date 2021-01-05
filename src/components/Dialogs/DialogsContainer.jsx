import React from 'react';
import { addNewMessageCreator, textNewMessageCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }

};
let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (message) => {
            dispatch(addNewMessageCreator(message))
        }
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);