getApp();

var t = wx.getExtConfigSync() ? wx.getExtConfigSync() : {};

console.log(t);

var e = t.domain, a = (t.appid, t.merchantId);

Page({
    data: {
        pageIndex: 1,
        pageSize: 10,
        isLast: !1,
        merchantNoticeList: [],
        total: 0,
        performName: "",
        titleName: ""
    },
    onLoad: function(t) {
        var e = this;
        e.setData({
            titleName: t.name
        }), e.data.titleName ? wx.setNavigationBarTitle({
            title: e.data.titleName
        }) : wx.setNavigationBarTitle({
            title: "表演介绍"
        }), e.query();
    },
    query: function() {
        var t = this;
        wx.request({
            url: e + "/api/zhihuijingqu/applet/notice/scenic_notice_list",
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
                var a = e.data.merchantNoticeList;
                a.forEach(function(t, e) {
                    var a = t.performDescription;
                    a && a.length > 70 ? t.performDescription = t.performDescription.slice(0, 70) + "..." : t.performDescription = t.performDescription;
                }), e.data.success ? t.setData({
                    merchantNoticeList: a,
                    total: e.data.totalCount
                }) : wx.showToast({
                    title: e.data.message,
                    icon: "none"
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "fail"
                });
            },
            complete: function(t) {}
        });
    },
    map: function(t) {
        var e = t.currentTarget.dataset.maplatitude, a = t.currentTarget.dataset.maplongitude, i = t.currentTarget.dataset.maplevel;
        wx.navigateTo({
            url: "/pages/map-guide/map-guide?latitude=" + e + "&longitude=" + a + "&scale=" + i
        });
    },
    parkDetails: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.performname;
        wx.navigateTo({
            url: "/pages/notice-details/notice-details?id=" + e + "&performName=" + a
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        t.setData({
            pageIndex: 1
        }), t.query(), my.stopPullDownRefresh();
    },
    onReachBottom: function() {
        var t = this;
        if (!t.data.isLast) {
            var i = t.data.pageIndex + 1;
            t.setData({
                pageIndex: i
            }), wx.request({
                url: e + "/api/zhihuijingqu/applet/notice/scenic_notice_list",
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
                    if (e.data.success) if (a && istslists.length < 10) t.setData({
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
                        title: "fail"
                    });
                },
                complete: function(t) {}
            });
        }
    },
    onShow: function() {}
});