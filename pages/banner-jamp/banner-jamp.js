getApp();

var t = wx.getExtConfigSync() ? wx.getExtConfigSync() : {};

t.domain, t.appid, t.merchantId;

Page({
    data: {
        descriptionUrl: "",
        title: ""
    },
    onLoad: function(t) {
        console.log(t);
        var a = this;
        a.setData({
            descriptionUrl: t.url,
            title: t.title
        }), a.data.title ? (wx.setNavigationBarTitle({
            title: a.data.title
        }), a.setData({
            descriptionUrl: a.data.descriptionUrl + "?name=" + a.data.title
        })) : (wx.setNavigationBarTitle({
            title: ""
        }), a.setData({
            descriptionUrl: a.data.descriptionUrl + "?name=活动详情"
        })), console.log(a.data.descriptionUrl);
    }
});