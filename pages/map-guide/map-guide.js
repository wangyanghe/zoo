getApp();

var t = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, a = (t.domain, t.mapDomain), e = (t.appid, 
t.merchantId);

Page({
    data: {
        descriptionUrl: "",
        latitude: "",
        longitude: ""
    },
    onLoad: function(t) {
        var n = this;
        wx.getLocation({
            type: "wgs84",
            success: function(t) {
                n.setData({
                    latitude: t.latitude,
                    longitude: t.longitude
                });
            },
            fail: function() {
                wx.showToast({
                    title: "定位失败"
                });
            }
        });
        var i = new Date().getTime(), o = wx.getStorageSync("mapTitle");
        void 0 != o && null != o && "" != o || (o = "景区导览"), void 0 == t.latitude || null == t.latitude || "" == t.latitude ? n.setData({
            descriptionUrl: a + "/map/map_guide.html?merchantId=" + e + "&title=" + o + "," + i + "&loglat=" + n.data.longitude + "," + n.data.latitude
        }) : n.setData({
            descriptionUrl: a + "/map/map_guide.html?merchantId=" + e + "&title=" + o + "," + i + "&loglat=" + n.data.longitude + "," + n.data.latitude + "&data=" + t.longitude + "," + t.latitude + "&leve=" + t.scale
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});