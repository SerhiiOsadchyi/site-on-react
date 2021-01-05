import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.userAuthorize.isAuth
    }

};

export const withAuthRedirect = (Component) => {
    class redirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) {
                return <Redirect to={'/login'}/>
            }
            return <Component  {... this.props} />
        }
    }
    let ConnectedAuthRedirectComponent = connect( mapStateToPropsForRedirect )(redirectComponent);
    return ConnectedAuthRedirectComponent
}