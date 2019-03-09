function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var a, t = getApp(), o = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, n = o.domain, i = (o.appid, 
o.merchantId);

Page({
    data: (a = {
        user: "",
        num: 0,
        names: "",
        nameMess: "",
        IdNumber: "",
        idCardMess: "",
        phoneNumber: "",
        phoneMess: "",
        nameCheck: !1,
        idCardCheck: !1,
        phoneCheck: !1,
        detailsBooler: !1,
        playDate: "",
        flags: 0,
        calendar: 0,
        detail: 0,
        ticketName: "",
        showid: 1,
        id: 0,
        idcardEnable: 0,
        usernameEnabled: 0,
        phoneNumberEnabled: 0,
        showAllEnable: !1,
        ticketNumber: 1,
        moneyTotal: 0,
        price: 0,
        zhihuijingquAppletBuyTicketNotice: {},
        ticketOrderWay: 3,
        year: 0,
        month: 0,
        months: "",
        day: 0,
        date: [ "日", "一", "二", "三", "四", "五", "六" ],
        dateArr: [],
        isToday: 0,
        isTodayWeek: !1,
        todayIndex: 0,
        ticketPriceList: [],
        ticketPriceListMore: [],
        listDate: [],
        lastDate: "",
        platformPrice: ""
    }, e(a, "price", ""), e(a, "weights", ""), e(a, "weight", []), e(a, "before", ""), 
    e(a, "phoneNumberFocus", !1), e(a, "IdNumberFocus", !1), e(a, "nameFocus", !1), 
    e(a, "selectedTrue", !1), e(a, "nowTimes", ""), e(a, "nowSelectedToday", ""), e(a, "isnowTimes", ""), 
    e(a, "isnowSelectedToday", ""), e(a, "isnowSelectedTodayTrue", ""), e(a, "flag", []), 
    e(a, "token", ""), e(a, "prepayData", ""), e(a, "isCanPay", !0), a),
    onThirdDate: function() {
        var e = this, a = new Date();
        wx.request({
            url: n + "/api/zhihuijingqu/applet/ticket/get_price",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: JSON.stringify({
                level: "three_day",
                ticketInfoId: e.data.id,
                nowDate: a
            }),
            success: function(a) {
                var t = a.data.ticketPriceList;
                a.data.success ? (t.forEach(function(a, t) {
                    0 == t && (a.flag ? e.setData({
                        price: a.platformPrice,
                        moneyTotal: 1 * a.platformPrice,
                        playDate: a.date
                    }) : e.setData({
                        price: 0,
                        moneyTotal: 0,
                        playDate: 0
                    })), a.firstThirdDate = !0, e.data.listDate.push(a.date);
                }), e.data.lastDate = e.data.listDate.slice(-1), t.forEach(function(e, a) {
                    var t = e.date.slice(5);
                    e.dates = t;
                }), e.setData({
                    ticketPriceList: t
                })) : wx.showToast({
                    title: a.data.message
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "fail-get-price"
                });
            }
        });
    },
    onLoad: function(e) {
        var a = this;
        a.setData({
            id: e.ticketInfoId
        });
        var t = a.data.id;
        wx.request({
            url: n + "/api/zhihuijingqu/applet/ticket/get",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: JSON.stringify({
                ticketInfoId: t
            }),
            success: function(e) {
                var t = e.data.ticketGetModel;
                e.data.success ? (a.setData({
                    ticketName: t.ticketName,
                    idcardEnable: t.idCardEnabled,
                    usernameEnabled: t.usernameEnabled,
                    phoneNumberEnabled: t.phoneNumberEnabled
                }), 1 != a.data.idcardEnable && 1 != a.data.usernameEnabled && 1 != a.data.phoneNumberEnabled || a.setData({
                    showAllEnable: !0
                })) : wx.showToast({
                    title: e.data.message
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "fail"
                });
            },
            complete: function(e) {}
        }), a.onThirdDate();
    },
    threeDate: function(e) {
        var a = this;
        if (e.currentTarget.dataset.flagshow) {
            var t = e.currentTarget.dataset.num;
            t < 10 && (t = "0" + t);
            var o = e.currentTarget.dataset.year, i = e.currentTarget.dataset.month - 1;
            i = i < 10 ? "0" + i : i, a.data.month < 10 ? a.setData({
                months: "0" + 1 * a.data.month
            }) : a.setData({
                months: 1 * a.data.month
            }), console.log(i);
            var s = new Date(o, i, t), r = e.currentTarget.dataset.id, d = new Date().getTime(), c = r + " 23:59:59";
            console.log(new Date(c)), console.log(c);
            var l = new Date(c).getTime();
            console.log(d > l), a.setData({
                nowTimes: r,
                nowSelectedToday: l
            }), console.log(r), console.log(l), d > l ? a.setData({
                calendar: 0
            }) : wx.request({
                url: n + "/api/zhihuijingqu/applet/ticket/get_price",
                method: "POST",
                header: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: JSON.stringify({
                    level: "three_day",
                    ticketInfoId: a.data.id,
                    nowDate: s
                }),
                success: function(e) {
                    var t = e.data.ticketPriceList;
                    if (e.data.success) {
                        if (d > l) return a.setData({
                            selectedTrue: !0,
                            calendar: 0,
                            num: 0
                        }), console.log(a.data.flags), console.log(a.data.selectedTrue), !1;
                        a.setData({
                            selectedTrue: !1,
                            calendar: 0
                        }), console.log(a.data.selectedTrue), t.forEach(function(e, a) {
                            var t = e.date.slice(5);
                            e.dates = t;
                        }), a.setData({
                            ticketPriceList: t,
                            calendar: 0,
                            selectedTrue: !1,
                            num: 0
                        }), console.log(a.data.ticketPriceList), console.log(t), console.log(t[0]);
                        var o = parseFloat(t[0].platformPrice);
                        console.log(o);
                        var n = t[0].date;
                        console.log(n);
                        var i = parseFloat(o * a.data.ticketNumber).toFixed(2);
                        a.setData({
                            num: 0,
                            price: o,
                            playDate: n,
                            moneyTotal: i
                        }), console.log(a.data.num), console.log(a.data.price), console.log(a.data.playDate), 
                        console.log(a.data.moneyTotal);
                    } else wx.showToast({
                        title: e.data.message
                    });
                },
                fail: function(e) {
                    wx.showToast({
                        title: "fail-get-price"
                    });
                }
            });
        }
    },
    detailsPay: function(e) {
        var a = this, o = a.data.moneyTotal, s = a.data.IdNumber, r = a.data.phoneNumber, d = a.data.names, c = a.data.playDate, l = a.data.ticketNumber, u = a.data.ticketOrderWay, h = (a.data.ticketName, 
        a.data.idcardEnable), m = a.data.usernameEnabled, p = a.data.phoneNumberEnabled, g = a.data.id, f = a.data.price, D = a.data.names, y = a.data.IdNumber, T = a.data.phoneNumber;
        a.nameValCheck(D), a.phoneNumberValidationCheck(T), a.idCardNumberValidationCheck(y);
        var k = a.data.nameCheck, w = a.data.idCardCheck, b = a.data.phoneCheck;
        return t.setUserNameAndPhone(D, T, y), 0 == c ? (a.setData({
            isCanPay: !0
        }), void wx.showToast({
            title: "请选择合适的时间",
            icon: "none"
        })) : (1 != p || b) && (1 != m || k) && (1 != h || w) ? (a.data.token = wx.getStorageSync("token"), 
        console.log(a.data.token), a.setData({
            isCanPay: !1
        }), wx.request({
            url: n + "/api/zhihuijingqu/applet/ticket/order/create",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                token: a.data.token
            },
            data: JSON.stringify({
                amount: o,
                buyerCertificateCode: s,
                buyerCertificateType: "idcard",
                buyerPhoneNumber: r,
                buyerType: "weixin",
                buyerUsername: d,
                paymentType: "weixin",
                merchantId: i,
                playDate: c,
                ticketInfoId: g,
                ticketOrderWay: u,
                totalTicketCount: l,
                platformPrice: f,
                tradeType: "JSAPI"
            }),
            success: function(e) {
                var t = e.data.ticketCreateOrderDetail;
                a.data.ticketName;
                e.data.success ? (a.setData({
                    tradeNO: e.data.ticketCreateOrderDetail.tradeNo,
                    ticketOrderId: e.data.ticketCreateOrderDetail,
                    prepayData: JSON.parse(t.prepayData),
                    isCanPay: !0
                }), console.log(a.data.ticketOrderId), console.log(a.data.prepayData), console.log(a.data.prepayData.timeStamp), 
                wx.requestPayment({
                    timeStamp: a.data.prepayData.timeStamp,
                    nonceStr: a.data.prepayData.nonceStr,
                    package: a.data.prepayData.package,
                    signType: a.data.prepayData.signType,
                    paySign: a.data.prepayData.paySign,
                    success: function(e) {
                        console.log(e), console.log("支付成功"), a.setData({
                            isCanPay: !0
                        }), wx.navigateTo({
                            url: "/pages/order-details/order-details?ticketOrderId=" + t.ticketOrderId
                        });
                    },
                    fail: function(e) {
                        a.setData({
                            isCanPay: !0
                        }), wx.showToast({
                            title: "请重新支付"
                        }), wx.navigateTo({
                            url: "/pages/order-details/order-details?ticketOrderId=" + t.ticketOrderId
                        });
                    }
                })) : (wx.showToast({
                    title: e.data.message,
                    icon: "none"
                }), a.setData({
                    isCanPay: !0
                }));
            },
            fail: function(e) {
                a.setData({
                    isCanPay: !0
                }), wx.showToast({
                    title: "fail-create",
                    icon: "none"
                });
            }
        }), void wx.showToast({
            title: "加载中...",
            content: "加载中...",
            delay: 1e3
        })) : (a.setData({
            isCanPay: !0
        }), void wx.showToast({
            title: "购买信息必填且正确",
            icon: "none"
        }));
    },
    show: function(e) {
        console.log("购买须知");
        var a = this, t = e.currentTarget.dataset.id;
        wx.request({
            url: n + "/api/zhihuijingqu/applet/ticket/get_buy_notice?ticketInfoId=" + t,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(e) {
                var t = e.data.zhihuijingquAppletBuyTicketNotice;
                e.data.success ? 1 == a.data.flags ? a.setData({
                    flags: 0,
                    zhihuijingquAppletBuyTicketNotice: {}
                }) : a.setData({
                    flags: 1,
                    zhihuijingquAppletBuyTicketNotice: t
                }) : wx.showToast({
                    title: e.data.message
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: e.data.message
                });
            }
        });
    },
    conceal: function() {
        this.setData({
            flags: 0
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        console.log("123"), console.log(t.userName), e.setData({
            names: t.userName,
            phoneNumber: t.userPhone,
            IdNumber: t.userID
        }), console.log(e.data.names), console.log(e.data.IdNumber);
    },
    onHide: function() {},
    onUnload: function() {},
    onTitleClick: function() {},
    onPullDownRefresh: function() {
        this.onThirdDate(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    clickNum: function(e) {
        var a = this;
        if (e.currentTarget.dataset.flag) if (0 != e.currentTarget.dataset.id) {
            var t = parseFloat(e.currentTarget.dataset.price), o = e.currentTarget.dataset.dates, n = parseFloat(t * a.data.ticketNumber).toFixed(2);
            a.setData({
                num: e.currentTarget.dataset.id,
                price: t,
                playDate: o,
                moneyTotal: n
            }), console.log(a.data.num), console.log(a.data.playDate);
        } else {
            var i = parseFloat(e.currentTarget.dataset.price), s = e.currentTarget.dataset.dates, r = parseFloat(i * a.data.ticketNumber).toFixed(2);
            a.setData({
                num: e.currentTarget.dataset.id,
                price: i,
                playDate: s,
                moneyTotal: r
            });
        }
    },
    getNextDate: function(e) {
        var a = this;
        e = +(e = new Date(e)) + 864e5;
        var t = (e = new Date(e)).getFullYear(), o = e.getMonth() + 1, n = e.getDate();
        a.setData({
            month: o,
            months: o,
            year: t,
            day: n,
            before: o - 1
        });
    },
    dateInit: function(e, a) {
        var t = [], o = 0, n = this, i = n.data.year, s = n.data.month - 1, r = n.data.day, d = e ? new Date(e, a) : new Date(i, s, r), c = e || d.getFullYear(), l = 0, u = a || d.getMonth(), h = u + 1 > 11 ? 1 : u + 1, m = new Date(c + "/" + (u + 1) + "/1").getDay(), p = new Date(c, h, 0).getDate(), g = {}, f = 0, D = n.data.weights, y = (n.data.flag, 
        []);
        D.forEach(function(e, a) {
            y.push({
                price: e.price,
                platformPrice: e.platformPrice,
                flag: e.flag
            });
        }), n.setData({
            weight: y
        }), u + 1 > 11 && (l = c + 1, p = new Date(l, h, 0).getDate()), o = m + p;
        for (var T = 0; T < o; T++) g = T >= m ? {
            isToday: "" + c + (u + 1) + (f = T - m + 1),
            dateNum: f,
            dateNums: f < 10 ? "0" + f : f,
            weight: n.data.weight
        } : {}, t[T] = g;
        this.setData({
            dateArr: t
        }), console.log(t);
        var k = new Date(), w = k.getFullYear(), b = k.getMonth() + 1, N = k.getDay(), C = e || w, v = a >= 0 ? a + 1 : b;
        w == C && b == v ? this.setData({
            isTodayWeek: !0,
            todayIndex: N
        }) : this.setData({
            isTodayWeek: !1,
            todayIndex: -1
        });
    },
    lastMonth: function() {
        var e = this, a = e.data.month - 2 < 0 ? e.data.year - 1 : e.data.year, t = e.data.month - 2 < 0 ? 11 : e.data.month - 2;
        e.setData({
            year: a,
            month: 1 * (1 * t + 1)
        }), e.data.month < 10 ? e.setData({
            months: "0" + e.data.month
        }) : e.setData({
            months: e.data.month
        });
        var o = e.data.id;
        wx.request({
            url: n + "/api/zhihuijingqu/applet/ticket/get_price",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: JSON.stringify({
                level: "one_month",
                ticketInfoId: o,
                month: t,
                year: a
            }),
            success: function(o) {
                o.data.ticketPriceList;
                e.setData({
                    weights: o.data.ticketPriceList,
                    ticketPriceListMore: o.data.ticketPriceList
                }), o.data.success ? e.dateInit(a, t) : wx.showToast({
                    title: o.data.message
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "fail"
                });
            }
        }), console.log("点击更多");
    },
    nextMonth: function() {
        var e = this, a = e.data.month > 11 ? e.data.year + 1 : e.data.year, t = e.data.month > 11 ? 0 : e.data.month;
        e.setData({
            year: a,
            month: 1 * (1 * t + 1)
        }), e.data.month < 10 ? e.setData({
            months: "0" + e.data.month
        }) : e.setData({
            months: e.data.month
        });
        var o = e.data.id;
        wx.request({
            url: n + "/api/zhihuijingqu/applet/ticket/get_price",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: JSON.stringify({
                level: "one_month",
                ticketInfoId: o,
                month: t,
                year: a
            }),
            success: function(o) {
                o.data.ticketPriceList;
                e.setData({
                    weights: o.data.ticketPriceList,
                    ticketPriceListMore: o.data.ticketPriceList
                }), o.data.success ? e.dateInit(a, t) : wx.showToast({
                    title: o.data.message
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: e.data.message
                });
            }
        }), console.log("点击更多");
    },
    calendarCancel: function() {
        this.setData({
            calendar: 0
        });
    },
    moreCanlendar: function(e) {
        console.log("购买须知");
        var a = this, t = a.data.id;
        a.getNextDate(a.data.lastDate);
        var o = a.data.year, i = a.data.month - 1, s = (e.currentTarget.dataset.id, new Date().getTime()), r = t + " 23:59:59", d = new Date(r).getTime();
        console.log(s > d), s > d ? a.setData({
            isnowSelectedTodayTrue: !0
        }) : a.setData({
            isnowSelectedTodayTrue: !1
        }), wx.request({
            url: n + "/api/zhihuijingqu/applet/ticket/get_price",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: JSON.stringify({
                level: "one_month",
                ticketInfoId: t,
                month: i,
                year: o
            }),
            success: function(e) {
                var t = e.data.ticketPriceList, o = [];
                t.forEach(function(e, a) {
                    o.push(e.flag);
                }), a.setData({
                    weights: e.data.ticketPriceList,
                    flag: o,
                    ticketPriceListMore: e.data.ticketPriceList
                }), console.log(a.data.flag), e.data.success ? 1 == a.data.calendar ? a.setData({
                    calendar: 0,
                    ticketPriceListMore: []
                }) : (a.dateInit(), a.setData({
                    calendar: 1,
                    ticketPriceListMore: t
                })) : wx.showToast({
                    title: e.data.message
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: e.data.message
                });
            }
        }), console.log("点击更多");
    },
    lessBtnEven: function(e) {
        var a = this, t = a.data.ticketNumber;
        if (t <= 1) {
            t = 1;
            var o = parseFloat(a.data.price * t).toFixed(2);
            a.setData({
                ticketNumber: t,
                moneyTotal: o
            });
        } else {
            t = parseInt(t) - 1;
            var n = parseFloat(a.data.price * t).toFixed(2);
            a.setData({
                ticketNumber: t,
                moneyTotal: n
            });
        }
    },
    addBtnEven: function(e) {
        var a = this, t = a.data.ticketNumber;
        if (t < 99) {
            t = parseInt(t) + 1;
            var o = parseFloat(a.data.price * t).toFixed(2);
            a.setData({
                ticketNumber: t,
                moneyTotal: o
            });
        }
    },
    nameVal: function(e) {
        var a = this;
        a.setData({
            nameFocus: !0
        });
        var t = e.detail.value;
        /^[\u4E00-\u9FA5]{2,6}$/.test(t) ? a.setData({
            nameMess: "",
            names: t,
            nameCheck: !0,
            nameFocus: !1
        }) : a.setData({
            nameMess: "姓名只能为汉字，长度为2-6",
            names: t,
            nameCheck: !1
        }), console.log(a.data.names), console.log(t);
    },
    nameValCheck: function(e) {
        var a = this, t = e;
        /^[\u4E00-\u9FA5]{2,6}$/.test(t) ? a.setData({
            nameMess: "",
            names: t,
            nameCheck: !0,
            nameFocus: !1
        }) : a.setData({
            nameMess: "姓名只能为汉字，长度为2-6",
            names: t,
            nameCheck: !1
        });
    },
    idCardNumberValidation: function(e) {
        var a = this;
        a.setData({
            IdNumberFocus: !0
        });
        var t = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, o = e.detail.value;
        t.test(o) ? a.setData({
            idCardMess: "",
            IdNumber: o,
            idCardCheck: !0,
            IdNumberFocus: !1
        }) : a.setData({
            idCardMess: "身份证号码输入有错误",
            idCardCheck: !1,
            IdNumber: o
        });
    },
    idCardNumberValidationCheck: function(e) {
        var a = this, t = e;
        /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(t) ? a.setData({
            idCardMess: "",
            IdNumber: t,
            idCardCheck: !0,
            IdNumberFocus: !1
        }) : a.setData({
            idCardMess: "身份证号码输入有错误",
            idCardCheck: !1,
            IdNumber: t
        });
    },
    phoneNumberValidation: function(e) {
        var a = this;
        a.setData({
            phoneNumberFocus: !0
        });
        var t = /^[1][3,4,5,6,7,8,9][0-9]{9}$/, o = e.detail.value;
        t.test(o) ? a.setData({
            phoneMess: "",
            phoneNumber: o,
            phoneCheck: !0,
            phoneNumberFocus: !1
        }) : a.setData({
            phoneMess: "手机号码输入有错误",
            phoneNumber: o,
            phoneCheck: !1
        });
    },
    phoneNumberValidationCheck: function(e) {
        var a = this, t = e;
        /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(t) ? a.setData({
            phoneMess: "",
            phoneNumber: t,
            phoneCheck: !0,
            phoneNumberFocus: !1
        }) : a.setData({
            phoneMess: "手机号码输入有错误",
            phoneNumber: t,
            phoneCheck: !1
        });
    },
    goCoupon: function(e) {
        var a = this, o = a.data.names, n = a.data.IdNumber, i = a.data.phoneNumber;
        a.nameValCheck(o), a.phoneNumberValidationCheck(i), a.idCardNumberValidationCheck(n), 
        t.setUserNameAndPhone(o, i, n), wx.navigateTo({
            url: "/pages/my-coupon/my-coupon"
        });
    },
    detailsShow: function(e) {
        var a = this, t = e.currentTarget.dataset.showid, o = a.data.moneyTotal;
        a.setData({
            detailsBooler: 1 == t && !a.data.detailsBooler,
            moneyTotal: o
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