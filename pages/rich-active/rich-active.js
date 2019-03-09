getApp();

var a = wx.getExtConfigSync() ? wx.getExtConfigSync() : {};

a.domain, a.appid, a.merchantId;

Page({
    data: {
        descriptionUrl: ""
    },
    onLoad: function(a) {
        console.log(a);
        var t = this;
        t.setData({
            descriptionUrl: a.link,
            name: a.name
        }), t.data.name ? (wx.setNavigationBarTitle({
            title: t.data.name
        }), t.setData({
            descriptionUrl: t.data.descriptionUrl + "?name=" + t.data.name
        })) : (wx.setNavigationBarTitle({
            title: "租赁"
        }), t.setData({
            descriptionUrl: t.data.descriptionUrl + "?name=租赁"
        })), console.log(t.data.descriptionUrl);
    }
});