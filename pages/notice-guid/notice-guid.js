getApp();

var t = wx.getExtConfigSync() ? wx.getExtConfigSync() : {};

t.domain, t.appid, t.merchantId;

Page({
    data: {
        applicationId: "",
        longitude: "",
        latitude: "",
        level: "",
        markers: [ {
            iconPath: "/images/map-blue.png",
            latitude: "",
            longitude: "",
            width: 26,
            height: 26,
            id: 0
        } ],
        currentTabsIndex: 1
    },
    onLoad: function(t) {
        var a = this, e = t.mapLongitude, n = t.mapLatitude, o = t.mapLevel;
        a.setData({
            longitude: e,
            latitude: n,
            level: o
        }), a.data.markers[0].longitude = a.data.longitude, a.data.markers[0].latitude = a.data.latitude, 
        console.log(a.data.longitude), console.log(a.data.latitude), console.log(a.data.level), 
        console.log(a.data.markers[0].iconPath), a.mapCtx = wx.createMapContext("Map");
    },
    getCenterLocation: function() {
        this.mapCtx.getCenterLocation(function(t) {
            console.log(t.longitude), console.log(t.latitude);
        });
    },
    tabChange: function(t) {
        var a = this, e = t.target.dataset.index, n = t.target.dataset.longitude, o = t.target.dataset.latitude;
        a.setData({
            longitude: n,
            latitude: o,
            currentTabsIndex: e
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShow: function() {
        this.mapCtx = wx.createMapContext("Map");
    }
});