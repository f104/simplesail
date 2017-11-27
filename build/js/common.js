jQuery(function () {
    "use strict";

    $(document).ready(function () {
        initSly();
        initSlider();
        initSelect();
        initMenu();
        initDatepicker();
        initTabs();
        initRadioSwitch();
        initScrollbar();
        initAnchor();
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
            autoplaySpeed: appConfig.sliderSpeed,
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
        $('.slick-dots').each(function () {
            if ($(this).find('li').length == 1) {
                $(this).hide();
            }
        });
    }

    function initSelect() {
        $('.js-select').styler({
            selectVisibleOptions: 5,
            onFormStyled: function () {
                $('.jq-selectbox__dropdown')
                        .find('ul')
                        .wrap('<div class="scrollbar-outer" />');
            },
            onSelectOpened: function () {
                var settings = {
                    autoReinitialise: true,
                    verticalGutter: 15,
                    horizontalGutter: 15
                };
                var _ul = $(this).find('.jq-selectbox__dropdown ul');
                var height = _ul.height();
                var _srollPane = $(this).find('.jq-selectbox__dropdown .scrollbar-outer');
                ;
                _srollPane.height(height);
                _ul.css('max-height', 'none');
                _srollPane.jScrollPane(settings);
            }
        });
////        $('.article-content table').wrap('<div class="js-scrollbar scrollbar-outer"></div>');
////        $('.js-scrollbar').scrollbar({
////            disableBodyScroll: true
////        });
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

        // анимация контактов в шапке
        $('.main-nav__top-menu__contacts').on('topMenuAnimate', function () {
            var $this = $(this);
            $this.width('auto');
            var width = $this.outerWidth();
            var mWidth = $this.find('.main-nav__top-menu__contacts__span').outerWidth();
            var action = 0;
            $(this).width(mWidth);
            $(this).hover(
                    function () {
                        if (action == 1)
                            return;
                        action = 1;
                        $this.stop();
                        $this.animate({'width': width}, 200, function () {
                            action = false;
                        });
                    },
                    function () {
                        if (action == 2)
                            return;
                        action = 2;
                        $this.stop();
                        $this.animate({'width': mWidth}, 200, function () {
                            action = false;
                        });
                    }
            );
        });
        $(window).on('load', function () {
            $('.main-nav__top-menu__contacts').trigger('topMenuAnimate');
        });
        $(window).on('resize', function () {
            $('.main-nav__top-menu__contacts').trigger('topMenuAnimate');
        });

        var pinHeader = function () {
            if ($(this).scrollTop() > headerHeight * q) {
                if (action == 1) {
                    return;
                }
                action = 1;
                $header.stop();
                $('body').css({'padding-top': headerHeight});
                $('.main-nav__top-menu__contacts').css({'visibility': 'visible'});
                $header.css({'top': -headerHeight})
                        .addClass('header_fixed')
                        .animate({'top': 0}, 400);
            } else {
                if (action == 2) {
                    return;
                }
                action = 2;
                $('.main-nav__top-menu__contacts').css({'visibility': 'hidden'});
                $header.animate({'top': -headerHeight}, "fast", function () {
                    $header.css({'top': 0});
                    $('body').css({'padding-top': 0});
                    $header.removeClass('header_fixed');
                });
            }
        }
        var $header = $('header');
        var headerHeight = $header.outerHeight();
        var q = 1;
        var action = 0;
        if (window.innerWidth >= appConfig.breakpoint.lg) {
            $(window).on('scroll', pinHeader);
        }
        $(window).on('resize', function () {
            if (window.innerWidth >= appConfig.breakpoint.lg) {
                headerHeight = $header.outerHeight();
                $(window).on('scroll', pinHeader);
                $('.js-menu').removeClass('mobile-nav_active');
                $('.js-menu-overlay').hide();
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

    // custom scrollbar
    function initScrollbar() {
        $('.article-content table').wrap('<div class="js-scrollbar scrollbar-outer"></div>');
        $('.js-scrollbar').scrollbar({
            disableBodyScroll: true
        });
    }

    function initAnchor() {
        var $root = $('html, body'),
                $body = $('body'),
                $header = $('header');
        var scrollTo = function (href) {
            var $target = $(href);
            if ($target.length == 0) {
                $target = $('a[name=' + href.substr(1) + ']');
            }
            if ($target.length == 0) {
                return;
            }

            var offset = $target.offset().top - parseFloat($body.css('padding-top'));
            $root.animate({scrollTop: offset}, 500, function () {
                if ($header.hasClass('header_fixed')) {
                    offset = $target.offset().top - $header.outerHeight();
                    $root.animate({scrollTop: offset}, 200);
                }
//                window.location.hash = href;
//                window.history.pushState({jsAnchor: window.location.pathname + href}, '', window.location.pathname + '#123');
            });
        }
        $('.js-anchor').on('click', function (e) {
            e.preventDefault();
            scrollTo($(this).attr('href'));
        });
        window.onload = function () {
            if (window.location.hash != '') {
                scrollTo(window.location.hash);
            }
        }
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
        // autoplay background video
        $('.js-video-autoplay').each(function () {
            this.play();
        });
        // click on iframe map
        $('.articles-map__wrapper')
                .click(function () {
                    $(this).addClass('clicked');
                })
                .mouseleave(function () {
                    $(this).removeClass('clicked');
                });
        // link inside link
        $('.js-link').on('click', function (e) {
            e.preventDefault();
            var href = $(this).data('link');
            window.location = href;
        });
        // antispam
        setTimeout(function () {
            $('input[name="email3"],input[name="info"],input[name="text"]').attr('value', '').val('');
        }, 5000);
        // footer fu$%
        $(window).on('load resize', function () {
            $('.footer-protection__img').width($('.footer-protection__img img').width());
        });
    }

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0U2x5KCk7XHJcbiAgICAgICAgaW5pdFNsaWRlcigpO1xyXG4gICAgICAgIGluaXRTZWxlY3QoKTtcclxuICAgICAgICBpbml0TWVudSgpO1xyXG4gICAgICAgIGluaXREYXRlcGlja2VyKCk7XHJcbiAgICAgICAgaW5pdFRhYnMoKTtcclxuICAgICAgICBpbml0UmFkaW9Td2l0Y2goKTtcclxuICAgICAgICBpbml0U2Nyb2xsYmFyKCk7XHJcbiAgICAgICAgaW5pdEFuY2hvcigpO1xyXG4gICAgICAgIGluaXRPdGhlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFNseSgpIHtcclxuICAgICAgICAkKCcuanMtc2x5LXdyYXBwZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICR3cmFwcGVyID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIG1pbiA9ICR3cmFwcGVyLmRhdGEoJ3NseS1taW4nKSB8fCAwO1xyXG4gICAgICAgICAgICB2YXIgbWF4ID0gJHdyYXBwZXIuZGF0YSgnc2x5LW1heCcpIHx8IDA7XHJcbiAgICAgICAgICAgIHZhciB2aWV3cG9ydCA9ICQod2luZG93KS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgIGlmIChtaW4gPD0gdmlld3BvcnQgJiYgbWF4ID49IHZpZXdwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGZyYW1lID0gJHdyYXBwZXIuZmluZCgnLmpzLXNseS1mcmFtZScpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRzY3JvbGxiYXIgPSAkd3JhcHBlci5maW5kKCcuanMtc2x5LXNjcm9sbGJhcicpO1xyXG4gICAgICAgICAgICAgICAgJGZyYW1lLnNseSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtTmF2OiAnYmFzaWMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNtYXJ0OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdXNlRHJhZ2dpbmc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hEcmFnZ2luZzogMSxcclxuICAgICAgICAgICAgICAgICAgICByZWxlYXNlU3dpbmc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFyOiAkc2Nyb2xsYmFyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJ5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxhc3RpY0JvdW5kczogMSxcclxuICAgICAgICAgICAgICAgICAgICBkcmFnSGFuZGxlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWNIYW5kbGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tCYXI6IDFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRmcmFtZS5zbHkoJ3JlbG9hZCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0U2xpZGVyKCkge1xyXG4gICAgICAgICQoJy5qcy1zbGlkZXJfaW5kZXgnKS5zbGljayh7XHJcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogYXBwQ29uZmlnLnNsaWRlclNwZWVkLFxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogYXBwQ29uZmlnLmJyZWFrcG9pbnQubWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1zbGlkZXJfYm9hdCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiBhcHBDb25maWcuYnJlYWtwb2ludC5tZCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLXNsaWRlcl9nYWxsZXJ5Jykuc2xpY2soe1xyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcxMHZ3JyxcclxuICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGFwcENvbmZpZy5icmVha3BvaW50LmxnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICc3MHB4J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogYXBwQ29uZmlnLmJyZWFrcG9pbnQubWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzUwcHgnLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuc2xpY2stZG90cycpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdsaScpLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTZWxlY3QoKSB7XHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnN0eWxlcih7XHJcbiAgICAgICAgICAgIHNlbGVjdFZpc2libGVPcHRpb25zOiA1LFxyXG4gICAgICAgICAgICBvbkZvcm1TdHlsZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ3VsJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLndyYXAoJzxkaXYgY2xhc3M9XCJzY3JvbGxiYXItb3V0ZXJcIiAvPicpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvblNlbGVjdE9wZW5lZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNldHRpbmdzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9SZWluaXRpYWxpc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGljYWxHdXR0ZXI6IDE1LFxyXG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxHdXR0ZXI6IDE1XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdmFyIF91bCA9ICQodGhpcykuZmluZCgnLmpxLXNlbGVjdGJveF9fZHJvcGRvd24gdWwnKTtcclxuICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSBfdWwuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3Nyb2xsUGFuZSA9ICQodGhpcykuZmluZCgnLmpxLXNlbGVjdGJveF9fZHJvcGRvd24gLnNjcm9sbGJhci1vdXRlcicpO1xyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgX3Nyb2xsUGFuZS5oZWlnaHQoaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIF91bC5jc3MoJ21heC1oZWlnaHQnLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgX3Nyb2xsUGFuZS5qU2Nyb2xsUGFuZShzZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuLy8vLyAgICAgICAgJCgnLmFydGljbGUtY29udGVudCB0YWJsZScpLndyYXAoJzxkaXYgY2xhc3M9XCJqcy1zY3JvbGxiYXIgc2Nyb2xsYmFyLW91dGVyXCI+PC9kaXY+Jyk7XHJcbi8vLy8gICAgICAgICQoJy5qcy1zY3JvbGxiYXInKS5zY3JvbGxiYXIoe1xyXG4vLy8vICAgICAgICAgICAgZGlzYWJsZUJvZHlTY3JvbGw6IHRydWVcclxuLy8vLyAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdE1lbnUoKSB7XHJcbiAgICAgICAgJCgnLmpzLW1lbnUtdG9nZ2xlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdtYWluLW5hdl9faWNvbi1tZW51X19saW5rX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtbWVudScpLnRvZ2dsZUNsYXNzKCdtb2JpbGUtbmF2X2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtbWVudS1sb2dvJykudG9nZ2xlQ2xhc3MoJ21haW4tbmF2X19sb2dvLWxpbmtfY3JvcCcpO1xyXG4gICAgICAgICAgICAkKCcuanMtbWVudS1pY29uJykudG9nZ2xlQ2xhc3MoJ21haW4tbmF2X19oaWRkZW4tbWQnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtb3ZlcmxheScpLnRvZ2dsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1tZW51LW92ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAkKCcuanMtbWVudS10b2dnbGVyJykuY2xpY2soKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0LDQvdC40LzQsNGG0LjRjyDQutC+0L3RgtCw0LrRgtC+0LIg0LIg0YjQsNC/0LrQtVxyXG4gICAgICAgICQoJy5tYWluLW5hdl9fdG9wLW1lbnVfX2NvbnRhY3RzJykub24oJ3RvcE1lbnVBbmltYXRlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAkdGhpcy53aWR0aCgnYXV0bycpO1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSAkdGhpcy5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgIHZhciBtV2lkdGggPSAkdGhpcy5maW5kKCcubWFpbi1uYXZfX3RvcC1tZW51X19jb250YWN0c19fc3BhbicpLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICQodGhpcykud2lkdGgobVdpZHRoKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5ob3ZlcihcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5hbmltYXRlKHsnd2lkdGgnOiB3aWR0aH0sIDIwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuYW5pbWF0ZSh7J3dpZHRoJzogbVdpZHRofSwgMjAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLm1haW4tbmF2X190b3AtbWVudV9fY29udGFjdHMnKS50cmlnZ2VyKCd0b3BNZW51QW5pbWF0ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcubWFpbi1uYXZfX3RvcC1tZW51X19jb250YWN0cycpLnRyaWdnZXIoJ3RvcE1lbnVBbmltYXRlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBwaW5IZWFkZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gaGVhZGVySGVpZ2h0ICogcSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWN0aW9uID0gMTtcclxuICAgICAgICAgICAgICAgICRoZWFkZXIuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLmNzcyh7J3BhZGRpbmctdG9wJzogaGVhZGVySGVpZ2h0fSk7XHJcbiAgICAgICAgICAgICAgICAkKCcubWFpbi1uYXZfX3RvcC1tZW51X19jb250YWN0cycpLmNzcyh7J3Zpc2liaWxpdHknOiAndmlzaWJsZSd9KTtcclxuICAgICAgICAgICAgICAgICRoZWFkZXIuY3NzKHsndG9wJzogLWhlYWRlckhlaWdodH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaGVhZGVyX2ZpeGVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFuaW1hdGUoeyd0b3AnOiAwfSwgNDAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFjdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAkKCcubWFpbi1uYXZfX3RvcC1tZW51X19jb250YWN0cycpLmNzcyh7J3Zpc2liaWxpdHknOiAnaGlkZGVuJ30pO1xyXG4gICAgICAgICAgICAgICAgJGhlYWRlci5hbmltYXRlKHsndG9wJzogLWhlYWRlckhlaWdodH0sIFwiZmFzdFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5jc3Moeyd0b3AnOiAwfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLmNzcyh7J3BhZGRpbmctdG9wJzogMH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyICRoZWFkZXIgPSAkKCdoZWFkZXInKTtcclxuICAgICAgICB2YXIgaGVhZGVySGVpZ2h0ID0gJGhlYWRlci5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgIHZhciBxID0gMTtcclxuICAgICAgICB2YXIgYWN0aW9uID0gMDtcclxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gYXBwQ29uZmlnLmJyZWFrcG9pbnQubGcpIHtcclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBwaW5IZWFkZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IGFwcENvbmZpZy5icmVha3BvaW50LmxnKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJIZWlnaHQgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIHBpbkhlYWRlcik7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtbWVudScpLnJlbW92ZUNsYXNzKCdtb2JpbGUtbmF2X2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLW1lbnUtb3ZlcmxheScpLmhpZGUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5vZmYoJ3Njcm9sbCcsIHBpbkhlYWRlcik7XHJcbiAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9maXhlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyRGF0ZXBpY2tlckNlbGwoZGF0ZSwgY2VsbFR5cGUsIGRpc2FibGVkRGF5cykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGlzYWJsZWREYXlzID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBkaXNhYmxlZERheXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNlbGxUeXBlID09ICdkYXknKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXkgPSBkYXRlLmdldERheSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQgPSBkaXNhYmxlZERheXMuaW5kZXhPZihkYXkpICE9IC0xO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0Rpc2FibGVkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdERhdGVwaWNrZXIoKSB7XHJcbiAgICAgICAgdmFyIGRpc2FibGVkRGF5cyA9IFswLCAxLCAyLCAzLCA0LCA1XTtcclxuICAgICAgICAkKCcuanMtZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICBtaW5EYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICByYW5nZTogdHJ1ZSxcclxuICAgICAgICAgICAgbXVsdGlwbGVEYXRlc1NlcGFyYXRvcjogJyAtICcsXHJcbiAgICAgICAgICAgIG9uUmVuZGVyQ2VsbDogZnVuY3Rpb24gKGRhdGUsIGNlbGxUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyRGF0ZXBpY2tlckNlbGwoZGF0ZSwgY2VsbFR5cGUsIGRpc2FibGVkRGF5cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtZGF0ZXBpY2tlcl9yYW5nZScpLnBhcmVudHMoJ2Zvcm0nKS5maW5kKCcuanMtZGF0ZXBpY2tlcl9fcmFuZ2UtdG9nZ2xlcicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRlcGlja2VyID0gJCh0aGlzKS5wYXJlbnRzKCdmb3JtJykuZmluZCgnLmpzLWRhdGVwaWNrZXJfcmFuZ2UnKVswXTtcclxuICAgICAgICAgICAgdmFyIGRhdGVwaWNrZXJEYXRhID0gJChkYXRlcGlja2VyKS5kYXRhKCdkYXRlcGlja2VyJyk7XHJcbiAgICAgICAgICAgIGRhdGVwaWNrZXJEYXRhLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICdkYWlseScpIHtcclxuICAgICAgICAgICAgICAgIGRhdGVwaWNrZXJEYXRhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25SZW5kZXJDZWxsOiBmdW5jdGlvbiAoZGF0ZSwgY2VsbFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlckRhdGVwaWNrZXJDZWxsKGRhdGUsIGNlbGxUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0ZXBpY2tlckRhdGEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBvblJlbmRlckNlbGw6IGZ1bmN0aW9uIChkYXRlLCBjZWxsVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyRGF0ZXBpY2tlckNlbGwoZGF0ZSwgY2VsbFR5cGUsIGRpc2FibGVkRGF5cylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRMaXN0KCkge1xyXG4gICAgICAgICQoJy5qcy1pbmxpbmUtbGlzdCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbGFzdEVsZW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdsaScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnbGFzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RFbGVtZW50ICYmIGxhc3RFbGVtZW50Lm9mZnNldCgpLnRvcCAhPSAkKHRoaXMpLm9mZnNldCgpLnRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RFbGVtZW50LmFkZENsYXNzKCdsYXN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYXN0RWxlbWVudCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkIHJlc2l6ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaW5pdExpc3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRUYWJzKCkge1xyXG4gICAgICAgICQoJy5qcy10YWJzJylcclxuICAgICAgICAgICAgICAgIC5lYXN5dGFicygpXHJcbiAgICAgICAgICAgICAgICAuYmluZCgnZWFzeXRhYnM6bWlkVHJhbnNpdGlvbicsIGZ1bmN0aW9uIChldmVudCwgJGNsaWNrZWQsICR0YXJnZXRQYW5lbCwgc2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgYWN0aXZlIGZvciBvdGhlciB0YWJzIHVsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYiA9ICRjbGlja2VkLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJz4gdWwgPiBsaSBhW2hyZWY9XCInICsgdGFiICsgJ1wiXScpLnBhcmVudCgnbGknKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSBzbGlkZXJcclxuLy8gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRjbGlja2VkKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSAkY2xpY2tlZC5kYXRhKCdzbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLmpzLXNsaWRlcl9nYWxsZXJ5Jykuc2xpY2soJ3NsaWNrR29UbycsIHNsaWRlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLXNsaWRlcl9nYWxsZXJ5Jykub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24gKHNsaWNrLCBjdXJyZW50U2xpZGUpIHtcclxuICAgICAgICAgICAgdmFyIHRhYiA9IGN1cnJlbnRTbGlkZS4kc2xpZGVzW2N1cnJlbnRTbGlkZS5jdXJyZW50U2xpZGVdLmRhdGFzZXQudGFiO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5qcy10YWJzJykuZWFzeXRhYnMoJ3NlbGVjdCcsIHRhYilcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBuYXYgdGFicyBieSBidXR0b25zXHJcbiAgICAgICAgJCgnLmpzLXRhYnMtYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5qcy10YWJzJylcclxuICAgICAgICAgICAgICAgICAgICAuZWFzeXRhYnMoJ3NlbGVjdCcsICQodGhpcykuZGF0YSgndGFiJykpXHJcbiAgICAgICAgICAgICAgICAgICAgLmJpbmQoJ2Vhc3l0YWJzOmFmdGVyJywgZnVuY3Rpb24gKGV2ZW50LCAkY2xpY2tlZCwgJHRhcmdldFBhbmVsLCBzZXR0aW5ncykge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkdGFyZ2V0UGFuZWwub2Zmc2V0KCkudG9wIC0gcGFyc2VGbG9hdCgkKCdib2R5JykuY3NzKCdwYWRkaW5nLXRvcCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9ICQodGhpcykub2Zmc2V0KCkudG9wIC0gcGFyc2VGbG9hdCgkKCdib2R5JykuY3NzKCdwYWRkaW5nLXRvcCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogb2Zmc2V0fSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0UmFkaW9Td2l0Y2goKSB7XHJcbiAgICAgICAgJCgnLmpzLXJhZGlvLXN3aXRjaCBpbnB1dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmpzLXJhZGlvLXN3aXRjaF9faXRlbScpO1xyXG4gICAgICAgICAgICBpZiAoJHBhcmVudC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICRwYXJlbnQuc2libGluZ3MoJy5qcy1yYWRpby1zd2l0Y2hfX2l0ZW0nKS5maW5kKCdpbnB1dCcpLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5qcy1yYWRpby1zd2l0Y2gnKS5maW5kKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjdXN0b20gc2Nyb2xsYmFyXHJcbiAgICBmdW5jdGlvbiBpbml0U2Nyb2xsYmFyKCkge1xyXG4gICAgICAgICQoJy5hcnRpY2xlLWNvbnRlbnQgdGFibGUnKS53cmFwKCc8ZGl2IGNsYXNzPVwianMtc2Nyb2xsYmFyIHNjcm9sbGJhci1vdXRlclwiPjwvZGl2PicpO1xyXG4gICAgICAgICQoJy5qcy1zY3JvbGxiYXInKS5zY3JvbGxiYXIoe1xyXG4gICAgICAgICAgICBkaXNhYmxlQm9keVNjcm9sbDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRBbmNob3IoKSB7XHJcbiAgICAgICAgdmFyICRyb290ID0gJCgnaHRtbCwgYm9keScpLFxyXG4gICAgICAgICAgICAgICAgJGJvZHkgPSAkKCdib2R5JyksXHJcbiAgICAgICAgICAgICAgICAkaGVhZGVyID0gJCgnaGVhZGVyJyk7XHJcbiAgICAgICAgdmFyIHNjcm9sbFRvID0gZnVuY3Rpb24gKGhyZWYpIHtcclxuICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKGhyZWYpO1xyXG4gICAgICAgICAgICBpZiAoJHRhcmdldC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgJHRhcmdldCA9ICQoJ2FbbmFtZT0nICsgaHJlZi5zdWJzdHIoMSkgKyAnXScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkdGFyZ2V0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkdGFyZ2V0Lm9mZnNldCgpLnRvcCAtIHBhcnNlRmxvYXQoJGJvZHkuY3NzKCdwYWRkaW5nLXRvcCcpKTtcclxuICAgICAgICAgICAgJHJvb3QuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBvZmZzZXR9LCA1MDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkaGVhZGVyLmhhc0NsYXNzKCdoZWFkZXJfZml4ZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9ICR0YXJnZXQub2Zmc2V0KCkudG9wIC0gJGhlYWRlci5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICRyb290LmFuaW1hdGUoe3Njcm9sbFRvcDogb2Zmc2V0fSwgMjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBocmVmO1xyXG4vLyAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe2pzQW5jaG9yOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyBocmVmfSwgJycsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArICcjMTIzJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcuanMtYW5jaG9yJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBzY3JvbGxUbygkKHRoaXMpLmF0dHIoJ2hyZWYnKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUbyh3aW5kb3cubG9jYXRpb24uaGFzaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpbml0T3RoZXIoKSB7XHJcbiAgICAgICAgJCgnLm1hcmluYS1pdGVtX19pbWctd3JhcHBlcicpLmhvdmVyKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLm1hcmluYS1pdGVtJykuZmluZCgnLm1hcmluYS1pdGVtX19oZWFkZXInKS5hZGRDbGFzcygnaG92ZXJlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5tYXJpbmEtaXRlbScpLmZpbmQoJy5tYXJpbmEtaXRlbV9faGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2hvdmVyZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIHBsYXkgdmlkZW8gaW4gYmxvZyBsaXN0aW5nXHJcbiAgICAgICAgJCgnLmpzLXZpZGVvLWhvdmVyJykuaG92ZXIoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuanMtdmlkZW8taG92ZXJfX3Bvc3RlcicpLmFkZENsYXNzKCd2aWRlby1wb3N0ZXJfaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCd2aWRlby5qcy12aWRlby1ob3Zlcl9fdmlkZW8nKVswXS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLmpzLXZpZGVvLWhvdmVyX19wb3N0ZXInKS5yZW1vdmVDbGFzcygndmlkZW8tcG9zdGVyX2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2ID0gJCh0aGlzKS5maW5kKCd2aWRlby5qcy12aWRlby1ob3Zlcl9fdmlkZW8nKVswXTtcclxuICAgICAgICAgICAgICAgICAgICB2LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdi5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gYXV0b3BsYXkgYmFja2dyb3VuZCB2aWRlb1xyXG4gICAgICAgICQoJy5qcy12aWRlby1hdXRvcGxheScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBjbGljayBvbiBpZnJhbWUgbWFwXHJcbiAgICAgICAgJCgnLmFydGljbGVzLW1hcF9fd3JhcHBlcicpXHJcbiAgICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2NsaWNrZWQnKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAubW91c2VsZWF2ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnY2xpY2tlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gbGluayBpbnNpZGUgbGlua1xyXG4gICAgICAgICQoJy5qcy1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgaHJlZiA9ICQodGhpcykuZGF0YSgnbGluaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGFudGlzcGFtXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJlbWFpbDNcIl0saW5wdXRbbmFtZT1cImluZm9cIl0saW5wdXRbbmFtZT1cInRleHRcIl0nKS5hdHRyKCd2YWx1ZScsICcnKS52YWwoJycpO1xyXG4gICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgIC8vIGZvb3RlciBmdSQlXHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkIHJlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmZvb3Rlci1wcm90ZWN0aW9uX19pbWcnKS53aWR0aCgkKCcuZm9vdGVyLXByb3RlY3Rpb25fX2ltZyBpbWcnKS53aWR0aCgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0pOyJdLCJmaWxlIjoiY29tbW9uLmpzIn0=
