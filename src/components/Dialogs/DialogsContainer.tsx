import React, {Dispatch} from 'react';
import { actions, ActionsType } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {connect} from "react-redux";
import {AppStateType, BaseThunkType} from "../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }

};

const mapDispatchToProps = (dispatch: Dispatch<ActionsType>) => {
    return {
        addMessage: (message: string) => {
            dispatch(actions.addNewMessage(message))
        }
    }
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);