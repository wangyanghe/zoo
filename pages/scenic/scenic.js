getApp();

var t = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, a = t.domain;

t.appid, t.merchantId;

Page({
    data: {
        descriptionUrl: "",
        merchantId: ""
    },
    onLoad: function(t) {
        var e = this;
        e.setData({
            merchantId: t.merchantId
        }), wx.request({
            url: a + "/api/zhihuijingqu/applet/merchant/scenic/get?merchantId=" + e.data.merchantId,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(t) {
                var a = t.data.descriptionUrl;
                t.data.success ? e.setData({
                    descriptionUrl: a
                }) : wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "fail"
                });
            },
            complete: function(t) {}
        });
    }
});