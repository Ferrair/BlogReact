/**
 * Created on 2016/8/2.
 *
 * @author 王启航
 * @version 1.0
 */
import ReactDOM from 'react-dom';
import {Router, hashHistory, Route, IndexRoute} from 'react-router'
import React from 'react';

import App from './Content'
import About from "../components/About";
import Index from "../components/Index";
import BlogList from "../components/BlogList";
import WorkList from "../components/WorkList";
import BlogDetail from "../components/BlogDetail";
/*
 * 嵌套路由：先加载App,在加载其子类组件
 */
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index}/>
            <Route path="/about" component={About}/>
            <Route path="/work-list" component={WorkList}/>
            <Route path="/blog-list" component={BlogList}/>
            <Route path="/blog/:id" component={BlogDetail}/>
        </Route>
    </Router>
), document.getElementById('app'));

