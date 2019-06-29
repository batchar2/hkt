import React from 'react';
import {connect} from 'react-redux';
import { actions as routerActions, createRouteNodeSelector } from 'redux-router5';

import './AuthPage.css';
import avatar from './avatar.png';

import {USER} from '../../utils/';
import { ROUTES } from '../../constants/router.consts';
import userActions from '../../store/actions/user.actions.js';

class AuthPage extends React.Component {

    isAuthPage: true
    handleSubmit(event) {
        event.preventDefault();

        const email = this.getUserEmail.value;
        const password = this.getUserPassword.value;
        this.props.onLogin(email, password);
    }

    componentWillReceiveProps(nextProps) {
        const user = nextProps.user;
        if (user) {
             if (USER.isAuthUser(user) && USER.isRegularUser(user)) {
                 this.props.navigateTo(ROUTES.PRODUCT_LIST);
             }
         }
    }

    render() {
        let msg = null;
        let styleField = null;
        let styleText = null;
        if (!USER.isAuthUser(this.props.user) && USER.isAuthError(this.props.user)) {
            msg = 'The email or password is incorrect';
            styleText = {color: 'red'};
            styleField = {border: '1px solid red'};
        }
        return (
            <div className="card card-container">
                <img
                    id="profile-img"
                    className="profile-img-card"
                    alt="avatar"
                    src={avatar} />
                <p
                    id="profile-name"
                    className="profile-name-card"
                    style={(styleText) ? (styleText) : {}}
                >
                    {msg}
                </p>
                <form className="form-signin">
                    <span id="reauth-email" className="reauth-email"></span>
                    <input
                        style={(styleField) ? (styleField) : {}}
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        required autoFocus
                        ref={input => this.getUserEmail = input}
                    />
                    <input
                        style={(styleField) ? (styleField) : {}}
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        required
                        ref={input => this.getUserPassword = input}
                    />
                    <div id="remember" className="checkbox">
                        <label>
                            <input type="checkbox" id="remember-me" defaultChecked/>
                            <label id="remember-me">Remember me</label>
                        </label>
                    </div>
                   <button
                        className="btn btn-lg btn-primary btn-block btn-signin"
                        type="submit"
                        onClick={e => this.handleSubmit(e)}
                    >
                        Sign in
                    </button>
                </form>
            </div>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
    }),
    dispatch => ({
        // пользователь нажал регистрацию
        onLogin: (email, password) => {
            dispatch(userActions.onLogin(email, password));
        },
        onIsAuth: () => {
            dispatch(userActions.isAuth());
        },
        navigateTo: (name, params={}) => {
            dispatch(routerActions.navigateTo(name, params));
        }
    }),
)(AuthPage);
