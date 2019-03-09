getApp();

var e = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, t = e.domain;

e.appid, e.merchantId;

Page({
    data: {
        id: "",
        merchantNotice: {},
        detailContent: "",
        src: "",
        performName: ""
    },
    onLoad: function(e) {
        var t = this, a = e.id, o = e.performName;
        t.setData({
            id: a,
            performName: o
        }), t.data.performName ? wx.setNavigationBarTitle({
            title: t.data.performName
        }) : wx.setNavigationBarTitle({
            title: "表演介绍"
        }), t.query();
    },
    query: function() {
        var e = this, a = e.data.id;
        wx.request({
            url: t + "/api/zhihuijingqu/applet/notice/scenic_notice_detail?id=" + a,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(t) {
                var a = t.data.merchantNotice, o = a.richTextUrl + "?name=" + a.performName;
                t.data.success ? (e.setData({
                    merchantNotice: a,
                    src: o
                }), console.log(a.detailContent), console.log(e.data.src)) : wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "fail"
                });
            },
            complete: function(e) {}
        });
    },
    map: function(e) {
        var t = e.currentTarget.dataset.mapLatitude, a = e.currentTarget.dataset.mapLongitude, o = e.currentTarget.dataset.mapLevel;
        wx.navigateTo({
            url: "/pages/notice-guid/notice-guid?mapLatitude=" + t + "&mapLongitude=" + a + "&mapLevel=" + o
        }), console.log(t), console.log(a), console.log(o);
    },
    onPullDownRefresh: function() {
        this.query(), wx.stopPullDownRefresh();
    },
    onShow: function() {}
});