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
        if (cookie.load("CurrentUser") == null)
            return null;
        return cookie.load("CurrentUser").username;
    },
    getId: function () {
        if (cookie.load("CurrentUser") == null)
            return null;
        return cookie.load("CurrentUser").id;
    },
    getCoverUri: function () {
        if (cookie.load("CurrentUser") == null)
            return null;
        return cookie.load("CurrentUser").coverUri;
    },
    getAvatarUri: function () {
        if (cookie.load("CurrentUser") == null)
            return null;
        return cookie.load("CurrentUser").avatarUri;
    },
    getToken: function () {
        if (cookie.load("CurrentUser") == null)
            return null;
        return cookie.load("CurrentUser").token;
    },
    save: function () {
        cookie.save('CurrentUser', this, {path: '/'});
    },

    isLogin: function () {
        if (cookie.load("CurrentUser") == null)
            return false;
        return cookie.load("CurrentUser").id != null;
    }
});
export default CurrentUser;