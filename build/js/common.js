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
                $(this).parent().addClass('slick-slider_single');
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
            if (document.readyState !== "complete") {
                return;
            }
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
            $(window).on('load scroll', pinHeader);
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
            //disableBodyScroll: true
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
        $('.js-social').on('click', function() {
            var sizex = $(window).width();
            if (sizex >= 700) sizex = 700;
            window.open($(this).attr("href"), 'displayWindow', 'width=' + sizex + ',location=no,directories=no,status=no,toolbar=no,menubar=no');
            return false;
        });
        // index slider select
        $('.js-index-slider-btn').on('click', function(){
            window.location = $('select.js-index-slider-select').val();
        });
    }

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0U2x5KCk7XHJcbiAgICAgICAgaW5pdFNsaWRlcigpO1xyXG4gICAgICAgIGluaXRTZWxlY3QoKTtcclxuICAgICAgICBpbml0TWVudSgpO1xyXG4gICAgICAgIGluaXREYXRlcGlja2VyKCk7XHJcbiAgICAgICAgaW5pdFRhYnMoKTtcclxuICAgICAgICBpbml0UmFkaW9Td2l0Y2goKTtcclxuICAgICAgICBpbml0U2Nyb2xsYmFyKCk7XHJcbiAgICAgICAgaW5pdEFuY2hvcigpO1xyXG4gICAgICAgIGluaXRPdGhlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFNseSgpIHtcclxuICAgICAgICAkKCcuanMtc2x5LXdyYXBwZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICR3cmFwcGVyID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIG1pbiA9ICR3cmFwcGVyLmRhdGEoJ3NseS1taW4nKSB8fCAwO1xyXG4gICAgICAgICAgICB2YXIgbWF4ID0gJHdyYXBwZXIuZGF0YSgnc2x5LW1heCcpIHx8IDA7XHJcbiAgICAgICAgICAgIHZhciB2aWV3cG9ydCA9ICQod2luZG93KS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgIGlmIChtaW4gPD0gdmlld3BvcnQgJiYgbWF4ID49IHZpZXdwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGZyYW1lID0gJHdyYXBwZXIuZmluZCgnLmpzLXNseS1mcmFtZScpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRzY3JvbGxiYXIgPSAkd3JhcHBlci5maW5kKCcuanMtc2x5LXNjcm9sbGJhcicpO1xyXG4gICAgICAgICAgICAgICAgJGZyYW1lLnNseSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtTmF2OiAnYmFzaWMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNtYXJ0OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdXNlRHJhZ2dpbmc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hEcmFnZ2luZzogMSxcclxuICAgICAgICAgICAgICAgICAgICByZWxlYXNlU3dpbmc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFyOiAkc2Nyb2xsYmFyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJ5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxhc3RpY0JvdW5kczogMSxcclxuICAgICAgICAgICAgICAgICAgICBkcmFnSGFuZGxlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWNIYW5kbGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tCYXI6IDFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRmcmFtZS5zbHkoJ3JlbG9hZCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0U2xpZGVyKCkge1xyXG4gICAgICAgICQoJy5qcy1zbGlkZXJfaW5kZXgnKS5zbGljayh7XHJcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogYXBwQ29uZmlnLnNsaWRlclNwZWVkLFxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogYXBwQ29uZmlnLmJyZWFrcG9pbnQubWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1zbGlkZXJfYm9hdCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiBhcHBDb25maWcuYnJlYWtwb2ludC5tZCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLXNsaWRlcl9nYWxsZXJ5Jykuc2xpY2soe1xyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcxMHZ3JyxcclxuICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGFwcENvbmZpZy5icmVha3BvaW50LmxnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICc3MHB4J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogYXBwQ29uZmlnLmJyZWFrcG9pbnQubWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzUwcHgnLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuc2xpY2stZG90cycpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdsaScpLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ3NsaWNrLXNsaWRlcl9zaW5nbGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTZWxlY3QoKSB7XHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnN0eWxlcih7XHJcbiAgICAgICAgICAgIHNlbGVjdFZpc2libGVPcHRpb25zOiA1LFxyXG4gICAgICAgICAgICBvbkZvcm1TdHlsZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ3VsJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLndyYXAoJzxkaXYgY2xhc3M9XCJzY3JvbGxiYXItb3V0ZXJcIiAvPicpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvblNlbGVjdE9wZW5lZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNldHRpbmdzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9SZWluaXRpYWxpc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGljYWxHdXR0ZXI6IDE1LFxyXG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxHdXR0ZXI6IDE1XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdmFyIF91bCA9ICQodGhpcykuZmluZCgnLmpxLXNlbGVjdGJveF9fZHJvcGRvd24gdWwnKTtcclxuICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSBfdWwuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3Nyb2xsUGFuZSA9ICQodGhpcykuZmluZCgnLmpxLXNlbGVjdGJveF9fZHJvcGRvd24gLnNjcm9sbGJhci1vdXRlcicpO1xyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgX3Nyb2xsUGFuZS5oZWlnaHQoaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIF91bC5jc3MoJ21heC1oZWlnaHQnLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgX3Nyb2xsUGFuZS5qU2Nyb2xsUGFuZShzZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuLy8vLyAgICAgICAgJCgnLmFydGljbGUtY29udGVudCB0YWJsZScpLndyYXAoJzxkaXYgY2xhc3M9XCJqcy1zY3JvbGxiYXIgc2Nyb2xsYmFyLW91dGVyXCI+PC9kaXY+Jyk7XHJcbi8vLy8gICAgICAgICQoJy5qcy1zY3JvbGxiYXInKS5zY3JvbGxiYXIoe1xyXG4vLy8vICAgICAgICAgICAgZGlzYWJsZUJvZHlTY3JvbGw6IHRydWVcclxuLy8vLyAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdE1lbnUoKSB7XHJcbiAgICAgICAgJCgnLmpzLW1lbnUtdG9nZ2xlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdtYWluLW5hdl9faWNvbi1tZW51X19saW5rX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtbWVudScpLnRvZ2dsZUNsYXNzKCdtb2JpbGUtbmF2X2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtbWVudS1sb2dvJykudG9nZ2xlQ2xhc3MoJ21haW4tbmF2X19sb2dvLWxpbmtfY3JvcCcpO1xyXG4gICAgICAgICAgICAkKCcuanMtbWVudS1pY29uJykudG9nZ2xlQ2xhc3MoJ21haW4tbmF2X19oaWRkZW4tbWQnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtb3ZlcmxheScpLnRvZ2dsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1tZW51LW92ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAkKCcuanMtbWVudS10b2dnbGVyJykuY2xpY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyDQsNC90LjQvNCw0YbQuNGPINC60L7QvdGC0LDQutGC0L7QsiDQsiDRiNCw0L/QutC1XHJcbiAgICAgICAgJCgnLm1haW4tbmF2X190b3AtbWVudV9fY29udGFjdHMnKS5vbigndG9wTWVudUFuaW1hdGUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICR0aGlzLndpZHRoKCdhdXRvJyk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9ICR0aGlzLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgdmFyIG1XaWR0aCA9ICR0aGlzLmZpbmQoJy5tYWluLW5hdl9fdG9wLW1lbnVfX2NvbnRhY3RzX19zcGFuJykub3V0ZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gMDtcclxuICAgICAgICAgICAgJCh0aGlzKS53aWR0aChtV2lkdGgpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmhvdmVyKFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmFuaW1hdGUoeyd3aWR0aCc6IHdpZHRofSwgMjAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5hbmltYXRlKHsnd2lkdGgnOiBtV2lkdGh9LCAyMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcubWFpbi1uYXZfX3RvcC1tZW51X19jb250YWN0cycpLnRyaWdnZXIoJ3RvcE1lbnVBbmltYXRlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5tYWluLW5hdl9fdG9wLW1lbnVfX2NvbnRhY3RzJykudHJpZ2dlcigndG9wTWVudUFuaW1hdGUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIHBpbkhlYWRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwiY29tcGxldGVcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gaGVhZGVySGVpZ2h0ICogcSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWN0aW9uID0gMTtcclxuICAgICAgICAgICAgICAgICRoZWFkZXIuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLmNzcyh7J3BhZGRpbmctdG9wJzogaGVhZGVySGVpZ2h0fSk7XHJcbiAgICAgICAgICAgICAgICAkKCcubWFpbi1uYXZfX3RvcC1tZW51X19jb250YWN0cycpLmNzcyh7J3Zpc2liaWxpdHknOiAndmlzaWJsZSd9KTtcclxuICAgICAgICAgICAgICAgICRoZWFkZXIuY3NzKHsndG9wJzogLWhlYWRlckhlaWdodH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaGVhZGVyX2ZpeGVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFuaW1hdGUoeyd0b3AnOiAwfSwgNDAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFjdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAkKCcubWFpbi1uYXZfX3RvcC1tZW51X19jb250YWN0cycpLmNzcyh7J3Zpc2liaWxpdHknOiAnaGlkZGVuJ30pO1xyXG4gICAgICAgICAgICAgICAgJGhlYWRlci5hbmltYXRlKHsndG9wJzogLWhlYWRlckhlaWdodH0sIFwiZmFzdFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5jc3Moeyd0b3AnOiAwfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLmNzcyh7J3BhZGRpbmctdG9wJzogMH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyICRoZWFkZXIgPSAkKCdoZWFkZXInKTtcclxuICAgICAgICB2YXIgaGVhZGVySGVpZ2h0ID0gJGhlYWRlci5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgIHZhciBxID0gMTtcclxuICAgICAgICB2YXIgYWN0aW9uID0gMDtcclxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gYXBwQ29uZmlnLmJyZWFrcG9pbnQubGcpIHtcclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkIHNjcm9sbCcsIHBpbkhlYWRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gYXBwQ29uZmlnLmJyZWFrcG9pbnQubGcpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlckhlaWdodCA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgcGluSGVhZGVyKTtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1tZW51JykucmVtb3ZlQ2xhc3MoJ21vYmlsZS1uYXZfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtbWVudS1vdmVybGF5JykuaGlkZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9mZignc2Nyb2xsJywgcGluSGVhZGVyKTtcclxuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnaGVhZGVyX2ZpeGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJEYXRlcGlja2VyQ2VsbChkYXRlLCBjZWxsVHlwZSwgZGlzYWJsZWREYXlzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkaXNhYmxlZERheXMgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVkRGF5cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2VsbFR5cGUgPT0gJ2RheScpIHtcclxuICAgICAgICAgICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF5KCksXHJcbiAgICAgICAgICAgICAgICAgICAgaXNEaXNhYmxlZCA9IGRpc2FibGVkRGF5cy5pbmRleE9mKGRheSkgIT0gLTE7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGlzRGlzYWJsZWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0RGF0ZXBpY2tlcigpIHtcclxuICAgICAgICB2YXIgZGlzYWJsZWREYXlzID0gWzAsIDEsIDIsIDMsIDQsIDVdO1xyXG4gICAgICAgICQoJy5qcy1kYXRlcGlja2VyJykuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgICAgIG1pbkRhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIHJhbmdlOiB0cnVlLFxyXG4gICAgICAgICAgICBtdWx0aXBsZURhdGVzU2VwYXJhdG9yOiAnIC0gJyxcclxuICAgICAgICAgICAgb25SZW5kZXJDZWxsOiBmdW5jdGlvbiAoZGF0ZSwgY2VsbFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZW5kZXJEYXRlcGlja2VyQ2VsbChkYXRlLCBjZWxsVHlwZSwgZGlzYWJsZWREYXlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1kYXRlcGlja2VyX3JhbmdlJykucGFyZW50cygnZm9ybScpLmZpbmQoJy5qcy1kYXRlcGlja2VyX19yYW5nZS10b2dnbGVyJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGVwaWNrZXIgPSAkKHRoaXMpLnBhcmVudHMoJ2Zvcm0nKS5maW5kKCcuanMtZGF0ZXBpY2tlcl9yYW5nZScpWzBdO1xyXG4gICAgICAgICAgICB2YXIgZGF0ZXBpY2tlckRhdGEgPSAkKGRhdGVwaWNrZXIpLmRhdGEoJ2RhdGVwaWNrZXInKTtcclxuICAgICAgICAgICAgZGF0ZXBpY2tlckRhdGEuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJ2RhaWx5Jykge1xyXG4gICAgICAgICAgICAgICAgZGF0ZXBpY2tlckRhdGEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBvblJlbmRlckNlbGw6IGZ1bmN0aW9uIChkYXRlLCBjZWxsVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyRGF0ZXBpY2tlckNlbGwoZGF0ZSwgY2VsbFR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlcGlja2VyRGF0YS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uUmVuZGVyQ2VsbDogZnVuY3Rpb24gKGRhdGUsIGNlbGxUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZW5kZXJEYXRlcGlja2VyQ2VsbChkYXRlLCBjZWxsVHlwZSwgZGlzYWJsZWREYXlzKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdExpc3QoKSB7XHJcbiAgICAgICAgJCgnLmpzLWlubGluZS1saXN0JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0RWxlbWVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdsYXN0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdEVsZW1lbnQgJiYgbGFzdEVsZW1lbnQub2Zmc2V0KCkudG9wICE9ICQodGhpcykub2Zmc2V0KCkudG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdEVsZW1lbnQuYWRkQ2xhc3MoJ2xhc3QnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxhc3RFbGVtZW50ID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAkKHdpbmRvdykub24oJ2xvYWQgcmVzaXplJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpbml0TGlzdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFRhYnMoKSB7XHJcbiAgICAgICAgJCgnLmpzLXRhYnMnKVxyXG4gICAgICAgICAgICAgICAgLmVhc3l0YWJzKClcclxuICAgICAgICAgICAgICAgIC5iaW5kKCdlYXN5dGFiczptaWRUcmFuc2l0aW9uJywgZnVuY3Rpb24gKGV2ZW50LCAkY2xpY2tlZCwgJHRhcmdldFBhbmVsLCBzZXR0aW5ncykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCBhY3RpdmUgZm9yIG90aGVyIHRhYnMgdWxcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFiID0gJGNsaWNrZWQuYXR0cignaHJlZicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnPiB1bCA+IGxpIGFbaHJlZj1cIicgKyB0YWIgKyAnXCJdJykucGFyZW50KCdsaScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBtb3ZlIHNsaWRlclxyXG4vLyAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJGNsaWNrZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9ICRjbGlja2VkLmRhdGEoJ3NsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuanMtc2xpZGVyX2dhbGxlcnknKS5zbGljaygnc2xpY2tHb1RvJywgc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtc2xpZGVyX2dhbGxlcnknKS5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbiAoc2xpY2ssIGN1cnJlbnRTbGlkZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFiID0gY3VycmVudFNsaWRlLiRzbGlkZXNbY3VycmVudFNsaWRlLmN1cnJlbnRTbGlkZV0uZGF0YXNldC50YWI7XHJcbiAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLmpzLXRhYnMnKS5lYXN5dGFicygnc2VsZWN0JywgdGFiKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIG5hdiB0YWJzIGJ5IGJ1dHRvbnNcclxuICAgICAgICAkKCcuanMtdGFicy1idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLmpzLXRhYnMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lYXN5dGFicygnc2VsZWN0JywgJCh0aGlzKS5kYXRhKCd0YWInKSlcclxuICAgICAgICAgICAgICAgICAgICAuYmluZCgnZWFzeXRhYnM6YWZ0ZXInLCBmdW5jdGlvbiAoZXZlbnQsICRjbGlja2VkLCAkdGFyZ2V0UGFuZWwsIHNldHRpbmdzKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9ICR0YXJnZXRQYW5lbC5vZmZzZXQoKS50b3AgLSBwYXJzZUZsb2F0KCQoJ2JvZHknKS5jc3MoJ3BhZGRpbmctdG9wJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gJCh0aGlzKS5vZmZzZXQoKS50b3AgLSBwYXJzZUZsb2F0KCQoJ2JvZHknKS5jc3MoJ3BhZGRpbmctdG9wJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBvZmZzZXR9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRSYWRpb1N3aXRjaCgpIHtcclxuICAgICAgICAkKCcuanMtcmFkaW8tc3dpdGNoIGlucHV0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuanMtcmFkaW8tc3dpdGNoX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGlmICgkcGFyZW50Lmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgJHBhcmVudC5zaWJsaW5ncygnLmpzLXJhZGlvLXN3aXRjaF9faXRlbScpLmZpbmQoJ2lucHV0JykuY2xpY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLmpzLXJhZGlvLXN3aXRjaCcpLmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGN1c3RvbSBzY3JvbGxiYXJcclxuICAgIGZ1bmN0aW9uIGluaXRTY3JvbGxiYXIoKSB7XHJcbiAgICAgICAgJCgnLmFydGljbGUtY29udGVudCB0YWJsZScpLndyYXAoJzxkaXYgY2xhc3M9XCJqcy1zY3JvbGxiYXIgc2Nyb2xsYmFyLW91dGVyXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgJCgnLmpzLXNjcm9sbGJhcicpLnNjcm9sbGJhcih7XHJcbiAgICAgICAgICAgIC8vZGlzYWJsZUJvZHlTY3JvbGw6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0QW5jaG9yKCkge1xyXG4gICAgICAgIHZhciAkcm9vdCA9ICQoJ2h0bWwsIGJvZHknKSxcclxuICAgICAgICAgICAgICAgICRib2R5ID0gJCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgJGhlYWRlciA9ICQoJ2hlYWRlcicpO1xyXG4gICAgICAgIHZhciBzY3JvbGxUbyA9IGZ1bmN0aW9uIChocmVmKSB7XHJcbiAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJChocmVmKTtcclxuICAgICAgICAgICAgaWYgKCR0YXJnZXQubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICR0YXJnZXQgPSAkKCdhW25hbWU9JyArIGhyZWYuc3Vic3RyKDEpICsgJ10nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJHRhcmdldC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gJHRhcmdldC5vZmZzZXQoKS50b3AgLSBwYXJzZUZsb2F0KCRib2R5LmNzcygncGFkZGluZy10b3AnKSk7XHJcbiAgICAgICAgICAgICRyb290LmFuaW1hdGUoe3Njcm9sbFRvcDogb2Zmc2V0fSwgNTAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGhlYWRlci5oYXNDbGFzcygnaGVhZGVyX2ZpeGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAkdGFyZ2V0Lm9mZnNldCgpLnRvcCAtICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdC5hbmltYXRlKHtzY3JvbGxUb3A6IG9mZnNldH0sIDIwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaHJlZjtcclxuLy8gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHtqc0FuY2hvcjogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgaHJlZn0sICcnLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyAnIzEyMycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnLmpzLWFuY2hvcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgc2Nyb2xsVG8oJCh0aGlzKS5hdHRyKCdocmVmJykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG8od2luZG93LmxvY2F0aW9uLmhhc2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaW5pdE90aGVyKCkge1xyXG4gICAgICAgICQoJy5tYXJpbmEtaXRlbV9faW1nLXdyYXBwZXInKS5ob3ZlcihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5tYXJpbmEtaXRlbScpLmZpbmQoJy5tYXJpbmEtaXRlbV9faGVhZGVyJykuYWRkQ2xhc3MoJ2hvdmVyZWQnKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcubWFyaW5hLWl0ZW0nKS5maW5kKCcubWFyaW5hLWl0ZW1fX2hlYWRlcicpLnJlbW92ZUNsYXNzKCdob3ZlcmVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBwbGF5IHZpZGVvIGluIGJsb2cgbGlzdGluZ1xyXG4gICAgICAgICQoJy5qcy12aWRlby1ob3ZlcicpLmhvdmVyKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLmpzLXZpZGVvLWhvdmVyX19wb3N0ZXInKS5hZGRDbGFzcygndmlkZW8tcG9zdGVyX2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgndmlkZW8uanMtdmlkZW8taG92ZXJfX3ZpZGVvJylbMF0ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5qcy12aWRlby1ob3Zlcl9fcG9zdGVyJykucmVtb3ZlQ2xhc3MoJ3ZpZGVvLXBvc3Rlcl9oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdiA9ICQodGhpcykuZmluZCgndmlkZW8uanMtdmlkZW8taG92ZXJfX3ZpZGVvJylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdi5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHYuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIGF1dG9wbGF5IGJhY2tncm91bmQgdmlkZW9cclxuICAgICAgICAkKCcuanMtdmlkZW8tYXV0b3BsYXknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY2xpY2sgb24gaWZyYW1lIG1hcFxyXG4gICAgICAgICQoJy5hcnRpY2xlcy1tYXBfX3dyYXBwZXInKVxyXG4gICAgICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdjbGlja2VkJyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm1vdXNlbGVhdmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2NsaWNrZWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGxpbmsgaW5zaWRlIGxpbmtcclxuICAgICAgICAkKCcuanMtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGhyZWYgPSAkKHRoaXMpLmRhdGEoJ2xpbmsnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gaHJlZjtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBhbnRpc3BhbVxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwiZW1haWwzXCJdLGlucHV0W25hbWU9XCJpbmZvXCJdLGlucHV0W25hbWU9XCJ0ZXh0XCJdJykuYXR0cigndmFsdWUnLCAnJykudmFsKCcnKTtcclxuICAgICAgICB9LCA1MDAwKTtcclxuICAgICAgICAvLyBmb290ZXIgZnUkJVxyXG4gICAgICAgICQod2luZG93KS5vbignbG9hZCByZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5mb290ZXItcHJvdGVjdGlvbl9faW1nJykud2lkdGgoJCgnLmZvb3Rlci1wcm90ZWN0aW9uX19pbWcgaW1nJykud2lkdGgoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLXNvY2lhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2l6ZXggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuICAgICAgICAgICAgaWYgKHNpemV4ID49IDcwMCkgc2l6ZXggPSA3MDA7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKCQodGhpcykuYXR0cihcImhyZWZcIiksICdkaXNwbGF5V2luZG93JywgJ3dpZHRoPScgKyBzaXpleCArICcsbG9jYXRpb249bm8sZGlyZWN0b3JpZXM9bm8sc3RhdHVzPW5vLHRvb2xiYXI9bm8sbWVudWJhcj1ubycpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gaW5kZXggc2xpZGVyIHNlbGVjdFxyXG4gICAgICAgICQoJy5qcy1pbmRleC1zbGlkZXItYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJCgnc2VsZWN0LmpzLWluZGV4LXNsaWRlci1zZWxlY3QnKS52YWwoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0pOyJdLCJmaWxlIjoiY29tbW9uLmpzIn0=
