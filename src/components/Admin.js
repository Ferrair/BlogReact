/**
 * Created by dawizards on 16/9/22.
 */
import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import LoginDialog from "./LoginDialog";
import $ from 'jquery';
import API from '../app/Config';
import Validator from '../manager/Validator';
import FlatButton from 'material-ui/FlatButton';
var MarkdownEditor = require('react-markdown-editor').MarkdownEditor;

/**
 * TODO
 * React-Route OnEnter,OnLeave.
 */
var Admin = React.createClass({
    getInitialState: function () {
        return {openLoginDialog: false, allUser: [], allBlog: []};
    },
    getAllUser: function (pageNum) {
        $.ajax({
            url: API + '/user/all',
            data: {
                pageNum: pageNum
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("请求出错->" + data.Code + " " + data.Msg);
                    return;
                }
                this.setState({allUser: data.Result});
            },
            error: function () {
                console.log("AJAX错了");
            }
        });
    },
    getAllBlog: function (pageNum) {
        $.ajax({
            url: API + '/blog',
            data: {
                pageNum: pageNum,
                includeContent: false
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("请求出错-> " + data.Code + " " + data.Msg);
                    return;
                }
                this.setState({allBlog: data.Result});
            },
            error: function () {
                console.log("Error in Ajax.");
            }
        });
    },
    componentDidMount: function () {
        /*
         *  Get Blog.
         */
        this.getAllUser(1);
        /*
         *  Get CommentList.
         */
        this.getAllBlog(1);
    },
    doLogin: function (username, password) {
        if (Validator.isEmpty(username, "你的用户名不能为空哦!"))
            return;
        if (Validator.isEmpty(password, "你的密码不能为空哦!"))
            return;
        $.ajax({
            url: API + '/admin/login',
            type: "POST",
            data: {
                username: username,
                password: password,
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("Error-> " + data.Code + " " + data.Msg);
                } else {
                    if (data.Result[0] == true) {
                        this.closeLoginDialog();
                    }
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log("Error in Ajax.");
            }
        });
    },

    deleteUser: function (id) {

    },
    render: function () {
        var content = null;
        if (!this.state.openLoginDialog) {
            content =
                <Tabs>
                    <Tab label="所有用户">
                        <List>
                            {
                                this.state.allUser.map(function (item) {
                                    return (
                                        <ListItem
                                            primaryText={item.username}
                                            secondaryText={item.password}
                                            leftAvatar={<Avatar src={item.avatarUri}/>}
                                            rightIconButton={<FlatButton label="删除" primary={true}/>}
                                        >
                                        </ListItem>
                                    );
                                })
                            }
                        </List>
                    </Tab>
                    <Tab label="所有博客">
                        <List>
                            {
                                this.state.allBlog.map(function (item) {
                                    return (
                                        <ListItem
                                            primaryText={item.title}
                                            secondaryText={item.type}
                                        >
                                            {item.createdAt}
                                        </ListItem>
                                    );
                                })
                            }
                        </List>
                    </Tab>
                    <Tab label="发表博客">
                        <MarkdownEditor initialContent="Input your blog here." iconsSet="font-awesome"/>
                        <FlatButton label="发表" primary={true}/>
                    </Tab>
                </Tabs>;
        }

        return (
            <div>
                <LoginDialog open={this.state.openLoginDialog}
                             onHandleClose={this.closeLoginDialog}
                             doLogin={this.doLogin}
                />
                {content}
            </div>


        );
    },
    closeLoginDialog: function () {
        this.setState({openLoginDialog: false});
    },
    openLoginDialog: function () {
        this.setState({openLoginDialog: true});
    },
});
export default Admin;