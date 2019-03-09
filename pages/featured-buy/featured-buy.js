function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

require("../../libs/amap-wx.js");

var t, a = getApp(), o = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, s = o.domain, n = (o.appid, 
o.merchantId);

wx.createInnerAudioContext();

Page({
    data: (t = {
        region: [ "浙江省", "杭州市", "西湖区" ],
        regionString: "浙江省,杭州市,西湖区",
        customItem: "全部",
        indicatorDots: !0,
        autoplay: !0,
        interval: 3e3,
        goods: [],
        goodsPictureList: "",
        goodsName: "",
        repertoryCount: 0,
        expressCostType: 0,
        skinRichTextId: "",
        expressAmount: 0,
        goodsPrice: 0,
        goodsPicture: "",
        moneyTotal: 0,
        goodsId: "",
        createOrder: {},
        token: "",
        goodsid: "",
        id: "",
        name: "",
        numberTotal: 1,
        content: "",
        details: "",
        names: "",
        nameMess: "",
        IdNumber: "",
        idCardMess: "",
        phoneNumber: "",
        phoneMess: "",
        detailsMess: "",
        contentMess: "",
        nameCheck: !1,
        idCardCheck: !1,
        phoneCheck: !1,
        detailsCheck: !1,
        contentCheck: !1
    }, e(t, "details", ""), e(t, "names", ""), e(t, "nameMess", ""), e(t, "IdNumber", ""), 
    e(t, "idCardMess", ""), e(t, "phoneNumber", ""), e(t, "phoneMess", ""), e(t, "nameCheck", !1), 
    e(t, "idCardCheck", !1), e(t, "phoneCheck", !1), e(t, "weixinPayData", {}), e(t, "regionString", ""), 
    e(t, "isShow", !1), e(t, "saleCount", ""), t),
    onLoad: function(e) {
        var t = this;
        t.setData({
            id: e.id,
            name: e.name,
            regionString: "浙江省,杭州市,西湖区"
        }), t.queryDetail();
    },
    lessBtnEven: function(e) {
        var t = this, a = t.data.numberTotal;
        if (a <= 1) {
            a = 1;
            var o = 1 * t.data.expressAmount, s = (1 * (1 * parseFloat(t.data.goodsPrice * a).toFixed(2) + o)).toFixed(2);
            t.setData({
                numberTotal: a,
                moneyTotal: s
            });
        } else {
            a = parseInt(a) - 1;
            var n = 1 * t.data.expressAmount, i = (1 * (1 * parseFloat(t.data.goodsPrice * a).toFixed(2) + n)).toFixed(2);
            t.setData({
                numberTotal: a,
                moneyTotal: i
            });
        }
    },
    addBtnEven: function(e) {
        var t = this, a = t.data.numberTotal;
        if (a < 99) {
            a = parseInt(a) + 1;
            var o = (1 * (1 * t.data.expressAmount + 1 * parseFloat(t.data.goodsPrice * a).toFixed(2))).toFixed(2);
            t.setData({
                numberTotal: a,
                moneyTotal: o
            });
        }
    },
    queryDetail: function() {
        var e = this;
        wx.request({
            url: s + "/api/mall/member/get_goods?goodsId=" + e.data.id,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(t) {
                var a = t.data.goods, o = a.goodsPictureList, s = a.goodsName, n = a.repertoryCount, i = a.expressCostType, r = a.skinRichTextId, d = a.expressAmount, c = a.goodsPrice, l = a.goodsPicture, u = (1 * a.goodsPrice + 1 * d).toFixed(2), m = a.saleCount, h = a.goodsId;
                t.data.success ? e.setData({
                    goods: a,
                    goodsPictureList: o,
                    goodsName: s,
                    repertoryCount: n,
                    expressCostType: i,
                    skinRichTextId: r,
                    expressAmount: d,
                    goodsPicture: l,
                    goodsPrice: c,
                    moneyTotal: u,
                    goodsId: h,
                    saleCount: m
                }) : my.alert({
                    content: t.data.message
                });
            },
            fail: function(e) {
                my.alert({
                    content: "fail"
                });
            },
            complete: function(e) {}
        });
    },
    bindRegionChange: function(e) {
        var t = this, a = e.detail.value;
        t.setData({
            region: e.detail.value,
            regionString: a.join(",")
        }), console.log(t.data.region), console.log(t.data.regionString);
    },
    createPay: function() {
        var e = this;
        e.nameValCheck(e.data.names), e.phoneNumberValidationCheck(e.data.phoneNumber), 
        e.detailsCheck(e.data.details);
        var t = e.data.nameCheck, o = e.data.detailsCheck, i = e.data.phoneCheck;
        if (t && o && i) {
            e.data.token = wx.getStorageSync("token");
            var r = e.data.details, d = e.data.regionString + r;
            wx.request({
                url: s + "/api/mall/member/create_order",
                method: "POST",
                header: {
                    "Content-Type": "application/json;charset=UTF-8",
                    token: e.data.token
                },
                data: JSON.stringify({
                    buyerAddress: d,
                    buyerPhoneNumber: e.data.phoneNumber,
                    buyerType: "weixin",
                    buyerUsername: e.data.names,
                    createOrderGoodsList: [ {
                        amount: e.data.goodsPrice * e.data.numberTotal,
                        count: e.data.numberTotal,
                        mallGoodsId: e.data.goodsId,
                        price: e.data.goodsPrice
                    } ],
                    totalAmount: e.data.moneyTotal,
                    totalGoodsCount: e.data.numberTotal,
                    expressAmount: e.data.expressAmount,
                    merchantId: n,
                    paymentType: "weixin",
                    remark: e.data.content,
                    tradeType: "JSAPI"
                }),
                success: function(e) {
                    var t = e.data.createOrder, o = JSON.parse(t.weixinPayData);
                    e.data.success ? wx.requestPayment({
                        timeStamp: o.timeStamp,
                        nonceStr: o.nonceStr,
                        package: o.package,
                        signType: o.signType,
                        paySign: o.paySign,
                        success: function(e) {
                            a.globalData.storeInfo = "";
                            a.globalData.storeInfo = 3, wx.switchTab({
                                url: "/pages/order-list/order-list"
                            });
                        },
                        fail: function(e) {
                            wx.showToast({
                                title: "请重新支付"
                            }), a.globalData.storeInfo = "";
                            a.globalData.storeInfo = 3, wx.switchTab({
                                url: "/pages/order-list/order-list"
                            });
                        }
                    }) : wx.showToast({
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
            }), wx.showToast({
                title: "加载中...",
                content: "加载中...",
                delay: 1e3
            });
        } else wx.showToast({
            title: "收货信息必填且正确",
            icon: "none"
        });
    },
    details: function(e) {
        var t = this, a = e.detail.value, o = a.trim();
        o.length < 2 ? t.setData({
            detailsCheck: !1,
            detailsMess: "地址不能小于2个字符",
            details: a
        }) : o.length > 21 ? t.setData({
            detailsCheck: !1,
            detailsMess: "地址不能大于20个字符",
            details: a
        }) : t.setData({
            detailsCheck: !0,
            detailsMess: "",
            details: a
        });
    },
    detailsCheck: function(e) {
        var t = this, a = e, o = a.trim();
        o.length < 2 ? t.setData({
            detailsCheck: !1,
            detailsMess: "地址不能小于2个字符",
            details: a
        }) : o.length > 21 ? t.setData({
            detailsCheck: !1,
            detailsMess: "地址不能大于20个字符",
            details: a
        }) : t.setData({
            detailsCheck: !0,
            detailsMess: "",
            details: a
        });
    },
    textareaVal: function(e) {
        var t = this, a = e.detail.value;
        t.setData({
            content: a
        });
    },
    nameVal: function(e) {
        var t = this;
        t.setData({
            nameFocus: !0
        });
        var a = e.detail.value;
        /^[\u4E00-\u9FA5]{2,20}$/.test(a) ? t.setData({
            nameMess: "",
            names: a,
            nameCheck: !0,
            nameFocus: !1
        }) : t.setData({
            nameMess: "姓名只能为汉字，长度为2-20",
            names: a,
            nameCheck: !1
        }), console.log(t.data.names), console.log(a);
    },
    nameValCheck: function(e) {
        var t = this, a = e;
        /^[\u4E00-\u9FA5]{2,20}$/.test(a) ? t.setData({
            nameMess: "",
            names: a,
            nameCheck: !0,
            nameFocus: !1
        }) : t.setData({
            nameMess: "姓名只能为汉字，长度为2-20",
            names: a,
            nameCheck: !1
        });
    },
    idCardNumberValidation: function(e) {
        var t = this;
        t.setData({
            IdNumberFocus: !0
        });
        var a = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, o = e.detail.value;
        a.test(o) ? t.setData({
            idCardMess: "",
            IdNumber: o,
            idCardCheck: !0,
            IdNumberFocus: !1
        }) : t.setData({
            idCardMess: "身份证号码输入有错误",
            idCardCheck: !1,
            IdNumber: o
        });
    },
    idCardNumberValidationCheck: function(e) {
        var t = this, a = e;
        /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(a) ? t.setData({
            idCardMess: "",
            IdNumber: a,
            idCardCheck: !0,
            IdNumberFocus: !1
        }) : t.setData({
            idCardMess: "身份证号码输入有错误",
            idCardCheck: !1,
            IdNumber: a
        });
    },
    phoneNumberValidation: function(e) {
        var t = this;
        t.setData({
            phoneNumberFocus: !0
        });
        var a = /^[1][3,4,5,6,7,8,9][0-9]{9}$/, o = e.detail.value;
        a.test(o) ? t.setData({
            phoneMess: "",
            phoneNumber: o,
            phoneCheck: !0,
            phoneNumberFocus: !1
        }) : t.setData({
            phoneMess: "手机号码输入有错误",
            phoneNumber: o,
            phoneCheck: !1
        });
    },
    phoneNumberValidationCheck: function(e) {
        var t = this, a = e;
        /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(a) ? t.setData({
            phoneMess: "",
            phoneNumber: a,
            phoneCheck: !0,
            phoneNumberFocus: !1
        }) : t.setData({
            phoneMess: "手机号码输入有错误",
            phoneNumber: a,
            phoneCheck: !1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onTitleClick: function() {},
    onPullDownRefresh: function() {
        my.stopPullDownRefresh();
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