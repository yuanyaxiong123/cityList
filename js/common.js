/*解决安卓手机input兼容问题*/
if(/Android [4-6]/.test(navigator.appVersion)) {
    window.addEventListener("resize", function() {
        if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
            window.setTimeout(function() {
                document.activeElement.scrollIntoViewIfNeeded();
            },0);
        }
    })
}
/*解决iphone的兼容性问题*/
$(function () {
    if(/iPhone/.test(navigator.appVersion)) {
        $('body').on('touchend', function (e) {
            if (e.target.tagName != 'INPUT') {
                !$('input').not('.fil').blur();
            }
        });
    }
});

/*获url的name值开始*/
function funcUrl(name,value,type){
    var loca = window.location;
    var baseUrl = type==undefined ? loca.origin + loca.pathname + "?" : "";
    var query = loca.search.substr(1);
    // 如果没有传参,就返回 search 值 不包含问号
    if (name==undefined) { return query }
    // 如果没有传值,就返回要查询的参数的值
    if (value==undefined){
        var val = query.match(new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"));
        return val!=null ? decodeURI(val[2]) : null;
    };
    var url;
    if (query=="") {
        // 如果没有 search 值,则返回追加了参数的 url
        url = baseUrl + name + "=" + value;
    }else{
        // 如果没有 search 值,则在其中修改对应的值,并且去重,最后返回 url
        var obj = {};
        var arr = query.split("&");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        };
        obj[name] = value;
        url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
    };
    return url;
}

/*获url的name值结束*/
var urlBase='http://localhost:9999/jdx-app';
// var urlBase='http://192.168.1.127:8080/jdx-app';

