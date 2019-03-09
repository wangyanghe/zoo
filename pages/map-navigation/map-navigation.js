getApp();

var a = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, t = (a.domain, a.mapDomain), e = (a.appid, 
a.merchantId);

Page({
    data: {
        title: "",
        mapMarkId: "",
        scenicSpotId: "",
        mapMark: {}
    },
    onLoad: function(a) {
        var t = this;
        wx.setNavigationBarTitle({
            title: "点位信息"
        }), t.setData({
            mapMarkId: a.mapMarkId,
            scenicSpotId: a.scenicSpotId
        }), t.query();
    },
    query: function() {
        var a = this;
        wx.request({
            url: t + "/api/destination/applet/map/get_map_mark",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: JSON.stringify({
                merchantId: e,
                mapMarkId: a.data.mapMarkId,
                scenicSpotId: a.data.scenicSpotId
            }),
            success: function(t) {
                var e = t.data.mapMark;
                t.data.success ? (a.setData({
                    mapMark: e
                }), void 0 != e.address && null != e.address && "" != e.address || (e.address = ""), 
                wx.openLocation({
                    longitude: Number(e.mapMarkLongitude),
                    latitude: Number(e.mapMarkLatitude),
                    name: e.mapMarkName,
                    address: e.address,
                    success: function(a) {}
                })) : wx.showToast({
                    title: t.data.message
                });
            },
            fail: function(a) {},
            complete: function(a) {}
        });
    }
});