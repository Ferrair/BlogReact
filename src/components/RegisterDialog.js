/**
 * Created by dawizards on 16/9/17.
 */
/**
 * Created on 16/9/9.
 *
 * @author 王启航
 * @version 1.0
 */
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import CurrentUser from "../manager/CurrentUser";
import $ from 'jquery';
import API from '../app/Config';

var RegisterDialog = React.createClass({

    getInitialState: function () {
        return {username: '', password: '', confirmPassword: ''};
    },

    doRegister: function () {
        $.post({
            url: API + '/user/register',
            data: {
                username: this.state.username,
                password: this.state.password,
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("Error-> " + data.Code + " " + data.Msg);
                    return;
                }
                console.log("Register Success");
                CurrentUser.id = data.Result[0].id;
                CurrentUser.avatarUri = data.Result[0].avatarUri;
                CurrentUser.password = data.Result[0].password;
                CurrentUser.coverUri = data.Result[0].coverUri;
                CurrentUser.username = data.Result[0].username;
                /*
                 * Do Login.
                 */
                this.doLogin();
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log("Error in Ajax.");
            }
        });
        /*
         * Close the login dialog by call onHandleClose in this.props(from LeftDrawer).
         */
        this.props.onHandleClose();
    },

    doLogin: function () {
        if (this.state.password != this.state.confirmPassword) {
            alert("两次密码不一致");
            return;
        }

        $.post({
            url: API + '/user/login',
            data: {
                username: this.state.username,
                password: this.state.password,
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("Error-> " + data.Code + " " + data.Msg);
                } else {
                    console.log("Login Success");

                    CurrentUser.token = data.Result[0].token;
                    CurrentUser.save();
                }
                /*
                 * Close the register dialog by call onHandleClose in this.props(from LeftDrawer).
                 */
                this.props.onHandleClose();
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log("Error in Ajax.");
                /*
                 * Close the register dialog by call onHandleClose in this.props(from LeftDrawer).
                 */
                this.props.onHandleClose();
            }
        });
    },
    onUserNameChanged: function (event) {
        this.setState({username: event.target.value});
    },

    onPasswordChanged: function (event) {
        this.setState({password: event.target.value});
    },

    onConfirmPasswordChanged: function (event) {
        this.setState({confirmPassword: event.target.value});
    },

    render: function () {
        const actions = [
            <FlatButton
                label="注册"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.doRegister}
            />,
            <FlatButton
                label="取消"
                primary={true}
                keyboardFocused={false}
                onTouchTap={this.props.onHandleClose}
            />,
        ];

        return (
            <Dialog
                title="注册"
                actions={actions}
                modal={false}
                open={this.props.open}
                autoDetectWindowHeight={true}
                onRequestClose={this.props.onHandleClose}
            >
                <TextField
                    hintText="账号"
                    errorText="必填"
                    rows={1}
                    multiLine={false}
                    fullWidth={true}
                    onChange={this.onUserNameChanged}
                />
                <p/>

                <TextField
                    hintText="密码"
                    errorText="必填"
                    rows={1}
                    multiLine={false}
                    fullWidth={true}
                    onChange={this.onPasswordChanged}
                />
                <TextField
                    hintText="确认密码"
                    errorText="必填"
                    rows={1}
                    multiLine={false}
                    fullWidth={true}
                    onChange={this.onConfirmPasswordChanged}
                />
            </Dialog>
        );
    }
});
export default RegisterDialog;