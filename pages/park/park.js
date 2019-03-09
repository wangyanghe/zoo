getApp();

var a = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, t = a.domain, e = (a.appid, 
a.merchantId);

Page({
    data: {
        privShow: !1,
        privNum: !1,
        names: "浙",
        isProvince: !1,
        provName: !1,
        number: "",
        token: "",
        parkOrderId: "",
        allNum: "",
        parkOrder: "",
        content: "",
        keyShow: !1
    },
    onLoad: function(a) {},
    parkDetails: function() {
        wx.navigateTo({
            url: "/pages/park-details/park-details"
        });
    },
    parkDelay: function() {
        wx.navigateTo({
            url: "/pages/park-delay/park-delay"
        });
    },
    parkPriv: function() {
        var a = this;
        a.setData({
            privShow: !a.data.privShow,
            names: "",
            provName: !a.data.provName
        });
    },
    hindKeyboard: function() {
        this.setData({
            keyShow: !1
        });
    },
    showKeyboard: function() {
        this.setData({
            keyShow: !0
        });
    },
    keyTap: function(a) {
        var t = this, e = a.currentTarget.dataset.name, n = t.data.content, r = n && n.length;
        "删除" == e ? n = n.substr(0, n.length - 1) : (r <= 6 || r <= 7) && (n += e), t.setData({
            content: n
        });
    },
    provinceValidation: function(a) {
        var t = this, e = /(^[A-Z]{1}[A-Z0-9]{5,6}$)/, n = a.detail.value.toUpperCase();
        e.test(n) ? t.setData({
            isProvince: !0,
            number: n
        }) : t.setData({
            isProvince: !1,
            number: n
        });
    },
    parkTo: function() {
        var a = this, t = a.data.names + a.data.content;
        wx.navigateTo({
            url: "/pages/park-details/park-details?carNumber=" + t
        });
    },
    parkQuery: function() {
        var a = this;
        a.data.token = wx.getStorageSync("token");
        var n = a.data.names + a.data.content;
        6 == a.data.content.length || 7 == a.data.content.length ? wx.request({
            url: t + "/api/zhihuijingqu/applet/park/query",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                token: a.data.token
            },
            data: JSON.stringify({
                merchantId: e,
                carNumber: n,
                parkOrderId: a.data.parkOrderId
            }),
            success: function(t) {
                var e = t.data.parkOrder;
                if (t.data.success) {
                    var n = e.totalAmount, r = e.carNumber, o = e.comeTime, i = e.payAmount, s = e.stopTimes, p = e.parkOrderId, d = e.preferentialAmount, u = e.preferentialPaper, c = e.needPayAmount.toFixed(2);
                    a.setData({
                        parkOrder: e
                    }), wx.navigateTo({
                        url: "/pages/park-details/park-details?totalAmount=" + n + "&carNumber=" + r + "&comeTime=" + o + "&payAmount=" + i + "&stopTimes=" + s + "&parkOrderId=" + p + "&preferentialAmount=" + d + "&preferentialPaper=" + u + "&needPayAmount=" + c
                    });
                } else wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            },
            fail: function(a) {
                wx.showToast({
                    title: "fail"
                });
            },
            complete: function(a) {}
        }) : wx.showToast({
            title: "车牌号格式错误"
        });
    },
    provDesc: function(a) {
        var t = this, e = a.currentTarget.dataset.name;
        t.setData({
            names: e,
            privShow: !t.data.privShow
        });
    },
    onCounterPlusOne: function(a) {
        console.log(a);
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShow: function() {}
});