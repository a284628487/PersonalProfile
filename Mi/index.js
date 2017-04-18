$(function () {
    var nav = $("#topbar-nav");
    var arr = [{title: "小米商城", href: ""}, {title: "MIUI", href: ""},
        {title: "米聊", href: ""}, {title: "游戏", href: ""}];
    arr.forEach(function (element, index) {
        if (index == arr.length - 1) {
            nav.append("<a>" + element.title + "</a>");
        } else {
            nav.append("<a>" + element.title + "</a><span class='sep'>|</span>");
        }
    });

    var cartBtn = $("#J_cartBtn");
    var cartMenuPanel = $("#cart-menu-panel");
    var ct = 0;
    cartBtn.hover(function () {
        cartBtn.addClass("topbar-cart-active");
        cartMenuPanel.show();
    }, function () {
        ct = setTimeout(function () {
            cartBtn.removeClass("topbar-cart-active");
            cartMenuPanel.hide();
        }, 100);
    });
    cartMenuPanel.hover(function () {
        cartBtn.addClass("topbar-cart-active");
        cartMenuPanel.show();
        if (ct != 0) {
            clearTimeout(ct);
        }
    }, function () {
        cartBtn.removeClass("topbar-cart-active");
        cartMenuPanel.hide();
    });

    var topbarInfo = $("#topbar-info");
    var infoArr = [{title: "登录", href: ""}, {title: "注册", href: ""}, {title: "消息通知", href: ""}];
    infoArr.forEach(function (element, index) {
        if (index == infoArr.length - 1) {
            topbarInfo.append("<a>" + element.title + "</a>");
        } else {
            topbarInfo.append("<a>" + element.title + "</a><span class='sep'>|</span>");
        }
    });

    var headerBarNav = $("#header-nav-ul");
    var headerBarArr = [{
        title: "小米手机",
        href: "",
        child: ["http://c1.mifile.cn/f/i/g/2015/MIX-320-220!160x110.jpg", "http://c1.mifile.cn/f/i/g/2015/xiaomi5S-320-220!160x110.jpg"],
        childNames: ["手机01", "手机01"],
        childPrices: ["1000", "2000"]
    }, {
        title: "红米",
        href: "",
        child: ["http://c1.mifile.cn/f/i/g/2015/5spluse320_220!160x110.jpg", "http://c1.mifile.cn/f/i/16/goods/nav/mi5!160x110.jpg",
            "http://c1.mifile.cn/f/i/15/goods/nav/maxdingbu!160x110.jpg"],
        childNames: ["手机06", "手机01", "手机00"],
        childPrices: ["29", "100", "5000"]
    }, {
        title: "平板 · 笔记本",
        href: "",
        child: ["http://c1.mifile.cn/f/i/g/2015/cn-index/dianfanbao!160x110.jpg", "http://c1.mifile.cn/f/i/16/goods/nav/air2!160x110.jpg"],
        childNames: ["平板", "笔记本"],
        childPrices: ["500", "8000"]
    }, {
        title: "电视",
        href: "",
        child: ["http://c1.mifile.cn/f/i/g/2015/cn-index/xiaobai!160x110.jpg", "http://c1.mifile.cn/f/i/g/2015/cn-index/shdt.png",
            "http://c1.mifile.cn/f/i/15/goods/nav/scooter!160x110.jpg", "http://c1.mifile.cn/f/i/g/2015/cn-index/water2!160x110.jpg"],
        childNames: ["电视", "电视", "电车", "电离"],
        childPrices: ["100", "1000", "1000", "1000"]
    }];
    headerBarArr.forEach(function (element, index) {
        headerBarNav.append("<li><a data-key='" + index + "'>" + element.title + "</a></li>");
    });
    var alist = $("#header-nav-ul a");
    var navDetailPanel = $("#header-nav-ul-detail-panel");
    var ti = 0;
    var lastHoverA = null;
    alist.hover(function (evt) {
        var a = $(evt.target);
        a.addClass("nav-item-active");
        if (lastHoverA)lastHoverA.removeClass("nav-item-active");
        if (ti != 0) {
            clearTimeout(ti);
        }
        var ul = $("#header-nav-ul-goods");
        ul.html('');
        navDetailPanel.show();
        var key = a.attr("data-key");
        var goods = headerBarArr[key];
        for (var i = 0; i < goods.child.length; i++) {
            var li = "<li class='pop-good'><div class='thumb'><img width='160px' height='110px' src=" + goods.child[i] + "></div>" +
                "<div class='good-name'>" + goods.childNames[i] + "</div>" +
                "<div class='good-price'>" + goods.childPrices[i] + "</div>" +
                "</li>";
            ul.append(li);
        }
    }, function (evt) {
        lastHoverA = $(evt.target);
        ti = setTimeout(function () {
            lastHoverA.removeClass("nav-item-active");
            lastHoverA = null;
            navDetailPanel.hide();
        }, 100);
    });
    navDetailPanel.hover(function () {
        navDetailPanel.show();
        if (ti != 0) {
            clearTimeout(ti);
        }
    }, function () {
        navDetailPanel.hide();
        lastHoverA.removeClass("nav-item-active");
        lastHoverA = null;
    });

    var header_search_input = $("#header-search-input");
    var header_search_submit = $("#header-search-submit");
    var search_hot_words = $("#search-hot-words");
    var top_hot_words = $("#top-hot-words");
    header_search_input.focus(function () {
        header_search_submit.addClass("submit-active");
        search_hot_words.show();
        top_hot_words.hide();
    });
    header_search_input.blur(function () {
        header_search_submit.removeClass("submit-active");
        search_hot_words.hide();
        top_hot_words.show();
    });

    var hotwords_ul = $("#search-hot-words-ul");
    var hotwords = [{word: "小米5s Plus", num: 2}, {word: "小米Max", num: 2}, {word: "小米手机5", num: 2},
        {word: "小米路由器", num: 2}, {word: "移动电源", num: 2}, {word: "空气净化器", num: 2}];
    hotwords.forEach(function (ele, index) {
        hotwords_ul.append("<li><a>" + ele.word + "</a></li>");
    });

    initCategorys();
    //
    beginSlider();
    //
    initIndexStar();
    //
    initBoxBd();
    //
    initSmart();
    //
    initContent();

});

