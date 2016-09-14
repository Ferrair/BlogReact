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

var LoginDialog = React.createClass({

    getInitialState: function () {
        return {username: '', password: ''};
    },

    doLogin: function () {
        console.log("Post a comment-> " + this.state.username + " " + this.state.password);
        CurrentUser.id = 1;
        CurrentUser.username = "王启航";
        CurrentUser.coverUri="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQOstyJjaKQ8a3N_nKwOvWA23WORQOP8MBkzT_Zo0xfdH0Wb1afwXMQJsg";
        CurrentUser.avatarUri="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQOstyJjaKQ8a3N_nKwOvWA23WORQOP8MBkzT_Zo0xfdH0Wb1afwXMQJsg";
        /*
         * Close the login dialog by call onHandleClose in this.props(from LeftDrawer).
         */
        this.props.onHandleClose();
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
                keyboardFocused={true}
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