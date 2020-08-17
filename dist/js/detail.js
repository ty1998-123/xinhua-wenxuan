let $spid = location.search.slice(4);
$.ajax({
    type : 'get',
    url : '../php/list.php',
    success : function(data){
        $.each(data,(index,value)=>{
            if(value.id == $spid){
                let str = `
                    <!-- 放大镜 -->
                    <div class="shop-window">
                        <div class="zoom">
                            <img src="../img/detail/content/content${value.id}.jpg" alt="" class="window">
                            <span id="mask"></span>
                        </div>
                        <img src="../img/detail/common/discounts.jpg" alt="" class="discounts">
                        <div class="large-pic">
                            <img class="large" src="../../dist/img/detail/content/content${value.id}-lg.jpg">
                        </div>
                        <p>分享到：<img src="../img/detail/common/shoucang.jpg" alt=""></p>
                    </div>
                    <!-- 详细信息 -->
                    <div class="specific">
                        <p id="name">${value.name}</p>
                        <p>购书卡&政企书目服务专线：028-83157118（10:00-17:00）</p>
                        <div class="shopping">
                            <p class="set-pirce"><span>定&nbsp;&nbsp;价 ：</span><span id="setPrice">${value.setPrice}</span></p>
                            <p class="wen-price"><span>文 轩 价 ：</span><span id="wenPrice">${value.wenPrice}</span></p>
                            <p><span>配 送 至 ：</span><input type="text"></p>
                            <p>文轩网正版图书音像，为您快捷发货</p>
                            <p><span>作&nbsp;&nbsp;者 ：</span><span id="writer">${value.writer}</span></p>
                            <p><span>所属分类 ：</span>图书 > 文学 > 民间文学</p>
                            <p><span>促销活动 ：</span><span class="red">❤图书音像单笔满99减10，满499减100！(65折内图书、电子书除外）</span></p>
                            <p class="red">❤老客户回馈，积分换礼券，购书更实惠</p>
                            <p class="red">❤大陆非新疆西藏地区包邮，新疆西藏运费每单20元</p>
                        </div>
                        <!-- 购买 -->
                        <div class="buy">
                            <div class="num">
                                <span>购买数量 ：</span>
                                <input type="button" value="-" class="minus">
                                <input type="text" name="" id="number">
                                <input type="button" value="+" class="plus">
                        <!-- 加入购物车 -->
                                <a href="javascript:;" id="in-cart" data-id="${value.id}">加入购物车</a>
                            </div>
                            <p><span>服&nbsp;&nbsp;务 ：</span><span>由"文轩网"直接销售和发货，并提供售后服务</span></p>
                            <p><a href="">正品低价</a> | <a href="">闪电发货</a> | <a href="">货到付款</a> | <a href="">高效退换货</a></p>
                        </div>
                    </div>`
                $('.shop').html(str);
            }
        })
        // 放大镜
        $('.zoom').on('mouseenter',function(){
        $('#mask').css({display : 'block'});
        $('.large-pic').css({display : 'block'});
        })
        $('.zoom').on('mouseleave',function(){
            $('#mask').css({display : 'none'});
            $('.large-pic').css({display : 'none'});
        })
        $('.zoom').mousemove(function(e){
            let left = e.pageX - $(this).offset().left - $('#mask').width() / 2;
            let top = e.pageY - $(this).offset().top - $('#mask').height() / 2;
            if(left <= 0){
                    left = 0;
                }else if(left >= $('.zoom').width() - $('#mask').width()){
                    left = $('.zoom').width() - $('#mask').width();
                }
                if(top <= 0){
                    top = 0;
                }else if(top >= $('.zoom').height() - $('#mask').height()){
                    top = $('.zoom').height() - $('#mask').height();
                }
            $('#mask').css({left : left});
            $('#mask').css({top : top});
            // 当前滑块移动的位置 / 滑块移动的总范围
            let p_x = left / ($('.zoom').width() - $('#mask').width());
            let p_y = top / ($('.zoom').height() - $('#mask').height());
            //控制大图移动
            //大图： 大图的位置 = - 大图移动的总范围 * 移动比例 + 'px';
            $('.large')[0].style.left = - ($('.large').width() - $('.large-pic').width()) * p_x + 'px';
            $('.large')[0].style.top = - ($('.large').height() - $('.large-pic').height()) * p_y + 'px';
        })
        //添加事件
        $('.zoom').on('mouseenter',function(){
            $('#mask').css({display : 'block'});
            $('.large-pic').css({display : 'block'});
        })
        $('.zoom').on('mouseleave',function(){
            $('#mask').css({display : 'none'});
            $('.large-pic').css({display : 'none'});
        })
        $('.zoom').mousemove(function(e){
            let left = e.pageX - $(this).offset().left - $('#mask').width() / 2;
            let top = e.pageY - $(this).offset().top - $('#mask').height() / 2;
            if(left <= 0){
                    left = 0;
                }else if(left >= $('.zoom').width() - $('#mask').width()){
                    left = $('.zoom').width() - $('#mask').width();
                }
                if(top <= 0){
                    top = 0;
                }else if(top >= $('.zoom').height() - $('#mask').height()){
                    top = $('.zoom').height() - $('#mask').height();
                }
            $('#mask').css({left : left});
            $('#mask').css({top : top});
            // 当前滑块移动的位置 / 滑块移动的总范围
            let p_x = left / ($('.zoom').width() - $('#mask').width());
            let p_y = top / ($('.zoom').height() - $('#mask').height());
            //控制大图移动
            //大图： 大图的位置 = - 大图移动的总范围 * 移动比例 + 'px';
            $('.large')[0].style.left = - ($('.large').width() - $('.large-pic').width()) * p_x + 'px';
            $('.large')[0].style.top = - ($('.large').height() - $('.large-pic').height()) * p_y + 'px';
        })
        // 添加到购物车
        $('#in-cart').on('click',function(){
            let $spid = $(this).attr('data-id');
            let cookieObj = getCookie('carts') ? JSON.parse(getCookie('carts')) : {};
            if($spid in cookieObj){
                cookieObj[$spid].num ++;
            }else{
                cookieObj[$spid] = {
                    "name" : $('#name').html(),
                    "wenPrice" : $('#wenPrice').html(),
                    "num" : 1,
                    "id" : $spid,
                    "writer" : $('#writer').html()
                }
            }
            createCookie('carts',JSON.stringify(cookieObj),{expires : 7,path : '/'});
            alert('添加成功');
            // 购物车数量
            cookieObj = getCookie('carts') ? JSON.parse(getCookie('carts')) : {};
            let products = 0;
            for(key in cookieObj){
                products += cookieObj[key].num;
            }
            $('#buy').html(products);
        })
        $('.search-header-buy').on('click',function(){
            location.href = '../html/cart.html';
        })
        // 购物车数量
        let cookieObj = getCookie('carts') ? JSON.parse(getCookie('carts')) : {};
        let products = 0;
        for(key in cookieObj){
            products += cookieObj[key].num;
        }
        $('#buy').html(products);
        // 购买数量
        $('#number').val(cookieObj[$('#in-cart').attr('data-id')].num);
        $('.minus').on('click',function(){
            let sum = $(this).next().val();
            if(sum > 1){
                sum --;
            }
            $(this).next().val(sum);
            let id = $('#in-cart').attr('data-id');
            if(cookieObj[id].num > 1){
                cookieObj[id].num --;
            }
            createCookie('carts',JSON.stringify(cookieObj),{expires : 7,path : '/'});
        })
        $('.plus').on('click',function(){
            let sum = parseInt($(this).prev().val()) + 1;
            $(this).prev().val(sum);
            let id = $('#in-cart').attr('data-id');
            cookieObj[id].num ++;
            createCookie('carts',JSON.stringify(cookieObj),{expires : 7,path : '/'});
        })
        $('#number').on('blur',function(){
            let sum = parseInt($(this).val());
            if(sum > 1){
                $(this).val(sum);
            }else if(sum <= 1){
                sum = 1;
                $(this).val(1);
            }
            let id = $('#in-cart').attr('data-id');
            cookieObj[id].num = sum;
            createCookie('carts',JSON.stringify(cookieObj),{expires : 7,path : '/'});
        })
    }
})
