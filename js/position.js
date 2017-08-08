$(function () {

/*点击元素城市名存入本地cookie*/
    var qudiao = $('.aside').position().top;
    var attrcity = {};
    var html = '';
    var shuzu = [];
    city = city.sort(function (a, b) {
        return (a.pinyin.charCodeAt(0) - b.pinyin.charCodeAt(0));
    });
    $.each(city, function (index, item) {
        var shouzimu = item.pinyin[0];
        shuzu.push(item.name);
        if (!attrcity[shouzimu]) {
            attrcity[shouzimu] = [];
            attrcity[shouzimu].push(item.name);
        } else {
            attrcity[shouzimu].push(item.name);
        }
    });
    for (var i in attrcity) {
        //添加分组字母
        html += '<li class="group" data-value="' + i + '">' + i + '</li>';
        //遍历当前分组中的数据
        for (var j = 0; j < attrcity[i].length; j++) {
            html += '<li class="xuanze">' + attrcity[i][j] + '</li>';
        }
    }
    $('.list ul').html(html);
    $('.btnbox')[0].addEventListener('touchmove', function (e) {

        //阻止浏览器默认行为   （如果触摸移动不生效可以在触摸开始时阻止浏览器默认行为）
        e.preventDefault();

        //获取第一个触摸点
        e = e.changedTouches[0];

        // 获取鼠标 的Y轴位置

        var y = e.clientY - qudiao;

        if (y < 10) {
            y = 10;
        }
        var height = Math.floor($('.btnbox').height() / 26);
        // 拿当前Y坐标 /每格的高度  向上取整
        //获取每格高度

        var index = Math.ceil(y / height);
        if (index > 26) {
            return;
        }

        // 根据计算出来的索引值找到指定的按钮
        //var li = document.querySelector('.btn li:nth-child('+index+')');
        var li = $('.btnbox li').eq(index - 1);

        //如果找到对应的元素

        if (li) {

            //获取当前li里面的字母

            var word = li.html();

            //显示字母窗口并更新里面的内容
            // console.log(word);
            $('.echo').css('display', 'block').html(word);


            // 根据字母 查找 自属性里面为当前字母的元素（找到对应一行）

            var lii = document.querySelector('.list li[data-value=' + word + ']');

            //如果找到对应的li
            if (lii) {

                // 获取要滚动到这个li的 位置

                var otop = lii.offsetTop;
                // console.log(otop)
                // 设置滚动条的位置为当前字母的位置
                $('.count').scrollTop(otop)

                //console.log(otop)

            }
        }

    });
    function end() {
        $('.echo').css('display', 'none')
    }

    $('.btnbox')[0].addEventListener('touchend', end);
    $('.btnbox')[0].addEventListener('touchcancel', end);


    /*  $('.cityinput').focus(function () {
     $('.aside').css('display','none')
     })*/

    $('.cityinput').on({
        focus: function () {
            $('.aside').css('display', 'none');
        },
        blur: function () {
            $('.aside').css('display', 'block')
        }
    });
    var dangqian = remote_ip_info['city'] || '';
    $('.positioncity').html(dangqian);
    $('.hotlist').click(function (e) {
        if (this == e.target) {
            return;
        }
        cookies({weizhi: $(e.target).html()}, {
            expires: 0,
            path: '/'
        });
        location.href = 'index.html'
    });
    $('.xuanze').click(function () {
        cookies({weizhi: $(this).html()}, {
            expires: 0,
            path: '/'
        });
        location.href = 'index.html'
    });
    $('.positioncity').click(function () {
        cookies({weizhi: $(this).html()}, {
            expires: 0,
            path: '/'
        });
        location.href = 'index.html'
    });
    /*筛选城市*/
    $('.form .search').click(function () {
        var str = $('.form .cityinput ').val();
        if ($.inArray(str, shuzu) > -1) {
            $('.zhezhao').addClass('active');
            $('.zhezhao .neirong').html('<span>' + str + '</span>')
        } else {
            alert('请输入正确的城市')
        }
    });
    $('.zhezhao').click(function () {
        $('.zhezhao').toggleClass('active')
    });
   $('.zhezhao .neirong').click(function (e) {
       if(e.target.tagName=='SPAN'){
           cookies({weizhi: $(e.target).html()}, {
               expires: 0,
               path: '/'
           });
           location.href = 'index.html'
       }
   })
});


