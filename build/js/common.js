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
        $('.slick-dots').each(function () {
            if ($(this).find('li').length == 1) {
                $(this).hide();
            }
        });
    }

    function initSelect() {
        $('.js-select').styler({
//            selectVisibleOptions: 5,
//            onFormStyled: function () {
//                $('.jq-selectbox__dropdown')
//                        .find('ul')
//                        .wrap('<div class="scrollbar-outer" />');
//            },
//            onSelectOpened: function () {
//                var _ul = $(this).find('.jq-selectbox__dropdown ul');
//                var height = _ul.height();
//                var _srollPane = $(this).find('.jq-selectbox__dropdown .scrollbar-outer');
//                ;
//                _srollPane.height(height);
//                _ul.css('max-height', 'none');
//                _srollPane.scrollbar();
////                $(this).find(".jq-selectbox__dropdown ul").scrollbar();
//            }
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
        var scrollTo = function(href) {
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
        window.onload = function() {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBhcHBDb25maWcgPSB7XHJcbiAgICAgICAgYnJlYWtwb2ludDoge1xyXG4gICAgICAgICAgICBtZDogNzY4LFxyXG4gICAgICAgICAgICBsZzogMTAyNFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGVyU3BlZWVkOiAzMDAwXHJcbiAgICB9O1xyXG5cclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0U2x5KCk7XHJcbiAgICAgICAgaW5pdFNsaWRlcigpO1xyXG4gICAgICAgIGluaXRTZWxlY3QoKTtcclxuICAgICAgICBpbml0TWVudSgpO1xyXG4gICAgICAgIGluaXREYXRlcGlja2VyKCk7XHJcbiAgICAgICAgaW5pdFRhYnMoKTtcclxuICAgICAgICBpbml0UmFkaW9Td2l0Y2goKTtcclxuICAgICAgICBpbml0U2Nyb2xsYmFyKCk7XHJcbiAgICAgICAgaW5pdEFuY2hvcigpO1xyXG4gICAgICAgIGluaXRPdGhlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFNseSgpIHtcclxuICAgICAgICAkKCcuanMtc2x5LXdyYXBwZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICR3cmFwcGVyID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIG1pbiA9ICR3cmFwcGVyLmRhdGEoJ3NseS1taW4nKSB8fCAwO1xyXG4gICAgICAgICAgICB2YXIgbWF4ID0gJHdyYXBwZXIuZGF0YSgnc2x5LW1heCcpIHx8IDA7XHJcbiAgICAgICAgICAgIHZhciB2aWV3cG9ydCA9ICQod2luZG93KS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgIGlmIChtaW4gPD0gdmlld3BvcnQgJiYgbWF4ID49IHZpZXdwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGZyYW1lID0gJHdyYXBwZXIuZmluZCgnLmpzLXNseS1mcmFtZScpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRzY3JvbGxiYXIgPSAkd3JhcHBlci5maW5kKCcuanMtc2x5LXNjcm9sbGJhcicpO1xyXG4gICAgICAgICAgICAgICAgJGZyYW1lLnNseSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtTmF2OiAnYmFzaWMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNtYXJ0OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdXNlRHJhZ2dpbmc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hEcmFnZ2luZzogMSxcclxuICAgICAgICAgICAgICAgICAgICByZWxlYXNlU3dpbmc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFyOiAkc2Nyb2xsYmFyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJ5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxhc3RpY0JvdW5kczogMSxcclxuICAgICAgICAgICAgICAgICAgICBkcmFnSGFuZGxlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWNIYW5kbGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tCYXI6IDFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRmcmFtZS5zbHkoJ3JlbG9hZCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0U2xpZGVyKCkge1xyXG4gICAgICAgICQoJy5qcy1zbGlkZXJfaW5kZXgnKS5zbGljayh7XHJcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlczogYXBwQ29uZmlnLnNsaWRlclNwZWVlZCxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGFwcENvbmZpZy5icmVha3BvaW50Lm1kLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtc2xpZGVyX2JvYXQnKS5zbGljayh7XHJcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogYXBwQ29uZmlnLmJyZWFrcG9pbnQubWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1zbGlkZXJfZ2FsbGVyeScpLnNsaWNrKHtcclxuICAgICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnMTB2dycsXHJcbiAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiBhcHBDb25maWcuYnJlYWtwb2ludC5sZyxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnNzBweCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGFwcENvbmZpZy5icmVha3BvaW50Lm1kLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICc1MHB4JyxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLnNsaWNrLWRvdHMnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnbGknKS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0U2VsZWN0KCkge1xyXG4gICAgICAgICQoJy5qcy1zZWxlY3QnKS5zdHlsZXIoe1xyXG4vLyAgICAgICAgICAgIHNlbGVjdFZpc2libGVPcHRpb25zOiA1LFxyXG4vLyAgICAgICAgICAgIG9uRm9ybVN0eWxlZDogZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgICAgICAgICAkKCcuanEtc2VsZWN0Ym94X19kcm9wZG93bicpXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ3VsJylcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAud3JhcCgnPGRpdiBjbGFzcz1cInNjcm9sbGJhci1vdXRlclwiIC8+Jyk7XHJcbi8vICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICBvblNlbGVjdE9wZW5lZDogZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgICAgICAgICB2YXIgX3VsID0gJCh0aGlzKS5maW5kKCcuanEtc2VsZWN0Ym94X19kcm9wZG93biB1bCcpO1xyXG4vLyAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gX3VsLmhlaWdodCgpO1xyXG4vLyAgICAgICAgICAgICAgICB2YXIgX3Nyb2xsUGFuZSA9ICQodGhpcykuZmluZCgnLmpxLXNlbGVjdGJveF9fZHJvcGRvd24gLnNjcm9sbGJhci1vdXRlcicpO1xyXG4vLyAgICAgICAgICAgICAgICA7XHJcbi8vICAgICAgICAgICAgICAgIF9zcm9sbFBhbmUuaGVpZ2h0KGhlaWdodCk7XHJcbi8vICAgICAgICAgICAgICAgIF91bC5jc3MoJ21heC1oZWlnaHQnLCAnbm9uZScpO1xyXG4vLyAgICAgICAgICAgICAgICBfc3JvbGxQYW5lLnNjcm9sbGJhcigpO1xyXG4vLy8vICAgICAgICAgICAgICAgICQodGhpcykuZmluZChcIi5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duIHVsXCIpLnNjcm9sbGJhcigpO1xyXG4vLyAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuLy8vLyAgICAgICAgJCgnLmFydGljbGUtY29udGVudCB0YWJsZScpLndyYXAoJzxkaXYgY2xhc3M9XCJqcy1zY3JvbGxiYXIgc2Nyb2xsYmFyLW91dGVyXCI+PC9kaXY+Jyk7XHJcbi8vLy8gICAgICAgICQoJy5qcy1zY3JvbGxiYXInKS5zY3JvbGxiYXIoe1xyXG4vLy8vICAgICAgICAgICAgZGlzYWJsZUJvZHlTY3JvbGw6IHRydWVcclxuLy8vLyAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdE1lbnUoKSB7XHJcbiAgICAgICAgJCgnLmpzLW1lbnUtdG9nZ2xlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdtYWluLW5hdl9faWNvbi1tZW51X19saW5rX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtbWVudScpLnRvZ2dsZUNsYXNzKCdtb2JpbGUtbmF2X2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtbWVudS1sb2dvJykudG9nZ2xlQ2xhc3MoJ21haW4tbmF2X19sb2dvLWxpbmtfY3JvcCcpO1xyXG4gICAgICAgICAgICAkKCcuanMtbWVudS1pY29uJykudG9nZ2xlQ2xhc3MoJ21haW4tbmF2X19oaWRkZW4tbWQnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtb3ZlcmxheScpLnRvZ2dsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1tZW51LW92ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAkKCcuanMtbWVudS10b2dnbGVyJykuY2xpY2soKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0LDQvdC40LzQsNGG0LjRjyDQutC+0L3RgtCw0LrRgtC+0LIg0LIg0YjQsNC/0LrQtVxyXG4gICAgICAgICQoJy5tYWluLW5hdl9fdG9wLW1lbnVfX2NvbnRhY3RzJykub24oJ3RvcE1lbnVBbmltYXRlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAkdGhpcy53aWR0aCgnYXV0bycpO1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSAkdGhpcy5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgIHZhciBtV2lkdGggPSAkdGhpcy5maW5kKCcubWFpbi1uYXZfX3RvcC1tZW51X19jb250YWN0c19fc3BhbicpLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICQodGhpcykud2lkdGgobVdpZHRoKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5ob3ZlcihcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5hbmltYXRlKHsnd2lkdGgnOiB3aWR0aH0sIDIwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuYW5pbWF0ZSh7J3dpZHRoJzogbVdpZHRofSwgMjAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLm1haW4tbmF2X190b3AtbWVudV9fY29udGFjdHMnKS50cmlnZ2VyKCd0b3BNZW51QW5pbWF0ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcubWFpbi1uYXZfX3RvcC1tZW51X19jb250YWN0cycpLnRyaWdnZXIoJ3RvcE1lbnVBbmltYXRlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBwaW5IZWFkZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gaGVhZGVySGVpZ2h0ICogcSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWN0aW9uID0gMTtcclxuICAgICAgICAgICAgICAgICRoZWFkZXIuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLmNzcyh7J3BhZGRpbmctdG9wJzogaGVhZGVySGVpZ2h0fSk7XHJcbiAgICAgICAgICAgICAgICAkaGVhZGVyLmNzcyh7J3RvcCc6IC1oZWFkZXJIZWlnaHR9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2hlYWRlcl9maXhlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbmltYXRlKHsndG9wJzogMH0sIDQwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSAyO1xyXG4gICAgICAgICAgICAgICAgJGhlYWRlci5hbmltYXRlKHsndG9wJzogLWhlYWRlckhlaWdodH0sIFwiZmFzdFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5jc3Moeyd0b3AnOiAwfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLmNzcyh7J3BhZGRpbmctdG9wJzogMH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyICRoZWFkZXIgPSAkKCdoZWFkZXInKTtcclxuICAgICAgICB2YXIgaGVhZGVySGVpZ2h0ID0gJGhlYWRlci5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgIHZhciBxID0gMjtcclxuICAgICAgICB2YXIgYWN0aW9uID0gMDtcclxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gYXBwQ29uZmlnLmJyZWFrcG9pbnQubGcpIHtcclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBwaW5IZWFkZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IGFwcENvbmZpZy5icmVha3BvaW50LmxnKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJIZWlnaHQgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIHBpbkhlYWRlcik7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtbWVudScpLnJlbW92ZUNsYXNzKCdtb2JpbGUtbmF2X2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLW1lbnUtb3ZlcmxheScpLmhpZGUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5vZmYoJ3Njcm9sbCcsIHBpbkhlYWRlcik7XHJcbiAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9maXhlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyRGF0ZXBpY2tlckNlbGwoZGF0ZSwgY2VsbFR5cGUsIGRpc2FibGVkRGF5cykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGlzYWJsZWREYXlzID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBkaXNhYmxlZERheXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNlbGxUeXBlID09ICdkYXknKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXkgPSBkYXRlLmdldERheSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQgPSBkaXNhYmxlZERheXMuaW5kZXhPZihkYXkpICE9IC0xO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0Rpc2FibGVkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdERhdGVwaWNrZXIoKSB7XHJcbiAgICAgICAgdmFyIGRpc2FibGVkRGF5cyA9IFswLCAxLCAyLCAzLCA0LCA1XTtcclxuICAgICAgICAkKCcuanMtZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICBtaW5EYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICByYW5nZTogdHJ1ZSxcclxuICAgICAgICAgICAgbXVsdGlwbGVEYXRlc1NlcGFyYXRvcjogJyAtICcsXHJcbiAgICAgICAgICAgIG9uUmVuZGVyQ2VsbDogZnVuY3Rpb24gKGRhdGUsIGNlbGxUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyRGF0ZXBpY2tlckNlbGwoZGF0ZSwgY2VsbFR5cGUsIGRpc2FibGVkRGF5cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtZGF0ZXBpY2tlcl9yYW5nZScpLnBhcmVudHMoJ2Zvcm0nKS5maW5kKCcuanMtZGF0ZXBpY2tlcl9fcmFuZ2UtdG9nZ2xlcicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRlcGlja2VyID0gJCh0aGlzKS5wYXJlbnRzKCdmb3JtJykuZmluZCgnLmpzLWRhdGVwaWNrZXJfcmFuZ2UnKVswXTtcclxuICAgICAgICAgICAgdmFyIGRhdGVwaWNrZXJEYXRhID0gJChkYXRlcGlja2VyKS5kYXRhKCdkYXRlcGlja2VyJyk7XHJcbiAgICAgICAgICAgIGRhdGVwaWNrZXJEYXRhLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICdkYWlseScpIHtcclxuICAgICAgICAgICAgICAgIGRhdGVwaWNrZXJEYXRhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25SZW5kZXJDZWxsOiBmdW5jdGlvbiAoZGF0ZSwgY2VsbFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlckRhdGVwaWNrZXJDZWxsKGRhdGUsIGNlbGxUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0ZXBpY2tlckRhdGEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBvblJlbmRlckNlbGw6IGZ1bmN0aW9uIChkYXRlLCBjZWxsVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyRGF0ZXBpY2tlckNlbGwoZGF0ZSwgY2VsbFR5cGUsIGRpc2FibGVkRGF5cylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRMaXN0KCkge1xyXG4gICAgICAgICQoJy5qcy1pbmxpbmUtbGlzdCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbGFzdEVsZW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdsaScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnbGFzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RFbGVtZW50ICYmIGxhc3RFbGVtZW50Lm9mZnNldCgpLnRvcCAhPSAkKHRoaXMpLm9mZnNldCgpLnRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RFbGVtZW50LmFkZENsYXNzKCdsYXN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYXN0RWxlbWVudCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkIHJlc2l6ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaW5pdExpc3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRUYWJzKCkge1xyXG4gICAgICAgICQoJy5qcy10YWJzJylcclxuICAgICAgICAgICAgICAgIC5lYXN5dGFicygpXHJcbiAgICAgICAgICAgICAgICAuYmluZCgnZWFzeXRhYnM6bWlkVHJhbnNpdGlvbicsIGZ1bmN0aW9uIChldmVudCwgJGNsaWNrZWQsICR0YXJnZXRQYW5lbCwgc2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgYWN0aXZlIGZvciBvdGhlciB0YWJzIHVsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYiA9ICRjbGlja2VkLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJz4gdWwgPiBsaSBhW2hyZWY9XCInICsgdGFiICsgJ1wiXScpLnBhcmVudCgnbGknKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSBzbGlkZXJcclxuLy8gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRjbGlja2VkKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSAkY2xpY2tlZC5kYXRhKCdzbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLmpzLXNsaWRlcl9nYWxsZXJ5Jykuc2xpY2soJ3NsaWNrR29UbycsIHNsaWRlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLXNsaWRlcl9nYWxsZXJ5Jykub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24gKHNsaWNrLCBjdXJyZW50U2xpZGUpIHtcclxuICAgICAgICAgICAgdmFyIHRhYiA9IGN1cnJlbnRTbGlkZS4kc2xpZGVzW2N1cnJlbnRTbGlkZS5jdXJyZW50U2xpZGVdLmRhdGFzZXQudGFiO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5qcy10YWJzJykuZWFzeXRhYnMoJ3NlbGVjdCcsIHRhYilcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBuYXYgdGFicyBieSBidXR0b25zXHJcbiAgICAgICAgJCgnLmpzLXRhYnMtYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5qcy10YWJzJylcclxuICAgICAgICAgICAgICAgICAgICAuZWFzeXRhYnMoJ3NlbGVjdCcsICQodGhpcykuZGF0YSgndGFiJykpXHJcbiAgICAgICAgICAgICAgICAgICAgLmJpbmQoJ2Vhc3l0YWJzOmFmdGVyJywgZnVuY3Rpb24gKGV2ZW50LCAkY2xpY2tlZCwgJHRhcmdldFBhbmVsLCBzZXR0aW5ncykge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkdGFyZ2V0UGFuZWwub2Zmc2V0KCkudG9wIC0gcGFyc2VGbG9hdCgkKCdib2R5JykuY3NzKCdwYWRkaW5nLXRvcCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9ICQodGhpcykub2Zmc2V0KCkudG9wIC0gcGFyc2VGbG9hdCgkKCdib2R5JykuY3NzKCdwYWRkaW5nLXRvcCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogb2Zmc2V0fSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0UmFkaW9Td2l0Y2goKSB7XHJcbiAgICAgICAgJCgnLmpzLXJhZGlvLXN3aXRjaCBpbnB1dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmpzLXJhZGlvLXN3aXRjaF9faXRlbScpO1xyXG4gICAgICAgICAgICBpZiAoJHBhcmVudC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICRwYXJlbnQuc2libGluZ3MoJy5qcy1yYWRpby1zd2l0Y2hfX2l0ZW0nKS5maW5kKCdpbnB1dCcpLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5qcy1yYWRpby1zd2l0Y2gnKS5maW5kKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjdXN0b20gc2Nyb2xsYmFyXHJcbiAgICBmdW5jdGlvbiBpbml0U2Nyb2xsYmFyKCkge1xyXG4gICAgICAgICQoJy5hcnRpY2xlLWNvbnRlbnQgdGFibGUnKS53cmFwKCc8ZGl2IGNsYXNzPVwianMtc2Nyb2xsYmFyIHNjcm9sbGJhci1vdXRlclwiPjwvZGl2PicpO1xyXG4gICAgICAgICQoJy5qcy1zY3JvbGxiYXInKS5zY3JvbGxiYXIoe1xyXG4gICAgICAgICAgICBkaXNhYmxlQm9keVNjcm9sbDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRBbmNob3IoKSB7XHJcbiAgICAgICAgdmFyICRyb290ID0gJCgnaHRtbCwgYm9keScpLFxyXG4gICAgICAgICAgICAgICAgJGJvZHkgPSAkKCdib2R5JyksXHJcbiAgICAgICAgICAgICAgICAkaGVhZGVyID0gJCgnaGVhZGVyJyk7XHJcbiAgICAgICAgdmFyIHNjcm9sbFRvID0gZnVuY3Rpb24oaHJlZikge1xyXG4gICAgICAgICAgICB2YXIgJHRhcmdldCA9ICQoaHJlZik7XHJcbiAgICAgICAgICAgIGlmICgkdGFyZ2V0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gJCgnYVtuYW1lPScgKyBocmVmLnN1YnN0cigxKSArICddJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCR0YXJnZXQubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9ICR0YXJnZXQub2Zmc2V0KCkudG9wIC0gcGFyc2VGbG9hdCgkYm9keS5jc3MoJ3BhZGRpbmctdG9wJykpO1xyXG4gICAgICAgICAgICAkcm9vdC5hbmltYXRlKHtzY3JvbGxUb3A6IG9mZnNldH0sIDUwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRoZWFkZXIuaGFzQ2xhc3MoJ2hlYWRlcl9maXhlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gJHRhcmdldC5vZmZzZXQoKS50b3AgLSAkaGVhZGVyLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3QuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBvZmZzZXR9LCAyMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhyZWY7XHJcbi8vICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7anNBbmNob3I6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIGhyZWZ9LCAnJywgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgJyMxMjMnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5qcy1hbmNob3InKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvKCQodGhpcykuYXR0cignaHJlZicpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG8od2luZG93LmxvY2F0aW9uLmhhc2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaW5pdE90aGVyKCkge1xyXG4gICAgICAgICQoJy5tYXJpbmEtaXRlbV9faW1nLXdyYXBwZXInKS5ob3ZlcihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5tYXJpbmEtaXRlbScpLmZpbmQoJy5tYXJpbmEtaXRlbV9faGVhZGVyJykuYWRkQ2xhc3MoJ2hvdmVyZWQnKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcubWFyaW5hLWl0ZW0nKS5maW5kKCcubWFyaW5hLWl0ZW1fX2hlYWRlcicpLnJlbW92ZUNsYXNzKCdob3ZlcmVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBwbGF5IHZpZGVvIGluIGJsb2cgbGlzdGluZ1xyXG4gICAgICAgICQoJy5qcy12aWRlby1ob3ZlcicpLmhvdmVyKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLmpzLXZpZGVvLWhvdmVyX19wb3N0ZXInKS5hZGRDbGFzcygndmlkZW8tcG9zdGVyX2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgndmlkZW8uanMtdmlkZW8taG92ZXJfX3ZpZGVvJylbMF0ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5qcy12aWRlby1ob3Zlcl9fcG9zdGVyJykucmVtb3ZlQ2xhc3MoJ3ZpZGVvLXBvc3Rlcl9oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdiA9ICQodGhpcykuZmluZCgndmlkZW8uanMtdmlkZW8taG92ZXJfX3ZpZGVvJylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdi5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHYuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIGxpbmsgaW5zaWRlIGxpbmtcclxuICAgICAgICAkKCcuanMtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGhyZWYgPSAkKHRoaXMpLmRhdGEoJ2xpbmsnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gaHJlZjtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBhbnRpc3BhbVxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwiZW1haWwzXCJdLGlucHV0W25hbWU9XCJpbmZvXCJdLGlucHV0W25hbWU9XCJ0ZXh0XCJdJykuYXR0cigndmFsdWUnLCAnJykudmFsKCcnKTtcclxuICAgICAgICB9LCA1MDAwKTtcclxuICAgICAgICAvLyBmb290ZXIgZnUkJVxyXG4gICAgICAgICQod2luZG93KS5vbignbG9hZCByZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5mb290ZXItcHJvdGVjdGlvbl9faW1nJykud2lkdGgoJCgnLmZvb3Rlci1wcm90ZWN0aW9uX19pbWcgaW1nJykud2lkdGgoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59KTsiXSwiZmlsZSI6ImNvbW1vbi5qcyJ9
