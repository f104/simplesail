jQuery(function () {
    "use strict";

    var appConfig = {
        breakpoint: {
            md: 768,
            lg: 1024
        },
        sliderSpeeed: 3000
    };

    $(document).ready(function () {
        initSly();
        initSlider();
        initSelect();
        initMenu();
        initDatepicker();
        initTabs();
        initOther();
    });

    function initSly() {
        $('.js-sly-wrapper').each(function () {
            var $wrapper = $(this);
            var min = $wrapper.data('sly-min') || 0;
            var max = $wrapper.data('sly-max') || 0;
            var viewport = $(window).outerWidth();
            if (min <= viewport && max >= viewport) {
                var $frame = $wrapper.find('.js-sly-frame');
                var $scrollbar = $wrapper.find('.js-sly-scrollbar');
                $frame.sly({
                    horizontal: 1,
                    itemNav: 'basic',
                    smart: 1,
                    mouseDragging: 1,
                    touchDragging: 1,
                    releaseSwing: 1,
                    scrollBar: $scrollbar,
                    scrollBy: 1,
                    speed: 300,
                    elasticBounds: 1,
                    dragHandle: 1,
                    dynamicHandle: 1,
                    clickBar: 1
                });
                $(window).resize(function (e) {
                    $frame.sly('reload');
                });
            }
        });
    }

    function initSlider() {
        $('.js-slider_index').slick({
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpees: appConfig.sliderSpeeed,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: appConfig.breakpoint.md,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });
        $('.js-slider_boat').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: appConfig.breakpoint.md,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });
        $('.js-slider_gallery').slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '12%',
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: appConfig.breakpoint.lg,
                    settings: {
                        centerPadding: '70px'
                    }
                },
                {
                    breakpoint: appConfig.breakpoint.md,
                    settings: {
                        centerPadding: '50px',
                        arrows: false
                    }
                }
            ]
        });
    }

    function initSelect() {
        $('select').styler({
            selectSmartPositioning: true,
//            onSelectOpened: function () {
//                if ($(this).find('select').hasClass('top')) {
//                    var selectTop = $(this).find('.jq-selectbox__dropdown').height();
//                    $(this).find('.jq-selectbox__dropdown').css('top', -selectTop + 'px');
//                }
//            }
        });

    }

    function initMenu() {
        $('.js-menu-toggler').on('click', function (e) {
            e.preventDefault();
//            $(this).toggleClass('main-nav__icon-menu__link_active');
            $('.js-menu').toggleClass('mobile-nav_active');
            $('.js-menu-logo').toggleClass('main-nav__logo-link_crop');
            $('.js-menu-icon').toggleClass('main-nav__hidden-md');
            $('.js-menu-overlay').toggle();
        });
        $('.js-menu-overlay').on('click', function (e) {
            $('.js-menu-toggler').click();
        });
        if (window.innerWidth >= appConfig.breakpoint.lg) {
            var $header = $('header');
            var headerHeight = $header.outerHeight();
            var q = 2;
            var action = 0;
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > headerHeight * q) {
                    if (action == 1) {
                        return;
                    }
                    action = 1;
                    $header.stop();
                    $('body').css({'padding-top': headerHeight});
                    $header.css({'top': -headerHeight})
                            .addClass('header_fixed')
                            .animate({'top': 0}, 400);
                } else {
                    if (action == 2) {
                        return;
                    }
                    action = 2;
                    $header.animate({'top': -headerHeight}, "fast", function () {
                        $header.css({'top': 0});
                        $('body').css({'padding-top': 0});
                        $header.removeClass('header_fixed');
                    });
                }
            });
            $(window).on('resize', function () {
                headerHeight = $header.outerHeight();
            });
        }
    }

    function renderDatepickerCell(date, cellType, disabledDays) {
        if (typeof disabledDays === 'undefined') {
            disabledDays = [];
        }
        if (cellType == 'day') {
            var day = date.getDay(),
                    isDisabled = disabledDays.indexOf(day) != -1;

            return {
                disabled: isDisabled
            }
        }
    }

    function initDatepicker() {
        var disabledDays = [0, 1, 2, 3, 4, 5];
        $('.js-datepicker').datepicker({
            minDate: new Date(),
            range: true,
            multipleDatesSeparator: ' - ',
            onRenderCell: function (date, cellType) {
                return renderDatepickerCell(date, cellType, disabledDays);
            }
        });
        $('.js-datepicker_range').parents('form').find('.js-datepicker__range-toggler').on('change', function () {
            var datepicker = $(this).parents('form').find('.js-datepicker_range')[0];
            var datepickerData = $(datepicker).data('datepicker');
            datepickerData.clear();
            if ($(this).val() == 'daily') {
                datepickerData.update({
                    onRenderCell: function (date, cellType) {
                        return renderDatepickerCell(date, cellType)
                    }
                });
            } else {
                datepickerData.update({
                    onRenderCell: function (date, cellType) {
                        return renderDatepickerCell(date, cellType, disabledDays)
                    }
                });
            }
        });
    }

    function initList() {
        $('.js-inline-list').each(function () {
            var lastElement = false;
            $(this).find('li').each(function () {
                $(this).removeClass('last');
                if (lastElement && lastElement.offset().top != $(this).offset().top) {
                    lastElement.addClass('last');
                }
                lastElement = $(this);
            });
        });
    }
    $(window).on('load resize', function (e) {
        initList();
    });

    function initTabs() {
        $('.js-tabs')
                .easytabs()
                .bind('easytabs:midTransition', function (event, $clicked, $targetPanel, settings) {
                    // set active for other tabs ul
                    var tab = $clicked.attr('href');
                    $(this).find('> ul > li a[href="' + tab + '"]').parent('li').addClass('active');
                    // move slider
                    console.log($clicked);
                    var slide = $clicked.data('slide');
                    $(this).find('.js-slider_gallery').slick('slickGoTo', slide);
                })
                .find('.js-slider_gallery').on('afterChange', function (slick, currentSlide) {
            var tab = currentSlide.$slides[currentSlide.currentSlide].dataset.tab;
            $(this).parents('.js-tabs').easytabs('select', tab)
        });
        // nav tabs by buttons
        $('.js-tabs-button').on('click', function (e) {
            e.preventDefault();
            $(this).parents('.js-tabs')
                    .easytabs('select', $(this).data('tab'))
                    .bind('easytabs:after', function (event, $clicked, $targetPanel, settings) {
//                        var offset = $targetPanel.offset().top - parseFloat($('body').css('padding-top'));
                        var offset = $(this).offset().top - parseFloat($('body').css('padding-top'));
                        $('html, body').animate({scrollTop: offset}, 500);
                    });
        });
    }

    function initOther() {
        $('.marina-item__img-wrapper').hover(
                function () {
                    $(this).parents('.marina-item').find('.marina-item__header').addClass('hovered');
                },
                function () {
                    $(this).parents('.marina-item').find('.marina-item__header').removeClass('hovered');
                }
        );
        // play video in blog listing
        $('.js-video-hover').hover(
                function () {
                    $(this).find('.js-video-hover__poster').addClass('video-poster_hidden');
                    $(this).find('video.js-video-hover__video')[0].play();
                },
                function () {
                    $(this).find('.js-video-hover__poster').removeClass('video-poster_hidden');
                    var v = $(this).find('video.js-video-hover__video')[0];
                    v.pause();
                    v.currentTime = 0;
                }

        );
        // custom scrollbar
        $('.js-scrollbar').scrollbar({
            disableBodyScroll: true
        });
        // link inside link
        $('.js-link').on('click', function (e) {
            e.preventDefault();
            var href = $(this).data('link');
            window.location = href;
        });
    }

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBhcHBDb25maWcgPSB7XHJcbiAgICAgICAgYnJlYWtwb2ludDoge1xyXG4gICAgICAgICAgICBtZDogNzY4LFxyXG4gICAgICAgICAgICBsZzogMTAyNFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGVyU3BlZWVkOiAzMDAwXHJcbiAgICB9O1xyXG5cclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0U2x5KCk7XHJcbiAgICAgICAgaW5pdFNsaWRlcigpO1xyXG4gICAgICAgIGluaXRTZWxlY3QoKTtcclxuICAgICAgICBpbml0TWVudSgpO1xyXG4gICAgICAgIGluaXREYXRlcGlja2VyKCk7XHJcbiAgICAgICAgaW5pdFRhYnMoKTtcclxuICAgICAgICBpbml0T3RoZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTbHkoKSB7XHJcbiAgICAgICAgJCgnLmpzLXNseS13cmFwcGVyJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkd3JhcHBlciA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBtaW4gPSAkd3JhcHBlci5kYXRhKCdzbHktbWluJykgfHwgMDtcclxuICAgICAgICAgICAgdmFyIG1heCA9ICR3cmFwcGVyLmRhdGEoJ3NseS1tYXgnKSB8fCAwO1xyXG4gICAgICAgICAgICB2YXIgdmlld3BvcnQgPSAkKHdpbmRvdykub3V0ZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICBpZiAobWluIDw9IHZpZXdwb3J0ICYmIG1heCA+PSB2aWV3cG9ydCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRmcmFtZSA9ICR3cmFwcGVyLmZpbmQoJy5qcy1zbHktZnJhbWUnKTtcclxuICAgICAgICAgICAgICAgIHZhciAkc2Nyb2xsYmFyID0gJHdyYXBwZXIuZmluZCgnLmpzLXNseS1zY3JvbGxiYXInKTtcclxuICAgICAgICAgICAgICAgICRmcmFtZS5zbHkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbU5hdjogJ2Jhc2ljJyxcclxuICAgICAgICAgICAgICAgICAgICBzbWFydDogMSxcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZURyYWdnaW5nOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRHJhZ2dpbmc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVsZWFzZVN3aW5nOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJhcjogJHNjcm9sbGJhcixcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCeTogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsYXN0aWNCb3VuZHM6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ0hhbmRsZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBkeW5hbWljSGFuZGxlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrQmFyOiAxXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkZnJhbWUuc2x5KCdyZWxvYWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFNsaWRlcigpIHtcclxuICAgICAgICAkKCcuanMtc2xpZGVyX2luZGV4Jykuc2xpY2soe1xyXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZXM6IGFwcENvbmZpZy5zbGlkZXJTcGVlZWQsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiBhcHBDb25maWcuYnJlYWtwb2ludC5tZCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLXNsaWRlcl9ib2F0Jykuc2xpY2soe1xyXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGFwcENvbmZpZy5icmVha3BvaW50Lm1kLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtc2xpZGVyX2dhbGxlcnknKS5zbGljayh7XHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcclxuICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzEyJScsXHJcbiAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiBhcHBDb25maWcuYnJlYWtwb2ludC5sZyxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnNzBweCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGFwcENvbmZpZy5icmVha3BvaW50Lm1kLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICc1MHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTZWxlY3QoKSB7XHJcbiAgICAgICAgJCgnc2VsZWN0Jykuc3R5bGVyKHtcclxuICAgICAgICAgICAgc2VsZWN0U21hcnRQb3NpdGlvbmluZzogdHJ1ZSxcclxuLy8gICAgICAgICAgICBvblNlbGVjdE9wZW5lZDogZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdzZWxlY3QnKS5oYXNDbGFzcygndG9wJykpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RUb3AgPSAkKHRoaXMpLmZpbmQoJy5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duJykuaGVpZ2h0KCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duJykuY3NzKCd0b3AnLCAtc2VsZWN0VG9wICsgJ3B4Jyk7XHJcbi8vICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRNZW51KCkge1xyXG4gICAgICAgICQoJy5qcy1tZW51LXRvZ2dsZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnbWFpbi1uYXZfX2ljb24tbWVudV9fbGlua19hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUnKS50b2dnbGVDbGFzcygnbW9iaWxlLW5hdl9hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtbG9nbycpLnRvZ2dsZUNsYXNzKCdtYWluLW5hdl9fbG9nby1saW5rX2Nyb3AnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtaWNvbicpLnRvZ2dsZUNsYXNzKCdtYWluLW5hdl9faGlkZGVuLW1kJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1tZW51LW92ZXJsYXknKS50b2dnbGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtbWVudS1vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtdG9nZ2xlcicpLmNsaWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IGFwcENvbmZpZy5icmVha3BvaW50LmxnKSB7XHJcbiAgICAgICAgICAgIHZhciAkaGVhZGVyID0gJCgnaGVhZGVyJyk7XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJIZWlnaHQgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHZhciBxID0gMjtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiBoZWFkZXJIZWlnaHQgKiBxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAkaGVhZGVyLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykuY3NzKHsncGFkZGluZy10b3AnOiBoZWFkZXJIZWlnaHR9KTtcclxuICAgICAgICAgICAgICAgICAgICAkaGVhZGVyLmNzcyh7J3RvcCc6IC1oZWFkZXJIZWlnaHR9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdoZWFkZXJfZml4ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFuaW1hdGUoeyd0b3AnOiAwfSwgNDAwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAkaGVhZGVyLmFuaW1hdGUoeyd0b3AnOiAtaGVhZGVySGVpZ2h0fSwgXCJmYXN0XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5jc3Moeyd0b3AnOiAwfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5jc3MoeydwYWRkaW5nLXRvcCc6IDB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnaGVhZGVyX2ZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlckhlaWdodCA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlckRhdGVwaWNrZXJDZWxsKGRhdGUsIGNlbGxUeXBlLCBkaXNhYmxlZERheXMpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGRpc2FibGVkRGF5cyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgZGlzYWJsZWREYXlzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjZWxsVHlwZSA9PSAnZGF5Jykge1xyXG4gICAgICAgICAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXkoKSxcclxuICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkID0gZGlzYWJsZWREYXlzLmluZGV4T2YoZGF5KSAhPSAtMTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogaXNEaXNhYmxlZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXREYXRlcGlja2VyKCkge1xyXG4gICAgICAgIHZhciBkaXNhYmxlZERheXMgPSBbMCwgMSwgMiwgMywgNCwgNV07XHJcbiAgICAgICAgJCgnLmpzLWRhdGVwaWNrZXInKS5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgbWluRGF0ZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAgICAgICAgIG11bHRpcGxlRGF0ZXNTZXBhcmF0b3I6ICcgLSAnLFxyXG4gICAgICAgICAgICBvblJlbmRlckNlbGw6IGZ1bmN0aW9uIChkYXRlLCBjZWxsVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlckRhdGVwaWNrZXJDZWxsKGRhdGUsIGNlbGxUeXBlLCBkaXNhYmxlZERheXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLWRhdGVwaWNrZXJfcmFuZ2UnKS5wYXJlbnRzKCdmb3JtJykuZmluZCgnLmpzLWRhdGVwaWNrZXJfX3JhbmdlLXRvZ2dsZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZXBpY2tlciA9ICQodGhpcykucGFyZW50cygnZm9ybScpLmZpbmQoJy5qcy1kYXRlcGlja2VyX3JhbmdlJylbMF07XHJcbiAgICAgICAgICAgIHZhciBkYXRlcGlja2VyRGF0YSA9ICQoZGF0ZXBpY2tlcikuZGF0YSgnZGF0ZXBpY2tlcicpO1xyXG4gICAgICAgICAgICBkYXRlcGlja2VyRGF0YS5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnZGFpbHknKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlcGlja2VyRGF0YS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uUmVuZGVyQ2VsbDogZnVuY3Rpb24gKGRhdGUsIGNlbGxUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZW5kZXJEYXRlcGlja2VyQ2VsbChkYXRlLCBjZWxsVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGVwaWNrZXJEYXRhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25SZW5kZXJDZWxsOiBmdW5jdGlvbiAoZGF0ZSwgY2VsbFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlckRhdGVwaWNrZXJDZWxsKGRhdGUsIGNlbGxUeXBlLCBkaXNhYmxlZERheXMpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0TGlzdCgpIHtcclxuICAgICAgICAkKCcuanMtaW5saW5lLWxpc3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RFbGVtZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnbGknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2xhc3QnKTtcclxuICAgICAgICAgICAgICAgIGlmIChsYXN0RWxlbWVudCAmJiBsYXN0RWxlbWVudC5vZmZzZXQoKS50b3AgIT0gJCh0aGlzKS5vZmZzZXQoKS50b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0RWxlbWVudC5hZGRDbGFzcygnbGFzdCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFzdEVsZW1lbnQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICQod2luZG93KS5vbignbG9hZCByZXNpemUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGluaXRMaXN0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0VGFicygpIHtcclxuICAgICAgICAkKCcuanMtdGFicycpXHJcbiAgICAgICAgICAgICAgICAuZWFzeXRhYnMoKVxyXG4gICAgICAgICAgICAgICAgLmJpbmQoJ2Vhc3l0YWJzOm1pZFRyYW5zaXRpb24nLCBmdW5jdGlvbiAoZXZlbnQsICRjbGlja2VkLCAkdGFyZ2V0UGFuZWwsIHNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IGFjdGl2ZSBmb3Igb3RoZXIgdGFicyB1bFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWIgPSAkY2xpY2tlZC5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCc+IHVsID4gbGkgYVtocmVmPVwiJyArIHRhYiArICdcIl0nKS5wYXJlbnQoJ2xpJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgc2xpZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJGNsaWNrZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9ICRjbGlja2VkLmRhdGEoJ3NsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuanMtc2xpZGVyX2dhbGxlcnknKS5zbGljaygnc2xpY2tHb1RvJywgc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtc2xpZGVyX2dhbGxlcnknKS5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbiAoc2xpY2ssIGN1cnJlbnRTbGlkZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFiID0gY3VycmVudFNsaWRlLiRzbGlkZXNbY3VycmVudFNsaWRlLmN1cnJlbnRTbGlkZV0uZGF0YXNldC50YWI7XHJcbiAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLmpzLXRhYnMnKS5lYXN5dGFicygnc2VsZWN0JywgdGFiKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIG5hdiB0YWJzIGJ5IGJ1dHRvbnNcclxuICAgICAgICAkKCcuanMtdGFicy1idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLmpzLXRhYnMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lYXN5dGFicygnc2VsZWN0JywgJCh0aGlzKS5kYXRhKCd0YWInKSlcclxuICAgICAgICAgICAgICAgICAgICAuYmluZCgnZWFzeXRhYnM6YWZ0ZXInLCBmdW5jdGlvbiAoZXZlbnQsICRjbGlja2VkLCAkdGFyZ2V0UGFuZWwsIHNldHRpbmdzKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9ICR0YXJnZXRQYW5lbC5vZmZzZXQoKS50b3AgLSBwYXJzZUZsb2F0KCQoJ2JvZHknKS5jc3MoJ3BhZGRpbmctdG9wJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gJCh0aGlzKS5vZmZzZXQoKS50b3AgLSBwYXJzZUZsb2F0KCQoJ2JvZHknKS5jc3MoJ3BhZGRpbmctdG9wJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBvZmZzZXR9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRPdGhlcigpIHtcclxuICAgICAgICAkKCcubWFyaW5hLWl0ZW1fX2ltZy13cmFwcGVyJykuaG92ZXIoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcubWFyaW5hLWl0ZW0nKS5maW5kKCcubWFyaW5hLWl0ZW1fX2hlYWRlcicpLmFkZENsYXNzKCdob3ZlcmVkJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLm1hcmluYS1pdGVtJykuZmluZCgnLm1hcmluYS1pdGVtX19oZWFkZXInKS5yZW1vdmVDbGFzcygnaG92ZXJlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gcGxheSB2aWRlbyBpbiBibG9nIGxpc3RpbmdcclxuICAgICAgICAkKCcuanMtdmlkZW8taG92ZXInKS5ob3ZlcihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5qcy12aWRlby1ob3Zlcl9fcG9zdGVyJykuYWRkQ2xhc3MoJ3ZpZGVvLXBvc3Rlcl9oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ3ZpZGVvLmpzLXZpZGVvLWhvdmVyX192aWRlbycpWzBdLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuanMtdmlkZW8taG92ZXJfX3Bvc3RlcicpLnJlbW92ZUNsYXNzKCd2aWRlby1wb3N0ZXJfaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHYgPSAkKHRoaXMpLmZpbmQoJ3ZpZGVvLmpzLXZpZGVvLWhvdmVyX192aWRlbycpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHYucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB2LmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBjdXN0b20gc2Nyb2xsYmFyXHJcbiAgICAgICAgJCgnLmpzLXNjcm9sbGJhcicpLnNjcm9sbGJhcih7XHJcbiAgICAgICAgICAgIGRpc2FibGVCb2R5U2Nyb2xsOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gbGluayBpbnNpZGUgbGlua1xyXG4gICAgICAgICQoJy5qcy1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgaHJlZiA9ICQodGhpcykuZGF0YSgnbGluaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSk7Il0sImZpbGUiOiJjb21tb24uanMifQ==
