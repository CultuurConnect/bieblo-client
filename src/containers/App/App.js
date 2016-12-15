import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import { loaded as appLoaded } from 'redux/modules/app';
import moment from 'moment';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user, loading: state.app.loading}),
  {logout, pushStateAppLoaded: appLoaded, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    pushStateAppLoaded: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = {
    loading: true
  };

  componentDidMount() {
    const {pushStateAppLoaded} = this.props;
    const setAppLoaded = () => { pushStateAppLoaded(); };
    setTimeout(setAppLoaded, 150);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user, loading} = this.props;
    const styles = require('./App.scss');

    const appClass = user ? styles.app : styles.login;

    return (
      <div className={appClass}>

        <Helmet {...config.app.head}/>
        { loading && <div className={styles.appLoading}><div className={styles.loader}>Loading...</div></div>}
        { user && <Navbar fixedTop fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse eventKey={0}>
            { user &&
            <Nav navbar pullRight>
              <Navbar.Text style={{ lineHeight: 2, color: '#FFFFFF' }}>
                Welkom {user.name}
              </Navbar.Text>
              <LinkContainer to="/login">
                <NavItem eventKey={1} title="User">
                  <i className="fa fa-user"/>
                </NavItem>
              </LinkContainer>
            </Nav>}
          </Navbar.Collapse>
        </Navbar>
        }
        { user &&
        <div className={styles.appSidebar}>
          <div className={styles.appSidebarInner}>
            <nav className="sidebar">
              <ul className="nav nav-sidebar">
                <li className="nav-heading">
                  <span>Main Navigation</span>
                </li>
                <li>
                  <LinkContainer to="/">
                    <div className="nav-item">
                      <em className="fa fa-tachometer"/>
                      <span>Dashboard</span>
                    </div>
                  </LinkContainer>
                </li>
                <li>
                  <LinkContainer to="/regions">
                    <div className="nav-item">
                      <em className="fa fa-map-marker"/>
                      <span>Regions</span>
                    </div>
                  </LinkContainer>
                </li>
                <li className="nav-heading">
                  <span>Region Navigation</span>
                </li>
                <li>
                  <LinkContainer to="/users">
                    <div className="nav-item">
                      <em className="fa fa-users"/>
                      <span>Users</span>
                    </div>
                  </LinkContainer>
                </li>
                <li>
                  <LinkContainer to="/tags">
                    <div className="nav-item">
                      <em className="fa fa-hashtag"/>
                      <span>Tags</span>
                    </div>
                  </LinkContainer>
                </li>
                <li>
                  <LinkContainer to="/illustrations">
                    <div className="nav-item">
                      <em className="fa fa-picture-o"/>
                      <span>Illustrations</span>
                    </div>
                  </LinkContainer>
                </li>
                <li>
                  <LinkContainer to="/books">
                    <div className="nav-item">
                      <div className="pull-right label label-info">3</div>
                      <em className="fa fa-book"/>
                      <span>Books</span>
                    </div>
                  </LinkContainer>
                </li>
              </ul>
            </nav>
          </div>
        </div>}

        <div className={styles.appContent}>
          <div className="content-wrapper">
            {this.props.children}
          </div>
        </div>

        <footer className={styles.appFooter}>
          <span>&copy; {moment().format('YYYY')} Bieblo</span>
        </footer>
      </div>
    );
  }
}
