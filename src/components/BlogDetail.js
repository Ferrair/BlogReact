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

var BlogDetail = React.createClass({
    getInitialState: function () {
        return {blog: [], commentList: [], value: ''};
    },
    // Todo : Ajax
    componentDidMount: function () {
        console.log("Id-> " + this.props.params.id);
        var blog =
        {
            id: 1,
            title: "Pete Hunt",
            type: "Java",
            abstractStr: "完成了上面红色方框中的工作。JRE 的来加载器从硬盘中读取 class 文件，" +
            "载入到系统分配给 JVM 的内存区域–运行数据区（`Runtime Data Areas`). 然后执行引擎解释或者编译类文件，" +
            "转化成特定 CPU 的机器码，CPU 执行机器码，至此完成整个过程。",
            content: "完成了上面红色方框中的工作。JRE 的来加载器从硬盘中读取 class 文件，" +
            "载入到系统分配给 JVM 的内存区域–运行数据区（`Runtime Data Areas`). 然后执行引擎解释或者编译类文件，" +
            "转化成特定 CPU 的机器码，CPU 执行机器码，至此完成整个过程。",
            createdAt: "2016:12:21",
            times: "3"
        };
        var commentList = [
            {
                id: 1,
                content: "I am a comment",
                createdAt: "2016:12:21",
                creatorAvatarUri: null,
                creatorName: "王启航"
            },
            {
                id: 2,
                content: "I am a comment",
                createdAt: "2016:12:21",
                creatorAvatarUri: null,
                creatorName: "王启航"
            }
        ];

        this.setState({blog: blog, commentList: commentList});
    },

    rawMarkup: function (content) {
        var md = new Remarkable();
        var rawMarkup = md.render(content);
        return {__html: rawMarkup};
    },
    onTextChanged: function (event) {
        this.setState({value: event.target.value});
    },

    // Todo : Ajax
    onPostComment: function () {
        console.log("Post a comment-> " + this.state.value);
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
                    value={this.state.value}
                    onChange={this.onTextChanged}
                />
                <FlatButton label="发表" primary={true} onClick={this.onPostComment}/>
            </div>
        );
    },

    // Todo
    onReply :function (id) {
        console.log("Reply" + id);
    },
    // Todo
    onDelete :function (id) {
        console.log("Delete" + id);
    }

});
export default BlogDetail;