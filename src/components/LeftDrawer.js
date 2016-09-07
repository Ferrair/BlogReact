/**
 * Created on 2016/9/7.
 *
 * @author 王启航
 * @version 1.0
 */
import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

var LeftDrawer = React.createClass({
    getInitialState: function () {
        return {open: false};
    },
    componentDidMount: function () {
        this.setState({open: this.props.open});
    },

    render: function () {
        return (
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
        );
    }
});

export default LeftDrawer;