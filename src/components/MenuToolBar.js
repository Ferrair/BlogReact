import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

const MenuToolBar = () => (
    <div className="MenuToolBar">
        <AppBar
            title="王启航的博客"
            iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
            iconElementRight={
                <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem primaryText="Refresh"/>
                    <MenuItem primaryText="Help"/>
                    <MenuItem primaryText="Sign out"/>
                    <MenuItem primaryText="Sign in"/>
                </IconMenu>
            }

        />
    </div>
);

export default MenuToolBar;