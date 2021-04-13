import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
//import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {authorizedUserSuccess} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import {UsersPage} from "./components/Users/UsersPage";

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


const SuspendedDProfile = withSuspense(ProfileContainer);
const SuspendedDialogs = withSuspense(DialogsContainer);

class App extends React.Component<StatePropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.authorizedUserSuccess()

    }

    render() {
        if (!this.props.initializedSuccess) {
            return <Preloader />
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
                        <Route path='/profile/:userId?' render={() => <SuspendedDProfile />}/>
                        <Route path='/dialogs' render={() => <SuspendedDialogs />}/>
                        <Route path='/users' render={() => <UsersPage/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='*' render={() => <div>404 page not found</div>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initializedSuccess: state.app.initializedSuccess
})
export default compose(
    withRouter,
    connect(mapStateToProps, {authorizedUserSuccess})
)(App);

type StatePropsType = {
    initializedSuccess: boolean
}

type DispatchPropsType = {
    authorizedUserSuccess: () => void
}