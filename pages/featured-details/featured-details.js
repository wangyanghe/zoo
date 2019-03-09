function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

require("../../libs/amap-wx.js"), getApp();

var t, a = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, o = a.domain, n = (a.appid, 
a.merchantId);

wx.createInnerAudioContext();

Page({
    data: (t = {
        tabArr: {
            curHdIndex: 0,
            curBdIndex: 0
        },
        indicatorDots: !0,
        autoplay: !0,
        interval: 3e3,
        goodsid: ""
    }, e(t, "goodsid", ""), e(t, "goods", {}), e(t, "goodsPictureList", []), e(t, "goodsName", ""), 
    e(t, "repertoryCount", ""), e(t, "expressCostType", ""), e(t, "skinRichTextId", ""), 
    e(t, "goodsPrice", ""), e(t, "show", !1), e(t, "number", 0), e(t, "detailUrlShow", !0), 
    t),
    onLoad: function(e) {
        var t = this;
        t.setData({
            goodsid: e.goodsid
        }), t.query(), t.configPhone();
    },
    showService: function() {
        var e = this;
        e.setData({
            show: !e.data.show
        });
    },
    hideService: function() {
        this.setData({
            show: !1
        });
    },
    makePhoneCall: function() {
        var e = this;
        wx.makePhoneCall({
            phoneNumber: e.data.number
        }), e.setData({
            show: !1
        });
    },
    configPhone: function() {
        var e = this;
        wx.request({
            url: o + "/api/mall/member/get_config?merchantId=" + n,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(t) {
                var a = t.data.mallConfig.customerServiceTelephone;
                t.data.success ? e.setData({
                    number: a
                }) : wx.showToast({
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
    goodsDetails: function(e) {
        var t = e.currentTarget.dataset.id, a = e.currentTarget.dataset.name;
        wx.navigateTo({
            url: "/pages/featured-active/featured-active?id=" + t + "&name=" + a
        });
    },
    query: function() {
        var e = this;
        wx.request({
            url: o + "/api/mall/member/get_goods?goodsId=" + e.data.goodsid,
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(t) {
                var a = t.data.goods, o = a.goodsPictureList, n = a.goodsName, i = a.repertoryCount, s = a.expressCostType, r = a.skinRichTextId, d = a.expressAmount, c = a.goodsPrice, u = a.detailUrl, l = a.saleCount;
                t.data.success ? (null == u || "" == u ? e.setData({
                    detailUrlShow: !1
                }) : e.setData({
                    detailUrlShow: !0,
                    detailUrl: u
                }), e.setData({
                    goods: a,
                    goodsPictureList: o,
                    goodsName: n,
                    repertoryCount: i,
                    expressCostType: s,
                    skinRichTextId: r,
                    expressAmount: d,
                    goodsPrice: c,
                    saleCount: l
                })) : wx.showToast({
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
    tabFun: function(e) {
        var t = e.currentTarget.dataset.id, a = (e.currentTarget.dataset.id, {});
        a.curHdIndex = t, a.curBdIndex = t, this.setData({
            tabArr: a
        });
    },
    changeimage: function(e) {
        var t = e.detail.current;
        e.detail.source;
        this.setData({
            current: t
        });
    },
    topay: function(e) {
        var t = e.currentTarget.dataset.id, a = e.currentTarget.dataset.name;
        wx.navigateTo({
            url: "/pages/featured-buy/featured-buy?name=" + a + "&id=" + t
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