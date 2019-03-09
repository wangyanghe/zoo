require("../../libs/amap-wx.js"), getApp();

var a = wx.getExtConfigSync() ? wx.getExtConfigSync() : {};

a.domain, a.appid, a.merchantId, wx.createInnerAudioContext();

Page({
    data: {
        descriptionUrl: "",
        name: ""
    },
    onLoad: function(a) {
        var t = this;
        t.setData({
            descriptionUrl: a.id,
            name: a.name
        }), t.data.name ? (wx.setNavigationBarTitle({
            title: t.data.name
        }), t.setData({
            descriptionUrl: t.data.descriptionUrl + "?name=" + t.data.name
        })) : (wx.setNavigationBarTitle({
            title: "图文详情"
        }), t.setData({
            descriptionUrl: t.data.descriptionUrl + "?name=图文详情"
        })), console.log(t.data.descriptionUrl);
    }
});