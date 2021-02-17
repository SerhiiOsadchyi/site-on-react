import React from 'react';
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<PropsType> {

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    login: state.userAuthorize.login,
    isAuth: state.userAuthorize.isAuth
});

export default connect<StatePropsType, DispatchPropsType, {}, AppStateType >(mapStateToProps, { logout })(HeaderContainer)

type StatePropsType = {
    login: string | null,
    isAuth: boolean
};
type DispatchPropsType = {
    logout: () => void
}
export type PropsType = StatePropsType & DispatchPropsType