function initContent() {
    var preContentItem = null;
    var getContentItem = function (ele) {
        if (ele.classList.contains("content-item")) {
            return ele;
        }
        return getContentItem(ele.parentNode);
    };

    $(".content-item").hover(function (evt) {
        var ele = getContentItem(evt.target);
        preContentItem = $(ele);
        preContentItem.addClass("content-item-active");
        var ctrls = preContentItem.find(".wrapper-controls");
        ctrls.addClass('wrapper-controls-active');
    }, function (evt) {
        preContentItem.removeClass("content-item-active");
        var ctrls = preContentItem.find(".wrapper-controls");
        ctrls.removeClass('wrapper-controls-active');
    });

    //
    $('.page-index').click(function (evt) {
        var node = $(evt.target);
        if (node.hasClass('page-index-active')) {
            return;
        }
        var index = node.attr('data-index') * 1;
        var parentNode = $(evt.target.parentNode);
        var contentId = parentNode.attr('data-ulbind');
        parentNode.find('span').removeClass('page-index-active');
        node.addClass('page-index-active');
        var ul = $("#content-list-" + contentId);
        var ml = -index * 296;
        ul.animate({
            "margin-left": ml + "px"
        }, 400);
        ul.attr('data-index', index);
    });
    //
    $('.wrapper-controls').click(function (evt) {
        var node = $(evt.target);
        var contentId = $(evt.target.parentNode).attr('data-ulbind');
        var ul = $("#content-list-" + contentId);
        var index = ul.attr('data-index');
        if (!index) index = 0;
        if (node.hasClass('wrapper-controls-left')) {
            index--;
        } else {
            index++;
        }
        if (index < 0) {
            index = 0;
        }
        var maxIndex = ul.width() / 296 - 1;
        if (index > maxIndex) {
            index = maxIndex;
        }
        var ml = -index * 296;
        ul.animate({
            "margin-left": ml + "px"
        }, 400);
        ul.attr('data-index', index);

        var pageIndicator = $('#page-indicator-' + contentId);
        var indicators = pageIndicator.find('span');
        indicators.removeClass('page-index-active');
        $(indicators.get(index)).addClass('page-index-active');
    });
}

