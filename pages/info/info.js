function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = getApp(), n = wx.getExtConfigSync() ? wx.getExtConfigSync() : {};

console.log(n);

n.domain;

var o = n.appid;

n.merchantId;

Page((t = {
    data: {
        tabArr: {
            curHdIndex: 0,
            curBdIndex: 0
        },
        pageIndex: 1,
        pageSize: 10,
        nickName: "",
        avatar: "",
        user: "",
        showUserInfo: !0
    },
    onLoad: function() {},
    pay: function() {
        wx.requestPayment({
            timeStamp: "1540522465886",
            nonceStr: "WZHtegOWMJEm8NFdUg5Vi08TOCAoLbvW",
            package: "prepay_id=wx261054255671234f0c73fa9c0152182657",
            signType: "MD5",
            paySign: "51C45B1040FB859AE3944DF53462ABBB",
            success: function(a) {
                console.log("支付成功"), console.log(a);
            },
            fail: function(a) {
                console.log("支付失败"), console.log(a);
            }
        });
    },
    tabFun: function(a) {
        var t = a.currentTarget.dataset.id, e = (a.currentTarget.dataset.id, {});
        e.curHdIndex = t, e.curBdIndex = t, this.setData({
            tabArr: e
        });
    },
    unpay: function(a) {
        e.globalData.parkStatusItems = "";
        var t = a.currentTarget.dataset.id;
        e.globalData.orderStatusItems = t, wx.switchTab({
            url: "/pages/order-list/order-list"
        });
    },
    parkList: function(a) {
        e.globalData.orderStatusItems = "";
        var t = a.currentTarget.dataset.id;
        e.globalData.parkStatusItems = t, wx.switchTab({
            url: "/pages/order-list/order-list"
        });
    },
    onGotUserInfo: function(a) {
        console.log(a.detail.errMsg), console.log(a.detail.userInfo), console.log(a.detail.rawData);
        var t = this;
        e.globalData.userInfoList = a.detail.userInfo, console.log(e.globalData.userInfoList), 
        t.setData({
            nickName: a.detail.userInfo.nickName,
            avatar: a.detail.userInfo.avatarUrl,
            showUserInfo: !t.data.showUserInfo
        });
    },
    addTodo: function() {
        wx.navigateTo({
            url: "/pages/self-tricket/self"
        });
    },
    rate: function() {
        wx.navigateTo({
            url: "/pages/rate/rate"
        });
    },
    inputs: function() {
        wx.navigateTo({
            url: "/pages/input/input"
        });
    },
    onShow: function() {},
    parkStop: function() {
        wx.navigateTo({
            url: "/pages/park/park"
        });
    },
    park: function() {
        wx.navigateToMiniProgram({
            appId: o,
            path: "pages/category/category",
            extraData: {
                query: {
                    storeId: 4743
                }
            }
        });
    },
    notice: function() {
        wx.navigateTo({
            url: "/pages/notice/notice"
        });
    }
}, a(t, "rate", function() {
    wx.navigateTo({
        url: "/pages/rate/rate"
    });
}), a(t, "guid", function() {
    wx.navigateTo({
        url: "/pages/guid/guid"
    });
}), a(t, "noticeDetails", function() {
    wx.navigateTo({
        url: "/pages/notice-details/notice-details"
    });
}), a(t, "onPullDownRefresh", function() {
    wx.stopPullDownRefresh();
}), t));