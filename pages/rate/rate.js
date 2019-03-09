var e = getApp(), t = wx.getExtConfigSync() ? wx.getExtConfigSync() : {}, a = t.domain, n = (t.appid, 
t.merchantId);

Page({
    data: {
        list: "",
        token: "",
        index1: 0,
        index2: 0,
        index3: 0,
        index4: 1,
        level: 5,
        levelContent: "",
        memberPhone: "",
        content: "",
        feedback: 1,
        buttonDisabled: !1,
        modalHidden: !1,
        modalHiddenFeedback: !1,
        show: !1,
        phoneNumber: "",
        sure: !1,
        disabled: !1,
        nickName: "",
        avatar: "",
        comShow: !1,
        showMask: !1,
        isUse: !0,
        isNeed: !0
    },
    onLoad: function(t) {
        var a = this;
        e.globalData.userInfoList && a.setData({
            nickName: e.globalData.userInfoList.nickName,
            avatar: e.globalData.userInfoList.avatarUrl
        }), a.init();
    },
    modalBindaconfirm: function() {
        this.setData({
            modalHidden: !this.data.modalHidden,
            show: !this.data.show,
            buttonDisabled: !this.data.buttonDisabled
        });
    },
    modalBindcancel: function() {
        this.setData({
            modalHidden: !this.data.modalHidden,
            modalHiddenFeedback: !this.data.modalHiddenFeedback
        });
    },
    feedback: function() {
        this.setData({
            modalHidden: this.data.modalHidden,
            modalHiddenFeedback: !this.data.modalHiddenFeedback,
            disabled: !1,
            phoneNumber: ""
        }), console.log(this.data.modalHidden), console.log(this.data.modalHiddenFeedback);
    },
    feedbackBtn: function(e) {
        var t = this;
        t.setData({
            isNeed: !1
        }), t.data.token = wx.getStorageSync("token"), t.data.sure ? wx.request({
            url: a + "/api/zhihuijingqu/applet/rate/create",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                token: t.data.token
            },
            data: JSON.stringify({
                merchantId: n,
                rateWay: "weixin",
                memberPhone: t.data.phoneNumber,
                content: t.data.content,
                feedback: t.data.feedback,
                level: t.data.level
            }),
            success: function(e) {
                e.data.success ? (t.setData({
                    modalHiddenFeedback: !1,
                    content: "",
                    disabled: !1,
                    phoneNumber: "",
                    level: 5,
                    index4: 1,
                    index1: 0,
                    index2: 0,
                    index3: 0,
                    isNeed: !0
                }), t.init(), wx.showToast({
                    title: "提交成功"
                })) : (t.setData({
                    isNeed: !0
                }), wx.showToast({
                    title: e.data.message,
                    icon: "none"
                }));
            },
            fail: function(e) {
                t.setData({
                    isNeed: !0
                }), wx.showToast({
                    title: "fail-create-rate"
                });
            },
            complete: function(e) {}
        }) : wx.showToast({
            title: "请输入正确的手机号",
            icon: "none"
        });
    },
    showModal: function() {
        var e = this;
        if ("" !== e.data.content.trim()) {
            if (!e.data.showMask) {
                var t = e.data.content.replace(/\n/g, "<br/>");
                e.setData({
                    content: t
                });
            }
            e.setData({
                showMask: !1,
                modalHidden: !0
            });
        } else wx.showToast({
            title: "请输入评价内容"
        });
    },
    change_color: function(e) {
        var t = e.currentTarget.dataset.id;
        console.log(t), 1 == t && this.setData({
            index1: 1,
            index2: 0,
            index3: 0,
            index4: 0,
            level: t,
            levelContent: "非常不满意"
        }), 2 == t && this.setData({
            index1: 0,
            index2: 1,
            index3: 0,
            index4: 0,
            level: t,
            levelContent: "不满意"
        }), 4 == t && this.setData({
            index1: 0,
            index2: 0,
            index3: 1,
            index4: 0,
            level: t,
            levelContent: "满意"
        }), 5 == t && this.setData({
            index1: 0,
            index2: 0,
            index3: 0,
            index4: 1,
            level: t,
            levelContent: "非常满意"
        });
    },
    init: function() {
        var e = this;
        e.data.token = wx.getStorageSync("token"), wx.request({
            url: a + "/api/zhihuijingqu/applet/rate/get",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                token: e.data.token
            },
            data: JSON.stringify({
                merchantId: n,
                rateWay: "weixin"
            }),
            success: function(t) {
                var a = t.data.rate;
                t.data.success ? e.setData({
                    list: a
                }) : wx.showToast({
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
        });
    },
    submitBtn: function() {
        var e = this;
        e.setData({
            isUse: !1
        }), e.data.token = wx.getStorageSync("token"), wx.request({
            url: a + "/api/zhihuijingqu/applet/rate/create",
            method: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                token: e.data.token
            },
            data: JSON.stringify({
                merchantId: n,
                rateWay: "weixin",
                memberPhone: e.data.memberPhone,
                content: e.data.content,
                feedback: e.data.feedback,
                level: e.data.level
            }),
            success: function(t) {
                t.data.success ? (e.setData({
                    modalHidden: !e.data.modalHidden,
                    content: "",
                    disabled: !1,
                    comShow: !0,
                    isUse: !0
                }), console.log(e.data.content), console.log(e.data.isUse), e.init(), wx.showToast({
                    title: "提交成功"
                })) : (e.setData({
                    isUse: !0
                }), wx.showToast({
                    title: t.data.message,
                    icon: "none"
                }));
            },
            fail: function(t) {
                e.setData({
                    isUse: !0
                }), wx.showToast({
                    title: "请求失败",
                    icon: "none"
                });
            },
            complete: function(e) {}
        });
    },
    textareaVal: function(e) {
        var t = this, a = e.detail.value;
        t.setData({
            content: a
        }), console.log(t.data.content);
    },
    comBack: function() {
        this.setData({
            comShow: !1
        });
    },
    phoneNumberValidation: function(e) {
        var t = this, a = /^[1][3,4,5,6,7,8,9][0-9]{9}$/, n = e.detail.value;
        a.test(n) ? t.setData({
            phoneNumber: n,
            sure: !0
        }) : t.setData({
            sure: !1
        }), console.log(t.data.phoneNumber);
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