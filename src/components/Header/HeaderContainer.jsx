import React from 'react';
import Header from "./Header";
import {authMe, logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.authMe();
    }

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

let mapStateToProps = (state) => ({
    login: state.userAuthorize.login,
    logout: state.userAuthorize.logout,
    isAuth: state.userAuthorize.isAuth
});

export default connect(mapStateToProps, { authMe, logout })(HeaderContainer)