Page({
    data: {
        src: ""
    },
    onLoad: function(t) {
        var e = this, a = t.descriptionUrl, i = t.title;
        i ? (wx.setNavigationBarTitle({
            title: i
        }), e.setData({
            src: a + "?name=" + i
        })) : (wx.setNavigationBarTitle({
            title: "景点详情"
        }), e.setData({
            src: a + "?name=景点详情"
        }));
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    }
});