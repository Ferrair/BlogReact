/**
 * Created by dawizards on 16/9/14.
 */
import cookie from 'react-cookie';

var CurrentUser = Object.create({
    username: "未登录",
    id: null,
    password: null,
    coverUri: null,
    avatarUri: null,
    token: null,

    getUsername: function () {
        return cookie.load("CurrentUser").username;
    },
    getId: function () {
        return cookie.load("CurrentUser").id;
    },
    getCoverUri: function () {
        return cookie.load("CurrentUser").coverUri;
    },
    getAvatarUri: function () {
        return cookie.load("CurrentUser").avatarUri;
    },
    getToken: function () {
        return cookie.load("CurrentUser").token;
    },

    save: function () {
        cookie.save('CurrentUser', this, {path: '/'});
    },

    isLogin: function () {
        return cookie.load("CurrentUser").id != null;
    }
});
export default CurrentUser;