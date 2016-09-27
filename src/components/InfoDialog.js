/**
 * Created by dawizards on 16/9/14.
 */
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import CurrentUser from "../manager/CurrentUser";
import {Card, CardActions, CardHeader, CardMedia} from 'material-ui/Card';
import AvatarDialog from './AvatarDialog';
import CoverDialog from './CoverDialog';

var InfoDialog = React.createClass({

    getInitialState: function () {
        return {openAvatarDialog: false, openCoverDialog: false};
    },

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
                modal={true}
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
                        <div>
                            <FlatButton label="更换头像" onClick={this.openAvatarDialog}/>
                            <AvatarDialog open={this.state.openAvatarDialog}
                                          onHandleClose={this.closeAvatarDialog}/>
                        </div>
                        <p/>
                        <div>
                            <FlatButton label="更换背景" onClick={this.openCoverDialog}/>
                            <CoverDialog open={this.state.openCoverDialog}
                                         onHandleClose={this.closeCoverDialog}/>
                        </div>
                    </CardActions>
                </Card>
            </Dialog>
        );
    },
    closeCoverDialog: function () {
        this.setState({openCoverDialog: false});
    },
    openCoverDialog: function () {
        this.setState({openCoverDialog: true});
    },

    closeAvatarDialog: function () {
        this.setState({openAvatarDialog: false});
    },
    openAvatarDialog: function () {
        this.setState({openAvatarDialog: true});
    },
});
export default InfoDialog;