function initSmart() {
    var arr = [
        {
            pic: "http://i1.mifile.cn/a1/pms_1487579524.92087599!220x220.jpg",
            name: "米家空气净化器滤芯 抗菌版",
            desc: "抗菌率达99%以上，有效吸附甲醛",
            price: "159"
        },
        {
            pic: "http://i1.mifile.cn/a1/pms_1478656331.65637548!220x220.jpg",
            name: "米兔儿童手表Q",
            desc: "11 重安全设计，五重精准定位",
            price: "299"
        },
        {
            pic: "http://i1.mifile.cn/a1/pms_1464615180.86261317!220x220.jpg",
            name: "米兔智能故事机",
            desc: "微信远程互动，智能语音交互",
            price: "100"
        },
        {
            pic: "http://i1.mifile.cn/a1/T1OVC_ByY_1RXrhCrK!220x220.jpg",
            name: "智能烹饪",
            desc: "智能烹饪，灰铸铁粉体涂层内胆",
            price: "1002"
        },
        {
            pic: "http://i1.mifile.cn/a1/pms_1481507050.2285518!220x220.jpg",
            name: "几何设计",
            desc: "极简几何设计，1 分钟轻松上手",
            price: "1004"
        },
        {
            pic: "http://i1.mifile.cn/a1/pms_1478076543.58248227!220x220.jpg",
            name: "挑战双手",
            desc: "978个零件，享受挑战双手的乐趣",
            price: "0808"
        },
        {
            pic: "http://i1.mifile.cn/a1/pms_1468806372.46368911!220x220.jpg",
            name: "全景拍摄",
            desc: "360° 全景拍摄，1080P 高清摄像",
            price: "120"
        },
        {
            pic: "http://i3.mifile.cn/a4/cbabf443-1ff1-4014-a1bf-06c45476f1e6",
            name: "高清双向通",
            desc: "高清双向通话，五重精准定位",
            price: "109"
        }
    ];

    function createLi(ele) {
        return "<li class=\"brick-item\">" +
            "<div class=\"thumb\"><a><img src=\"" + ele.pic + "\"></a></div>" +
            "<div class=\"title\"><a>" + ele.name + "</a></div><p class=\"desc\">" + ele.desc +
            "</p><p class=\"price\">" + ele.price + "</p></li>";
    }

    var ul = $('#smart-list-ul');
    arr.forEach(function (ele, index) {
        ul.append(createLi(ele));
    });
    //
    var preBrickItem = null;
    var getBrickItem = function (ele) {
        if (ele.classList.contains("brick-item")) {
            return ele;
        }
        return getBrickItem(ele.parentNode);
    };
    $('.brick-item').hover(function (evt) {
        var ele = getBrickItem(evt.target);
        preBrickItem = $(ele);
        preBrickItem.addClass("brick-item-active");
    }, function () {
        preBrickItem.removeClass("brick-item-active");
    });
}

function initBoxBd() {
    var colors = ["#ffac13", "#83c44e", "#2196f3", "#e53935", "#00c0a5"];
    var arrs = [{
        title: "小米5s Plus",
        desc: "5.7英寸大屏双摄手机，拍照黑科技",
        pic: "http://i3.mifile.cn/a4/e991f1e2-20d8-40c3-bf1d-012b122c986b",
        price: "1099",
        href: ""
    }, {
        title: "小米电视3s 48英寸",
        desc: "原装液晶屏，金属机身",
        pic: "http://i3.mifile.cn/a4/74dd9736-f254-4964-a06a-24f0befb21ac",
        price: "2560",
        href: ""
    }, {
        title: "小米移动电源2",
        desc: "双向快充，高密度锂聚合物电芯",
        pic: "http://i3.mifile.cn/a4/17fc57e5-e332-4452-bba4-ef341f6e59fd",
        price: "99",
        href: ""
    }, {
        title: "小米手环 2",
        desc: "OLED 显示屏幕，升级计步算法",
        pic: "http://i3.mifile.cn/a4/6ef55907-bbed-49be-a2bb-be0821b5f7b8",
        price: "500",
        href: ""
    }, {
        title: "米家扫地机器人",
        desc: "智能路径规划，扫得干净扫得快",
        pic: "http://i3.mifile.cn/a4/848def18-47d9-4ca0-8822-c2ac61b83779",
        price: "1799",
        href: ""
    }];
    var ul = $("#box-bd-ul");
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < arrs.length; i++) {
            var color = colors[i];
            var obj = arrs[i];
            var li = "<li><a><img src='" + obj.pic + "'></a><h4>" + obj.title + "</h4><p class='desc'>" + obj.desc + "</p><p class='price'>" + obj.price + "</p></li>";
            li = $(li);
            li.css('border-top-color', color);
            ul.append(li);
        }
    }
}

