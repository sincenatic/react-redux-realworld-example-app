import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onChangeAccountNumber: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'accountNumber', value }),
  onChangePhoneNumber: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'phoneNumber', value }),
  onSubmit: (username, email, password, accountNumber, phoneNumber) => {
    const payload = agent.Auth.register(username, email, password, accountNumber, phoneNumber);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.changeAccountNumber = ev => this.props.onChangeAccountNumber(ev.target.value);
    this.changePhoneNumber = ev => this.props.onChangePhoneNumber(ev.target.value);
    this.submitForm = (username, email, password, accountNumber, phoneNumber) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, email, password, accountNumber, phoneNumber);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;
    const accountNumber = this.props.accountNumber;
    const phoneNumber = this.props.phoneNumber;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">สมัครสมาขิก</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  มีบัญชีแล้ว?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(username, email, password, accountNumber, phoneNumber)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="ชื่่อ-นามสกุล"
                      value={this.props.username}
                      onChange={this.changeUsername} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="อีเมล"
                      value={this.props.email}
                      onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="รหัสผ่าน"
                      value={this.props.password}
                      onChange={this.changePassword} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="เลขที่บัญชี"
                      value={this.props.accountNumber}
                      onChange={this.changeAccountNumber} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="เบอร์โทรศัพท์"
                      value={this.props.phoneNumber}
                      onChange={this.changePhoneNumber} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    ตกลง
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
