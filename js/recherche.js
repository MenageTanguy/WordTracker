$(window).load(function () {
    $('.banner').unslider({
        fluid: true,
        dots: true,
        speed: 500,
        delay: 4000
    });
    if (window.chrome) {
        $('.banner li').css('background-size', '100% 100%');
    }
});

$(function () {
    var pull = $('#pull');
    var menu = $('nav ul');

    $(pull).on('click', function (e) {
        e.preventDefault();
        menu.slideToggle();
    });
});
$(window).resize(function () {
    var menu = $('nav ul');
    var w = $(window).width();
    if (w > 320 && menu.is(':hidden')) {
        menu.removeAttr('style');
    }
});

$(document).ready(function () {

    var counter = 0,
        $items = $('.slideshow figure'),
        numItems = $items.length;

    var showCurrent = function () {
        var itemToShow = Math.abs(counter % numItems);
        $items.removeClass('show');
        $items.eq(itemToShow).addClass('show');
    };

    $('.next').on('click', function () {
        counter++;
        showCurrent();
    });

    $('.prev').on('click', function () {
        counter--;
        showCurrent();
    });

});

$(document).ready(function () {

    var counter = 0,
        $items = $('.quote-slideshow figure'),
        numItems = $items.length;

    var showCurrent = function () {
        var itemToShow = Math.abs(counter % numItems);
        $items.removeClass('show');
        $items.eq(itemToShow).addClass('show');
    };

    $('.quote-next').on('click', function () {
        counter++;
        showCurrent();
    });

    $('.quote-prev').on('click', function () {
        counter--;
        showCurrent();
    });

    var urlParams = new URLSearchParams(location.search);
    if (urlParams){
        input = document.getElementById("search");

        $('input').load(' search', function () {
            if (urlParams.has('sch')) {
                $("input[type='text']").val(urlParams.get('sch'));
            }
        });
    }

    var button = document.getElementById("SCH");

    button.onclick = function () {
        var text = document.getElementById("search").value.trim().toLowerCase();
        if (urlParams.get('sch')) {
            var textUrl =urlParams.get('sch').trim().toLowerCase();
            if (textUrl.localeCompare(text) != 0) {
                window.location.replace("http://tanguy-menage.com/recherche.html?sch=" + text);
            }
        }
        else{
            window.location.replace("http://tanguy-menage.com/recherche.html?sch=" + text);
        }

    }

    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            button.click();
        }
    });

});


