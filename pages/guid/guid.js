var a = require("../../libs/amap-wx.js"), t = (getApp(), wx.getExtConfigSync() ? wx.getExtConfigSync() : {}), e = t.domain, o = (t.appid, 
t.merchantId), s = wx.createInnerAudioContext();

Page({
    data: {
        applicationId: "",
        scale: "",
        longitude: "",
        latitude: "",
        polyline: [],
        "ground-overlays": [],
        markers: [ {
            iconPath: "/images/map-blue.png",
            id: 0,
            latitude: 30.149487,
            longitude: 119.985513,
            width: 25,
            height: 30
        } ],
        mapmenueList: [],
        showCard: !1,
        cardData: [],
        cardItem: "",
        showMore: !0,
        list: [],
        chooseTab: 0,
        flag: !0,
        menueList: [],
        cancelModal: !1,
        isNoticeFlag: !1
    },
    onReady: function() {
        this.mapCtx = wx.createMapContext("map");
    },
    onLoad: function(a) {
        var t = this;
        t.mapCtx = wx.createMapContext("map"), a.scale && a.latitude && a.longitude && t.setData({
            scale: a.scale,
            latitude: a.latitude,
            longitude: a.longitude,
            isNoticeFlag: !0
        }), t.query();
    },
    query: function() {
        var a = this;
        console.log("query加载"), wx.request({
            url: e + "/api/zhihuijingqu/applet/map/list_all_mark",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: {
                merchantId: o
            },
            success: function(t) {
                console.log("success");
                var e = t.data.list, o = [];
                if (e) {
                    e.forEach(function(t, e) {
                        o.push({
                            mapMarkTypeName: t.mapMarkTypeName,
                            defaultUrl: t.mapMarkTypeIconDefaultUrl,
                            selectedUrl: t.mapMarkTypeIconSelectedUrl,
                            id: e,
                            mapMarkTypeId: t.mapMarkTypeId
                        }), 0 == e && a.setData({
                            markers: t.marks,
                            cardData: t.marks,
                            cardItem: t.marks
                        });
                    });
                    var s = [], i = !1;
                    a.data.markers.forEach(function(t, e) {
                        a.data.isNoticeFlag && t.mapMarkLongitude == a.data.longitude && t.mapMarkLatitude == a.data.latitude && (i = !0), 
                        s.push({
                            id: t.mapMarkId,
                            iconPath: t.mapMarkTypeIconUrl,
                            longitude: t.mapMarkLongitude,
                            latitude: t.mapMarkLatitude,
                            mapMarkTypeId: t.mapMarkTypeId,
                            width: 25,
                            height: 30
                        });
                    }), a.data.isNoticeFlag && !i && s.push({
                        longitude: a.data.longitude,
                        latitude: a.data.latitude,
                        width: 25,
                        height: 30
                    }), a.setData({
                        markers: s
                    });
                }
                if (console.log(a.data.markers), t.data.success) {
                    if (!a.data.isNoticeFlag) {
                        var n = t.data.longitude, r = t.data.latitude, l = t.data.mapLevel;
                        a.setData({
                            longitude: n,
                            latitude: r,
                            scale: l
                        });
                    }
                    a.setData({
                        list: e,
                        menueList: o
                    }), console.log(a.data.list), console.log(a.data.menueList);
                } else wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            },
            fail: function(a) {
                wx.showToast({
                    title: "queryfail"
                });
            },
            complete: function(a) {}
        });
    },
    markertap: function(a) {
        var t = this;
        console.log(a), console.log(a.markerId);
        a.markerId;
        var e = t.data.cardData;
        e && e.forEach(function(e, o) {
            a.markerId == e.mapMarkId && (e.mapMarkDescription.length > 30 ? (e.mapMarkDescription = e.mapMarkDescription, 
            wx.getSystemInfo({
                success: function(a) {
                    console.log(a.model), console.log(a.system), console.log(a.pixelRatio), console.log(a.windowWidth), 
                    console.log(a.windowHeight), console.log(a.language), console.log(a.version), console.log(a.platform);
                }
            }), e.desc = e.mapMarkDescription.slice(0, 27) + "...") : (e.desc = e.mapMarkDescription, 
            e.mapMarkDescription = e.mapMarkDescription), t.setData({
                showCard: !t.data.showCard,
                cardItem: e
            }), console.log(t.data.cardItem.mapMarkDescription), s.src = e.mapMarkAudioUrl);
        }), s.autoplay = !1, t.setData({
            flag: !0
        }), console.log(t.data.cardData);
    },
    showMore: function() {
        this.setData({
            showMore: !1
        });
    },
    showLess: function() {
        this.setData({
            showMore: !0
        });
    },
    hideModal: function() {
        s.pause(), this.setData({
            flag: !1,
            showCard: !1,
            showMore: !0
        });
    },
    handleTabClick: function(a) {
        var t = this, e = a.currentTarget.dataset.index, o = (a.currentTarget.dataset.id, 
        t.data.list);
        console.log(o), t.setData({
            chooseTab: e
        }), o.forEach(function(a, o) {
            e == o && t.setData({
                markers: a.marks,
                cardData: a.marks
            });
        });
        var s = [];
        t.data.markers.forEach(function(a, t) {
            s.push({
                id: a.mapMarkId,
                iconPath: a.mapMarkTypeIconUrl,
                longitude: a.mapMarkLongitude,
                latitude: a.mapMarkLatitude,
                mapMarkTypeId: a.mapMarkTypeId,
                width: 25,
                height: 30
            });
        }), t.setData({
            markers: s
        });
    },
    scenicDetail: function(a) {
        var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.title;
        wx.navigateTo({
            url: "/pages/scenic-details/scenic-details?descriptionUrl=" + t + "&title=" + e
        }), this.setData({
            showCard: !1
        }), s.pause();
    },
    playAudio: function() {
        var a = this;
        console.log(a.data.flag), a.data.flag ? (s.play(), a.setData({
            flag: !1
        })) : (s.pause(), a.setData({
            flag: !0
        })), s.onError(function(a) {
            console.log(a.errMsg), console.log(a.errCode);
        }), s.onEnded(function() {
            a.setData({
                flag: !0
            }), s.startTime = 0;
        });
    },
    tap: function(t) {
        var e = this;
        console.log("定位"), console.log(this.data.cardItem);
        var o = new a.AMapWX({
            key: "58d71279be64a80db02f3bb9107cea27"
        });
        wx.getLocation({
            type: "gcj02",
            success: function(a) {
                console.log(a), o.getWalkingRoute({
                    origin: a.longitude + "," + a.latitude,
                    destination: e.data.cardItem.mapMarkLongitude + "," + e.data.cardItem.mapMarkLatitude,
                    success: function(t) {
                        var o = [];
                        if (o.push({
                            longitude: parseFloat(a.longitude),
                            latitude: parseFloat(a.latitude)
                        }), t.paths && t.paths[0] && t.paths[0].steps) for (var s = t.paths[0].steps, i = 0; i < s.length; i++) for (var n = s[i].polyline.split(";"), r = 0; r < n.length; r++) o.push({
                            longitude: parseFloat(n[r].split(",")[0]),
                            latitude: parseFloat(n[r].split(",")[1])
                        });
                        o.push({
                            longitude: parseFloat(e.data.cardItem.mapMarkLongitude),
                            latitude: parseFloat(e.data.cardItem.mapMarkLatitude)
                        }), e.setData({
                            polyline: [ {
                                points: o,
                                color: "#E60012",
                                width: 6,
                                arrowLine: !0,
                                arrowIconPath: "/images/topright.png"
                            } ]
                        });
                    },
                    fail: function(a) {}
                });
            }
        }), this.setData({
            flag: !1,
            showCard: !1,
            cancelModal: !0
        }), s.pause();
    },
    cancelModal: function() {
        this.setData({
            polyline: [],
            cancelModal: !1
        });
    },
    onHide: function() {
        console.log(1.1111111111111112e32), this.setData({
            showMore: !0,
            showCard: !0,
            flag: !0
        }), s.pause();
    },
    onShow: function() {
        this.setData({
            showMore: !0
        });
    },
    onUnload: function() {
        this.setData({
            showMore: !1,
            showCard: !1,
            flag: !0
        }), s.pause();
    }
});