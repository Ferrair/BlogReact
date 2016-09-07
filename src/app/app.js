/**
 * Created on 2016/8/2.
 *
 * @author 王启航
 * @version 1.0
 */
import ReactDOM from 'react-dom';
import About from "../components/About";
import Index from "../components/Index";
import BlogList from "../components/BlogList";
import BlogDetail from "../components/BlogDetail";
import {Router, hashHistory, Route, IndexRoute} from 'react-router'
import React from 'react';
import App from './Content'
/*const routeConfig = [{
 path: '/',
 component: App,
 indexRoute: {component: About},
 childRoutes: [
 {
 path: 'blog',
 indexRoute: BlogList,
 childRoutes: [
 {
 path: ':id',
 component: BlogDetail,
 },
 ],
 }
 ]
 }];*/
/*
 ReactDOM.render(<Router  routes={routeConfig} history={browserHistory}/>, document.getElementById('app'));*/


/*
 * 嵌套路由：先加载App,在加载其子类组件
 */
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index}/>
            <Route path="/index" component={Index}/>
            <Route path="/about" component={About}/>
            <Route path="/blog-list" component={BlogList}/>
            <Route path="/blog/:id" component={BlogDetail}/>
        </Route>
    </Router>
), document.getElementById('app'));

