/**
 * Created by dawizards on 16/9/14.
 */
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import CurrentUser from "../manager/CurrentUser";
import {Card, CardActions, CardHeader, CardMedia} from 'material-ui/Card';

var InfoDialog = React.createClass({

    render: function () {
        const actions = [
            <FlatButton
                label="好的"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.onHandleClose}
            />,
        ];

        return (
            <Dialog
                actions={actions}
                modal={false}
                open={this.props.open}
                autoScrollBodyContent={true}
                autoDetectWindowHeight={true}
                onRequestClose={this.props.onHandleClose}
            >
                <Card>
                    <CardHeader
                        title={CurrentUser.username}
                        avatar={CurrentUser.avatarUri}
                    />

                    <CardMedia>
                        <img src={CurrentUser.coverUri}/>
                    </CardMedia>

                    <CardActions>
                        <FlatButton label="更换头像"/>
                        <FlatButton label="更换背景"/>
                    </CardActions>
                </Card>
            </Dialog>
        );
    }
});
export default InfoDialog;