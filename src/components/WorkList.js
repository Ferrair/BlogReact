/**
 * Created on 2016/9/8.
 *
 * @author 王启航
 * @version 1.0
 */
import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 500,
        overflowY: 'auto',
        marginBottom: 24,
    },
};

var WorkList = React.createClass({
    getInitialState: function () {
        return {workList: []};
    },
    // Todo : Ajax
    componentDidMount: function () {
        var data = [
            {
                id: 1,
                title: "饭点",
                description: "那里不会，点哪里",
                fileName: "2016:12:21",
                logoUrl: "3"
            },
            {
                id: 2,
                title: "指尖",
                description: "广袤世界，在你指尖",
                fileName: "2016:12:21",
                logoUrl: "3"
            }
        ];
        this.setState({workList: data});
    },
    // Todo
    onDownload:function (event) {
        console.log("Download Work");
    },

    render: function () {
        return (
            <div className="WorkList">
                <GridList
                    cellHeight={200}
                    style={styles.gridList}>
                    <Subheader>Android APP</Subheader>
                    {this.state.workList.map((item) => (
                        <GridTile
                            key={item.img}
                            title={item.title}
                            subtitle={<span><b>{item.description}</b></span>}
                            actionIcon={<IconButton onClick={this.onDownload}><FileFileDownload/></IconButton>}>
                            <img src={item.logoUrl}/>
                        </GridTile>
                    ))}
                </GridList>
            </div>
        );
    }
});

export default WorkList;
