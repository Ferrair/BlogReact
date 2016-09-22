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
import $ from 'jquery';
import API from '../app/Config';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: '45%',
        height: '45%',
        overflowY: 'auto',
        marginBottom: 24,
    },
};

var WorkList = React.createClass({
    getInitialState: function () {
        return {workList: []};
    },

    componentDidMount: function () {
        $.get({
            url: API + '/work',
            data: {
                pageNum: 1,
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("请求出错->" + data.Code + " " + data.Msg);
                    return;
                }
                this.setState({workList: data.Result});
                console.log(this.state.workList);
            },
            error: function () {
                console.log("AJAX错了");
            }
        });
    },
    // Todo Download
    onDownload: function (url) {
        console.log("Download Work" + url);
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
                            actionIcon={<IconButton
                                onClick={this.onDownload(item.logoUrl)}><FileFileDownload/></IconButton>}>
                            <img src={item.logoUrl}/>
                        </GridTile>
                    ))}
                </GridList>
            </div>
        );
    }
});

export default WorkList;
