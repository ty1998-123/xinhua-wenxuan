// 用户名
$('#number').on('blur',function(){
    let cookieObj = getCookie('registors') ? JSON.parse(getCookie('registors')) : {};
    if($(this).val() in cookieObj){
        $('#number-warn').html('输入正确');
    }else{
        $('#number-warn').html('用户名不存在');
        // location.href = '../html/registor.html';
    }
})
// 密码
$('#password').on('blur',function(){
    let cookieObj = getCookie('registors') ? JSON.parse(getCookie('registors')) : {};
    let name = $('#number').val();
    let pwd = $(this).val();
    console.log(cookieObj[name]);
    if(pwd == cookieObj[name]){
        $('#password-warn').html('输入正确');
        $('.go').on('click',function(){
            location.href = '../html/index.html';
        })
    }else{
        $('#password-warn').html('密码错误');
    }
})