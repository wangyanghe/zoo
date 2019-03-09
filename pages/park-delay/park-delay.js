getApp();

var a = wx.getExtConfigSync() ? wx.getExtConfigSync() : {};

a.domain, a.appid, a.merchantId;

Page({
    data: {
        parkOrderPayId: "",
        payShows: !0,
        parkOrderId: "",
        carNumber: ""
    },
    onLoad: function(a) {
        this.setData({
            parkOrderPayId: a.lastTime,
            parkOrderId: a.parkOrderId
        });
    },
    delayBtn: function() {
        var a = this.data.parkOrderId;
        wx.navigateTo({
            url: "/pages/park-details/park-details?parkOrderId=" + a
        });
    },
    onCounterPlusOne: function(a) {
        console.log(a);
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShow: function() {}
});