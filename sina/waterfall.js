var waterFall = {

    colHeightArr: [],

    init: function( $ct ){
        this.$ct = $ct;
        this.bind();
        // this.start();
    },

    bind: function(){
        var _this = this;
        $(window).on('resize', function(){
            _this.start();
        });
    },

    start: function($nodes){
        var _this = this;
        this.$items = this.$ct.find('.item');
        console.log(this.$items)
        if(this.$items.length ===0) return;
        this.itemWidth = this.$items.outerWidth(true);
        this.$ct.width('auto');
        this.colNum = Math.floor( this.$ct.width() / this.itemWidth );
        this.$ct.width(this.itemWidth*this.colNum);
        if(this.colHeightArr.length === 0 || !$nodes){
            this.colHeightArr = [];
            for(var i=0; i<this.colNum; i++){
                this.colHeightArr[i] = 0;
            }	
        }

        if($nodes){
            //console.log(this.colHeightArr.length)
            $nodes.each(function(){
                var $item = $(this);
                $item.find('img').on('load', function(){
                    _this.layout( $item );
                    _this.$ct.height( Math.max.apply(null, _this.colHeightArr) );
                })
            });	
        }else{
            this.$items.each(function(){
                var $item = $(this);
                _this.layout( $item );
            });
            console.log(_this.colHeightArr);
            _this.$ct.height( Math.max.apply(null, _this.colHeightArr) );	
        }
        
    },

    layout: function( $el ) {
        // 1. 找到colHeightArr的最小值，得到是第几列
		// 2. 元素left的值是 列数*宽度
		// 3. 元素top的值是 最小值
		// 4. 放置元素的位置，把colHeightArr对应的列数的值加上当前元素的高度
        var obj = this.getIndexOfMin(this.colHeightArr),
            idx = obj.idx,
            min = obj.min;
        $el.css({
            left: idx * this.itemWidth,
            top: min
        });
        this.colHeightArr[idx] += $el.outerHeight(true);
    },

    getIndexOfMin: function( arr ){
        var min = arr[0],
            idx = 0;
        for(var i = 1; i< arr.length; i++){
            if(min > arr[i]){
                min = arr[i];
                idx = i;
            }
        }
        return {min: min, idx: idx};
    }
}