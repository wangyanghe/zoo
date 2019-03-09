function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = getApp(), n = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, i = n.domain, o = (n.appid, 
n.merchantId);

Page({
    data: (e = {
        motto: "Hello World",
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        indicatorDots: !0,
        autoplay: !0,
        interval: 3e3,
        height: "",
        current: 0,
        flag: 0,
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        noticeShow: 0,
        noticeShowList: [],
        noticeItems: [],
        noticeMoney: "",
        tickets: [],
        notice: [],
        applications: [],
        images: [],
        skin: {},
        loadingTime: "",
        scrollTop: 100,
        left: 20
    }, t(e, "height", 20), t(e, "ListHeight", 15), t(e, "noticeHeight", 15), t(e, "marginTop", 0), 
    t(e, "userInfo", {}), t(e, "descriptionUrl", ""), t(e, "loading", ""), t(e, "msgList", []), 
    t(e, "token", ""), t(e, "appLen", ""), t(e, "canIUse", ""), t(e, "passListModelList", []), 
    t(e, "couponIsShow", !1), e),
    clickSwiper: function(t) {
        var e = this, a = t.currentTarget.dataset.linktype, n = t.currentTarget.dataset.url, i = t.currentTarget.dataset.title, o = e.data.images;
        console.log(o), "http_link" == a && wx.navigateTo({
            url: "/pages/banner-jamp/banner-jamp?url=" + n + "&title=" + i
        }), "inner_link" == a && "map" == n && wx.navigateTo({
            url: "/pages/map-guide/map-guide"
        }), "inner_link" == a && "notice" == n && wx.navigateTo({
            url: "/pages/notice/notice"
        }), "inner_link" == a && "ticket" == n && wx.navigateTo({
            url: "/pages/self-tricket/self"
        }), "inner_link" == a && "rate" == n && wx.navigateTo({
            url: "/pages/rate/rate"
        }), "inner_link" == a && "park" == n && wx.navigateTo({
            url: "/pages/park/park"
        }), "inner_link" == a && "shop" == n && wx.navigateTo({
            url: "/pages/featured-mall/featured-mall"
        });
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    onLoad: function() {
        var t = this;
        this.query();
        a.getPassInfo().then(function() {}).catch(function() {
            console.log("");
        }), a.globalData.userInfo ? this.setData({
            userInfo: a.globalData.userInfo,
            hasUserInfo: !0
        }) : this.data.canIUse ? a.userInfoReadyCallback = function(e) {
            t.setData({
                userInfo: e.userInfo,
                hasUserInfo: !0
            });
        } : wx.getUserInfo({
            success: function(e) {
                a.globalData.userInfo = e.userInfo, t.setData({
                    userInfo: e.userInfo,
                    hasUserInfo: !0
                });
            }
        }), console.log(this.data.userInfo);
    },
    getUserInfo: function(t) {
        console.log(t), a.globalData.userInfo = t.detail.userInfo, this.setData({
            userInfo: t.detail.userInfo,
            hasUserInfo: !0
        });
    },
    query: function() {
        var t = this;
        wx.request({
            url: i + "/api/zhihuijingqu/applet/skin/index",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: {
                merchantId: o
            },
            success: function(e) {
                var a = e.data.tickets, n = e.data.images, i = e.data.applications, o = "";
                i && (o = i.length, i.forEach(function(t) {
                    "map" == t.link && wx.setStorageSync("mapTitle", t.name);
                }));
                var s = e.data.notice;
                s.forEach(function(t, e) {
                    t.title = t.contents, t.url = "url";
                }), console.log(a), e.data.success ? (t.setData({
                    tickets: a,
                    images: n,
                    applications: i,
                    notice: s,
                    msgList: s,
                    appLen: o
                }), e.data.skin.title ? wx.setNavigationBarTitle({
                    title: e.data.skin.title
                }) : wx.setNavigationBarTitle({
                    title: "首页"
                }), console.log(t.data.notice), console.log(t.data.appLen), t.setTime()) : wx.showToast({
                    title: e.data.message
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "请求失败"
                });
            }
        });
    },
    notice: function() {
        var t = this, e = t.data.notice;
        console.log(e), 1 == t.data.noticeShow ? t.setData({
            noticeShow: 0,
            noticeShowList: []
        }) : t.setData({
            noticeShow: 1,
            noticeShowList: e
        });
    },
    scenic: function() {
        wx.navigateTo({
            url: "/pages/scenic/scenic?merchantId=" + o
        });
    },
    setTime: function() {
        var t = this, e = t.data.notice.length, a = 0;
        setInterval(function() {
            a < e ? (t.setData({
                marginTop: 30 * a
            }), a++) : (a = 0, t.setData({
                marginTop: 30 * a
            }), a++);
        }, 3e3);
    },
    receiveCoupon: function(t) {
        var e = t.currentTarget.dataset.id, a = wx.getStorageSync("token");
        wx.request({
            url: i + "/api/zhihuijingqu/pass/save",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                token: a
            },
            data: JSON.stringify({
                passId: e
            }),
            success: function(t) {},
            fail: function(t) {
                wx.showToast({
                    title: "请求失败"
                });
            },
            complete: function(t) {}
        });
    },
    clearCoupon: function() {
        this.setData({
            couponIsShow: !1
        });
    },
    toPay: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.ids, n = t.currentTarget.dataset.name, i = t.currentTarget.dataset.idcard, o = t.currentTarget.dataset.idname, s = t.currentTarget.dataset.phonenum;
        wx.navigateTo({
            url: "/pages/purchase-details/purchase-details?ticketInfoId=" + e + "&ticketName=" + n + "&idcardEnable=" + i + "&usernameEnabled=" + o + "&phoneNumberEnabled=" + s + "&ids=" + a
        });
    },
    show: function(t) {
        var e = this, a = JSON.stringify(t.currentTarget.dataset.id);
        t.currentTarget.dataset.name, t.currentTarget.dataset.money;
        e.setData({
            noticeId: a
        }), wx.request({
            url: i + "/api/zhihuijingqu/applet/ticket/get_buy_notice?ticketInfoId=" + a,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(t) {
                var a = t.data.zhihuijingquAppletBuyTicketNotice;
                t.data.success ? 1 == e.data.flag ? e.setData({
                    flag: 0,
                    zhihuijingquAppletBuyTicketNotice: {}
                }) : (e.setData({
                    flag: 1,
                    zhihuijingquAppletBuyTicketNotice: a
                }), console.log(e.data.zhihuijingquAppletBuyTicketNotice)) : wx.showToast({
                    title: t.data.message
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "fail-get_buy_notice"
                });
            }
        });
    },
    conceal: function() {
        this.setData({
            flag: 0
        });
    },
    moreTicketInfo: function(t) {
        var e = this, a = t.currentTarget.dataset.id, n = (e.data.applications, t.currentTarget.dataset.functionid), i = t.currentTarget.dataset.name, o = t.currentTarget.dataset.linktype;
        if ("inner_link" == o) {
            if (1 == n && wx.navigateTo({
                url: "/pages/self-tricket/self"
            }), 2 == n && wx.navigateTo({
                url: "/pages/map-guide/map-guide?applicationId=" + n
            }), 3 == n) {
                var s = t.currentTarget.dataset.name;
                wx.navigateTo({
                    url: "/pages/notice/notice?name=" + s
                });
            }
            4 == n && wx.navigateTo({
                url: "/pages/park/park"
            }), 5 == n && wx.navigateTo({
                url: "/pages/rate/rate"
            }), 16 == n && wx.navigateTo({
                url: "/pages/featured-mall/featured-mall?name=" + i
            });
        } else "http_link" == o ? wx.navigateTo({
            url: "/pages/rich-active/rich-active?link=" + a + "&name=" + i
        }) : wx.navigateTo({
            url: "/pages/index/index"
        });
    },
    moreTicket: function() {
        wx.navigateTo({
            url: "/pages/self-tricket/self"
        });
    },
    noticeConceal: function() {
        this.setData({
            noticeShow: 0
        });
    },
    changeimage: function(t) {
        var e = t.detail.current;
        t.detail.source;
        this.setData({
            current: e
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
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "My App",
            desc: "My App description",
            path: "pages/index/index"
        };
    }
});