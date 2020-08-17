$('.list-item-scroll').mouseenter(function(){
    $('.list-item-scroll').removeClass('active');
    $(this).addClass('active');
});
// 购物车跳转
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