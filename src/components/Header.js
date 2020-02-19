import React from 'react';
import { Link } from 'react-router-dom';
import {
  LOGOUT,
  HOME_PAGE_UNLOADED
} from '../constants/actionTypes';
import { connect } from 'react-redux';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
          <button className="btn btn-md btn-outline-primary">
            หน้าหลัก
          </button>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
          <button className="btn btn-md btn-outline-primary">
            เข้าสู่ระบบ
          </button>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
          <button className="btn btn-md btn-outline-primary">
            สมัครสมาชิก
          </button>
          </Link>
        </li>

      </ul>
    );
  }
  return null;
};

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED })
});

const LoggedInView = (props) => {




  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

  

        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.username}`}
            className="nav-link">
            <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />
            {props.currentUser.username}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;ตั้งค่า
          </Link>
        </li>

        <li className="nav-item">
        <button
          className="btn btn-outline-danger"
          onClick={props.onClickLogout}
          >
          ลงชื่อออก
        </button>

        </li>
      </ul>
    );
  }


  return null;

};


class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">


          <Link to="/" className="navbar-brand">
            <img src="https://cdn.worldvectorlogo.com/logos/bitkub.svg" width='85px' height="auto" alt="betkub" />
            {this.props.appName.toLowerCase()}
          </Link>

          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} onClickLogout={this.props.onClickLogout} />


        </div>
      </nav>
    );
  }
}

export default connect(null,mapDispatchToProps)(Header);
