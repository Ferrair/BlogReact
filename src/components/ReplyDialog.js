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
import Validator from '../manager/Validator';

var ReplyDialog = React.createClass({
    getInitialState: function () {
        return {value: ''};
    },
    onCommentChanged: function (event) {
        this.setState({value: event.target.value});
    },
    doReply: function () {
        if (Validator.isEmpty(this.state.value, "你的回复不能为空哦!"))
            return;

        $.ajax({
            url: API + '/blog/replyComment',
            type: "POST",
            data: {
                belongTo: this.props.blog.id,
                content: this.state.value,
                createdBy: CurrentUser.getId(),
                replyTo: this.props.replyComment.id,
            },
            headers: {
                'token': CurrentUser.getToken(),
                'userID': CurrentUser.getId(),
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("Error-> " + data.Code + " " + data.Msg);
                } else {
                    /*
                     * Inform BlogDetail to update commentList.
                     */
                    this.eventEmitter('emit', 'replySuccess', data.Result[0]);
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
                keyboardFocused={false}
                onTouchTap={this.props.onHandleClose}
            />,
        ];
        var hint = "回复 ";
        if (this.props.replyComment != null) {
            hint += this.props.replyComment.creatorName;
        }
        return (
            <Dialog
                actions={actions}
                modal={false}
                title='回复评论'
                open={this.props.open}
                autoScrollBodyContent={true}
                autoDetectWindowHeight={true}
                onRequestClose={this.props.onHandleClose}
            >
                <TextField
                    hintText={hint}
                    errorText="必填，回复最多200字哦"
                    value={this.state.value}
                    rows={1}
                    rowsMax={8}
                    multiLine={true}
                    fullWidth={true}
                    onChange={this.onCommentChanged}
                />
            </Dialog>
        );
    }
});
export default ReplyDialog;