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
import LoginDialog from "./LoginDialog";
import InfoDialog from "./InfoDialog";
import CurrentUser from "../manager/CurrentUser";


var LeftDrawer = React.createClass({
    getInitialState: function () {
        return {openLoginDialog: false, openInfoDialog: false};

    },

    render: function () {
        return (
            <Drawer docked={false}
                    width={300}
                    open={this.props.open}
                    onRequestChange={this.props.onRequestChange}>
                <MenuItem style={avatarStyle} onClick={this.openInfoDialog}>
                    <Avatar
                        size={50}
                    />
                    {CurrentUser.username}
                    {/*Open user information dialog.*/}
                    <InfoDialog open={this.state.openInfoDialog} onHandleClose={this.closeInfoDialog}/>
                </MenuItem>
                <MenuItem onClick={this.openLoginDialog}>
                    登陆
                    {/*Open login dialog.*/}
                    <LoginDialog open={this.state.openLoginDialog} onHandleClose={this.closeLoginDialog}/>
                </MenuItem>

            </Drawer>
        );
    },

    openInfoDialog: function () {
        // Open Login Dialog, force user to login.
        if (CurrentUser.id == null) {
            this.openLoginDialog();
            return;
        }
        this.setState({openInfoDialog: true});
    },
    closeInfoDialog: function () {
        this.setState({openInfoDialog: false});
    },

    closeLoginDialog: function () {
        this.setState({openLoginDialog: false});
    },
    openLoginDialog: function () {
        this.setState({openLoginDialog: true});
    },
});
var avatarStyle = {
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "20px",
    marginBottom: "20px",
};

export default LeftDrawer;