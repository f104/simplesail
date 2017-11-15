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
        $('.slick-dots').each(function(){
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
    }

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBhcHBDb25maWcgPSB7XHJcbiAgICAgICAgYnJlYWtwb2ludDoge1xyXG4gICAgICAgICAgICBtZDogNzY4LFxyXG4gICAgICAgICAgICBsZzogMTAyNFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGVyU3BlZWVkOiAzMDAwXHJcbiAgICB9O1xyXG5cclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0U2x5KCk7XHJcbiAgICAgICAgaW5pdFNsaWRlcigpO1xyXG4gICAgICAgIGluaXRTZWxlY3QoKTtcclxuICAgICAgICBpbml0TWVudSgpO1xyXG4gICAgICAgIGluaXREYXRlcGlja2VyKCk7XHJcbiAgICAgICAgaW5pdFRhYnMoKTtcclxuICAgICAgICBpbml0UmFkaW9Td2l0Y2goKTtcclxuICAgICAgICBpbml0U2Nyb2xsYmFyKCk7XHJcbiAgICAgICAgaW5pdE90aGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0U2x5KCkge1xyXG4gICAgICAgICQoJy5qcy1zbHktd3JhcHBlcicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJHdyYXBwZXIgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgbWluID0gJHdyYXBwZXIuZGF0YSgnc2x5LW1pbicpIHx8IDA7XHJcbiAgICAgICAgICAgIHZhciBtYXggPSAkd3JhcHBlci5kYXRhKCdzbHktbWF4JykgfHwgMDtcclxuICAgICAgICAgICAgdmFyIHZpZXdwb3J0ID0gJCh3aW5kb3cpLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgaWYgKG1pbiA8PSB2aWV3cG9ydCAmJiBtYXggPj0gdmlld3BvcnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkZnJhbWUgPSAkd3JhcHBlci5maW5kKCcuanMtc2x5LWZyYW1lJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHNjcm9sbGJhciA9ICR3cmFwcGVyLmZpbmQoJy5qcy1zbHktc2Nyb2xsYmFyJyk7XHJcbiAgICAgICAgICAgICAgICAkZnJhbWUuc2x5KHtcclxuICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1OYXY6ICdiYXNpYycsXHJcbiAgICAgICAgICAgICAgICAgICAgc21hcnQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VEcmFnZ2luZzogMSxcclxuICAgICAgICAgICAgICAgICAgICB0b3VjaERyYWdnaW5nOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbGVhc2VTd2luZzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCYXI6ICRzY3JvbGxiYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQnk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBlbGFzdGljQm91bmRzOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdIYW5kbGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZHluYW1pY0hhbmRsZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjbGlja0JhcjogMVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGZyYW1lLnNseSgncmVsb2FkJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTbGlkZXIoKSB7XHJcbiAgICAgICAgJCgnLmpzLXNsaWRlcl9pbmRleCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVzOiBhcHBDb25maWcuc2xpZGVyU3BlZWVkLFxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogYXBwQ29uZmlnLmJyZWFrcG9pbnQubWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1zbGlkZXJfYm9hdCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiBhcHBDb25maWcuYnJlYWtwb2ludC5tZCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLXNsaWRlcl9nYWxsZXJ5Jykuc2xpY2soe1xyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcxMHZ3JyxcclxuICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGFwcENvbmZpZy5icmVha3BvaW50LmxnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICc3MHB4J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogYXBwQ29uZmlnLmJyZWFrcG9pbnQubWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzUwcHgnLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuc2xpY2stZG90cycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnbGknKS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0U2VsZWN0KCkge1xyXG4gICAgICAgICQoJ3NlbGVjdCcpLnN0eWxlcih7XHJcbiAgICAgICAgICAgIHNlbGVjdFNtYXJ0UG9zaXRpb25pbmc6IHRydWUsXHJcbi8vICAgICAgICAgICAgb25TZWxlY3RPcGVuZWQ6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnc2VsZWN0JykuaGFzQ2xhc3MoJ3RvcCcpKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0VG9wID0gJCh0aGlzKS5maW5kKCcuanEtc2VsZWN0Ym94X19kcm9wZG93bicpLmhlaWdodCgpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuanEtc2VsZWN0Ym94X19kcm9wZG93bicpLmNzcygndG9wJywgLXNlbGVjdFRvcCArICdweCcpO1xyXG4vLyAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0TWVudSgpIHtcclxuICAgICAgICAkKCcuanMtbWVudS10b2dnbGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ21haW4tbmF2X19pY29uLW1lbnVfX2xpbmtfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1tZW51JykudG9nZ2xlQ2xhc3MoJ21vYmlsZS1uYXZfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1tZW51LWxvZ28nKS50b2dnbGVDbGFzcygnbWFpbi1uYXZfX2xvZ28tbGlua19jcm9wJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1tZW51LWljb24nKS50b2dnbGVDbGFzcygnbWFpbi1uYXZfX2hpZGRlbi1tZCcpO1xyXG4gICAgICAgICAgICAkKCcuanMtbWVudS1vdmVybGF5JykudG9nZ2xlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLW1lbnUtb3ZlcmxheScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1tZW51LXRvZ2dsZXInKS5jbGljaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBwaW5IZWFkZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gaGVhZGVySGVpZ2h0ICogcSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWN0aW9uID0gMTtcclxuICAgICAgICAgICAgICAgICRoZWFkZXIuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLmNzcyh7J3BhZGRpbmctdG9wJzogaGVhZGVySGVpZ2h0fSk7XHJcbiAgICAgICAgICAgICAgICAkaGVhZGVyLmNzcyh7J3RvcCc6IC1oZWFkZXJIZWlnaHR9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2hlYWRlcl9maXhlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbmltYXRlKHsndG9wJzogMH0sIDQwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSAyO1xyXG4gICAgICAgICAgICAgICAgJGhlYWRlci5hbmltYXRlKHsndG9wJzogLWhlYWRlckhlaWdodH0sIFwiZmFzdFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5jc3Moeyd0b3AnOiAwfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLmNzcyh7J3BhZGRpbmctdG9wJzogMH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyICRoZWFkZXIgPSAkKCdoZWFkZXInKTtcclxuICAgICAgICB2YXIgaGVhZGVySGVpZ2h0ID0gJGhlYWRlci5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgIHZhciBxID0gMjtcclxuICAgICAgICB2YXIgYWN0aW9uID0gMDtcclxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gYXBwQ29uZmlnLmJyZWFrcG9pbnQubGcpIHtcclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBwaW5IZWFkZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IGFwcENvbmZpZy5icmVha3BvaW50LmxnKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJIZWlnaHQgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIHBpbkhlYWRlcik7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtbWVudScpLnJlbW92ZUNsYXNzKCdtb2JpbGUtbmF2X2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLW1lbnUtb3ZlcmxheScpLmhpZGUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5vZmYoJ3Njcm9sbCcsIHBpbkhlYWRlcik7XHJcbiAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9maXhlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyRGF0ZXBpY2tlckNlbGwoZGF0ZSwgY2VsbFR5cGUsIGRpc2FibGVkRGF5cykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGlzYWJsZWREYXlzID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBkaXNhYmxlZERheXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNlbGxUeXBlID09ICdkYXknKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXkgPSBkYXRlLmdldERheSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQgPSBkaXNhYmxlZERheXMuaW5kZXhPZihkYXkpICE9IC0xO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0Rpc2FibGVkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdERhdGVwaWNrZXIoKSB7XHJcbiAgICAgICAgdmFyIGRpc2FibGVkRGF5cyA9IFswLCAxLCAyLCAzLCA0LCA1XTtcclxuICAgICAgICAkKCcuanMtZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICBtaW5EYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICByYW5nZTogdHJ1ZSxcclxuICAgICAgICAgICAgbXVsdGlwbGVEYXRlc1NlcGFyYXRvcjogJyAtICcsXHJcbiAgICAgICAgICAgIG9uUmVuZGVyQ2VsbDogZnVuY3Rpb24gKGRhdGUsIGNlbGxUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyRGF0ZXBpY2tlckNlbGwoZGF0ZSwgY2VsbFR5cGUsIGRpc2FibGVkRGF5cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtZGF0ZXBpY2tlcl9yYW5nZScpLnBhcmVudHMoJ2Zvcm0nKS5maW5kKCcuanMtZGF0ZXBpY2tlcl9fcmFuZ2UtdG9nZ2xlcicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRlcGlja2VyID0gJCh0aGlzKS5wYXJlbnRzKCdmb3JtJykuZmluZCgnLmpzLWRhdGVwaWNrZXJfcmFuZ2UnKVswXTtcclxuICAgICAgICAgICAgdmFyIGRhdGVwaWNrZXJEYXRhID0gJChkYXRlcGlja2VyKS5kYXRhKCdkYXRlcGlja2VyJyk7XHJcbiAgICAgICAgICAgIGRhdGVwaWNrZXJEYXRhLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICdkYWlseScpIHtcclxuICAgICAgICAgICAgICAgIGRhdGVwaWNrZXJEYXRhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25SZW5kZXJDZWxsOiBmdW5jdGlvbiAoZGF0ZSwgY2VsbFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlckRhdGVwaWNrZXJDZWxsKGRhdGUsIGNlbGxUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0ZXBpY2tlckRhdGEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBvblJlbmRlckNlbGw6IGZ1bmN0aW9uIChkYXRlLCBjZWxsVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyRGF0ZXBpY2tlckNlbGwoZGF0ZSwgY2VsbFR5cGUsIGRpc2FibGVkRGF5cylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRMaXN0KCkge1xyXG4gICAgICAgICQoJy5qcy1pbmxpbmUtbGlzdCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbGFzdEVsZW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdsaScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnbGFzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RFbGVtZW50ICYmIGxhc3RFbGVtZW50Lm9mZnNldCgpLnRvcCAhPSAkKHRoaXMpLm9mZnNldCgpLnRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RFbGVtZW50LmFkZENsYXNzKCdsYXN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYXN0RWxlbWVudCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkIHJlc2l6ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaW5pdExpc3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRUYWJzKCkge1xyXG4gICAgICAgICQoJy5qcy10YWJzJylcclxuICAgICAgICAgICAgICAgIC5lYXN5dGFicygpXHJcbiAgICAgICAgICAgICAgICAuYmluZCgnZWFzeXRhYnM6bWlkVHJhbnNpdGlvbicsIGZ1bmN0aW9uIChldmVudCwgJGNsaWNrZWQsICR0YXJnZXRQYW5lbCwgc2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgYWN0aXZlIGZvciBvdGhlciB0YWJzIHVsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYiA9ICRjbGlja2VkLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJz4gdWwgPiBsaSBhW2hyZWY9XCInICsgdGFiICsgJ1wiXScpLnBhcmVudCgnbGknKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSBzbGlkZXJcclxuLy8gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRjbGlja2VkKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSAkY2xpY2tlZC5kYXRhKCdzbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLmpzLXNsaWRlcl9nYWxsZXJ5Jykuc2xpY2soJ3NsaWNrR29UbycsIHNsaWRlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLXNsaWRlcl9nYWxsZXJ5Jykub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24gKHNsaWNrLCBjdXJyZW50U2xpZGUpIHtcclxuICAgICAgICAgICAgdmFyIHRhYiA9IGN1cnJlbnRTbGlkZS4kc2xpZGVzW2N1cnJlbnRTbGlkZS5jdXJyZW50U2xpZGVdLmRhdGFzZXQudGFiO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5qcy10YWJzJykuZWFzeXRhYnMoJ3NlbGVjdCcsIHRhYilcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBuYXYgdGFicyBieSBidXR0b25zXHJcbiAgICAgICAgJCgnLmpzLXRhYnMtYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5qcy10YWJzJylcclxuICAgICAgICAgICAgICAgICAgICAuZWFzeXRhYnMoJ3NlbGVjdCcsICQodGhpcykuZGF0YSgndGFiJykpXHJcbiAgICAgICAgICAgICAgICAgICAgLmJpbmQoJ2Vhc3l0YWJzOmFmdGVyJywgZnVuY3Rpb24gKGV2ZW50LCAkY2xpY2tlZCwgJHRhcmdldFBhbmVsLCBzZXR0aW5ncykge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkdGFyZ2V0UGFuZWwub2Zmc2V0KCkudG9wIC0gcGFyc2VGbG9hdCgkKCdib2R5JykuY3NzKCdwYWRkaW5nLXRvcCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9ICQodGhpcykub2Zmc2V0KCkudG9wIC0gcGFyc2VGbG9hdCgkKCdib2R5JykuY3NzKCdwYWRkaW5nLXRvcCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogb2Zmc2V0fSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0UmFkaW9Td2l0Y2goKSB7XHJcbiAgICAgICAgJCgnLmpzLXJhZGlvLXN3aXRjaCBpbnB1dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmpzLXJhZGlvLXN3aXRjaF9faXRlbScpO1xyXG4gICAgICAgICAgICBpZiAoJHBhcmVudC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICRwYXJlbnQuc2libGluZ3MoJy5qcy1yYWRpby1zd2l0Y2hfX2l0ZW0nKS5maW5kKCdpbnB1dCcpLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5qcy1yYWRpby1zd2l0Y2gnKS5maW5kKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjdXN0b20gc2Nyb2xsYmFyXHJcbiAgICBmdW5jdGlvbiBpbml0U2Nyb2xsYmFyKCkge1xyXG4gICAgICAgICQoJy5hcnRpY2xlLWNvbnRlbnQgdGFibGUnKS53cmFwKCc8ZGl2IGNsYXNzPVwianMtc2Nyb2xsYmFyIHNjcm9sbGJhci1vdXRlclwiPjwvZGl2PicpO1xyXG4gICAgICAgICQoJy5qcy1zY3JvbGxiYXInKS5zY3JvbGxiYXIoe1xyXG4gICAgICAgICAgICBkaXNhYmxlQm9keVNjcm9sbDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRPdGhlcigpIHtcclxuICAgICAgICAkKCcubWFyaW5hLWl0ZW1fX2ltZy13cmFwcGVyJykuaG92ZXIoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcubWFyaW5hLWl0ZW0nKS5maW5kKCcubWFyaW5hLWl0ZW1fX2hlYWRlcicpLmFkZENsYXNzKCdob3ZlcmVkJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLm1hcmluYS1pdGVtJykuZmluZCgnLm1hcmluYS1pdGVtX19oZWFkZXInKS5yZW1vdmVDbGFzcygnaG92ZXJlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gcGxheSB2aWRlbyBpbiBibG9nIGxpc3RpbmdcclxuICAgICAgICAkKCcuanMtdmlkZW8taG92ZXInKS5ob3ZlcihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5qcy12aWRlby1ob3Zlcl9fcG9zdGVyJykuYWRkQ2xhc3MoJ3ZpZGVvLXBvc3Rlcl9oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ3ZpZGVvLmpzLXZpZGVvLWhvdmVyX192aWRlbycpWzBdLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuanMtdmlkZW8taG92ZXJfX3Bvc3RlcicpLnJlbW92ZUNsYXNzKCd2aWRlby1wb3N0ZXJfaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHYgPSAkKHRoaXMpLmZpbmQoJ3ZpZGVvLmpzLXZpZGVvLWhvdmVyX192aWRlbycpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHYucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB2LmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBsaW5rIGluc2lkZSBsaW5rXHJcbiAgICAgICAgJCgnLmpzLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBocmVmID0gJCh0aGlzKS5kYXRhKCdsaW5rJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGhyZWY7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gc2Nyb2xsIHRvIGFuY2hvclxyXG4gICAgICAgICQoJy5qcy1hbmNob3InKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9ICQodGFyZ2V0KS5vZmZzZXQoKS50b3AgLSBwYXJzZUZsb2F0KCQoJ2JvZHknKS5jc3MoJ3BhZGRpbmctdG9wJykpO1xyXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBvZmZzZXR9LCA1MDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKCdoZWFkZXInKS5oYXNDbGFzcygnaGVhZGVyX2ZpeGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAkKHRhcmdldCkub2Zmc2V0KCkudG9wIC0gcGFyc2VGbG9hdCgkKCdib2R5JykuY3NzKCdwYWRkaW5nLXRvcCcpKSArICQoJ2hlYWRlcicpLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogb2Zmc2V0fSwgMjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gYW50aXNwYW1cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cImVtYWlsM1wiXSxpbnB1dFtuYW1lPVwiaW5mb1wiXSxpbnB1dFtuYW1lPVwidGV4dFwiXScpLmF0dHIoJ3ZhbHVlJywgJycpLnZhbCgnJyk7XHJcbiAgICAgICAgfSwgNTAwMCk7XHJcbiAgICB9XHJcblxyXG59KTsiXSwiZmlsZSI6ImNvbW1vbi5qcyJ9
