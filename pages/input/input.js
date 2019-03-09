Page({
    data: {
        currentTab: ""
    },
    bindChange: function(t) {
        this.setData({
            currentTab: t.detail.current
        });
    },
    swichNav: function(t) {
        this.setData({
            currentTab: t.target.dataset.current
        });
    }
});