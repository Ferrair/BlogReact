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
import TextField from 'material-ui/TextField';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

var MarkdownEditor = require('react-markdown-editor').MarkdownEditor;
var update = require('react-addons-update');
/**
 * FIXME MenuItem onClick be called atomically.
 */
var Admin = React.createClass({
    getInitialState: function () {
        return {openLoginDialog: false, allUser: [], allBlog: [], postBlog: '', blogTitle: ''};
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
            error: function () {
                console.log("Error in Ajax.");
            }
        });
    },
    postBlog: function () {
        if (Validator.isEmpty(this.state.postBlog, "你的博客不能为空哦!"))
            return;
        if (Validator.isEmpty(this.state.blogTitle, "你的博客标题不能为空哦!"))
            return;
        $.ajax({
            url: API + '/blog/publish',
            type: "POST",
            data: {},
            success: (data) => {
                if (data.Code != 100) {
                    console.error("Error-> " + data.Code + " " + data.Msg);
                } else {
                }
            },
            error: function () {
            }
        });
    },
    onContentChange: function (content) {
        this.setState({postBlog: content});
    },
    onTitleChange: function (event) {
        this.setState({blogTitle: event.target.value});
    },
    deleteBlog: function (blog) {
        $.ajax({
            url: API + '/blog/deleteById' + '?' + $.param({"id": blog.id}),
            type: "DELETE",
            success: (data) => {
                if (data.Code != 100) {
                    console.error("Error-> " + data.Code + " " + data.Msg);
                } else {
                    this.setState({allBlog: update(this.state.allBlog, {$splice: [[index, this.state.allBlog.indexOf(item) + 1]]})})
                }
            },
            error: function () {
                console.log("Error in Ajax.");
            }
        });
    },
    deleteUser: function (user) {
        $.ajax({
            url: API + '/user/deleteById' + '?' + $.param({"id": user.id}),
            type: "DELETE",
            success: (data) => {
                if (data.Code != 100) {
                    console.error("Error-> " + data.Code + " " + data.Msg);
                } else {
                    this.setState({allUser: update(this.state.allUser, {$splice: [[index, this.state.allUser.indexOf(item) + 1]]})})
                }
            },
            error: function () {
                console.log("Error in Ajax.");
            }
        });
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
                                        <div className="ItemUser">
                                            <ListItem
                                                primaryText={item.username}
                                                secondaryText={item.password}
                                                initiallyOpen={false}
                                                leftAvatar={<Avatar src={item.avatarUri}/>}
                                                rightIconButton={
                                                    <IconMenu iconButtonElement={iconButtonElement}>
                                                        {/*Delete*/}
                                                        {/*<MenuItem onClick={this.deleteUser(item)}>删除</MenuItem>*/}
                                                    </IconMenu>
                                                }
                                            />
                                            <Divider inset={true}/>
                                        </div>
                                    );
                                }, this)
                            }
                        </List>

                    </Tab>
                    <Tab label="所有博客">

                        <List>
                            {
                                this.state.allBlog.map(function (item) {
                                    return (
                                        <div className="ItemBlog">
                                            <ListItem
                                                primaryText={item.title}
                                                secondaryText={item.type}
                                                initiallyOpen={false}
                                                rightIconButton={
                                                    <IconMenu iconButtonElement={iconButtonElement}>
                                                        {/*Delete*/}
                                                        {/*<MenuItem onClick={this.deleteBlog(item)}>删除</MenuItem>*/}
                                                    </IconMenu>
                                                }
                                            >
                                                {item.createdAt}
                                            </ListItem>
                                            <Divider inset={true}/>
                                        </div>
                                    );
                                }, this)
                            }
                        </List>

                    </Tab>
                    <Tab label="发表博客">
                        <TextField
                            hintText='博客标题'
                            value={this.state.value}
                            rows={1}
                            multiLine={true}
                            fullWidth={true}
                            onChange={this.onTitleChange}
                        />
                        <MarkdownEditor onContentChange={this.onContentChange} initialContent="Input your blog here."
                                        iconsSet="font-awesome"/>
                        <FlatButton label="发表" primary={true} onClick={this.postBlog}/>
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

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="更多操作"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={grey400}/>
    </IconButton>
);
export default Admin;