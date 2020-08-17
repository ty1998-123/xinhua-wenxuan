let arr = [false,false,false,false,false];
// 判断用户名
$('#registor').on('blur',function(){
    let cookieObj = getCookie('registors') ? JSON.parse(getCookie('registors')) : {};
    if($(this).val() in cookieObj){
        $('#registor-wran').html('该用户名已存在');
    }else{
        let re = /^\d{11}$/;
        if(re.test($(this).val())){
            arr[0] = true;
            $('#registor-wran').html('正确');
        }else{
            arr[0] = false;
            $('#registor-wran').html('请输入手机号');
        }
    }
})
// 判断密码
$('#pwd').on('blur',function(){
    let re = /^\d{3,16}$/;
    if(re.test($(this).val())){
        arr[1] = true;
        $('#pwd-warn').html('正确');
    }else{
        arr[1] = false;
        $('#pwd-warn').html('请输入3-16位的数字');
    }
})
// 确认密码
$('#sure').on('blur',function(){
    if($(this).val() == $('#pwd').val()){
        arr[2] = true;
        $('#sure-warn').html('正确');
    }else{
        arr[2] = false;
        $('#sure-warn').html('确认密码要与密码保持一致');
    }
})
// 验证码
$('#code').on('blur',function(){
    if($(this).val() == $('#in-code').text()){
        arr[3] = true;
        $('#code-warn').html('正确');
    }else{
        arr[3] = false;
        $('#code-warn').html('验证码错误');
    }
})
// 生成验证码
let codes = parseInt(Math.random() * 9000 + 1000);
$('#in-code').html(codes);
$('#change-code').on('click',function(){
    let codes = parseInt(Math.random() * 9000 + 1000);
    $('#in-code').html(codes);
})
// 注册
$('#go-registor').on('click',function(){
    if($('#agree')[0].checked == true){
        arr[4] = true;
    }else{
        arr[4] = false;
        alert('请阅读交易条款');
    }
    if(arr.indexOf(false) === -1){
        let cookieObj = getCookie('registors') ? JSON.parse(getCookie('registors')) : {};
        cookieObj[$('#registor').val()] = $('#pwd').val();
        createCookie('registors',JSON.stringify(cookieObj),{expires : 7,path : '/'});
        alert('注册成功');
        location.href = '../html/index.html';
        
    }else{
        alert('请完善表单');
    }
})
// 同意条款
