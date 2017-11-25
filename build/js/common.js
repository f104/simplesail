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
            autoplaySpeed: appConfig.sliderSpeeed,
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0U2x5KCk7XHJcbiAgICAgICAgaW5pdFNsaWRlcigpO1xyXG4gICAgICAgIGluaXRTZWxlY3QoKTtcclxuICAgICAgICBpbml0TWVudSgpO1xyXG4gICAgICAgIGluaXREYXRlcGlja2VyKCk7XHJcbiAgICAgICAgaW5pdFRhYnMoKTtcclxuICAgICAgICBpbml0UmFkaW9Td2l0Y2goKTtcclxuICAgICAgICBpbml0U2Nyb2xsYmFyKCk7XHJcbiAgICAgICAgaW5pdEFuY2hvcigpO1xyXG4gICAgICAgIGluaXRPdGhlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFNseSgpIHtcclxuICAgICAgICAkKCcuanMtc2x5LXdyYXBwZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICR3cmFwcGVyID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIG1pbiA9ICR3cmFwcGVyLmRhdGEoJ3NseS1taW4nKSB8fCAwO1xyXG4gICAgICAgICAgICB2YXIgbWF4ID0gJHdyYXBwZXIuZGF0YSgnc2x5LW1heCcpIHx8IDA7XHJcbiAgICAgICAgICAgIHZhciB2aWV3cG9ydCA9ICQod2luZG93KS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgIGlmIChtaW4gPD0gdmlld3BvcnQgJiYgbWF4ID49IHZpZXdwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGZyYW1lID0gJHdyYXBwZXIuZmluZCgnLmpzLXNseS1mcmFtZScpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRzY3JvbGxiYXIgPSAkd3JhcHBlci5maW5kKCcuanMtc2x5LXNjcm9sbGJhcicpO1xyXG4gICAgICAgICAgICAgICAgJGZyYW1lLnNseSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtTmF2OiAnYmFzaWMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNtYXJ0OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdXNlRHJhZ2dpbmc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hEcmFnZ2luZzogMSxcclxuICAgICAgICAgICAgICAgICAgICByZWxlYXNlU3dpbmc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFyOiAkc2Nyb2xsYmFyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJ5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxhc3RpY0JvdW5kczogMSxcclxuICAgICAgICAgICAgICAgICAgICBkcmFnSGFuZGxlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWNIYW5kbGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tCYXI6IDFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRmcmFtZS5zbHkoJ3JlbG9hZCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0U2xpZGVyKCkge1xyXG4gICAgICAgICQoJy5qcy1zbGlkZXJfaW5kZXgnKS5zbGljayh7XHJcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogYXBwQ29uZmlnLnNsaWRlclNwZWVlZCxcclxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGFwcENvbmZpZy5icmVha3BvaW50Lm1kLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtc2xpZGVyX2JvYXQnKS5zbGljayh7XHJcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogYXBwQ29uZmlnLmJyZWFrcG9pbnQubWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1zbGlkZXJfZ2FsbGVyeScpLnNsaWNrKHtcclxuICAgICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnMTB2dycsXHJcbiAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiBhcHBDb25maWcuYnJlYWtwb2ludC5sZyxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnNzBweCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGFwcENvbmZpZy5icmVha3BvaW50Lm1kLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICc1MHB4JyxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLnNsaWNrLWRvdHMnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnbGknKS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0U2VsZWN0KCkge1xyXG4gICAgICAgICQoJy5qcy1zZWxlY3QnKS5zdHlsZXIoe1xyXG4gICAgICAgICAgICBzZWxlY3RWaXNpYmxlT3B0aW9uczogNSxcclxuICAgICAgICAgICAgb25Gb3JtU3R5bGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanEtc2VsZWN0Ym94X19kcm9wZG93bicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCd1bCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC53cmFwKCc8ZGl2IGNsYXNzPVwic2Nyb2xsYmFyLW91dGVyXCIgLz4nKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25TZWxlY3RPcGVuZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhdXRvUmVpbml0aWFsaXNlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsR3V0dGVyOiAxNSxcclxuICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsR3V0dGVyOiAxNVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHZhciBfdWwgPSAkKHRoaXMpLmZpbmQoJy5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duIHVsJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gX3VsLmhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9zcm9sbFBhbmUgPSAkKHRoaXMpLmZpbmQoJy5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duIC5zY3JvbGxiYXItb3V0ZXInKTtcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgIF9zcm9sbFBhbmUuaGVpZ2h0KGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBfdWwuY3NzKCdtYXgtaGVpZ2h0JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgIF9zcm9sbFBhbmUualNjcm9sbFBhbmUoc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbi8vLy8gICAgICAgICQoJy5hcnRpY2xlLWNvbnRlbnQgdGFibGUnKS53cmFwKCc8ZGl2IGNsYXNzPVwianMtc2Nyb2xsYmFyIHNjcm9sbGJhci1vdXRlclwiPjwvZGl2PicpO1xyXG4vLy8vICAgICAgICAkKCcuanMtc2Nyb2xsYmFyJykuc2Nyb2xsYmFyKHtcclxuLy8vLyAgICAgICAgICAgIGRpc2FibGVCb2R5U2Nyb2xsOiB0cnVlXHJcbi8vLy8gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRNZW51KCkge1xyXG4gICAgICAgICQoJy5qcy1tZW51LXRvZ2dsZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnbWFpbi1uYXZfX2ljb24tbWVudV9fbGlua19hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUnKS50b2dnbGVDbGFzcygnbW9iaWxlLW5hdl9hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtbG9nbycpLnRvZ2dsZUNsYXNzKCdtYWluLW5hdl9fbG9nby1saW5rX2Nyb3AnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtaWNvbicpLnRvZ2dsZUNsYXNzKCdtYWluLW5hdl9faGlkZGVuLW1kJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1tZW51LW92ZXJsYXknKS50b2dnbGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtbWVudS1vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtdG9nZ2xlcicpLmNsaWNrKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINCw0L3QuNC80LDRhtC40Y8g0LrQvtC90YLQsNC60YLQvtCyINCyINGI0LDQv9C60LVcclxuICAgICAgICAkKCcubWFpbi1uYXZfX3RvcC1tZW51X19jb250YWN0cycpLm9uKCd0b3BNZW51QW5pbWF0ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgJHRoaXMud2lkdGgoJ2F1dG8nKTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gJHRoaXMub3V0ZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICB2YXIgbVdpZHRoID0gJHRoaXMuZmluZCgnLm1haW4tbmF2X190b3AtbWVudV9fY29udGFjdHNfX3NwYW4nKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSAwO1xyXG4gICAgICAgICAgICAkKHRoaXMpLndpZHRoKG1XaWR0aCk7XHJcbiAgICAgICAgICAgICQodGhpcykuaG92ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuYW5pbWF0ZSh7J3dpZHRoJzogd2lkdGh9LCAyMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24gPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmFuaW1hdGUoeyd3aWR0aCc6IG1XaWR0aH0sIDIwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5tYWluLW5hdl9fdG9wLW1lbnVfX2NvbnRhY3RzJykudHJpZ2dlcigndG9wTWVudUFuaW1hdGUnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLm1haW4tbmF2X190b3AtbWVudV9fY29udGFjdHMnKS50cmlnZ2VyKCd0b3BNZW51QW5pbWF0ZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgcGluSGVhZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IGhlYWRlckhlaWdodCAqIHEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgICAkaGVhZGVyLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5jc3MoeydwYWRkaW5nLXRvcCc6IGhlYWRlckhlaWdodH0pO1xyXG4gICAgICAgICAgICAgICAgJGhlYWRlci5jc3Moeyd0b3AnOiAtaGVhZGVySGVpZ2h0fSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdoZWFkZXJfZml4ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYW5pbWF0ZSh7J3RvcCc6IDB9LCA0MDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWN0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICRoZWFkZXIuYW5pbWF0ZSh7J3RvcCc6IC1oZWFkZXJIZWlnaHR9LCBcImZhc3RcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRoZWFkZXIuY3NzKHsndG9wJzogMH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5jc3MoeydwYWRkaW5nLXRvcCc6IDB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdoZWFkZXJfZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciAkaGVhZGVyID0gJCgnaGVhZGVyJyk7XHJcbiAgICAgICAgdmFyIGhlYWRlckhlaWdodCA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICB2YXIgcSA9IDI7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IDA7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IGFwcENvbmZpZy5icmVha3BvaW50LmxnKSB7XHJcbiAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgcGluSGVhZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSBhcHBDb25maWcuYnJlYWtwb2ludC5sZykge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVySGVpZ2h0ID0gJGhlYWRlci5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBwaW5IZWFkZXIpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLW1lbnUnKS5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdl9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1tZW51LW92ZXJsYXknKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykub2ZmKCdzY3JvbGwnLCBwaW5IZWFkZXIpO1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdoZWFkZXJfZml4ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlckRhdGVwaWNrZXJDZWxsKGRhdGUsIGNlbGxUeXBlLCBkaXNhYmxlZERheXMpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGRpc2FibGVkRGF5cyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgZGlzYWJsZWREYXlzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjZWxsVHlwZSA9PSAnZGF5Jykge1xyXG4gICAgICAgICAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXkoKSxcclxuICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkID0gZGlzYWJsZWREYXlzLmluZGV4T2YoZGF5KSAhPSAtMTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogaXNEaXNhYmxlZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXREYXRlcGlja2VyKCkge1xyXG4gICAgICAgIHZhciBkaXNhYmxlZERheXMgPSBbMCwgMSwgMiwgMywgNCwgNV07XHJcbiAgICAgICAgJCgnLmpzLWRhdGVwaWNrZXInKS5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgbWluRGF0ZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAgICAgICAgIG11bHRpcGxlRGF0ZXNTZXBhcmF0b3I6ICcgLSAnLFxyXG4gICAgICAgICAgICBvblJlbmRlckNlbGw6IGZ1bmN0aW9uIChkYXRlLCBjZWxsVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlckRhdGVwaWNrZXJDZWxsKGRhdGUsIGNlbGxUeXBlLCBkaXNhYmxlZERheXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLWRhdGVwaWNrZXJfcmFuZ2UnKS5wYXJlbnRzKCdmb3JtJykuZmluZCgnLmpzLWRhdGVwaWNrZXJfX3JhbmdlLXRvZ2dsZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZXBpY2tlciA9ICQodGhpcykucGFyZW50cygnZm9ybScpLmZpbmQoJy5qcy1kYXRlcGlja2VyX3JhbmdlJylbMF07XHJcbiAgICAgICAgICAgIHZhciBkYXRlcGlja2VyRGF0YSA9ICQoZGF0ZXBpY2tlcikuZGF0YSgnZGF0ZXBpY2tlcicpO1xyXG4gICAgICAgICAgICBkYXRlcGlja2VyRGF0YS5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnZGFpbHknKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlcGlja2VyRGF0YS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uUmVuZGVyQ2VsbDogZnVuY3Rpb24gKGRhdGUsIGNlbGxUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZW5kZXJEYXRlcGlja2VyQ2VsbChkYXRlLCBjZWxsVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGVwaWNrZXJEYXRhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25SZW5kZXJDZWxsOiBmdW5jdGlvbiAoZGF0ZSwgY2VsbFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlckRhdGVwaWNrZXJDZWxsKGRhdGUsIGNlbGxUeXBlLCBkaXNhYmxlZERheXMpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0TGlzdCgpIHtcclxuICAgICAgICAkKCcuanMtaW5saW5lLWxpc3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RFbGVtZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnbGknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2xhc3QnKTtcclxuICAgICAgICAgICAgICAgIGlmIChsYXN0RWxlbWVudCAmJiBsYXN0RWxlbWVudC5vZmZzZXQoKS50b3AgIT0gJCh0aGlzKS5vZmZzZXQoKS50b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0RWxlbWVudC5hZGRDbGFzcygnbGFzdCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFzdEVsZW1lbnQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICQod2luZG93KS5vbignbG9hZCByZXNpemUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGluaXRMaXN0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0VGFicygpIHtcclxuICAgICAgICAkKCcuanMtdGFicycpXHJcbiAgICAgICAgICAgICAgICAuZWFzeXRhYnMoKVxyXG4gICAgICAgICAgICAgICAgLmJpbmQoJ2Vhc3l0YWJzOm1pZFRyYW5zaXRpb24nLCBmdW5jdGlvbiAoZXZlbnQsICRjbGlja2VkLCAkdGFyZ2V0UGFuZWwsIHNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IGFjdGl2ZSBmb3Igb3RoZXIgdGFicyB1bFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWIgPSAkY2xpY2tlZC5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCc+IHVsID4gbGkgYVtocmVmPVwiJyArIHRhYiArICdcIl0nKS5wYXJlbnQoJ2xpJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgc2xpZGVyXHJcbi8vICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkY2xpY2tlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlID0gJGNsaWNrZWQuZGF0YSgnc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5qcy1zbGlkZXJfZ2FsbGVyeScpLnNsaWNrKCdzbGlja0dvVG8nLCBzbGlkZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1zbGlkZXJfZ2FsbGVyeScpLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uIChzbGljaywgY3VycmVudFNsaWRlKSB7XHJcbiAgICAgICAgICAgIHZhciB0YWIgPSBjdXJyZW50U2xpZGUuJHNsaWRlc1tjdXJyZW50U2xpZGUuY3VycmVudFNsaWRlXS5kYXRhc2V0LnRhYjtcclxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcuanMtdGFicycpLmVhc3l0YWJzKCdzZWxlY3QnLCB0YWIpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gbmF2IHRhYnMgYnkgYnV0dG9uc1xyXG4gICAgICAgICQoJy5qcy10YWJzLWJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcuanMtdGFicycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVhc3l0YWJzKCdzZWxlY3QnLCAkKHRoaXMpLmRhdGEoJ3RhYicpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5iaW5kKCdlYXN5dGFiczphZnRlcicsIGZ1bmN0aW9uIChldmVudCwgJGNsaWNrZWQsICR0YXJnZXRQYW5lbCwgc2V0dGluZ3MpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gJHRhcmdldFBhbmVsLm9mZnNldCgpLnRvcCAtIHBhcnNlRmxvYXQoJCgnYm9keScpLmNzcygncGFkZGluZy10b3AnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLnRvcCAtIHBhcnNlRmxvYXQoJCgnYm9keScpLmNzcygncGFkZGluZy10b3AnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IG9mZnNldH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFJhZGlvU3dpdGNoKCkge1xyXG4gICAgICAgICQoJy5qcy1yYWRpby1zd2l0Y2ggaW5wdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5qcy1yYWRpby1zd2l0Y2hfX2l0ZW0nKTtcclxuICAgICAgICAgICAgaWYgKCRwYXJlbnQuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAkcGFyZW50LnNpYmxpbmdzKCcuanMtcmFkaW8tc3dpdGNoX19pdGVtJykuZmluZCgnaW5wdXQnKS5jbGljaygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcuanMtcmFkaW8tc3dpdGNoJykuZmluZCgnLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3VzdG9tIHNjcm9sbGJhclxyXG4gICAgZnVuY3Rpb24gaW5pdFNjcm9sbGJhcigpIHtcclxuICAgICAgICAkKCcuYXJ0aWNsZS1jb250ZW50IHRhYmxlJykud3JhcCgnPGRpdiBjbGFzcz1cImpzLXNjcm9sbGJhciBzY3JvbGxiYXItb3V0ZXJcIj48L2Rpdj4nKTtcclxuICAgICAgICAkKCcuanMtc2Nyb2xsYmFyJykuc2Nyb2xsYmFyKHtcclxuICAgICAgICAgICAgZGlzYWJsZUJvZHlTY3JvbGw6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0QW5jaG9yKCkge1xyXG4gICAgICAgIHZhciAkcm9vdCA9ICQoJ2h0bWwsIGJvZHknKSxcclxuICAgICAgICAgICAgICAgICRib2R5ID0gJCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgJGhlYWRlciA9ICQoJ2hlYWRlcicpO1xyXG4gICAgICAgIHZhciBzY3JvbGxUbyA9IGZ1bmN0aW9uIChocmVmKSB7XHJcbiAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJChocmVmKTtcclxuICAgICAgICAgICAgaWYgKCR0YXJnZXQubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICR0YXJnZXQgPSAkKCdhW25hbWU9JyArIGhyZWYuc3Vic3RyKDEpICsgJ10nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJHRhcmdldC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gJHRhcmdldC5vZmZzZXQoKS50b3AgLSBwYXJzZUZsb2F0KCRib2R5LmNzcygncGFkZGluZy10b3AnKSk7XHJcbiAgICAgICAgICAgICRyb290LmFuaW1hdGUoe3Njcm9sbFRvcDogb2Zmc2V0fSwgNTAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGhlYWRlci5oYXNDbGFzcygnaGVhZGVyX2ZpeGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAkdGFyZ2V0Lm9mZnNldCgpLnRvcCAtICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdC5hbmltYXRlKHtzY3JvbGxUb3A6IG9mZnNldH0sIDIwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaHJlZjtcclxuLy8gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHtqc0FuY2hvcjogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgaHJlZn0sICcnLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyAnIzEyMycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnLmpzLWFuY2hvcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgc2Nyb2xsVG8oJCh0aGlzKS5hdHRyKCdocmVmJykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG8od2luZG93LmxvY2F0aW9uLmhhc2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaW5pdE90aGVyKCkge1xyXG4gICAgICAgICQoJy5tYXJpbmEtaXRlbV9faW1nLXdyYXBwZXInKS5ob3ZlcihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5tYXJpbmEtaXRlbScpLmZpbmQoJy5tYXJpbmEtaXRlbV9faGVhZGVyJykuYWRkQ2xhc3MoJ2hvdmVyZWQnKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcubWFyaW5hLWl0ZW0nKS5maW5kKCcubWFyaW5hLWl0ZW1fX2hlYWRlcicpLnJlbW92ZUNsYXNzKCdob3ZlcmVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBwbGF5IHZpZGVvIGluIGJsb2cgbGlzdGluZ1xyXG4gICAgICAgICQoJy5qcy12aWRlby1ob3ZlcicpLmhvdmVyKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLmpzLXZpZGVvLWhvdmVyX19wb3N0ZXInKS5hZGRDbGFzcygndmlkZW8tcG9zdGVyX2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgndmlkZW8uanMtdmlkZW8taG92ZXJfX3ZpZGVvJylbMF0ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5qcy12aWRlby1ob3Zlcl9fcG9zdGVyJykucmVtb3ZlQ2xhc3MoJ3ZpZGVvLXBvc3Rlcl9oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdiA9ICQodGhpcykuZmluZCgndmlkZW8uanMtdmlkZW8taG92ZXJfX3ZpZGVvJylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdi5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHYuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIGF1dG9wbGF5IGJhY2tncm91bmQgdmlkZW9cclxuICAgICAgICAkKCcuanMtdmlkZW8tYXV0b3BsYXknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY2xpY2sgb24gaWZyYW1lIG1hcFxyXG4gICAgICAgICQoJy5hcnRpY2xlcy1tYXBfX3dyYXBwZXInKVxyXG4gICAgICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdjbGlja2VkJyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm1vdXNlbGVhdmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2NsaWNrZWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGxpbmsgaW5zaWRlIGxpbmtcclxuICAgICAgICAkKCcuanMtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGhyZWYgPSAkKHRoaXMpLmRhdGEoJ2xpbmsnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gaHJlZjtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBhbnRpc3BhbVxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwiZW1haWwzXCJdLGlucHV0W25hbWU9XCJpbmZvXCJdLGlucHV0W25hbWU9XCJ0ZXh0XCJdJykuYXR0cigndmFsdWUnLCAnJykudmFsKCcnKTtcclxuICAgICAgICB9LCA1MDAwKTtcclxuICAgICAgICAvLyBmb290ZXIgZnUkJVxyXG4gICAgICAgICQod2luZG93KS5vbignbG9hZCByZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5mb290ZXItcHJvdGVjdGlvbl9faW1nJykud2lkdGgoJCgnLmZvb3Rlci1wcm90ZWN0aW9uX19pbWcgaW1nJykud2lkdGgoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59KTsiXSwiZmlsZSI6ImNvbW1vbi5qcyJ9
