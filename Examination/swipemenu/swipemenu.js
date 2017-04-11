var cj_animation_duration = 320;
var preLeftMenuStatus = {
    display: 'none',
    opacity: 0
};
var preScreen = 0;

function showLeftMenu() {
    if (preScreen == 1) {
        return;
    }
    $('.cj-menu-root').css('display', 'block').css('opacity', 1);
    $('.cj-menu-root').animate({
        display: 'block',
        opacity: 1
    }, cj_animation_duration, function () {
        $('.cj-menu-root').removeClass('cj-menu-root-hidden');
        $('.cj-menu-root').addClass('cj-menu-root-showing');
        preLeftMenuStatus = {
            display: 'block',
            opacity: 1
        }
    });
    $('.cj-menu-list').removeClass('cj-menu-list-hidden');
    $('.cj-menu-list').addClass('cj-menu-list-showing');
}

function hideLeftMenu(event) {
    if (preScreen == 1) {
        return;
    }
    $('.cj-menu-root').animate({
        display: 'none',
        opacity: 0
    }, cj_animation_duration, function () {
        $('.cj-menu-root').removeClass('cj-menu-root-showing');
        $('.cj-menu-root').addClass('cj-menu-root-hidden');
        $('.cj-menu-root').css('display', 'none').css('opacity', 0);
        preLeftMenuStatus = {
            display: 'none',
            opacity: 0
        }
    });
    $('.cj-menu-list').removeClass('cj-menu-list-showing');
    $('.cj-menu-list').addClass('cj-menu-list-hidden');
}

function stopPropagation(event) {
    var e = event ? event : window.event;
    if (e && e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
    } else {
        window.event.cancelBubble = true;
    }
    return false;
}

$(function () {
    preScreen = window.innerWidth > 768 ? 1 : 0;

    $('.cj-menu-root').click(function (e) {
        hideLeftMenu(e);
    });

    $(window).resize(function () {
        var w = window.innerWidth;
        if (w > 768) {
            $('.cj-menu-root').css('display', 'block').css('opacity', 1);
            preScreen = 1;
        } else {
            if (preScreen == 1) {
                $('.cj-menu-root').css('display', preLeftMenuStatus.display).css('opacity', preLeftMenuStatus.opacity);
            }
            preScreen = 0;
        }
    });
});