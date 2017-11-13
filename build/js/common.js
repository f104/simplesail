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
        initRadioSwitch();
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
            centerPadding: '10vw',
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
//                        arrows: false
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
        var pinHeader = function () {
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
        }
        var $header = $('header');
        var headerHeight = $header.outerHeight();
        var q = 2;
        var action = 0;
        if (window.innerWidth >= appConfig.breakpoint.lg) {
            $(window).on('scroll', pinHeader);
        }
        $(window).on('resize', function () {
            if (window.innerWidth >= appConfig.breakpoint.lg) {
                headerHeight = $header.outerHeight();
                $(window).on('scroll', pinHeader);
            } else {
                $(window).off('scroll', pinHeader);
                $('body').removeAttr('style');
                $header.removeClass('header_fixed');
            }
        });
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
//                    console.log($clicked);
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

    function initRadioSwitch() {
        $('.js-radio-switch input').on('click', function () {
            var $parent = $(this).parent('.js-radio-switch__item');
            if ($parent.hasClass('active')) {
                $parent.siblings('.js-radio-switch__item').find('input').click();
            } else {
                $(this).parents('.js-radio-switch').find('.active').removeClass('active');
                $parent.addClass('active');
            }
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
        // scroll to anchor
        $('.js-anchor').on('click', function (e) {
            e.preventDefault();
            var target = $(this).attr('href');
            var offset = $(target).offset().top - parseFloat($('body').css('padding-top'));
            $('html, body').animate({scrollTop: offset}, 500, function () {
                if ($('header').hasClass('header_fixed')) {
                    offset = $(target).offset().top - parseFloat($('body').css('padding-top')) + $('header').outerHeight();
                    $('html, body').animate({scrollTop: offset}, 200);
                }
            });
        });
    }

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBhcHBDb25maWcgPSB7XHJcbiAgICAgICAgYnJlYWtwb2ludDoge1xyXG4gICAgICAgICAgICBtZDogNzY4LFxyXG4gICAgICAgICAgICBsZzogMTAyNFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGVyU3BlZWVkOiAzMDAwXHJcbiAgICB9O1xyXG5cclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0U2x5KCk7XHJcbiAgICAgICAgaW5pdFNsaWRlcigpO1xyXG4gICAgICAgIGluaXRTZWxlY3QoKTtcclxuICAgICAgICBpbml0TWVudSgpO1xyXG4gICAgICAgIGluaXREYXRlcGlja2VyKCk7XHJcbiAgICAgICAgaW5pdFRhYnMoKTtcclxuICAgICAgICBpbml0UmFkaW9Td2l0Y2goKTtcclxuICAgICAgICBpbml0T3RoZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTbHkoKSB7XHJcbiAgICAgICAgJCgnLmpzLXNseS13cmFwcGVyJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkd3JhcHBlciA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBtaW4gPSAkd3JhcHBlci5kYXRhKCdzbHktbWluJykgfHwgMDtcclxuICAgICAgICAgICAgdmFyIG1heCA9ICR3cmFwcGVyLmRhdGEoJ3NseS1tYXgnKSB8fCAwO1xyXG4gICAgICAgICAgICB2YXIgdmlld3BvcnQgPSAkKHdpbmRvdykub3V0ZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICBpZiAobWluIDw9IHZpZXdwb3J0ICYmIG1heCA+PSB2aWV3cG9ydCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRmcmFtZSA9ICR3cmFwcGVyLmZpbmQoJy5qcy1zbHktZnJhbWUnKTtcclxuICAgICAgICAgICAgICAgIHZhciAkc2Nyb2xsYmFyID0gJHdyYXBwZXIuZmluZCgnLmpzLXNseS1zY3JvbGxiYXInKTtcclxuICAgICAgICAgICAgICAgICRmcmFtZS5zbHkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbU5hdjogJ2Jhc2ljJyxcclxuICAgICAgICAgICAgICAgICAgICBzbWFydDogMSxcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZURyYWdnaW5nOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRHJhZ2dpbmc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVsZWFzZVN3aW5nOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJhcjogJHNjcm9sbGJhcixcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCeTogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsYXN0aWNCb3VuZHM6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ0hhbmRsZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBkeW5hbWljSGFuZGxlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrQmFyOiAxXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkZnJhbWUuc2x5KCdyZWxvYWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFNsaWRlcigpIHtcclxuICAgICAgICAkKCcuanMtc2xpZGVyX2luZGV4Jykuc2xpY2soe1xyXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZXM6IGFwcENvbmZpZy5zbGlkZXJTcGVlZWQsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiBhcHBDb25maWcuYnJlYWtwb2ludC5tZCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLXNsaWRlcl9ib2F0Jykuc2xpY2soe1xyXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGFwcENvbmZpZy5icmVha3BvaW50Lm1kLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtc2xpZGVyX2dhbGxlcnknKS5zbGljayh7XHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcclxuICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzEwdncnLFxyXG4gICAgICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogYXBwQ29uZmlnLmJyZWFrcG9pbnQubGcsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzcwcHgnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiBhcHBDb25maWcuYnJlYWtwb2ludC5tZCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnNTBweCcsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTZWxlY3QoKSB7XHJcbiAgICAgICAgJCgnc2VsZWN0Jykuc3R5bGVyKHtcclxuICAgICAgICAgICAgc2VsZWN0U21hcnRQb3NpdGlvbmluZzogdHJ1ZSxcclxuLy8gICAgICAgICAgICBvblNlbGVjdE9wZW5lZDogZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdzZWxlY3QnKS5oYXNDbGFzcygndG9wJykpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RUb3AgPSAkKHRoaXMpLmZpbmQoJy5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duJykuaGVpZ2h0KCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duJykuY3NzKCd0b3AnLCAtc2VsZWN0VG9wICsgJ3B4Jyk7XHJcbi8vICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRNZW51KCkge1xyXG4gICAgICAgICQoJy5qcy1tZW51LXRvZ2dsZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnbWFpbi1uYXZfX2ljb24tbWVudV9fbGlua19hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUnKS50b2dnbGVDbGFzcygnbW9iaWxlLW5hdl9hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtbG9nbycpLnRvZ2dsZUNsYXNzKCdtYWluLW5hdl9fbG9nby1saW5rX2Nyb3AnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtaWNvbicpLnRvZ2dsZUNsYXNzKCdtYWluLW5hdl9faGlkZGVuLW1kJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1tZW51LW92ZXJsYXknKS50b2dnbGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtbWVudS1vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtdG9nZ2xlcicpLmNsaWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHBpbkhlYWRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiBoZWFkZXJIZWlnaHQgKiBxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgJGhlYWRlci5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAkKCdib2R5JykuY3NzKHsncGFkZGluZy10b3AnOiBoZWFkZXJIZWlnaHR9KTtcclxuICAgICAgICAgICAgICAgICRoZWFkZXIuY3NzKHsndG9wJzogLWhlYWRlckhlaWdodH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaGVhZGVyX2ZpeGVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFuaW1hdGUoeyd0b3AnOiAwfSwgNDAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFjdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAkaGVhZGVyLmFuaW1hdGUoeyd0b3AnOiAtaGVhZGVySGVpZ2h0fSwgXCJmYXN0XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkaGVhZGVyLmNzcyh7J3RvcCc6IDB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykuY3NzKHsncGFkZGluZy10b3AnOiAwfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnaGVhZGVyX2ZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgJGhlYWRlciA9ICQoJ2hlYWRlcicpO1xyXG4gICAgICAgIHZhciBoZWFkZXJIZWlnaHQgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgdmFyIHEgPSAyO1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSAwO1xyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSBhcHBDb25maWcuYnJlYWtwb2ludC5sZykge1xyXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIHBpbkhlYWRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gYXBwQ29uZmlnLmJyZWFrcG9pbnQubGcpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlckhlaWdodCA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgcGluSGVhZGVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5vZmYoJ3Njcm9sbCcsIHBpbkhlYWRlcik7XHJcbiAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9maXhlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyRGF0ZXBpY2tlckNlbGwoZGF0ZSwgY2VsbFR5cGUsIGRpc2FibGVkRGF5cykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGlzYWJsZWREYXlzID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBkaXNhYmxlZERheXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNlbGxUeXBlID09ICdkYXknKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXkgPSBkYXRlLmdldERheSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQgPSBkaXNhYmxlZERheXMuaW5kZXhPZihkYXkpICE9IC0xO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0Rpc2FibGVkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdERhdGVwaWNrZXIoKSB7XHJcbiAgICAgICAgdmFyIGRpc2FibGVkRGF5cyA9IFswLCAxLCAyLCAzLCA0LCA1XTtcclxuICAgICAgICAkKCcuanMtZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICBtaW5EYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICByYW5nZTogdHJ1ZSxcclxuICAgICAgICAgICAgbXVsdGlwbGVEYXRlc1NlcGFyYXRvcjogJyAtICcsXHJcbiAgICAgICAgICAgIG9uUmVuZGVyQ2VsbDogZnVuY3Rpb24gKGRhdGUsIGNlbGxUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyRGF0ZXBpY2tlckNlbGwoZGF0ZSwgY2VsbFR5cGUsIGRpc2FibGVkRGF5cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtZGF0ZXBpY2tlcl9yYW5nZScpLnBhcmVudHMoJ2Zvcm0nKS5maW5kKCcuanMtZGF0ZXBpY2tlcl9fcmFuZ2UtdG9nZ2xlcicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRlcGlja2VyID0gJCh0aGlzKS5wYXJlbnRzKCdmb3JtJykuZmluZCgnLmpzLWRhdGVwaWNrZXJfcmFuZ2UnKVswXTtcclxuICAgICAgICAgICAgdmFyIGRhdGVwaWNrZXJEYXRhID0gJChkYXRlcGlja2VyKS5kYXRhKCdkYXRlcGlja2VyJyk7XHJcbiAgICAgICAgICAgIGRhdGVwaWNrZXJEYXRhLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICdkYWlseScpIHtcclxuICAgICAgICAgICAgICAgIGRhdGVwaWNrZXJEYXRhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25SZW5kZXJDZWxsOiBmdW5jdGlvbiAoZGF0ZSwgY2VsbFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlckRhdGVwaWNrZXJDZWxsKGRhdGUsIGNlbGxUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0ZXBpY2tlckRhdGEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBvblJlbmRlckNlbGw6IGZ1bmN0aW9uIChkYXRlLCBjZWxsVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyRGF0ZXBpY2tlckNlbGwoZGF0ZSwgY2VsbFR5cGUsIGRpc2FibGVkRGF5cylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRMaXN0KCkge1xyXG4gICAgICAgICQoJy5qcy1pbmxpbmUtbGlzdCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbGFzdEVsZW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdsaScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnbGFzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RFbGVtZW50ICYmIGxhc3RFbGVtZW50Lm9mZnNldCgpLnRvcCAhPSAkKHRoaXMpLm9mZnNldCgpLnRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RFbGVtZW50LmFkZENsYXNzKCdsYXN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYXN0RWxlbWVudCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkIHJlc2l6ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaW5pdExpc3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRUYWJzKCkge1xyXG4gICAgICAgICQoJy5qcy10YWJzJylcclxuICAgICAgICAgICAgICAgIC5lYXN5dGFicygpXHJcbiAgICAgICAgICAgICAgICAuYmluZCgnZWFzeXRhYnM6bWlkVHJhbnNpdGlvbicsIGZ1bmN0aW9uIChldmVudCwgJGNsaWNrZWQsICR0YXJnZXRQYW5lbCwgc2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgYWN0aXZlIGZvciBvdGhlciB0YWJzIHVsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYiA9ICRjbGlja2VkLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJz4gdWwgPiBsaSBhW2hyZWY9XCInICsgdGFiICsgJ1wiXScpLnBhcmVudCgnbGknKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSBzbGlkZXJcclxuLy8gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRjbGlja2VkKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSAkY2xpY2tlZC5kYXRhKCdzbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLmpzLXNsaWRlcl9nYWxsZXJ5Jykuc2xpY2soJ3NsaWNrR29UbycsIHNsaWRlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLXNsaWRlcl9nYWxsZXJ5Jykub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24gKHNsaWNrLCBjdXJyZW50U2xpZGUpIHtcclxuICAgICAgICAgICAgdmFyIHRhYiA9IGN1cnJlbnRTbGlkZS4kc2xpZGVzW2N1cnJlbnRTbGlkZS5jdXJyZW50U2xpZGVdLmRhdGFzZXQudGFiO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5qcy10YWJzJykuZWFzeXRhYnMoJ3NlbGVjdCcsIHRhYilcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBuYXYgdGFicyBieSBidXR0b25zXHJcbiAgICAgICAgJCgnLmpzLXRhYnMtYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5qcy10YWJzJylcclxuICAgICAgICAgICAgICAgICAgICAuZWFzeXRhYnMoJ3NlbGVjdCcsICQodGhpcykuZGF0YSgndGFiJykpXHJcbiAgICAgICAgICAgICAgICAgICAgLmJpbmQoJ2Vhc3l0YWJzOmFmdGVyJywgZnVuY3Rpb24gKGV2ZW50LCAkY2xpY2tlZCwgJHRhcmdldFBhbmVsLCBzZXR0aW5ncykge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkdGFyZ2V0UGFuZWwub2Zmc2V0KCkudG9wIC0gcGFyc2VGbG9hdCgkKCdib2R5JykuY3NzKCdwYWRkaW5nLXRvcCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9ICQodGhpcykub2Zmc2V0KCkudG9wIC0gcGFyc2VGbG9hdCgkKCdib2R5JykuY3NzKCdwYWRkaW5nLXRvcCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogb2Zmc2V0fSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0UmFkaW9Td2l0Y2goKSB7XHJcbiAgICAgICAgJCgnLmpzLXJhZGlvLXN3aXRjaCBpbnB1dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmpzLXJhZGlvLXN3aXRjaF9faXRlbScpO1xyXG4gICAgICAgICAgICBpZiAoJHBhcmVudC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICRwYXJlbnQuc2libGluZ3MoJy5qcy1yYWRpby1zd2l0Y2hfX2l0ZW0nKS5maW5kKCdpbnB1dCcpLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5qcy1yYWRpby1zd2l0Y2gnKS5maW5kKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0T3RoZXIoKSB7XHJcbiAgICAgICAgJCgnLm1hcmluYS1pdGVtX19pbWctd3JhcHBlcicpLmhvdmVyKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLm1hcmluYS1pdGVtJykuZmluZCgnLm1hcmluYS1pdGVtX19oZWFkZXInKS5hZGRDbGFzcygnaG92ZXJlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5tYXJpbmEtaXRlbScpLmZpbmQoJy5tYXJpbmEtaXRlbV9faGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2hvdmVyZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIHBsYXkgdmlkZW8gaW4gYmxvZyBsaXN0aW5nXHJcbiAgICAgICAgJCgnLmpzLXZpZGVvLWhvdmVyJykuaG92ZXIoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuanMtdmlkZW8taG92ZXJfX3Bvc3RlcicpLmFkZENsYXNzKCd2aWRlby1wb3N0ZXJfaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCd2aWRlby5qcy12aWRlby1ob3Zlcl9fdmlkZW8nKVswXS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLmpzLXZpZGVvLWhvdmVyX19wb3N0ZXInKS5yZW1vdmVDbGFzcygndmlkZW8tcG9zdGVyX2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2ID0gJCh0aGlzKS5maW5kKCd2aWRlby5qcy12aWRlby1ob3Zlcl9fdmlkZW8nKVswXTtcclxuICAgICAgICAgICAgICAgICAgICB2LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdi5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gY3VzdG9tIHNjcm9sbGJhclxyXG4gICAgICAgICQoJy5qcy1zY3JvbGxiYXInKS5zY3JvbGxiYXIoe1xyXG4gICAgICAgICAgICBkaXNhYmxlQm9keVNjcm9sbDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGxpbmsgaW5zaWRlIGxpbmtcclxuICAgICAgICAkKCcuanMtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGhyZWYgPSAkKHRoaXMpLmRhdGEoJ2xpbmsnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gaHJlZjtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBzY3JvbGwgdG8gYW5jaG9yXHJcbiAgICAgICAgJCgnLmpzLWFuY2hvcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gJCh0YXJnZXQpLm9mZnNldCgpLnRvcCAtIHBhcnNlRmxvYXQoJCgnYm9keScpLmNzcygncGFkZGluZy10b3AnKSk7XHJcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IG9mZnNldH0sIDUwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoJ2hlYWRlcicpLmhhc0NsYXNzKCdoZWFkZXJfZml4ZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9ICQodGFyZ2V0KS5vZmZzZXQoKS50b3AgLSBwYXJzZUZsb2F0KCQoJ2JvZHknKS5jc3MoJ3BhZGRpbmctdG9wJykpICsgJCgnaGVhZGVyJykub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBvZmZzZXR9LCAyMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0pOyJdLCJmaWxlIjoiY29tbW9uLmpzIn0=
