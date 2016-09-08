import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import LeftDrawer from "./LeftDrawer"
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import {IndexLink} from 'react-router'

var MenuToolBar = React.createClass({
    getInitialState: function () {
        return {open: false};
    },

    scrollToTop: function () {
    },

    drawer: function () {
        this.setState({open: !this.state.open});
    },

    render: function () {
        return (
            <div className="MenuToolBar">
                <AppBar
                    title={<IndexLink to="/" activeClassName="active">王启航的博客</IndexLink>}
                    onTitleTouchTap={this.scrollToTop}
                    iconElementLeft={<IconButton onTouchTap={this.drawer}><NavigationMenu/></IconButton>}
                    iconElementRight={
                        <div>
                            <FlatButton label="主页" secondary={true} href="/#/index"/>
                            <FlatButton label="博客" secondary={true} href="/#/blog-list"/>
                            <FlatButton label="产品" secondary={true} href="/#/work-list"/>
                            <FlatButton label="关于" secondary={true} href="/#/about"/>
                        </div>
                    }
                />
                <Drawer docked={false}
                        width={300}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}>
                    <MenuItem>
                        <Avatar
                            size={50}
                        />
                    </MenuItem>
                    <MenuItem>用户名</MenuItem>
                    <MenuItem>登陆</MenuItem>
                </Drawer>
            </div>
        );
    }
});

export default MenuToolBar;