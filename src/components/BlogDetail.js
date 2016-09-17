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

var BlogDetail = React.createClass({
    propTypes: {
        blog: React.PropTypes.object,
        value: React.PropTypes.string.isRequired,
    },

    getInitialState: function () {
        return {blog: "", commentList: [], value: ''};
    },
    componentDidMount: function () {
        /*
         *  Get Blog.
         */
        $.get({
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
                console.log(this.state.blog);
            },
            error: function () {
                console.log("AJAX错了");
            }
        });
        /*
         *  Get CommentList.
         */
        $.get({
            url: API + '/blog/queryComment',
            data: {
                /*
                 * id is from BlogItem.
                 */
                belongTo: this.props.params.id,
                pageNum: 1
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("请求出错->" + data.Code + " " + data.Msg);
                    return;
                }
                this.setState({commentList: data.Result});
                console.log("CommentList-> " + this.state.commentList);
            },
            error: function () {
                console.log("AJAX错了");
            }
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

    onPostComment: function () {
        console.log(CurrentUser);
        $.post({
            url: API + '/blog/appendComment',
            data: {
                belongTo: this.state.blog.id,
                content: this.state.value,
                createdBy: CurrentUser.id,
            },
            headers: {
                'token': CurrentUser.token,
                'userID': CurrentUser.id,
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("Error-> " + data.Code + " " + data.Msg);
                } else {
                    this.setState({value: '', commentList: this.commentList.push(data.Result[0])});
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log("Error in Ajax.");
                this.setState({value: ''});
            }
        });
    },

    render: function () {
        var itemComment = this.state.commentList.map(function (item) {
            return (
                <Comment key={item.id} comment={item}/>
            );
        });
        return (
            <div>
                {/*博客*/}
                <h1>{this.state.blog.title}</h1>
                <span dangerouslySetInnerHTML={this.rawMarkup(this.state.blog.content)}/>

                {/*评论列表*/}
                <List>
                    <Subheader>所有评论</Subheader>
                    {itemComment}
                </List>
                {/*评论区*/}
                <TextField
                    hintText="你的评论"
                    errorText="最多200字"
                    rows={1}
                    rowsMax={8}
                    multiLine={true}
                    fullWidth={true}
                    onChange={this.onTextChanged}
                />
                <FlatButton label="发表" primary={true} onClick={this.onPostComment}/>
            </div>
        );
    },

    // Todo
    onReply: function (id) {
        console.log("Reply" + id);
    },
    // Todo
    onDelete: function (id) {
        console.log("Delete" + id);
    }

});
export default BlogDetail;