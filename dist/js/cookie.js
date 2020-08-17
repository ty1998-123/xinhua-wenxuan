function createCookie(key,value,json){
    json = json || {};
    let cookieStr = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    if(!isNaN(json.expires)){
        let date = new Date();
        date.setDate(date.getDate() + json.expires);
        cookieStr += ';expires=' + date;
    }
    if(json.path){
        cookieStr += ';path=' + json.path;
    }
    if(json.domain){
        cookieStr += ';domain=' + json.domain;
    }
    if(json.secure){
        cookieStr += ';secure';
    }
    document.cookie = cookieStr;
}
function getCookie(key){
    let arr = document.cookie.split('; ');
    for(let value of arr){
        let list = value.split('=');
        if(decodeURIComponent(key) === list[0]){
            return decodeURIComponent(list[1]);
        }
    }
}
function convertStrToObj(str){
    if(!str){
        return {};
    }else{
        return JSON.parse(str);
    }
}
function convertJsonStrToJsonObj(str){
    if(!str){
        return {};
    }
    return JSON.parse(str);
}