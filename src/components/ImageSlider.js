/**
 * Created on 2016/9/7.
 *
 * @author 王启航
 * @version 1.0
 */
import React from 'react';
import Carousel  from 'nuka-carousel';

var ImageSlider = React.createClass({
    getInitialState: function () {
        return {imageList: []};
    },
    componentDidMount: function () {
        var data = [
            {url: "http://placehold.it/1000x400/ffffff/c0392b/&text=slide1"},
            {url: "http://placehold.it/1000x400/ffffff/c0392b/&text=slide2"},
            {url: "http://placehold.it/1000x400/ffffff/c0392b/&text=slide3"},
            {url: "http://placehold.it/1000x400/ffffff/c0392b/&text=slide4"},
            {url: "http://placehold.it/1000x400/ffffff/c0392b/&text=slide5"},
            {url: "http://placehold.it/1000x400/ffffff/c0392b/&text=slide6"},
        ];
        this.setState({imageList: data});
    },

    render: function () {
        var itemImage = this.state.imageList.map(function (item) {
            return (
                <img src={item.url}/>
            );
        });
        return (
            <Carousel autoplay={true} speed={500}>
                {itemImage}
            </Carousel>
        );
    }
});

export default ImageSlider;