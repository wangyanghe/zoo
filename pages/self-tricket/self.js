getApp();

var t = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, e = t.domain, a = (t.appid, 
t.merchantId);

Page({
    data: {
        tabArr: {
            curHdIndex: 0,
            curBdIndex: 0
        },
        flag: 0,
        pageIndex: 1,
        pageSize: 10,
        isLast: !1,
        total: 0,
        memberTicketList: [],
        zhihuijingquAppletBuyTicketNotice: {},
        noticeName: "",
        noticeId: "",
        noticeMoney: "",
        queryName: "",
        idCardEnabled: "",
        usernameEnabled: "",
        phoneNumberEnabled: "",
        token: "",
        disabled: !1
    },
    inputValue: function(t) {
        var e = this, a = t.detail.value;
        e.setData({
            queryName: a
        });
    },
    tabFun: function(t) {
        var e = t.currentTarget.dataset.id, a = (t.currentTarget.dataset.id, {});
        a.curHdIndex = e, a.curBdIndex = e, this.setData({
            tabArr: a
        });
    },
    search: function() {
        var t = this;
        wx.request({
            url: e + "/api/zhihuijingqu/applet/ticket/list",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: JSON.stringify({
                merchantId: a,
                pageIndex: t.data.pageIndex,
                pageSize: t.data.pageSize,
                ticketName: t.data.queryName
            }),
            success: function(e) {
                var a = e.data.memberTicketList;
                e.data.success ? a && 0 == a.length ? t.setData({
                    isLast: !0,
                    memberTicketList: a
                }) : t.setData({
                    isLast: !1,
                    memberTicketList: a,
                    total: e.data.totalCount
                }) : wx.showToast({
                    title: e.data.message,
                    icon: "none"
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "file-ticket-list"
                });
            }
        });
    },
    show: function(t) {
        var a = this, i = JSON.stringify(t.currentTarget.dataset.id), n = t.currentTarget.dataset.name, s = t.currentTarget.dataset.money, r = t.currentTarget.dataset.idcardenable, c = t.currentTarget.dataset.cardname, o = t.currentTarget.dataset.phonenum;
        a.setData({
            noticeName: n,
            noticeId: i,
            noticeMoney: s,
            idCardEnabled: r,
            usernameEnabled: c,
            phoneNumberEnabled: o
        }), wx.request({
            url: e + "/api/zhihuijingqu/applet/ticket/get_buy_notice?ticketInfoId=" + i,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(t) {
                var e = t.data.zhihuijingquAppletBuyTicketNotice;
                t.data.success ? 1 == a.data.flag ? a.setData({
                    flag: 0,
                    zhihuijingquAppletBuyTicketNotice: {},
                    disabled: !1
                }) : (a.setData({
                    flag: 1,
                    zhihuijingquAppletBuyTicketNotice: e,
                    disabled: !0
                }), console.log(a.data.zhihuijingquAppletBuyTicketNotice)) : wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "fail-et_buy_notice"
                });
            }
        });
    },
    conceal: function() {
        this.setData({
            flag: 0
        });
    },
    toPay: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.name, i = t.currentTarget.dataset.idcard, n = t.currentTarget.dataset.cardname, s = t.currentTarget.dataset.phonenum;
        wx.navigateTo({
            url: "/pages/purchase-details/purchase-details?ticketInfoId=" + e + "&ticketName=" + a + "&idcardEnable=" + i + "&usernameEnabled=" + n + "&phoneNumberEnabled=" + s
        });
    },
    noticePay: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.name, i = t.currentTarget.dataset.idcardenable, n = t.currentTarget.dataset.cardname, s = t.currentTarget.dataset.phonenum;
        wx.navigateTo({
            url: "/pages/purchase-details/purchase-details?ticketInfoId=" + e + "&ticketName=" + a + "&idcardEnable=" + i + "&usernameEnabled=" + n + "&phoneNumberEnabled=" + s
        });
    },
    query: function() {
        var t = this;
        wx.request({
            url: e + "/api/zhihuijingqu/applet/ticket/list",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: JSON.stringify({
                merchantId: a,
                pageIndex: t.data.pageIndex,
                pageSize: t.data.pageSize
            }),
            success: function(e) {
                var a = e.data.memberTicketList;
                e.data.success ? t.setData({
                    memberTicketList: a,
                    total: e.data.totalCount
                }) : wx.showToast({
                    title: e.data.message,
                    icon: "none"
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "fail-ticket-list"
                });
            }
        });
    },
    onLoad: function(t) {
        this.query();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onTitleClick: function() {},
    onPullDownRefresh: function() {
        this.setData({
            pageIndex: 1
        }), this.query(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        if (!this.data.isLast) {
            var t = this, i = t.data.pageIndex + 1;
            t.setData({
                pageIndex: i
            }), wx.request({
                url: e + "/api/zhihuijingqu/applet/ticket/list",
                method: "POST",
                header: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: JSON.stringify({
                    merchantId: a,
                    pageIndex: i,
                    pageSize: t.data.pageSize
                }),
                success: function(e) {
                    var a = e.data.memberTicketList;
                    if (e.data.success) if (0 == a.length) t.setData({
                        isLast: !0
                    }); else {
                        var i = t.data.memberTicketList.concat(a);
                        console.log(i), t.setData({
                            isLast: !1,
                            memberTicketList: i,
                            total: e.data.totalCount
                        });
                    } else wx.showToast({
                        title: e.data.message,
                        icon: "none"
                    });
                },
                fail: function(t) {
                    wx.showToast({
                        title: "fail-ticket-list"
                    });
                }
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