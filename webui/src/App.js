import React from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'

import 'bootstrap/dist/css/bootstrap.min.css';

import RightMenu from './components/RightMenu';

import {USER} from './utils/';
import {SwitchPages, SwitchAuth} from './router';

import AuthPage from './pages/AuthPage';
import './App.css';


import Z1 from './z1.jpg';
//<SwitchAuth/>
class App extends React.Component {

    render() {
        // if (!USER.isAuthUser(this.props.user)) {
        //     return (
        //         <AuthPage/>
        //     );
        // }
        // нужно, для определения отдельная ли страница ( авторизация на отдельной странице)

        const page = (
            <SwitchPages/>// onParams={(p) => this.onParams()}/>
        );

        return (

            <div className="wrapper">
                <header className="header">
                    <div className="logo-w">
                      <img src={Z1} alt=""/>
                    </div>
                    <div class="user">
                        <div className="name btn-list">
                            <div className="title">Пупкин В.</div>
                            <div className="list">
                                <div><a href="#">Профиль</a></div>
                                <div><a href="#">Выход</a></div>
                            </div>
                        </div>
                    </div>
                </header>
                <RightMenu/>
                {page}
                <footer class="footer">
                    <p>@ Просто текст</p>
                </footer>
            </div>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
        page: {
            isCreatePage: false,
            isSeparatePage: false,
        }
        //router: state.router,
        //...createRouteNodeSelector('')(state),
    }),
    dispatch => ({

    }),
)(App);


/*<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Page</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Page</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Page</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Page</a>
                </li>
            </ul>
        </div>
    </div>
</nav>*/
