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
                    <div style={{
                        width: '60%',
                        maxWidth: 1000,
                        margin: '0 auto',
                    }}>
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
});
export default App;