function initIndexStar() {
    var star_index = $("#star_index a");
    star_index.hover(function (evt) {
        var a = $(evt.target);
        if (a.hasClass("active")) {
            a.addClass("active-hover");
        }
    }, function (evt) {
        var a = $(evt.target);
        a.removeClass("active-hover");
    });

    var nextUL = $("#box-bd-ul");
    var leftP = $('#left-p');
    var rightP = $('#right-p');
    leftP.click(function () {
        if (rightP.hasClass('active')) return;
        leftP.removeClass("active");
        leftP.removeClass("active-hover");
        rightP.addClass("active");
        nextUL.animate({
            "margin-left": "0px"
        }, 200);
    });
    rightP.click(function () {
        if (leftP.hasClass('active')) return;
        rightP.removeClass("active");
        rightP.removeClass("active-hover");
        leftP.addClass("active");
        nextUL.animate({
            "margin-left": "-1240px"
        }, 200);
    });
}

function initCategorys() {
    var arr = [
        {
            title: "手机 电话卡",
            sublist: [{
                pic: "http://c1.mifile.cn/f/i/g/2015/xmNOTE2-80.jpg?width=40&amp;height=40",
                name: "小米Note 2",
                info: "",
                href: ""
            }]
        },
        {
            title: "笔记本 平板",
            sublist: [{
                pic: "http://c1.mifile.cn/f/i/g/2015/MIX-80.jpg?width=40&amp;height=40",
                name: "小米MIX",
                info: "",
                href: ""
            }]
        },
        {
            title: "电视 盒子",
            sublist: [{
                pic: "http://c1.mifile.cn/f/i/g/2015/xm5S-80.jpg?width=40&amp;height=40",
                name: "小米5s",
                info: "",
                href: ""
            }]
        },
        {
            title: "智能硬件 路由器",
            sublist: [{
                pic: "http://c1.mifile.cn/f/i/g/2015/xm5S-plus-80.jpg?width=40&amp;height=40",
                name: "小米5s Plus",
                info: "",
                href: ""
            }]
        },
        {
            title: "移动电源",
            sublist: [{
                pic: "http://c1.mifile.cn/f/i/g/2015/xm5-80.jpg?width=40&amp;height=40",
                name: "小米手机5",
                info: "",
                href: ""
            }]
        },
        {
            title: "耳机 音箱",
            sublist: [{
                pic: "http://c1.mifile.cn/f/i/g/2015/xmmax-80.jpg?width=40&amp;height=40",
                name: "小米Max",
                info: "",
                href: ""
            }]
        },
        {
            title: "保护套 存储卡",
            sublist: [{
                pic: "http://c1.mifile.cn/f/i/g/2015/cn-index/hmn4x80.png?width=40&amp;height=40",
                name: "红米Note 4X",
                info: "",
                href: ""
            }]
        },
        {
            title: "存储卡 支架",
            sublist: [{
                pic: "http://c1.mifile.cn/f/i/g/2015/hmnote4-80.jpg?width=40&amp;height=40",
                name: "红米Note 4",
                info: "",
                href: ""
            }]
        },
        {
            title: "箱包",
            sublist: [{
                pic: "http://c1.mifile.cn/f/i/g/2015/hm4-80.jpg?width=40&amp;height=40",
                name: "红米4",
                info: "",
                href: ""
            }]
        },
        {
            title: "生活周边",
            sublist: [{
                pic: "http://c1.mifile.cn/f/i/g/2015/hm4A-80.jpg?width=40&amp;height=40",
                name: "红米4A",
                info: "",
                href: ""
            }]
        }
    ];
    var J_categoryList_ul = $("#J_categoryList_ul");
    var J_categoryList = $("#J_categoryList");
    arr.forEach(function (ele, index) {
        J_categoryList_ul.append("<li><a categoryIndex='" + index + "'>" + ele.title + "</a></li>");
    });
    var as = $("#J_categoryList_ul a");
    var contents = $("#J_categoryContent");
    var category = null;
    var to = 0;
    as.hover(function (evt) {
        if (null != category) {
            category.removeClass("active");
        }
        clearTimeout(to);
        contents.html("");

        category = $(evt.target);
        category.addClass("active");

        var categoryIndex = category.attr("categoryIndex");
        categoryIndex = categoryIndex * 1;
        var sublist = arr[categoryIndex].sublist;
        var m = Math.random();
        m = parseInt(m * 10000) % 5;
        var obj = sublist[0];
        if (m == 0) m = 2;
        for (var j = 0; j < m; j++) {
            var ul = "<ul>";
            for (var i = 0; i < 6; i++) {
                ul += "<li><a><img width='40' height='40' src=" + obj.pic + "><span>" + obj.name + "</span></a>";
                ul += "<a class='hint'>选购</a></li>";
                if (j == m - 1) {
                    if (i == 3) {
                        break;
                    }
                }
            }
            ul += "</ul>";
            contents.append(ul);
        }
        if (m == 4) {
            $('#J_categoryList .content ul').css("width", "248px");
        }
        contents.show();
        J_categoryList.css("width", (234 + m * 265) + "px");
    }, function () {
        to = setTimeout(function () {
            contents.hide();
            J_categoryList.css("width", "234px");
            category.removeClass("active");
        }, 100);
    });
    contents.hover(function () {
        clearTimeout(to);
        contents.show();
        category.addClass("active");
    }, function () {
        contents.hide();
        J_categoryList.css("width", "234px");
        category.removeClass("active");
    });
}

