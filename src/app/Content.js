import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuToolBar from '../components/MenuToolBar';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
var App = React.createClass({
    render: function () {
        return (
            <MuiThemeProvider>
                <div>
                    <MenuToolBar/>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
});
export default App;