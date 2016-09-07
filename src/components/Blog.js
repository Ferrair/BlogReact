/**
 * Created on 2016/9/7.
 *
 * @author 王启航
 * @version 1.0
 */

import React from 'react';
import Remarkable from "remarkable";
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
                        children={"查看次数：" + this.props.blog.times + "   创建时间：" + this.props.blog.createdAt.toString()}>
                    </CardText>

                    <CardActions>
                        <FlatButton label="查看评论" primary={true} href="/#/blog/id=1"/>
                    </CardActions>
                </Card>
            </div>
        );
    }

});

export default Blog;