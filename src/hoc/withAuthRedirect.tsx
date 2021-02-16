import React, {FC} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.userAuthorize.isAuth
    }

};

type StatePropsType = {
    isAuth: boolean
}

export function  withAuthRedirect <propsComponent> (WrappedComponent: React.ComponentType<propsComponent>) {
    const redirectComponent: FC<StatePropsType> = (props) =>  {
        let {isAuth, ...restProps} = props
            if (!isAuth) {
                return <Redirect to={'/login'}/>
            }
            return <WrappedComponent  {... restProps  as propsComponent} />

    }
    let ConnectedAuthRedirectComponent = connect( mapStateToPropsForRedirect, {})(redirectComponent);
    return ConnectedAuthRedirectComponent
}