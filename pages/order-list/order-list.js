var t = getApp(), a = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, e = a.domain, s = (a.appid, 
a.merchantId);

Page({
    data: {
        tabArr: {
            curHdIndex: 0,
            curBdIndex: 0
        },
        ticketOrderList: [],
        token: "",
        status: "",
        code: 0,
        ticketOrderId: "",
        newT: "",
        ticketNo: "",
        pageIndex: 1,
        pageIndexStore: 1,
        pageSize: 10,
        isLast: !1,
        isLastPark: !1,
        isLastStore: !1,
        statusName: "",
        user: "",
        cancelDiaolg: !1,
        authDiaolg: !1,
        ids: "",
        parkInforList: [],
        totalPark: 0,
        parkStatus: "",
        parkStatusName: "",
        prePayData: "",
        store: "",
        storeInfo: "",
        isCanPay: !0,
        isCanPlay: !0
    },
    query: function() {
        var t = this;
        t.data.token = wx.getStorageSync("token"), wx.request({
            url: e + "/api/zhihuijingqu/applet/ticket/order/list",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                token: t.data.token
            },
            data: JSON.stringify({
                buyerType: "weixin",
                pageIndex: t.data.pageIndex,
                pageSize: t.data.pageSize,
                status: t.data.statusName
            }),
            success: function(a) {
                var e = a.data.ticketOrderList;
                a.data.success ? 0 == e.length ? t.setData({
                    isLast: !0
                }) : t.setData({
                    isLast: !1,
                    ticketOrderList: e,
                    total: a.data.totalCount
                }) : wx.showToast({
                    title: a.data.message,
                    icon: "none"
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "fail"
                });
            }
        });
    },
    parkInforList: function() {
        var t = this;
        t.data.token = wx.getStorageSync("token"), wx.request({
            url: e + "/api/zhihuijingqu/applet/park/order_list",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                token: t.data.token
            },
            data: JSON.stringify({
                status: t.data.parkStatusName
            }),
            success: function(a) {
                var e = a.data.parkInforList;
                a.data.success ? e && 0 == e.length ? t.setData({
                    isLastPark: !0
                }) : t.setData({
                    isLastPark: !1,
                    parkInforList: e,
                    totalPark: a.data.totalCount
                }) : wx.showToast({
                    title: a.data.message,
                    icon: "none"
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "fail"
                });
            }
        });
    },
    storelist: function() {
        var t = this;
        t.data.token = wx.getStorageSync("token"), wx.request({
            url: e + "/api/mall/member/list_order",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                token: t.data.token
            },
            data: JSON.stringify({
                buyerType: "weixin",
                merchantId: s,
                pageIndex: t.data.pageIndexStore,
                pageSize: t.data.pageSize
            }),
            success: function(a) {
                var e = a.data.orderList;
                a.data.success ? e && 0 == e.length ? t.setData({
                    isLastStore: !0
                }) : t.setData({
                    isLastStore: !1,
                    storelist: e
                }) : wx.showToast({
                    title: a.data.message,
                    icon: "none"
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "fail",
                    icon: "none"
                });
            }
        });
    },
    goStoreDetails: function(t) {
        var a = t.currentTarget.dataset.id;
        t.currentTarget.dataset.code;
        wx.navigateTo({
            url: "/pages/store-details/store-details?ticketOrderId=" + a
        });
    },
    onLoad: function(t) {
        var a = this;
        a.setData({
            store: t.store
        }), a.data.store && a.setData({
            tabArr: {
                curHdIndex: 2,
                curBdIndex: 2
            }
        });
    },
    payMoney: function(t) {
        var a = this;
        a.setData({
            isCanPay: !1
        });
        var e = JSON.parse(t.currentTarget.dataset.prepaydata);
        wx.requestPayment({
            timeStamp: e.timeStamp,
            nonceStr: e.nonceStr,
            package: e.package,
            signType: e.signType,
            paySign: e.paySign,
            success: function(t) {
                console.log(t), console.log("支付成功"), a.query(), a.setData({
                    isCanPay: !0
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "支付失败"
                }), a.setData({
                    isCanPay: !0
                });
            }
        });
    },
    goOrderDetails: function(t) {
        var a = t.currentTarget.dataset.id;
        t.currentTarget.dataset.code;
        wx.navigateTo({
            url: "/pages/order-details/order-details?ticketOrderId=" + a
        });
    },
    cancelDiaolg: function(t) {
        var a = this, e = t.currentTarget.dataset.id;
        a.setData({
            cancelDiaolg: !a.data.cancelDiaolg,
            ids: e
        });
    },
    autDiaolog: function(t) {
        var a = this, e = t.currentTarget.dataset.id;
        a.setData({
            authDiaolg: !a.data.authDiaolg,
            ids: e
        });
    },
    secondBackList: function(t) {
        var a = this;
        a.data.cancelDiaolg && a.setData({
            cancelDiaolg: !a.data.cancelDiaolg
        }), a.data.authDiaolg && a.setData({
            authDiaolg: !a.data.authDiaolg
        });
    },
    cancel: function(t) {
        var a = this, s = t.currentTarget.dataset.id;
        a.setData({
            isCanPlay: !1
        }), wx.request({
            url: e + "/api/zhihuijingqu/applet/ticket/order/cancel?ticketOrderId=" + s,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(t) {
                t.data.success ? (a.query(), a.setData({
                    cancelDiaolg: !a.data.cancelDiaolg,
                    isCanPlay: !0
                })) : wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "fail"
                });
            },
            complete: function(t) {
                a.setData({
                    isCanPlay: !0
                });
            }
        });
    },
    pariDetails: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/park-details/park-details?parkOrderId=" + a
        });
    },
    authCancel: function(t) {
        console.log("取消");
        var a = this, s = t.currentTarget.dataset.id;
        a.setData({
            isCanPlay: !1
        }), wx.request({
            url: e + "/api/zhihuijingqu/applet/ticket/order/cancle_refund?ticketOrderId=" + s,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(t) {
                t.data.success ? (a.query(), a.setData({
                    authDiaolg: !a.data.authDiaolg,
                    isCanPlay: !0
                })) : wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "fail"
                });
            },
            complete: function(t) {
                a.setData({
                    isCanPlay: !0
                });
            }
        });
    },
    tabFun: function(t) {
        var a = t.currentTarget.dataset.id, e = (t.currentTarget.dataset.id, {});
        e.curHdIndex = a, e.curBdIndex = a, this.setData({
            tabArr: e
        });
    },
    onPullDownRefresh: function() {
        var t = this, a = t.data.tabArr;
        "0" == a.curHdIndex && "0" == a.curBdIndex && (t.setData({
            pageIndex: 1
        }), t.query(), wx.stopPullDownRefresh()), "1" == a.curHdIndex && "1" == a.curBdIndex && (console.log("停车订单的刷新"), 
        t.parkInforList(), wx.stopPullDownRefresh()), "2" == a.curHdIndex && "2" == a.curBdIndex && (t.setData({
            pageIndexStore: 1
        }), t.storelist(), my.stopPullDownRefresh());
    },
    onReachBottom: function() {
        var t = this, a = t.data.tabArr.curHdIndex, n = t.data.tabArr.curBdIndex;
        if ("0" == a && "0" == n) {
            if (this.data.isLast) return;
            var o = this, i = o.data.pageIndex + 1;
            o.setData({
                pageIndex: i
            }), o.data.token = wx.getStorageSync("token"), wx.request({
                url: e + "/api/zhihuijingqu/applet/ticket/order/list",
                method: "POST",
                header: {
                    "Content-Type": "application/json;charset=UTF-8",
                    token: o.data.token
                },
                data: JSON.stringify({
                    buyerType: "weixin",
                    pageIndex: i,
                    pageSize: o.data.pageSize,
                    status: o.data.statusName
                }),
                success: function(t) {
                    var a = t.data.ticketOrderList;
                    if (t.data.success) if (0 == a.length) o.setData({
                        isLast: !0
                    }); else {
                        var e = o.data.ticketOrderList.concat(a);
                        console.log(e), o.setData({
                            isLast: !1,
                            ticketOrderList: e,
                            total: t.data.totalCount
                        });
                    } else wx.showToast({
                        title: t.data.message,
                        icon: "none"
                    });
                },
                fail: function(t) {
                    wx.showToast({
                        title: "fail",
                        icon: "none"
                    });
                }
            });
        }
        if ("2" == a && "2" == n) {
            if (this.data.isLastStore) return;
            var r = this, d = r.data.pageIndexStore + 1;
            r.setData({
                pageIndexStore: d
            }), r.data.token = wx.getStorageSync("token"), wx.request({
                url: e + "/api/mall/member/list_order",
                method: "POST",
                header: {
                    "Content-Type": "application/json;charset=UTF-8",
                    token: r.data.token
                },
                data: JSON.stringify({
                    buyerType: "weixin",
                    merchantId: s,
                    pageIndex: d,
                    pageSize: r.data.pageSize
                }),
                success: function(t) {
                    var a = t.data.orderList;
                    if (t.data.success) if (a && 0 == a.length) r.setData({
                        isLastStore: !0
                    }); else {
                        var e = r.data.storelist.concat(a);
                        console.log(e), r.setData({
                            isLastStore: !1,
                            storelist: e
                        });
                    } else wx.showToast({
                        title: t.data.message,
                        icon: "none"
                    });
                },
                fail: function(t) {
                    wx.showToast({
                        title: "fail",
                        icon: "none"
                    });
                }
            });
        }
    },
    onShow: function() {
        var a = this, e = t.globalData.orderStatusItems, s = t.globalData.parkStatusItems, n = t.globalData.storeInfo;
        s ? a.setData({
            tabArr: {
                curHdIndex: 1,
                curBdIndex: 1
            },
            parkStatusName: s,
            statusName: ""
        }) : n ? a.setData({
            tabArr: {
                curHdIndex: 2,
                curBdIndex: 2
            },
            storeInfo: n,
            parkStatusName: "",
            statusName: ""
        }) : (a.setData({
            tabArr: {
                curHdIndex: 0,
                curBdIndex: 0
            },
            statusName: e,
            parkStatusName: ""
        }), console.log("订单"), console.log("订单11111"), console.log(a.data.ticketOrderList), 
        console.log(a.data.parkInforList), console.log("订单2222"), console.log(a.data.statusName), 
        console.log(a.data.parkStatusName)), a.query(), a.parkInforList(), a.storelist();
    },
    onHide: function() {
        this.setData({
            ticketOrderList: [],
            parkInforList: [],
            pageIndex: 1
        }), t.globalData.parkStatusItems = "", t.globalData.orderStatusItems = "";
    }
});