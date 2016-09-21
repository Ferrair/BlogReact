/**
 * Created on 2016/8/2.
 *
 * @author 王启航
 * @version 1.0
 */

import React from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Comment from "./Comment";
import Remarkable from "remarkable";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CurrentUser from "../manager/CurrentUser";
import $ from 'jquery';
import API from '../app/Config';
import EventEmitterMixin from 'react-event-emitter-mixin';
import ReplyDialog from './ReplyDialog';
import Validator from '../manager/Validator';

var BlogDetail = React.createClass({
    /*
     * mixins 是一个可复用的组件相当与PHP的trait.
     */
    mixins: [EventEmitterMixin],
    propTypes: {
        blog: React.PropTypes.object,
        value: React.PropTypes.string.isRequired,
    },

    getInitialState: function () {
        return {blog: "", commentList: [], value: '', openReplyDialog: false, selectComment: null};
    },
    getBlog: function () {
        $.ajax({
            url: API + '/blog/queryById',
            data: {
                /*
                 * id is from BlogItem.
                 */
                id: this.props.params.id
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("请求出错->" + data.Code + " " + data.Msg);
                    return;
                }
                /*
                 * data.Result is always array.
                 */
                this.setState({blog: data.Result[0]});
            },
            error: function () {
                console.log("AJAX错了");
            }
        });
    },
    getComment: function (pageNum) {
        $.ajax({
            url: API + '/blog/queryComment',
            data: {
                /*
                 * id is from BlogItem.
                 */
                belongTo: this.props.params.id,
                pageNum: pageNum
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("请求出错->" + data.Code + " " + data.Msg);
                    return;
                }
                this.setState({commentList: data.Result});
            },
            error: function () {
                console.log("AJAX错了");
            }
        });
    }, componentDidMount: function () {
        /*
         *  Get Blog.
         */
        this.getBlog();
        /*
         *  Get CommentList.
         */
        this.getComment(1);
    },

    componentWillMount(){
        this.eventEmitter('on', 'reply', (comment)=> {
            this.onReply(comment);
        });

        this.eventEmitter('on', 'delete', (comment)=> {
            this.onDelete(comment);
        });
    },

    rawMarkup: function (content) {
        var md = new Remarkable();
        var rawMarkup = md.render(content);
        return {__html: rawMarkup};
    },
    onTextChanged: function (event) {
        this.setState({value: event.target.value});
    },

    doPostComment: function () {
        if (Validator.isEmpty(this.state.value, "你的评论不能为空哦!"))
            return;

        console.log(CurrentUser);
        $.ajax({
            url: API + '/blog/appendComment',
            type: "POST",
            data: {
                belongTo: this.state.blog.id,
                content: this.state.value,
                createdBy: CurrentUser.getId(),
            },
            headers: {
                'token': CurrentUser.getToken(),
                'userID': CurrentUser.getId(),
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("Error-> " + data.Code + " " + data.Msg);
                } else {
                }
                this.setState({value: ''});
                React.findDOMNode(this.refs.YourComment).value = '';
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log("Error in Ajax.");
                this.setState({value: ''});
                React.findDOMNode(this.refs.YourComment).value = '';
            }
        });
    },

    onReply: function (item) {
        console.log("Reply" + item);
        this.setState({openReplyDialog: true, selectComment: item});
    },

    onDelete: function (item) {
        this.setState({selectComment: item});
        $.ajax({
            url: API + '/blog/deleteById',
            type: "DELETE",
            data: {
                id: this.state.selectComment.id,
            },
            headers: {
                'token': CurrentUser.getToken(),
                'userID': CurrentUser.getId(),
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("Error-> " + data.Code + " " + data.Msg);
                } else {
                    this.setState({value: '', commentList: this.commentList.push([data.Result[0]])});
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log("Error in Ajax.");
                this.setState({value: ''});
            }
        });
    },

    render: function () {
        return (
            <div>
                {/*博客*/}
                <h1>{this.state.blog.title}</h1>
                <span dangerouslySetInnerHTML={this.rawMarkup(this.state.blog.content)}/>

                {/*评论列表*/}
                <List>
                    <Subheader>所有评论</Subheader>
                    {
                        //Todo undefined onReply onDelete?
                        this.state.commentList.map(function (item) {
                            return (
                                <Comment
                                    key={item.id}
                                    comment={item}
                                />
                            );
                        })
                    }
                </List>

                {/*评论区*/}
                <TextField
                    hintText='在此输入你的评论'
                    errorText="最多200字"
                    value={this.state.value}
                    rows={1}
                    rowsMax={8}
                    ref="YourComment"
                    multiLine={true}
                    fullWidth={true}
                    onChange={this.onTextChanged}
                />
                <FlatButton label="发表" primary={true} onClick={this.doPostComment}/>

                {/*回复评论Dialog*/}
                <ReplyDialog open={this.state.openReplyDialog}
                             replyComment={this.state.selectComment}
                             blog={this.state.blog}
                             onHandleClose={this.closeReplyDialog}
                />
            </div>
        );
    },

    closeReplyDialog: function () {
        this.setState({openReplyDialog: false});
    }
});
export default BlogDetail;