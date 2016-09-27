/**
 * Created by dawizards on 16/9/27.
 */
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import API from '../app/Config';
import CurrentUser from "../manager/CurrentUser";
import $ from 'jquery';

const style = {
    height: 'auto',
    width: 'auto',
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

var CoverDialog = React.createClass({
    getInitialState: function () {
        return {file: null};
    },
    upload: function () {
    },
    render: function () {
        const actions = [
            <FlatButton
                label="上传"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.upload}
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
                actions={actions}
                title='上传封面'
                modal={true}
                open={this.props.open}
                autoScrollBodyContent={true}
                autoDetectWindowHeight={true}
                onRequestClose={this.props.onHandleClose}
            >
                <Paper style={style} zDepth={1} rounded={false}>
                    文件名: {this.state.file ? this.state.file.name : '未上传'}
                    <p/>
                    文件大小(KB): {this.state.file ? this.state.file.size : '未上传'}
                </Paper>
            </Dialog>
        );
    },
});
export default CoverDialog;