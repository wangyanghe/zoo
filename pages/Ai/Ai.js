getApp();

var n = wx.getExtConfigSync(), t = n.domain, e = (n.appid, n.merchantId);

Page({
    data: {
        id: "",
        scene: ""
    },
    onLoad: function(n) {
        this.query();
    },
    test: function(n) {},
    query: function() {
        var n = this;
        wx.request({
            url: t + "/api/zhihuijingqu/applet/application/config",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: JSON.stringify({
                merchantId: e,
                applicationId: 7
            }),
            success: function(t) {
                var e = t.data.applicationAndConfigModel.list;
                t.data.success ? e.forEach(function(t, e) {
                    "id" == t.name && n.setData({
                        id: t.value
                    }), "scene" == t.name && n.setData({
                        scene: t.value
                    });
                }) : my.alert({
                    content: t.data.message
                });
            },
            fail: function(n) {
                my.alert({
                    content: "fail"
                });
            },
            complete: function(n) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onTitleClick: function() {},
    onPullDownRefresh: function() {
        my.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "My App",
            desc: "My App description",
            path: "pages/index/index"
        };
    }
});