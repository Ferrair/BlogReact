/**
 * Created on 2016/7/27.
 *
 * @author 王启航
 * @version 1.0
 */

import React from 'react';
import Blog from './Blog';


var BlogList = React.createClass({
    getInitialState: function () {
        return {blogList: []};
    },
    componentDidMount: function () {
        var data = [
            {
                id: 1,
                title: "Pete Hunt",
                type: "Java",
                abstractStr: "完成了上面红色方框中的工作。JRE 的来加载器从硬盘中读取 class 文件，" +
                "载入到系统分配给 JVM 的内存区域–运行数据区（`Runtime Data Areas`). 然后执行引擎解释或者编译类文件，" +
                "转化成特定 CPU 的机器码，CPU 执行机器码，至此完成整个过程。",
                createdAt: "2016:12:21",
                times: "3"
            },
            {
                id: 2,
                title: "Jordan Walke",
                type: "Android",
                abstractStr: "完成了上面红色方框中的工作。JRE 的来加载器从硬盘中读取 class 文件，" +
                "载入到系统分配给 JVM 的内存区域–运行数据区（`Runtime Data Areas`). 然后执行引擎解释或者编译类文件，" +
                "转化成特定 CPU 的机器码，CPU 执行机器码，至此完成整个过程。",
                createdAt: "2016:12:21",
                times: "4"
            }
        ];
        this.setState({blogList: data});
    },
    render: function () {
        var itemBlog = this.state.blogList.map(function (item) {
            return (
                <Blog key={item.id} blog={item}>
                    {item.abstractStr}
                </Blog>
            );
        });
        return (
            <div className="BlogList">
                {itemBlog}
            </div>
        );
    }
});

export default BlogList;
