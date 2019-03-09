getApp();

var e = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, o = e.domain, n = e.appid, t = e.merchantId;

console.log(e), App({
    data: {
        token: ""
    },
    userName: "",
    userPhone: "",
    userID: "",
    appid: "",
    merchantId: "",
    domain: "",
    setUserNameAndPhone: function(e, o, n) {
        this.userName = e, this.userPhone = o, this.userID = n;
    },
    appExt: function(e, o, n) {
        this.appid = e, this.merchantId = o, this.domain = n;
    },
    onLaunch: function(e) {
        var o = this;
        console.log(e.query), console.log(e);
        var n = wx.getStorageSync("logs") || [];
        n.unshift(Date.now()), wx.setStorageSync("logs", n), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {
                        o.globalData.userInfo = e.userInfo, o.userInfoReadyCallback && o.userInfoReadyCallback(e);
                    }
                });
            }
        });
    },
    getPassInfo: function() {
        var e = this;
        return new Promise(function(s, a) {
            e.userInfo ? s(e.userInfo) : wx.login({
                success: function(e) {
                    e.code ? (console.log(o), wx.request({
                        url: o + "/api/zhihuijingqu/applet/weixin/member/weixin_login",
                        method: "post",
                        data: {
                            authCode: e.code,
                            appId: n,
                            merchantId: t
                        },
                        success: function(e) {
                            console.log(e), wx.setStorageSync("token", e.data.token);
                            var o = wx.getStorageSync("token");
                            return console.log(o), s();
                        },
                        fail: function(e) {
                            wx.showToast({
                                title: "请求失败"
                            });
                        }
                    })) : console.log("登录失败！" + e.errMsg);
                }
            });
        });
    },
    globalData: {
        userInfo: null,
        parkStatusItems: "",
        orderStatusItems: "",
        userInfoList: "",
        storeInfo: ""
    }
});