该项目是学习`JS`和`React`,`material-ui`做的，可以用来学习`React`的一些基本用法。项目的目的是做一个前段的个人网站。但是美工没有好好做。。所以大家谅解。

# ScrennShoot(具体的内容可以看`./screenshoot文件夹`)


# Getting Started

1.clone it from github.

```
git clone https://github.com/Ferrair/BlogReact.git
```

2.install the react modules.

```
npm install
```

3.start the Node.js server.

```
npm start
```
Now you can run your local server: `http://localhost:3000`

但是这里使用了`Ajax`请求数据，没有设施`CROS`。所以，没有数据会报错。

# 讲解

路由
-----
路由就是用户在地址栏输入一个网址，`React`就会进行处理，那么这里运用的第三方库是`react-router`，这是官方推荐的第三方库。
在 `./src/app/app.js`

```
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index}/>
            <Route path="/about" component={About}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/work-list" component={WorkList}/>
            <Route path="/blog-list" component={BlogList}/>
            <Route path="/blog/:id" component={BlogDetail}/>
        </Route>
    </Router>
), document.getElementById('app'));
```
这一部分就是路由拉。具体`react-router`的知识可以看[React Router 使用教程
](http://www.ruanyifeng.com/blog/2016/05/react_router.html)

这里主要有这样的说明:`/blog/1`就是进入了`BlogDetail`且向其传入参数`1`.

在`BlogDetail`中可以这样得到`this.props.params.id`传入的参数

子类组建和父类组建交互
-----
这里主要说`LeftDrawer`与其子类`LoginDialog`的交互
`LoginDialog`其内部维护了一个`Dialog`，内部的`Dialog`需要给其传入以下参数
 
 - `open` 对话框是否打开
 - `onHandleClose` 关闭的动作
 - `doLogin`登陆具体操作
 
 
 我的想法是这样的，在 `LeftDrawer`进行具体的登录操作（AJAX请求数据）为什么呢？因为登录不仅有用户登录还有管理员登录，其登录请求的API不一样啊所以把具体操作放在外面而不是在`LoginDialog`里面。在`LoginDialog`只是一些UI操作。
 
 ```
 //# LoginDialog
 
 import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

var LoginDialog = React.createClass({

    getInitialState: function () {
        return {username: '', password: ''};
    },

    doLogin: function () {
        this.props.doLogin(this.state.username,this.state.password);
    },

    onUserNameChanged: function (event) {
        this.setState({username: event.target.value});
    },

    onPasswordChanged: function (event) {
        this.setState({password: event.target.value});
    },

    render: function () {
        const actions = [
            <FlatButton
                label="登陆"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.doLogin}
            />,
            <FlatButton
                label="取消"
                primary={true}
                keyboardFocused={false}
                onTouchTap={this.props.onHandleClose}
            />,
        ];

        return (
            <Dialog
                title="登陆"
                actions={actions}
                modal={false}
                open={this.props.open}
                autoDetectWindowHeight={true}
                onRequestClose={this.props.onHandleClose}
            >
                <TextField
                    hintText="账号"
                    errorText="必填"
                    rows={1}
                    multiLine={false}
                    fullWidth={true}
                    onChange={this.onUserNameChanged}
                />
                <p/>

                <TextField
                    hintText="密码"
                    errorText="必填"
                    type="password"
                    rows={1}
                    multiLine={false}
                    fullWidth={true}
                    onChange={this.onPasswordChanged}
                />
            </Dialog>
        );
    }
});
export default LoginDialog;
 ```
 
 可以看到`props`就是从父类传来的，那么在`LeftDrawer`里面有什么呢？
 
 
 ```
 var LeftDrawer = React.createClass({
    getInitialState: function () {
        return {openLoginDialog: false, openInfoDialog: false, openRegisterDialog: false};

    },
    doLogin: function (username, password) {
        if (Validator.isEmpty(username, "你的用户名不能为空哦!"))
            return;
        if (Validator.isEmpty(password, "你的密码不能为空哦!"))
            return;
        $.ajax({
            url: API + '/user/login',
            type: "POST",
            data: {
                username: username,
                password: password,
            },
            success: (data) => {
                if (data.Code != 100) {
                    console.error("Error-> " + data.Code + " " + data.Msg);
                } else {
                    console.log("Login Success");
                    CurrentUser.id = data.Result[0].id;
                    CurrentUser.avatarUri = data.Result[0].avatarUri;
                    CurrentUser.password = data.Result[0].password;
                    CurrentUser.coverUri = data.Result[0].coverUri;
                    CurrentUser.username = data.Result[0].username;
                    CurrentUser.token = data.Result[0].token;
                    CurrentUser.save();
                }
                this.closeLoginDialog();
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log("Error in Ajax.");
                this.closeLoginDialog();
            }
        });
    },
    render: function () {
        var username = '未登录';
        if (CurrentUser.isLogin()) {
            username = CurrentUser.getUsername();
        }

        return (
            <Drawer docked={false}
                    width={300}
                    open={this.props.open}
                    onRequestChange={this.props.onRequestChange}>
                <MenuItem style={avatarStyle} onClick={this.openInfoDialog}>
                    <Avatar size={50}/>
                    {username}
                    {/*Open user information dialog.*/}
                    <InfoDialog open={this.state.openInfoDialog} onHandleClose={this.closeInfoDialog}/>
                </MenuItem>
                <MenuItem onClick={this.openLoginDialog}>
                    登陆
                    {/*Open login dialog.*/}
                    <LoginDialog open={this.state.openLoginDialog}
                                 onHandleClose={this.closeLoginDialog}
                                 doLogin={this.doLogin}
                    />
                </MenuItem>

                <MenuItem onClick={this.openRegisterDialog}>
                    注册
                    {/*Open Register dialog.*/}
                    <RegisterDialog open={this.state.openRegisterDialog} onHandleClose={this.closeRegisterDialog}/>
                </MenuItem>

            </Drawer>
        );
    },

    openInfoDialog: function () {
        // Open Login Dialog, force user to login.
        if (!CurrentUser.isLogin()) {
            this.openLoginDialog();
            return;
        }
        this.setState({openInfoDialog: true});
    },
    closeInfoDialog: function () {
        this.setState({openInfoDialog: false});
    },

    closeLoginDialog: function () {
        this.setState({openLoginDialog: false});
    },
    openLoginDialog: function () {
        this.setState({openLoginDialog: true});
    },

    closeRegisterDialog: function () {
        this.setState({openRegisterDialog: false});
    },
    openRegisterDialog: function () {
        this.setState({openRegisterDialog: true});
    },
});
var avatarStyle = {
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "20px",
    marginBottom: "20px",
};

export default LeftDrawer;
 ```
 
 大家主要看这里
 
 ```
 LoginDialog open={this.state.openLoginDialog}
                                 onHandleClose={this.closeLoginDialog}
                                 doLogin={this.doLogin}
 ```
 
 这里就是把消息传递进去呀。



但是这里有更好的东西，那就是`EventEmitterMixin`，观察者模式实现了各个组件之间的通信，大家可以去看看它的官网。



# 一些坑


`DELETE`请求
-----
`DELETE`和`POST`不一样，必须这样写

```
 /*
         * The DELETE method requests that the origin server delete the resource identified by the Request-URI.
         */
$.ajax({
            url: API + '/blog/deleteCommentById' + '?' + $.param({"id": item.id}),
            type: "DELETE",
            headers: {
                'token': CurrentUser.getToken(),
                'userID': CurrentUser.getId(),
            },
        });
```

`Array.map`的`this`
-----

`this.state.blogList.map(function(),this)`
第二个参数，表示在第一个function中，若是使用`this`关键字，其就是第二个参数的`this`。这样就不要原来的hack写法
`var _this = this；`

# Todo List
 - 分页查询暂时还没写
 - UI 没有美化
