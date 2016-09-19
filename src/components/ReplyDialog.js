/**
 * Created by dawizards on 16/9/19.
 */
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import CurrentUser from "../manager/CurrentUser";
import $ from 'jquery';
import API from '../app/Config';
import TextField from 'material-ui/TextField';

var ReplyDialog = React.createClass({
    getInitialState: function () {
        return {value: ''};
    },
    onCommentChanged: function (event) {
        this.setState({value: event.target.value});
    },
    doReply: function () {
        $.ajax({
            url: API + '/blog/replyComment',
            type: "POST",
            data: {
                belongTo: this.props.replyComment.id,
                content: this.state.value,
                createdBy: CurrentUser.getId(),
                replyTo: replyTo,
            },
            headers: {
                'token': CurrentUser.getToken(),
                'userID': CurrentUser.getId(),
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("Error-> " + data.Code + " " + data.Msg);
                } else {
                    alert("回复成功");
                    this.props.onHandleClose();
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log("Error in Ajax.");
            }
        });
    },
    render: function () {
        const actions = [
            <FlatButton
                label="回复"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.doReply}
            />,
            <FlatButton
                label="取消"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.onHandleClose}
            />,
        ];
        var hint = "回复";
        return (
            <Dialog
                actions={actions}
                modal={false}
                open={this.props.open}
                autoScrollBodyContent={true}
                autoDetectWindowHeight={true}
                onRequestClose={this.props.onHandleClose}
            >
                <TextField
                    hintText={hint}
                    errorText="必填"
                    rows={3}
                    multiLine={false}
                    fullWidth={true}
                    onChange={this.onCommentChanged}
                />
            </Dialog>
        );
    }
});
export default ReplyDialog;