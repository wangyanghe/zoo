getApp();

var e = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, t = e.domain;

e.appid, e.merchantId, require("../../utils/util");

Page({
    data: {
        refundRule: "退改规则的内容",
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
        showAllEnabled: !1,
        showRefundEnabled: !1,
        showRefundEnabledList: !1,
        authShow: !1,
        secondH: "",
        loadingTime: "",
        code: 0,
        secondDiaolg: !1,
        buyCancel: !1,
        refundShow: !1,
        authCancel: !1,
        payCode: "",
        buySuccessMessage: "",
        checkQrcodeUrl: "",
        checkCode: "",
        iuctripTicketOrderId: "",
        iuctripAppletTicketOrderModel: {},
        flag: 0,
        authShowTicket: !1,
        checkType: "",
        ticketOrderGoodsQrcodeList: [],
        nowPage: 0,
        PagesLen: 0,
        listNum: 1,
        marginLeft: 0,
        marginRight: 0,
        width: 0,
        active: !1,
        ticketStatus: "",
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !1,
        current: 0,
        currentBrightness: "",
        isCanPay: !0,
        isCanPlay: !0,
        ticketOrderGoodsList: []
    },
    changeCurrent: function(e) {
        this.setData({
            swiperCurrent: e.detail.current,
            nowPage: e.detail.current
        });
    },
    nextBtn: function() {
        var e = this, t = e.data.PagesLen, a = e.data.nowPage;
        a == t - 1 ? a = 0 : a++, this.setData({
            current: a,
            nowPage: a
        });
    },
    lastBtn: function() {
        var e = this, t = (e.data.PagesLen, e.data.nowPage);
        t < 0 ? t = 0 : t--, this.setData({
            current: t,
            nowPage: t
        });
    },
    format: function() {
        var e = this, t = e.data.createTime;
        console.log(t);
        var a = t.replace(new RegExp("-", "gm"), "/"), s = new Date(a).getTime(), o = e.data.newT, n = (parseInt(s) + parseInt(18e5) - parseInt(o)) / 1e3, c = parseInt(n / 60), i = parseInt(n % 60);
        c < 10 && (c = "0" + c), i < 10 && (i = "0" + i), e.setData({
            secondH: c + ":" + i
        });
    },
    saveImgToPhotos: function() {
        var e = this;
        wx.downloadFile({
            url: e.data.checkQrcodeUrl,
            success: function(e) {
                console.log(e), wx.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function(e) {
                        wx.showToast({
                            title: "保存成功"
                        }), console.log(e);
                    },
                    fail: function(e) {
                        wx.showToast({
                            title: "尚未授权,图片保存失败"
                        });
                    }
                });
            },
            fail: function(e) {
                console.log(e), console.log("fail");
            }
        });
    },
    query: function() {
        var e = this, a = e.data.ticketOrderId;
        wx.request({
            url: t + "/api/zhihuijingqu/applet/ticket/order/get?ticketOrderId=" + a,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(a) {
                if (a.data.success) {
                    var s = a.data.zhihuijingquAppletTicketOrderModel, o = s.ticketOrderGoodsList, n = s.createTime, c = s.status, i = s.describe, d = s.statusCode, r = s.statusCode, l = s.buySuccessMessage, u = s.checkQrcodeUrl, h = s.checkCode, p = s.checkType, g = s.ticketOrderGoodsQrcodeList, f = s.ticketStatus, w = g.length, y = 243 * w, k = JSON.parse(s.prePayData);
                    if (e.setData({
                        ticketOrderGoodsList: o,
                        orderModel: s,
                        createTime: n,
                        status: c,
                        desc: i,
                        code: d,
                        payCode: r,
                        checkQrcodeUrl: u,
                        checkCode: h,
                        prePayData: k,
                        checkType: p,
                        ticketOrderGoodsQrcodeList: g,
                        PagesLen: w,
                        width: y,
                        ticketStatus: f,
                        buySuccessMessage: l
                    }), 1 != e.data.orderModel.usernameEnabled && 1 != e.data.orderModel.phoneNumberEnabled && 1 != e.data.orderModel.idCardEnabled || e.setData({
                        showAllEnabled: !0
                    }), 2 == d && 1 == e.data.orderModel.refundEnabled && e.setData({
                        showRefundEnabled: !0
                    }), 1 == d && 1 == e.data.orderModel.refundEnabled && e.setData({
                        showRefundEnabledList: !0
                    }), console.log(e.data.code), console.log(e.data.payCode), "2" == e.data.payCode && (e.data.buySuccessMessage && e.data.buySuccessMessage.length > 0 && e.setData({
                        payShow: !0
                    }), "order" == e.data.checkType && (e.data.checkQrcodeUrl || e.data.checkCode) && e.setData({
                        authShow: !0
                    }), "ticket" == e.data.checkType && g.length > 0 && e.setData({
                        authShowTicket: !0,
                        ticketOrderGoodsQrcodeList: g
                    })), 0 == d) {
                        var T = e.data.createTime.replace(new RegExp("-", "gm"), "/"), D = new Date(T).getTime(), C = e.data.newT, S = (parseInt(D) + parseInt(18e5) - parseInt(C)) / 1e3;
                        if (S <= 0) clearInterval(e.setData({
                            loadingTime: null
                        })); else {
                            var m = 0;
                            e.setData({
                                loadingTime: setInterval(function() {
                                    if (S > 0) {
                                        S -= 1;
                                        var a = parseInt(S / 60), s = parseInt(S % 60);
                                        a < 10 && (a = "0" + a), s < 10 && (s = "0" + s), e.setData({
                                            secondH: a + ":" + s
                                        });
                                    } else if (0 == m) {
                                        var o = e.data.ticketOrderId;
                                        wx.request({
                                            url: t + "/api/zhihuijingqu/applet/ticket/order/get?ticketOrderId=" + o,
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json;charset=UTF-8"
                                            },
                                            success: function(t) {
                                                if (t.data.success) {
                                                    var a = t.data.zhihuijingquAppletTicketOrderModel, s = a.ticketOrderGoodsList, o = a.createTime, n = a.status, c = a.describe, i = a.statusCode;
                                                    e.setData({
                                                        ticketOrderGoodsList: s,
                                                        orderModel: a,
                                                        createTime: o,
                                                        status: n,
                                                        desc: c,
                                                        code: i
                                                    }), 2 == i && 1 == e.data.orderModel.refundEnabled && e.setData({
                                                        showRefundEnabled: !0
                                                    }), 1 == i && 1 == e.data.orderModel.refundEnabled && e.setData({
                                                        showRefundEnabledList: !0
                                                    });
                                                } else wx.showToast({
                                                    title: t.data.message,
                                                    icon: "none"
                                                });
                                            },
                                            fail: function(e) {
                                                wx.showToast({
                                                    title: "fail"
                                                });
                                            },
                                            complete: function(e) {}
                                        }), m++;
                                    }
                                }, 1e3)
                            });
                        }
                    }
                } else wx.showToast({
                    title: a.data.message,
                    icon: "none"
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "fail"
                });
            },
            complete: function(e) {}
        });
    },
    onLoad: function(e) {
        var t = this;
        t.setData({
            ticketOrderId: e.ticketOrderId,
            newT: new Date().getTime()
        }), console.log(t.data.newT), wx.setScreenBrightness({
            value: .9
        }), wx.getScreenBrightness({
            success: function(e) {
                t.setData({
                    currentBrightness: e.value
                });
            }
        }), t.query(), console.log("前");
    },
    onReady: function() {},
    onShow: function() {},
    payBack: function() {
        var e = this;
        e.data.payShow && (e.setData({
            payShow: !e.data.payShow
        }), console.log(e.data.payShow));
    },
    onHide: function() {
        var e = this;
        wx.getScreenBrightness({
            success: function(t) {
                e.setData({
                    currentBrightness: t.value
                });
            }
        });
    },
    onUnload: function() {
        var e = this;
        0 == e.data.secondH && clearInterval(e.data.loadingTime), wx.setScreenBrightness({
            value: e.data.currentBrightness
        });
    },
    continu: function(e) {
        var a = this;
        a.setData({
            isCanPay: !1
        }), wx.requestPayment({
            timeStamp: a.data.prePayData.timeStamp,
            nonceStr: a.data.prePayData.nonceStr,
            package: a.data.prePayData.package,
            signType: a.data.prePayData.signType,
            paySign: a.data.prePayData.paySign,
            success: function(e) {
                console.log(e), console.log("支付成功"), a.setData({
                    isCanPay: !0
                }), wx.request({
                    url: t + "/api/zhihuijingqu/applet/ticket/order/get?ticketOrderId=" + a.data.ticketOrderId,
                    method: "POST",
                    header: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function(e) {
                        if (e.data.success) {
                            var t = e.data.zhihuijingquAppletTicketOrderModel, s = t.ticketOrderGoodsList, o = t.createTime, n = t.status, c = t.describe, i = t.statusCode, d = t.statusCode, r = t.buySuccessMessage, l = t.checkQrcodeUrl, u = t.checkCode, h = t.checkType, p = t.ticketOrderGoodsQrcodeList, g = t.ticketStatus, f = p.length, w = 243 * f, y = JSON.parse(t.prePayData);
                            a.setData({
                                ticketOrderGoodsList: s,
                                orderModel: t,
                                createTime: o,
                                status: n,
                                desc: c,
                                code: i,
                                payCode: d,
                                checkQrcodeUrl: l,
                                checkCode: u,
                                prePayData: y,
                                checkType: h,
                                ticketOrderGoodsQrcodeList: p,
                                PagesLen: f,
                                width: w,
                                ticketStatus: g,
                                buySuccessMessage: r
                            }), console.log(a.data.code), console.log(a.data.payCode), "2" == a.data.payCode && (a.data.buySuccessMessage && a.data.buySuccessMessage.length > 0 && a.setData({
                                payShow: !0
                            }), "order" == a.data.checkType && (a.data.checkQrcodeUrl || a.data.checkCode) && a.setData({
                                authShow: !0
                            }), "ticket" == a.data.checkType && p.length > 0 && a.setData({
                                authShowTicket: !0,
                                ticketOrderGoodsQrcodeList: p
                            })), 2 == i && 1 == a.data.orderModel.refundEnabled && a.setData({
                                showRefundEnabled: !0
                            });
                        } else wx.showToast({
                            title: e.data.message,
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
    cancel: function() {
        console.log("取消");
        var e = this, a = e.data.ticketOrderId;
        e.setData({
            isCanPlay: !1
        }), wx.request({
            url: t + "/api/zhihuijingqu/applet/ticket/order/cancel?ticketOrderId=" + a,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(t) {
                t.data.success ? (e.query(), clearInterval(e.data.loadingTime), e.setData({
                    secondH: "",
                    secondDiaolg: !e.data.secondDiaolg,
                    isCanPlay: !0
                })) : wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "fail"
                });
            },
            complete: function(t) {
                e.setData({
                    isCanPlay: !0
                });
            }
        });
    },
    buyCancel: function() {
        console.log("取消");
        var e = this, a = e.data.ticketOrderId;
        e.setData({
            isCanPlay: !1
        }), wx.request({
            url: t + "/api/zhihuijingqu/applet/ticket/order/cancel?ticketOrderId=" + a,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(t) {
                t.data.success ? (e.query(), e.setData({
                    buyCancel: !e.data.buyCancel,
                    isCanPlay: !0
                })) : wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "fail"
                });
            },
            complete: function(t) {
                e.setData({
                    isCanPlay: !0
                });
            }
        });
    },
    refund: function() {
        console.log("取消");
        var e = this, a = e.data.ticketOrderId;
        e.setData({
            isCanPlay: !1
        }), wx.request({
            url: t + "/api/zhihuijingqu/applet/ticket/order/refund?ticketOrderId=" + a,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(t) {
                t.data.success ? (e.setData({
                    showRefundEnabled: !1,
                    showRefundEnabledList: !1
                }), e.query(), e.setData({
                    authShow: !1,
                    refundShow: !e.data.refundShow,
                    isCanPlay: !0
                })) : wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "fail"
                });
            },
            complete: function(t) {
                e.setData({
                    isCanPlay: !0
                });
            }
        });
    },
    authCancel: function() {
        console.log("取消");
        var e = this, a = e.data.ticketOrderId;
        e.setData({
            isCanPlay: !1
        }), wx.request({
            url: t + "/api/zhihuijingqu/applet/ticket/order/cancle_refund?ticketOrderId=" + a,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(t) {
                t.data.success ? (e.query(), e.setData({
                    authCancel: !e.data.authCancel,
                    isCanPlay: !0
                })) : wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "fail"
                });
            },
            complete: function(t) {
                e.setData({
                    isCanPlay: !0
                });
            }
        });
    },
    onTitleClick: function() {},
    onPullDownRefresh: function() {
        console.log("加载1111"), this.query(), console.log("加载2222"), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("加载1111"), this.query(), console.log("加载2222");
    },
    refundRuleBtn: function(e) {
        console.log("aaa"), this.data.refundRuleBooler ? this.setData({
            refundRuleBooler: !1
        }) : this.setData({
            refundRuleBooler: !0
        });
    },
    detailsBtn: function(e) {
        console.log("代付款");
        var t = this, a = e.target.dataset.showid;
        t.setData({
            detailsBooler: 1 == a && !t.data.detailsBooler
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