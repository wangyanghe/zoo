var a = getApp(), e = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, t = e.domain, r = (e.appid, 
e.merchantId);

Page({
    data: {
        totalAmount: 0,
        carNumber: "",
        comeTime: "",
        payAmount: 0,
        stopTimes: "",
        parkOrderId: "",
        preferentialAmount: "",
        preferentialPaper: "",
        payMam: "",
        token: "",
        parkOrderPayId: "",
        parkOrderIds: "",
        needPayAmount: "",
        prepayData: "",
        isCanPay: !0
    },
    onLoad: function(a) {
        var e = this;
        if (a.carNumber) {
            "null" == a.preferentialAmount ? (e.setData({
                carNumber: a.carNumber,
                stopTimes: a.stopTimes,
                comeTime: a.comeTime,
                payAmount: a.payAmount,
                totalAmount: a.totalAmount,
                parkOrderId: a.parkOrderId,
                preferentialAmount: 0,
                preferentialPaper: a.preferentialPaper,
                needPayAmount: a.needPayAmount
            }), console.log(e.data.needPayAmount)) : (e.setData({
                carNumber: a.carNumber,
                stopTimes: a.stopTimes,
                comeTime: a.comeTime,
                payAmount: a.payAmount,
                totalAmount: a.totalAmount,
                parkOrderId: a.parkOrderId,
                preferentialAmount: a.preferentialAmount,
                preferentialPaper: a.preferentialPaper,
                needPayAmount: a.needPayAmount
            }), console.log(e.data.needPayAmount));
            var t = (parseFloat(e.data.totalAmount) - parseFloat(e.data.payAmount)).toFixed();
            console.log(t), e.setData({
                payMan: t
            });
        } else e.setData({
            parkOrderId: a.parkOrderId
        }), e.query();
    },
    query: function() {
        var a = this;
        a.data.token = wx.getStorageSync("token"), wx.request({
            url: t + "/api/zhihuijingqu/applet/park/query",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                token: a.data.token
            },
            data: JSON.stringify({
                merchantId: r,
                carNumber: a.data.carNumber,
                parkOrderId: a.data.parkOrderId
            }),
            success: function(e) {
                var t = e.data.parkOrder;
                if (e.data.success) {
                    var r = t.totalAmount, n = t.carNumber, o = t.comeTime, p = t.payAmount, i = t.stopTimes, d = t.parkOrderId, s = t.preferentialAmount, u = t.preferentialPaper, m = (parseFloat(r), 
                    parseFloat(p), t.needPayAmount);
                    a.setData({
                        totalAmount: r,
                        carNumber: n,
                        comeTime: o,
                        payAmount: p,
                        stopTimes: i,
                        preferentialPaper: u,
                        preferentialAmount: s,
                        parkOrderId: d,
                        needPayAmount: m
                    });
                } else wx.showToast({
                    title: e.data.message,
                    icon: "none"
                });
            },
            fail: function(a) {
                wx.showToast({
                    title: "fail"
                });
            },
            complete: function(a) {}
        });
    },
    payPark: function() {
        var e = this;
        e.data.token = wx.getStorageSync("token"), e.setData({
            isCanPay: !1
        }), wx.request({
            url: t + "/api/zhihuijingqu/applet/park/create_order",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                token: e.data.token
            },
            data: JSON.stringify({
                merchantId: r,
                amount: e.data.needPayAmount,
                parkOrderId: e.data.parkOrderId,
                parkOrderWay: 3,
                paymentType: "weixin",
                buyerType: "weixin",
                tradeType: "JSAPI"
            }),
            success: function(r) {
                var n = r.data.parkCreateOrderPay, o = JSON.parse(n.prepayData), p = n.parkOrderPayId;
                r.data.success ? (e.setData({
                    prepayData: o,
                    parkOrderPayId: p,
                    isCanPay: !0
                }), wx.requestPayment({
                    timeStamp: e.data.prepayData.timeStamp,
                    nonceStr: e.data.prepayData.nonceStr,
                    package: e.data.prepayData.package,
                    signType: e.data.prepayData.signType,
                    paySign: e.data.prepayData.paySign,
                    success: function(a) {
                        console.log(a), console.log("支付成功"), wx.request({
                            url: t + "/api/zhihuijingqu/applet/park/query_order_payment",
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json;charset=UTF-8",
                                token: e.data.token
                            },
                            data: JSON.stringify({
                                parkOrderId: e.data.parkOrderId,
                                parkOrderPayId: p
                            }),
                            success: function(a) {
                                var t = a.data.lastTime;
                                a.data.success ? wx.navigateTo({
                                    url: "/pages/park-delay/park-delay?lastTime=" + t + "&parkOrderId=" + e.data.parkOrderId
                                }) : my.alert({
                                    content: a.data.message
                                });
                            },
                            fail: function(a) {
                                my.alert({
                                    content: "fail"
                                });
                            },
                            complete: function(a) {}
                        });
                    },
                    fail: function(e) {
                        wx.showToast({
                            title: "请重新支付"
                        }), a.globalData.parkStatusItems = "0", wx.switchTab({
                            url: "/pages/order-list/order-list"
                        });
                    }
                })) : wx.showToast({
                    title: r.data.message,
                    icon: "none"
                });
            },
            fail: function(a) {
                wx.showToast({
                    title: "fail"
                });
            },
            complete: function(a) {
                e.setData({
                    isCanPay: !0
                });
            }
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShow: function() {}
});