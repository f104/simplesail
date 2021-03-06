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
        initIndexMap();
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
                if (action == 2 || !$header.hasClass('header_fixed')) {
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

    function initIndexMap() {
        if (window.innerWidth >= appConfig.breakpoint.md) {
            var $toggler = $('.js-index-map-link');
            if ($toggler.length) {
                var src = $toggler.data('src');
                if (src) {
                    $toggler.addClass('marina-map__img-wrapper_link');
                    $toggler.on('click', function () {
                        $.fancybox.open({
                            src: src,
                            type: 'image'
                        });
                    });
                }
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
        $('.js-social').on('click', function () {
            var sizex = $(window).width();
            if (sizex >= 700)
                sizex = 700;
            window.open($(this).attr("href"), 'displayWindow', 'width=' + sizex + ',location=no,directories=no,status=no,toolbar=no,menubar=no');
            return false;
        });
        // index slider select
        $('.js-index-slider-btn').on('click', function () {
            window.location = $('select.js-index-slider-select').val();
        });
    }

});