getApp();

var n = wx.getExtConfigSync();

n.domain, n.appid, n.merchantId;

Page({
    onLoad: function(n) {
        console.info("Page onLoad with query: " + JSON.stringify(n));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onTitleClick: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
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