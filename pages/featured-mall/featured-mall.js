function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

require("../../libs/amap-wx.js"), getApp();

var e, a = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, o = a.domain, n = (a.appid, 
a.merchantId);

wx.createInnerAudioContext();

Page({
    data: (e = {
        tabArr: {
            curHdIndex: 0,
            curBdIndex: 0
        },
        name: "",
        groupList: [],
        goodsList: [],
        groupIndex: [],
        seletedIndex: 0,
        pageIndex: 1,
        pageSize: 15,
        firstDataID: 0,
        firstDataName: "",
        groupname: "",
        groupid: "",
        indicatorDots: !0,
        autoplay: !0,
        interval: 3e3,
        height: "",
        current: 1,
        flag: 0,
        total: 0,
        noticeShow: 0,
        noticeShowList: [],
        noticeItems: [],
        noticeMoney: "",
        tickets: [],
        notice: [],
        applications: [],
        images: [ "/images/11.jpg", "/images/12.png" ],
        skin: {},
        loadingTime: "",
        scrollTop: 100,
        left: 20
    }, t(e, "height", 20), t(e, "ListHeight", 15), t(e, "noticeHeight", 15), t(e, "marginTop", 0), 
    t(e, "userInfo", {}), t(e, "descriptionUrl", ""), t(e, "loading", ""), t(e, "msgList", []), 
    t(e, "token", ""), t(e, "appLen", ""), t(e, "isLast", !1), e),
    onLoad: function(t) {
        var e = this;
        e.setData({
            name: t.name
        }), e.data.name ? wx.setNavigationBarTitle({
            title: e.data.name
        }) : wx.setNavigationBarTitle({
            title: "特色商城"
        }), e.query();
    },
    goodsDetails: function(t) {
        var e = t.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "/pages/featured-details/featured-details?goodsid=" + e
        });
    },
    tabFun: function(t) {
        var e = this, a = t.currentTarget.dataset.id, i = (t.currentTarget.dataset.id, t.currentTarget.dataset.groupid), s = t.currentTarget.dataset.groupname, r = {};
        r.curHdIndex = a, r.curBdIndex = a, e.setData({
            tabArr: r,
            seletedIndex: a,
            groupname: s,
            groupid: i
        }), wx.request({
            url: o + "/api/mall/member/list_goods",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: JSON.stringify({
                goodsGroupId: i,
                merchantId: n,
                pageIndex: 1,
                pageSize: 15,
                totalCount: 0
            }),
            success: function(t) {
                var a = t.data.goodsList;
                t.data.success ? e.setData({
                    goodsList: a
                }) : wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "fail",
                    icon: "none"
                });
            },
            complete: function(t) {}
        });
    },
    query: function() {
        var t = this;
        wx.request({
            url: o + "/api/mall/member/list_group_name?merchantId=" + n,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(e) {
                var a = e.data.groupList, i = [];
                a && a.forEach(function(e, a) {
                    if (0 == a) {
                        var o = e.goodsGroupId, n = e.groupName;
                        t.setData({
                            firstDataID: o,
                            firstDataName: n
                        });
                    }
                }), e.data.success ? (t.setData({
                    groupList: a,
                    groupIndex: i
                }), 0 == t.data.tabArr.curHdIndex && 0 == t.data.tabArr.curBdIndex && wx.request({
                    url: o + "/api/mall/member/list_goods",
                    method: "POST",
                    header: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    data: JSON.stringify({
                        goodsGroupId: t.data.firstDataID,
                        merchantId: n,
                        pageIndex: 1,
                        pageSize: 15,
                        totalCount: 0
                    }),
                    success: function(e) {
                        var a = e.data.goodsList;
                        e.data.success ? t.setData({
                            goodsList: a
                        }) : wx.showToast({
                            title: e.data.message,
                            icon: "none"
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "fail",
                            icon: "none"
                        });
                    },
                    complete: function(t) {}
                })) : wx.showToast({
                    title: e.data.message,
                    icon: "none"
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            },
            complete: function(t) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onTitleClick: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        if (!this.data.isLast) {
            var t = this, e = t.data.pageIndex + 1;
            t.setData({
                pageIndex: e
            }), wx.request({
                url: o + "/api/mall/member/list_goods",
                method: "POST",
                header: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: JSON.stringify({
                    merchantId: n,
                    pageIndex: e,
                    pageSize: t.data.pageSize,
                    goodsGroupId: t.data.groupid
                }),
                success: function(e) {
                    var a = e.data.goodsList;
                    if (e.data.success) if (0 == a.length) t.setData({
                        isLast: !0
                    }); else {
                        var o = t.data.goodsList.concat(a);
                        console.log(o), t.setData({
                            isLast: !1,
                            goodsList: o,
                            total: e.data.totalCount
                        });
                    } else wx.showToast({
                        title: e.data.message,
                        icon: "none"
                    });
                },
                fail: function(t) {
                    wx.showToast({
                        title: "fail",
                        icon: "none"
                    });
                },
                complete: function(t) {}
            });
        }
    },
    onShareAppMessage: function() {
        return {
            title: "My App",
            desc: "My App description",
            path: "pages/index/index"
        };
    }
});