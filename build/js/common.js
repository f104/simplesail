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
        // antispam
        setTimeout(function () {
            $('input[name="email3"],input[name="info"],input[name="text"]').attr('value', '').val('');
        }, 5000);
        // footer fu$%
        $(window).on('load resize', function(){
            $('.footer-protection__img').width($('.footer-protection__img img').width());            
        });
    }

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBhcHBDb25maWcgPSB7XHJcbiAgICAgICAgYnJlYWtwb2ludDoge1xyXG4gICAgICAgICAgICBtZDogNzY4LFxyXG4gICAgICAgICAgICBsZzogMTAyNFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGVyU3BlZWVkOiAzMDAwXHJcbiAgICB9O1xyXG5cclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0U2x5KCk7XHJcbiAgICAgICAgaW5pdFNsaWRlcigpO1xyXG4gICAgICAgIGluaXRTZWxlY3QoKTtcclxuICAgICAgICBpbml0TWVudSgpO1xyXG4gICAgICAgIGluaXREYXRlcGlja2VyKCk7XHJcbiAgICAgICAgaW5pdFRhYnMoKTtcclxuICAgICAgICBpbml0UmFkaW9Td2l0Y2goKTtcclxuICAgICAgICBpbml0U2Nyb2xsYmFyKCk7XHJcbiAgICAgICAgaW5pdE90aGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0U2x5KCkge1xyXG4gICAgICAgICQoJy5qcy1zbHktd3JhcHBlcicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJHdyYXBwZXIgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgbWluID0gJHdyYXBwZXIuZGF0YSgnc2x5LW1pbicpIHx8IDA7XHJcbiAgICAgICAgICAgIHZhciBtYXggPSAkd3JhcHBlci5kYXRhKCdzbHktbWF4JykgfHwgMDtcclxuICAgICAgICAgICAgdmFyIHZpZXdwb3J0ID0gJCh3aW5kb3cpLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgaWYgKG1pbiA8PSB2aWV3cG9ydCAmJiBtYXggPj0gdmlld3BvcnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkZnJhbWUgPSAkd3JhcHBlci5maW5kKCcuanMtc2x5LWZyYW1lJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHNjcm9sbGJhciA9ICR3cmFwcGVyLmZpbmQoJy5qcy1zbHktc2Nyb2xsYmFyJyk7XHJcbiAgICAgICAgICAgICAgICAkZnJhbWUuc2x5KHtcclxuICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1OYXY6ICdiYXNpYycsXHJcbiAgICAgICAgICAgICAgICAgICAgc21hcnQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VEcmFnZ2luZzogMSxcclxuICAgICAgICAgICAgICAgICAgICB0b3VjaERyYWdnaW5nOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbGVhc2VTd2luZzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCYXI6ICRzY3JvbGxiYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQnk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBlbGFzdGljQm91bmRzOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdIYW5kbGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZHluYW1pY0hhbmRsZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjbGlja0JhcjogMVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGZyYW1lLnNseSgncmVsb2FkJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTbGlkZXIoKSB7XHJcbiAgICAgICAgJCgnLmpzLXNsaWRlcl9pbmRleCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVzOiBhcHBDb25maWcuc2xpZGVyU3BlZWVkLFxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogYXBwQ29uZmlnLmJyZWFrcG9pbnQubWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1zbGlkZXJfYm9hdCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiBhcHBDb25maWcuYnJlYWtwb2ludC5tZCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLXNsaWRlcl9nYWxsZXJ5Jykuc2xpY2soe1xyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcxMHZ3JyxcclxuICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGFwcENvbmZpZy5icmVha3BvaW50LmxnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICc3MHB4J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogYXBwQ29uZmlnLmJyZWFrcG9pbnQubWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzUwcHgnLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuc2xpY2stZG90cycpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdsaScpLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTZWxlY3QoKSB7XHJcbiAgICAgICAgJCgnc2VsZWN0Jykuc3R5bGVyKHtcclxuICAgICAgICAgICAgc2VsZWN0U21hcnRQb3NpdGlvbmluZzogdHJ1ZSxcclxuLy8gICAgICAgICAgICBvblNlbGVjdE9wZW5lZDogZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdzZWxlY3QnKS5oYXNDbGFzcygndG9wJykpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RUb3AgPSAkKHRoaXMpLmZpbmQoJy5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duJykuaGVpZ2h0KCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duJykuY3NzKCd0b3AnLCAtc2VsZWN0VG9wICsgJ3B4Jyk7XHJcbi8vICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRNZW51KCkge1xyXG4gICAgICAgICQoJy5qcy1tZW51LXRvZ2dsZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnbWFpbi1uYXZfX2ljb24tbWVudV9fbGlua19hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUnKS50b2dnbGVDbGFzcygnbW9iaWxlLW5hdl9hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtbG9nbycpLnRvZ2dsZUNsYXNzKCdtYWluLW5hdl9fbG9nby1saW5rX2Nyb3AnKTtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtaWNvbicpLnRvZ2dsZUNsYXNzKCdtYWluLW5hdl9faGlkZGVuLW1kJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1tZW51LW92ZXJsYXknKS50b2dnbGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtbWVudS1vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgJCgnLmpzLW1lbnUtdG9nZ2xlcicpLmNsaWNrKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINCw0L3QuNC80LDRhtC40Y8g0LrQvtC90YLQsNC60YLQvtCyINCyINGI0LDQv9C60LVcclxuICAgICAgICAkKCcubWFpbi1uYXZfX3RvcC1tZW51X19jb250YWN0cycpLm9uKCd0b3BNZW51QW5pbWF0ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgJHRoaXMud2lkdGgoJ2F1dG8nKTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gJHRoaXMub3V0ZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICB2YXIgbVdpZHRoID0gJHRoaXMuZmluZCgnLm1haW4tbmF2X190b3AtbWVudV9fY29udGFjdHNfX3NwYW4nKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSAwO1xyXG4gICAgICAgICAgICAkKHRoaXMpLndpZHRoKG1XaWR0aCk7XHJcbiAgICAgICAgICAgICQodGhpcykuaG92ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuYW5pbWF0ZSh7J3dpZHRoJzogd2lkdGh9LCAyMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24gPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmFuaW1hdGUoeyd3aWR0aCc6IG1XaWR0aH0sIDIwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5tYWluLW5hdl9fdG9wLW1lbnVfX2NvbnRhY3RzJykudHJpZ2dlcigndG9wTWVudUFuaW1hdGUnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLm1haW4tbmF2X190b3AtbWVudV9fY29udGFjdHMnKS50cmlnZ2VyKCd0b3BNZW51QW5pbWF0ZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgcGluSGVhZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IGhlYWRlckhlaWdodCAqIHEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgICAkaGVhZGVyLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5jc3MoeydwYWRkaW5nLXRvcCc6IGhlYWRlckhlaWdodH0pO1xyXG4gICAgICAgICAgICAgICAgJGhlYWRlci5jc3Moeyd0b3AnOiAtaGVhZGVySGVpZ2h0fSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdoZWFkZXJfZml4ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYW5pbWF0ZSh7J3RvcCc6IDB9LCA0MDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWN0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICRoZWFkZXIuYW5pbWF0ZSh7J3RvcCc6IC1oZWFkZXJIZWlnaHR9LCBcImZhc3RcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRoZWFkZXIuY3NzKHsndG9wJzogMH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5jc3MoeydwYWRkaW5nLXRvcCc6IDB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdoZWFkZXJfZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciAkaGVhZGVyID0gJCgnaGVhZGVyJyk7XHJcbiAgICAgICAgdmFyIGhlYWRlckhlaWdodCA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICB2YXIgcSA9IDI7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IDA7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IGFwcENvbmZpZy5icmVha3BvaW50LmxnKSB7XHJcbiAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgcGluSGVhZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSBhcHBDb25maWcuYnJlYWtwb2ludC5sZykge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVySGVpZ2h0ID0gJGhlYWRlci5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBwaW5IZWFkZXIpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLW1lbnUnKS5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdl9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1tZW51LW92ZXJsYXknKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykub2ZmKCdzY3JvbGwnLCBwaW5IZWFkZXIpO1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdoZWFkZXJfZml4ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlckRhdGVwaWNrZXJDZWxsKGRhdGUsIGNlbGxUeXBlLCBkaXNhYmxlZERheXMpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGRpc2FibGVkRGF5cyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgZGlzYWJsZWREYXlzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjZWxsVHlwZSA9PSAnZGF5Jykge1xyXG4gICAgICAgICAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXkoKSxcclxuICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkID0gZGlzYWJsZWREYXlzLmluZGV4T2YoZGF5KSAhPSAtMTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogaXNEaXNhYmxlZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXREYXRlcGlja2VyKCkge1xyXG4gICAgICAgIHZhciBkaXNhYmxlZERheXMgPSBbMCwgMSwgMiwgMywgNCwgNV07XHJcbiAgICAgICAgJCgnLmpzLWRhdGVwaWNrZXInKS5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgbWluRGF0ZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAgICAgICAgIG11bHRpcGxlRGF0ZXNTZXBhcmF0b3I6ICcgLSAnLFxyXG4gICAgICAgICAgICBvblJlbmRlckNlbGw6IGZ1bmN0aW9uIChkYXRlLCBjZWxsVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlckRhdGVwaWNrZXJDZWxsKGRhdGUsIGNlbGxUeXBlLCBkaXNhYmxlZERheXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLWRhdGVwaWNrZXJfcmFuZ2UnKS5wYXJlbnRzKCdmb3JtJykuZmluZCgnLmpzLWRhdGVwaWNrZXJfX3JhbmdlLXRvZ2dsZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZXBpY2tlciA9ICQodGhpcykucGFyZW50cygnZm9ybScpLmZpbmQoJy5qcy1kYXRlcGlja2VyX3JhbmdlJylbMF07XHJcbiAgICAgICAgICAgIHZhciBkYXRlcGlja2VyRGF0YSA9ICQoZGF0ZXBpY2tlcikuZGF0YSgnZGF0ZXBpY2tlcicpO1xyXG4gICAgICAgICAgICBkYXRlcGlja2VyRGF0YS5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnZGFpbHknKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlcGlja2VyRGF0YS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uUmVuZGVyQ2VsbDogZnVuY3Rpb24gKGRhdGUsIGNlbGxUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZW5kZXJEYXRlcGlja2VyQ2VsbChkYXRlLCBjZWxsVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGVwaWNrZXJEYXRhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25SZW5kZXJDZWxsOiBmdW5jdGlvbiAoZGF0ZSwgY2VsbFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlckRhdGVwaWNrZXJDZWxsKGRhdGUsIGNlbGxUeXBlLCBkaXNhYmxlZERheXMpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0TGlzdCgpIHtcclxuICAgICAgICAkKCcuanMtaW5saW5lLWxpc3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RFbGVtZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnbGknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2xhc3QnKTtcclxuICAgICAgICAgICAgICAgIGlmIChsYXN0RWxlbWVudCAmJiBsYXN0RWxlbWVudC5vZmZzZXQoKS50b3AgIT0gJCh0aGlzKS5vZmZzZXQoKS50b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0RWxlbWVudC5hZGRDbGFzcygnbGFzdCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFzdEVsZW1lbnQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICQod2luZG93KS5vbignbG9hZCByZXNpemUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGluaXRMaXN0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0VGFicygpIHtcclxuICAgICAgICAkKCcuanMtdGFicycpXHJcbiAgICAgICAgICAgICAgICAuZWFzeXRhYnMoKVxyXG4gICAgICAgICAgICAgICAgLmJpbmQoJ2Vhc3l0YWJzOm1pZFRyYW5zaXRpb24nLCBmdW5jdGlvbiAoZXZlbnQsICRjbGlja2VkLCAkdGFyZ2V0UGFuZWwsIHNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IGFjdGl2ZSBmb3Igb3RoZXIgdGFicyB1bFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWIgPSAkY2xpY2tlZC5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCc+IHVsID4gbGkgYVtocmVmPVwiJyArIHRhYiArICdcIl0nKS5wYXJlbnQoJ2xpJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgc2xpZGVyXHJcbi8vICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkY2xpY2tlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlID0gJGNsaWNrZWQuZGF0YSgnc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5qcy1zbGlkZXJfZ2FsbGVyeScpLnNsaWNrKCdzbGlja0dvVG8nLCBzbGlkZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1zbGlkZXJfZ2FsbGVyeScpLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uIChzbGljaywgY3VycmVudFNsaWRlKSB7XHJcbiAgICAgICAgICAgIHZhciB0YWIgPSBjdXJyZW50U2xpZGUuJHNsaWRlc1tjdXJyZW50U2xpZGUuY3VycmVudFNsaWRlXS5kYXRhc2V0LnRhYjtcclxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcuanMtdGFicycpLmVhc3l0YWJzKCdzZWxlY3QnLCB0YWIpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gbmF2IHRhYnMgYnkgYnV0dG9uc1xyXG4gICAgICAgICQoJy5qcy10YWJzLWJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcuanMtdGFicycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVhc3l0YWJzKCdzZWxlY3QnLCAkKHRoaXMpLmRhdGEoJ3RhYicpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5iaW5kKCdlYXN5dGFiczphZnRlcicsIGZ1bmN0aW9uIChldmVudCwgJGNsaWNrZWQsICR0YXJnZXRQYW5lbCwgc2V0dGluZ3MpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gJHRhcmdldFBhbmVsLm9mZnNldCgpLnRvcCAtIHBhcnNlRmxvYXQoJCgnYm9keScpLmNzcygncGFkZGluZy10b3AnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLnRvcCAtIHBhcnNlRmxvYXQoJCgnYm9keScpLmNzcygncGFkZGluZy10b3AnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IG9mZnNldH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFJhZGlvU3dpdGNoKCkge1xyXG4gICAgICAgICQoJy5qcy1yYWRpby1zd2l0Y2ggaW5wdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5qcy1yYWRpby1zd2l0Y2hfX2l0ZW0nKTtcclxuICAgICAgICAgICAgaWYgKCRwYXJlbnQuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAkcGFyZW50LnNpYmxpbmdzKCcuanMtcmFkaW8tc3dpdGNoX19pdGVtJykuZmluZCgnaW5wdXQnKS5jbGljaygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcuanMtcmFkaW8tc3dpdGNoJykuZmluZCgnLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3VzdG9tIHNjcm9sbGJhclxyXG4gICAgZnVuY3Rpb24gaW5pdFNjcm9sbGJhcigpIHtcclxuICAgICAgICAkKCcuYXJ0aWNsZS1jb250ZW50IHRhYmxlJykud3JhcCgnPGRpdiBjbGFzcz1cImpzLXNjcm9sbGJhciBzY3JvbGxiYXItb3V0ZXJcIj48L2Rpdj4nKTtcclxuICAgICAgICAkKCcuanMtc2Nyb2xsYmFyJykuc2Nyb2xsYmFyKHtcclxuICAgICAgICAgICAgZGlzYWJsZUJvZHlTY3JvbGw6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0T3RoZXIoKSB7XHJcbiAgICAgICAgJCgnLm1hcmluYS1pdGVtX19pbWctd3JhcHBlcicpLmhvdmVyKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLm1hcmluYS1pdGVtJykuZmluZCgnLm1hcmluYS1pdGVtX19oZWFkZXInKS5hZGRDbGFzcygnaG92ZXJlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5tYXJpbmEtaXRlbScpLmZpbmQoJy5tYXJpbmEtaXRlbV9faGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2hvdmVyZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIHBsYXkgdmlkZW8gaW4gYmxvZyBsaXN0aW5nXHJcbiAgICAgICAgJCgnLmpzLXZpZGVvLWhvdmVyJykuaG92ZXIoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuanMtdmlkZW8taG92ZXJfX3Bvc3RlcicpLmFkZENsYXNzKCd2aWRlby1wb3N0ZXJfaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCd2aWRlby5qcy12aWRlby1ob3Zlcl9fdmlkZW8nKVswXS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLmpzLXZpZGVvLWhvdmVyX19wb3N0ZXInKS5yZW1vdmVDbGFzcygndmlkZW8tcG9zdGVyX2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2ID0gJCh0aGlzKS5maW5kKCd2aWRlby5qcy12aWRlby1ob3Zlcl9fdmlkZW8nKVswXTtcclxuICAgICAgICAgICAgICAgICAgICB2LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdi5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gbGluayBpbnNpZGUgbGlua1xyXG4gICAgICAgICQoJy5qcy1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgaHJlZiA9ICQodGhpcykuZGF0YSgnbGluaycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHNjcm9sbCB0byBhbmNob3JcclxuICAgICAgICAkKCcuanMtYW5jaG9yJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkKHRhcmdldCkub2Zmc2V0KCkudG9wIC0gcGFyc2VGbG9hdCgkKCdib2R5JykuY3NzKCdwYWRkaW5nLXRvcCcpKTtcclxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogb2Zmc2V0fSwgNTAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnaGVhZGVyJykuaGFzQ2xhc3MoJ2hlYWRlcl9maXhlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gJCh0YXJnZXQpLm9mZnNldCgpLnRvcCAtIHBhcnNlRmxvYXQoJCgnYm9keScpLmNzcygncGFkZGluZy10b3AnKSkgKyAkKCdoZWFkZXInKS5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IG9mZnNldH0sIDIwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGFudGlzcGFtXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJlbWFpbDNcIl0saW5wdXRbbmFtZT1cImluZm9cIl0saW5wdXRbbmFtZT1cInRleHRcIl0nKS5hdHRyKCd2YWx1ZScsICcnKS52YWwoJycpO1xyXG4gICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgIC8vIGZvb3RlciBmdSQlXHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkIHJlc2l6ZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJy5mb290ZXItcHJvdGVjdGlvbl9faW1nJykud2lkdGgoJCgnLmZvb3Rlci1wcm90ZWN0aW9uX19pbWcgaW1nJykud2lkdGgoKSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59KTsiXSwiZmlsZSI6ImNvbW1vbi5qcyJ9
