$.ajax({
    type : 'get',
    url : '../php/list.php',
    success : function(data){
        // data = JSON.parse(data);
        let $str = '';
        $.each(data,(index,value)=>{
            $str +=  `<li data-id="${value.id}">
                        <div class="cell">
                            <a href="javascript:;"><img src="../img/list/content/content${value.id}.jpg" alt=""></a>
                            <span>${value.name}</span>
                            <p><span>${value.wenPrice}</span><span>${value.setPrice}</span></p>
                            <div class="attr">
                                <p><a href="">${value.writer}</a></p>
                                <img src="../img/list/stars.jpg" alt="">
                                <p>出 版 社：<span>上海三联书店</span></p>
                                <p>出版时间：<span>2019年03月</span></p>
                            </div>
                        </div>
                    </li>`;
        })
        $('#listGroup').html($str);
        $('#listGroup li').on('click',function(){
            let $spid = $(this).attr('data-id');
            // console.log($spid);
            $.ajax({
                type : 'get',
                url : `./detail.html?id=${$spid}`,
                success : function(data){
                }
            })
            location.href = `../html/detail.html?id=${$spid}`;
        })
        // 购物车数量
        let cookieObj = getCookie('carts') ? JSON.parse(getCookie('carts')) : {};
        let products = 0;
        for(key in cookieObj){
            products += cookieObj[key].num;
        }
        $('#buy').html(products);
        // 购物车跳转
        $('.search-header-buy').on('click',function(){
            location.href = '../html/cart.html';
        }) 
    }
})