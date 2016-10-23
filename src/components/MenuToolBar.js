import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import LeftDrawer from "./LeftDrawer"
import {IndexLink} from 'react-router'

var MenuToolBar = React.createClass({
    getInitialState: function () {
        return {open: false};
    },

    scrollToTop: function () {
    },

    openDrawer: function () {
        this.setState({open: !this.state.open});
    },
    render: function () {
        return (
            <div className="MenuToolBar">
                <AppBar
                    title={<IndexLink to="/" activeClassName="active">王启航的博客</IndexLink>}
                    onTitleTouchTap={this.scrollToTop}
                    iconElementLeft={<IconButton onTouchTap={this.openDrawer}><NavigationMenu/></IconButton>}
                    iconElementRight={
                        <div>
                            <FlatButton label="博客" secondary={true} href="http://www.wangqihang.cn:8080/Blog/#/blog-list"/>
                            <FlatButton label="产品" secondary={true} href="http://www.wangqihang.cn:8080/Blog/#/work-list"/>
                            <FlatButton label="关于" secondary={true} href="http://www.wangqihang.cn:8080/Blog/#/about"/>
                        </div>
                    }
                />
                <LeftDrawer open={this.state.open} onRequestChange={open=>this.setState({open})}/>
            </div>
        );
    }
});
export default MenuToolBar;
