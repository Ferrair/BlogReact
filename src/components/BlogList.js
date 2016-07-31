/**
 * Created on 2016/7/27.
 *
 * @author 王启航
 * @version 1.0
 */

import React from 'react';
import Remarkable from "remarkable";
import {Card, CardHeader, CardText} from 'material-ui/Card';

var Blog = React.createClass({
    getInitialState: function () {
        return {
            expanded: false,
            content: null
        };
    },
    componentDidMount: function () {
        var content = "我将是一个文章的内容哦";
        this.setState({content: content});
    },
    rawMarkup: function (content) {
        var md = new Remarkable();
        var rawMarkup = md.render(content);
        return {__html: rawMarkup};
    },
    handleExpand: function (newExpandedState) {
        this.setState({expanded: newExpandedState});
    },
    render: function () {
        return (
            <div className="Blog">
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpand}>
                    <CardHeader
                        title={this.props.blog.title} subtitle={this.props.blog.type}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    { !this.state.expanded ?
                        <CardText>
                            <span dangerouslySetInnerHTML={this.rawMarkup(this.props.children.toString())}/>
                        </CardText>
                        : null
                    }
                    <CardText expandable={true}>
                        <span dangerouslySetInnerHTML={this.rawMarkup(this.state.content)}/>
                    </CardText>
                    <CardText
                        children={"查看次数：" + this.props.blog.times + "创建时间：" + this.props.blog.createdAt.toString()}/>
                </Card>
            </div>
        );
    }

});

var BlogList = React.createClass({
    getInitialState: function () {
        return {blogList: []};
    },
    componentDidMount: function () {
        var data = [
            {
                id: 1,
                title: "Pete Hunt",
                type: "Java",
                abstractStr: "完成了上面红色方框中的工作。JRE 的来加载器从硬盘中读取 class 文件，" +
                "载入到系统分配给 JVM 的内存区域–运行数据区（`Runtime Data Areas`). 然后执行引擎解释或者编译类文件，" +
                "转化成特定 CPU 的机器码，CPU 执行机器码，至此完成整个过程。",
                createdAt: "2016:12:21",
                times: "3"
            },
            {
                id: 2,
                title: "Jordan Walke",
                type: "Android",
                abstractStr: "完成了上面红色方框中的工作。JRE 的来加载器从硬盘中读取 class 文件，" +
                "载入到系统分配给 JVM 的内存区域–运行数据区（`Runtime Data Areas`). 然后执行引擎解释或者编译类文件，" +
                "转化成特定 CPU 的机器码，CPU 执行机器码，至此完成整个过程。",
                createdAt: "2016:12:21",
                times: "4"
            }
        ];
        this.setState({blogList: data});
    },
    render: function () {
        var itemBlog = this.state.blogList.map(function (item) {
            return (
                <Blog key={item.id} blog={item}>
                    {item.abstractStr}
                </Blog>
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
