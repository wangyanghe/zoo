getApp();

var e = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, a = e.domain;

e.appid, e.merchantId, new Date(new Date()).getTime();

Page({
    data: {
        detailsBooler: !1,
        refundRuleBooler: !1,
        ticketOrderId: "",
        ticketName: "",
        createTime: "",
        newT: "",
        ticketOrderStatus: "",
        orderModel: {},
        status: "",
        describe: "",
        payShow: !1,
        secondH: "",
        loadingTime: "",
        code: 0,
        secondDiaolg: !1,
        buyCancel: !1,
        refundShow: !1,
        authCancel: !1,
        payCode: "",
        buySuccessMessage: "",
        authShow: !1,
        checkQrcodeUrl: "",
        checkCode: "",
        zhihuijingquAppletMallOrderModel: {},
        buyerUsername: "",
        buyerPhoneNumber: 0,
        goodsPicture: "",
        goodsName: "",
        price: 0,
        totalAmount: 0,
        totalGoodsCount: 0,
        expressAmount: 0,
        expressOrderNumber: 0,
        mallOrderNumber: 0,
        refundAmount: 0,
        buyerAddress: "",
        alipayTradeNo: "",
        orderId: "",
        remark: "",
        prePayData: "",
        weixinPayData: "",
        showConfirm: !1,
        isCanPay: !0
    },
    format: function() {
        var e = this, a = e.data.createTime;
        console.log(a);
        var t = a.replace(new RegExp("-", "gm"), "/"), o = new Date(t).getTime(), n = e.data.newT, r = (parseInt(o) + parseInt(18e5) - parseInt(n)) / 1e3, s = parseInt(r / 60), d = parseInt(r % 60);
        s < 10 && (s = "0" + s), d < 10 && (d = "0" + d), e.setData({
            secondH: s + ":" + d
        });
    },
    copyOrderNumber: function(e) {
        var a = this;
        wx.setClipboardData({
            data: a.data.expressOrderNumber,
            success: function(e) {
                wx.showToast({
                    title: "复制成功",
                    icon: "none"
                });
            }
        });
    },
    copymallOrder: function(e) {
        var a = this;
        wx.setClipboardData({
            data: a.data.mallOrderNumber,
            success: function(e) {
                wx.showToast({
                    title: "复制成功",
                    icon: "none"
                });
            }
        });
    },
    query: function() {
        var e = this, t = e.data.ticketOrderId;
        wx.request({
            url: a + "/api/mall/member/get_order?orderId=" + t,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(t) {
                if (t.data.success) {
                    var o = t.data.zhihuijingquAppletMallOrderModel, n = o.buyerUsername, r = o.buyerAddress, s = o.buyerPhoneNumber, d = o.orderGoodsList[0].goodsName, i = o.orderGoodsList[0].goodsPicture, c = o.orderGoodsList[0].price, u = o.totalAmount, l = o.totalGoodsCount, m = o.expressAmount, p = o.expressOrderNumber, h = o.mallOrderNumber, y = o.refundAmount, f = o.alipayTradeNo, w = o.orderId, g = JSON.parse(o.weixinPayData), D = o.createTime, b = o.status, C = o.describe, x = o.statusCode, T = o.statusCode, S = o.buySuccessMessage, P = o.remark;
                    if (e.setData({
                        orderModel: o,
                        createTime: D,
                        status: b,
                        desc: C,
                        code: x,
                        payCode: T,
                        weixinPayData: g,
                        buyerUsername: n,
                        buyerAddress: r,
                        buyerPhoneNumber: s,
                        goodsName: d,
                        goodsPicture: i,
                        price: c,
                        totalAmount: u,
                        totalGoodsCount: l,
                        expressAmount: m,
                        expressOrderNumber: p,
                        refundAmount: y,
                        alipayTradeNo: f,
                        orderId: w,
                        remark: P,
                        mallOrderNumber: h
                    }), console.log(e.data.code), console.log(e.data.payCode), "2" == e.data.payCode && (e.setData({
                        buySuccessMessage: S
                    }), e.data.buySuccessMessage && e.data.buySuccessMessage.length > 0 && e.setData({
                        payShow: !e.data.payShow
                    }), (e.data.checkQrcodeUrl || e.data.checkCode) && e.setData({
                        authShow: !0
                    })), 0 == x) {
                        var N = e.data.createTime.replace(new RegExp("-", "gm"), "/"), v = new Date(N).getTime(), A = e.data.newT, I = (parseInt(v) + parseInt(18e5) - parseInt(A)) / 1e3;
                        if (I <= 0) clearInterval(e.setData({
                            loadingTime: null
                        })); else {
                            var O = 0;
                            e.setData({
                                loadingTime: setInterval(function() {
                                    if (I > 0) {
                                        I -= 1;
                                        var t = parseInt(I / 60), o = parseInt(I % 60);
                                        t < 10 && (t = "0" + t), o < 10 && (o = "0" + o), e.setData({
                                            secondH: t + ":" + o
                                        });
                                    } else if (0 == O) {
                                        var n = e.data.ticketOrderId;
                                        wx.request({
                                            url: a + "/api/mall/member/get_order?orderId=" + n,
                                            method: "POST",
                                            header: {
                                                "Content-Type": "application/json;charset=UTF-8"
                                            },
                                            success: function(a) {
                                                if (a.data.success) {
                                                    var t = a.data.zhihuijingquAppletMallOrderModel, o = t.buyerUsername, n = t.buyerAddress, r = t.buyerPhoneNumber, s = t.orderGoodsList[0].goodsName, d = t.orderGoodsList[0].goodsPicture, i = t.orderGoodsList[0].price, c = t.totalAmount, u = t.totalGoodsCount, l = t.expressAmount, m = t.expressOrderNumber, p = t.mallOrderNumber, h = t.refundAmount, y = t.alipayTradeNo, f = t.orderId, w = JSON.parse(t.weixinPayData), g = t.createTime, D = t.status, b = t.describe, C = t.statusCode, x = t.statusCode, T = (t.buySuccessMessage, 
                                                    t.remark);
                                                    e.setData({
                                                        orderModel: t,
                                                        createTime: g,
                                                        status: D,
                                                        desc: b,
                                                        code: C,
                                                        payCode: x,
                                                        weixinPayData: w,
                                                        buyerUsername: o,
                                                        buyerAddress: n,
                                                        buyerPhoneNumber: r,
                                                        goodsName: s,
                                                        goodsPicture: d,
                                                        price: i,
                                                        totalAmount: c,
                                                        totalGoodsCount: u,
                                                        expressAmount: l,
                                                        expressOrderNumber: m,
                                                        refundAmount: h,
                                                        alipayTradeNo: y,
                                                        orderId: f,
                                                        remark: T,
                                                        mallOrderNumber: p
                                                    });
                                                } else wx.showToast({
                                                    title: a.data.message,
                                                    icon: "none"
                                                });
                                            },
                                            fail: function(e) {
                                                wx.showToast({
                                                    title: "fail",
                                                    icon: "none"
                                                });
                                            },
                                            complete: function(e) {}
                                        }), O++;
                                    }
                                }, 1e3)
                            });
                        }
                    }
                } else wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "fail",
                    icon: "none"
                });
            },
            complete: function(e) {}
        });
    },
    onLoad: function(e) {
        var a = this;
        a.setData({
            ticketOrderId: e.ticketOrderId,
            newT: new Date().getTime()
        }), a.query();
    },
    onReady: function() {},
    onShow: function() {},
    payBack: function() {
        var e = this;
        e.data.payShow && (e.setData({
            payShow: !e.data.payShow
        }), console.log(e.data.payShow));
    },
    onHide: function() {},
    onUnload: function() {
        0 == this.data.secondH && clearInterval(this.data.loadingTime);
    },
    confirmDialog: function() {
        var e = this;
        e.setData({
            showConfirm: !e.data.showConfirm
        });
    },
    cancelConfirm: function() {
        var e = this;
        e.setData({
            showConfirm: !e.data.showConfirm
        });
    },
    confirm: function() {
        var e = this;
        wx.request({
            url: a + "/api/mall/member/confirm_receive?orderId=" + e.data.orderId,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(a) {
                a.data.success && (e.setData({
                    showConfirm: !e.data.showConfirm
                }), e.query(), wx.showToast({
                    title: "成功收货",
                    icon: "none"
                }));
            },
            fail: function(e) {
                wx.showToast({
                    title: "fail",
                    icon: "none"
                });
            },
            complete: function(e) {}
        });
    },
    continu: function(e) {
        var a = this;
        a.setData({
            isCanPay: !1
        }), wx.requestPayment({
            timeStamp: a.data.weixinPayData.timeStamp,
            nonceStr: a.data.weixinPayData.nonceStr,
            package: a.data.weixinPayData.package,
            signType: a.data.weixinPayData.signType,
            paySign: a.data.weixinPayData.paySign,
            success: function(e) {
                console.log(e), console.log("支付成功"), a.query(), a.setData({
                    isCanPay: !0
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "支付失败"
                }), a.setData({
                    isCanPay: !0
                });
            }
        });
    },
    secondBack: function() {
        var e = this;
        e.data.secondDiaolg && e.setData({
            secondDiaolg: !e.data.secondDiaolg
        }), e.data.authCancel && e.setData({
            authCancel: !e.data.authCancel
        }), e.data.buyCancel && e.setData({
            buyCancel: !e.data.buyCancel
        }), e.data.refundShow && e.setData({
            refundShow: !e.data.refundShow
        }), console.log(e.data.secondDiaolg);
    },
    openBuyCancel: function() {
        var e = this;
        e.setData({
            buyCancel: !e.data.buyCancel
        });
    },
    openRefund: function() {
        var e = this;
        e.setData({
            refundShow: !e.data.refundShow
        });
    },
    openAuthCancel: function() {
        var e = this;
        e.setData({
            authCancel: !e.data.authCancel
        });
    },
    openCancel: function() {
        var e = this;
        e.setData({
            secondDiaolg: !e.data.secondDiaolg
        });
    },
    onTitleClick: function() {},
    onPullDownRefresh: function() {
        console.log("刷新222222"), this.query(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("刷新111111111111111");
    },
    detailsBtn: function(e) {
        console.log("代付款");
        var a = this, t = e.target.dataset.showid;
        a.setData({
            detailsBooler: 1 == t && !a.data.detailsBooler
        });
    },
    onShareAppMessage: function() {
        return {
            title: "My App",
            desc: "My App description",
            path: "pages/index/index"
        };
    }
});