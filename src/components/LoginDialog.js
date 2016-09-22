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

var LoginDialog = React.createClass({

    getInitialState: function () {
        return {username: '', password: ''};
    },

    doLogin: function () {
        this.props.doLogin(this.state.username,this.state.password);
    },

    onUserNameChanged: function (event) {
        this.setState({username: event.target.value});
    },

    onPasswordChanged: function (event) {
        this.setState({password: event.target.value});
    },

    render: function () {
        const actions = [
            <FlatButton
                label="登陆"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.doLogin}
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
                title="登陆"
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
                    type="password"
                    rows={1}
                    multiLine={false}
                    fullWidth={true}
                    onChange={this.onPasswordChanged}
                />
            </Dialog>
        );
    }
});
export default LoginDialog;