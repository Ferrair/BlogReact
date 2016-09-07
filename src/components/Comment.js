/**
 * Created on 2016/9/7.
 *
 * @author 王启航
 * @version 1.0
 */
import React from 'react';
import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

/*
 * Comment属性
 * id
 * content 评论内容
 * createdAt 创建时间
 * belongTo 被评论博客的ID
 * replyTo 回复评论的ID,可为空
 * createdBy 评论者的ID
 * creatorAvatarUri 评论者头像URL
 * creatorName 评论者名字
 */
var Comment = React.createClass({
    render: function () {
        return (
            <div className="Comment">
                <ListItem
                    primaryText={this.props.comment.creatorName}
                    secondaryText={this.props.comment.content}
                    leftAvatar={<Avatar size={40}/>}
                    initiallyOpen={false}
                    rightIconButton={rightIconMenu}/>
                <Divider inset={true}/>
            </div>
        );
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

const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>回复</MenuItem>
        <MenuItem>删除</MenuItem>
    </IconMenu>
);

export default Comment;