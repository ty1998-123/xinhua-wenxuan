let cookieObj = getCookie('carts') ? JSON.parse(getCookie('carts')) : {};
let str = '';
if(cookieObj != {}){
    for(key in cookieObj){
        str += 
        `<div class="cart-main clear" data-id="${cookieObj[key].id}">
            <img src="../img/cart/content/content${cookieObj[key].id}.jpg" alt="">
            <span class="name">${cookieObj[key].name}</span>
            <span class="wenPrice">${cookieObj[key].wenPrice}</span>
            <span class="writer">${cookieObj[key].writer}</span>
            <span class="price">${(cookieObj[key].num * cookieObj[key].wenPrice.slice(1)).toFixed(2)}</span>
            <span>
                <input type="button" value="-" class="minus">
                <input type="text"  class="number"  value="${cookieObj[key].num}">
                <input type="button" value="+" class="plus">
            </span>
            <a href="javascript:;" class="del">删除</a>
        </div>`;
    }
    $('.group').append(str);
    $('.minus').on('click',function(){
        let sum = $(this).next().val();
        if(sum > 1){
            sum --;
        }
        $(this).next().val(sum);
        let id = $(this).parents('.cart-main').attr('data-id');
        $(this).parent().prev().text(`${(sum * cookieObj[key].wenPrice.slice(1)).toFixed(2)}`);
        if(cookieObj[id].num > 1){
            cookieObj[id].num --;
        }
        createCookie('carts',JSON.stringify(cookieObj),{expires : 7,path : '/'});
    })
    $('.plus').on('click',function(){
        let sum = parseInt($(this).prev().val()) + 1;
        $(this).prev().val(sum);
        let id = $(this).parents('.cart-main').attr('data-id');
        $(this).parent().prev().text(`${(sum * cookieObj[key].wenPrice.slice(1)).toFixed(2)}`);
        cookieObj[id].num ++;
        createCookie('carts',JSON.stringify(cookieObj),{expires : 7,path : '/'});
    })
    $('.number').on('blur',function(){
        let sum = parseInt($(this).val());
        if(sum > 1){
            $(this).val(sum);
        }else if(sum <= 1){
            sum = 1;
            $(this).val(1);
        }
        let id = $(this).parents('.cart-main').attr('data-id');
        $(this).parent().prev().text(`${(sum * cookieObj[key].wenPrice.slice(1)).toFixed(2)}`);
        cookieObj[id].num = sum;
        createCookie('carts',JSON.stringify(cookieObj),{expires : 7,path : '/'});
    })
    $('.del').on('click',function(){
        let id = $(this).parents('.cart-main').attr('data-id');
        delete cookieObj[id];
        $(this).parents('.cart-main').remove();
        createCookie('carts',JSON.stringify(cookieObj),{expires : 7,path : '/'});
    });
}