function beginSlider() {
    var J_sliders = $("#J_slider a");
    var sliderControls = $("#slider-controls a");

    var index = 0;

    var changeIndex = function (preIndex, nextIndex) {
        var preSlider = $(J_sliders.get(preIndex));
        var preControl = $(sliderControls.get(preIndex));

        var nextSlider = $(J_sliders.get(nextIndex));
        var nextControl = $(sliderControls.get(nextIndex));

        preSlider.removeClass("active");
        preControl.removeClass("active");
        preSlider.animate({
            opacity: 0
        }, 1000, function () {
        });
        nextSlider.addClass("active");
        nextSlider.css("opacity", "0.5");
        nextControl.addClass("active");
        nextSlider.animate({
            opacity: 1
        }, 1000, function () {
        });
    };

    var beginSlide = function () {
        return setInterval(function () {
            var nextIndex = index + 1;
            if (nextIndex > 4) {
                nextIndex = 0;
            }
            changeIndex(index, nextIndex);
            index = nextIndex;
        }, 4000);
    };
    var interval = beginSlide();

    sliderControls.click(function (ele) {
        var newIndex_ = $(ele.target).attr("sliderIndex");
        newIndex_ = newIndex_ * 1;
        clearInterval(interval);
        if (newIndex_ != index) {
            changeIndex(index, newIndex_);
            index = newIndex_;
            // loop again
            interval = beginSlide();
        }
    });
}


function sliderPrev() {
    var index = getNextActive(false);
    index++;
    var selector = ".slider-controls a:nth-child(" + index + ")";
    $(selector).click();
}

function sliderNext() {
    var index = getNextActive(true);
    index++;
    var selector = ".slider-controls a:nth-child(" + index + ")";
    $(selector).click();
}

function getNextActive(next) {
    var ctrlActive = $('.slider-controls a.active');
    var index = parseInt(ctrlActive.attr('sliderindex'));
    if (next && index == 4) {
        return 0;
    }
    if (!next && index == 0) {
        return 4;
    }
    return next ? index + 1 : index - 1;
}


















