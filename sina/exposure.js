var Exposure = {

    init: function ($target, handler) {

        this.$c = $(window);
        this.$target = $target;
        this.handler = handler;

        this.bind();
        this.checkShow();
    },

    bind: function () {

        var _this = this,
            timer = null,
            interval = 100;

        $(window).on('scroll', function (e) {
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                _this.checkShow();
            }, interval);
        });

    },

    checkShow: function () {
        var _this = this;
        //console.log(this.$target)
        this.$target.each(function () {

            var $cur = $(this);
            if (_this.isShow($cur)) {
                _this.handler && _this.handler.call(console.log(_this));
                $cur.data('loaded', true);
            }
        });
    },

    isShow: function ($el) {

        var scrollH = this.$c.scrollTop(),
            winH = this.$c.height(),
            top = $el.offset().top;

        if (top < winH + scrollH) {
            return true;
        } else {
            return false;
        }
    },

    hasLoaded: function ($el) {
        if ($el.data('loaded')) {
            return true;
        } else {
            return false;
        }
    }

};