/**
 * Created on 2016/7/27.
 *
 * @author 王启航
 * @version 1.0
 */

import React from 'react';
import BlogItem from './BlogItem';
import $ from 'jquery';
import API from '../app/Config';

var BlogList = React.createClass({
    getInitialState: function () {
        return {blogList: []};
    },
    // Todo : Ajax
    componentDidMount: function () {
        $.get({
            url: API + '/blog',
            data: {
                pageNum: 1,
                includeContent: true
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("Error-> " + data.Code + " " + data.Msg);
                    return;
                }
                this.setState({blogList: data.Result});
                console.log("BlogList-> " + this.state.blogList);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log("Error in Ajax.");
            }
        });
    },
    render: function () {
        var itemBlog = this.state.blogList.map(function (item) {
            return (
                <BlogItem key={item.id} blog={item}>
                    {item.abstractStr}
                </BlogItem>
            );
        });
        return (
            <div className="BlogList">
                {itemBlog}
            </div>
        );
    }
});

export default BlogList;
