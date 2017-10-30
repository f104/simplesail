jQuery(function () {
    "use strict";

    var appConfig = {
        breakpoint: {
            md: 768,
            lg: 1024
        }
    };

    $(document).ready(function () {
        initSly();
        initLink();
        initSlider();
        initSelect();
        initMenu();
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

    function initLink() {
        $('.js-link').on('click', function (e) {
            e.preventDefault();
            var href = $(this).data('link');
            window.location = href;
        });
    }

    function initSlider() {
        $('.index-slider .slider-wrapper').slick({
            dots: true,
            infinite: false,
            speed: 300,
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
            $('.js-menu').toggleClass('mobile-nav_active');
            $('.js-menu-logo').toggleClass('main-nav__logo-link_crop');
            $('.js-menu-icon').toggleClass('main-nav__hidden-md');
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
    }

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBhcHBDb25maWcgPSB7XHJcbiAgICAgICAgYnJlYWtwb2ludDoge1xyXG4gICAgICAgICAgICBtZDogNzY4LFxyXG4gICAgICAgICAgICBsZzogMTAyNFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGluaXRTbHkoKTtcclxuICAgICAgICBpbml0TGluaygpO1xyXG4gICAgICAgIGluaXRTbGlkZXIoKTtcclxuICAgICAgICBpbml0U2VsZWN0KCk7XHJcbiAgICAgICAgaW5pdE1lbnUoKTtcclxuICAgICAgICBpbml0T3RoZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTbHkoKSB7XHJcbiAgICAgICAgJCgnLmpzLXNseS13cmFwcGVyJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkd3JhcHBlciA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBtaW4gPSAkd3JhcHBlci5kYXRhKCdzbHktbWluJykgfHwgMDtcclxuICAgICAgICAgICAgdmFyIG1heCA9ICR3cmFwcGVyLmRhdGEoJ3NseS1tYXgnKSB8fCAwO1xyXG4gICAgICAgICAgICB2YXIgdmlld3BvcnQgPSAkKHdpbmRvdykub3V0ZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICBpZiAobWluIDw9IHZpZXdwb3J0ICYmIG1heCA+PSB2aWV3cG9ydCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRmcmFtZSA9ICR3cmFwcGVyLmZpbmQoJy5qcy1zbHktZnJhbWUnKTtcclxuICAgICAgICAgICAgICAgIHZhciAkc2Nyb2xsYmFyID0gJHdyYXBwZXIuZmluZCgnLmpzLXNseS1zY3JvbGxiYXInKTtcclxuICAgICAgICAgICAgICAgICRmcmFtZS5zbHkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbU5hdjogJ2Jhc2ljJyxcclxuICAgICAgICAgICAgICAgICAgICBzbWFydDogMSxcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZURyYWdnaW5nOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRHJhZ2dpbmc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVsZWFzZVN3aW5nOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJhcjogJHNjcm9sbGJhcixcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCeTogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsYXN0aWNCb3VuZHM6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ0hhbmRsZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBkeW5hbWljSGFuZGxlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrQmFyOiAxXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkZnJhbWUuc2x5KCdyZWxvYWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdExpbmsoKSB7XHJcbiAgICAgICAgJCgnLmpzLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBocmVmID0gJCh0aGlzKS5kYXRhKCdsaW5rJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGhyZWY7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFNsaWRlcigpIHtcclxuICAgICAgICAkKCcuaW5kZXgtc2xpZGVyIC5zbGlkZXItd3JhcHBlcicpLnNsaWNrKHtcclxuICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzcGVlZDogMzAwLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogYXBwQ29uZmlnLmJyZWFrcG9pbnQubWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTZWxlY3QoKSB7XHJcbiAgICAgICAgJCgnc2VsZWN0Jykuc3R5bGVyKHtcclxuICAgICAgICAgICAgc2VsZWN0U21hcnRQb3NpdGlvbmluZzogdHJ1ZSxcclxuLy8gICAgICAgICAgICBvblNlbGVjdE9wZW5lZDogZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdzZWxlY3QnKS5oYXNDbGFzcygndG9wJykpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RUb3AgPSAkKHRoaXMpLmZpbmQoJy5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duJykuaGVpZ2h0KCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duJykuY3NzKCd0b3AnLCAtc2VsZWN0VG9wICsgJ3B4Jyk7XHJcbi8vICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRNZW51KCkge1xyXG4gICAgICAgICQoJy5qcy1tZW51LXRvZ2dsZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICQoJy5qcy1tZW51JykudG9nZ2xlQ2xhc3MoJ21vYmlsZS1uYXZfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1tZW51LWxvZ28nKS50b2dnbGVDbGFzcygnbWFpbi1uYXZfX2xvZ28tbGlua19jcm9wJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1tZW51LWljb24nKS50b2dnbGVDbGFzcygnbWFpbi1uYXZfX2hpZGRlbi1tZCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSBhcHBDb25maWcuYnJlYWtwb2ludC5sZykge1xyXG4gICAgICAgICAgICB2YXIgJGhlYWRlciA9ICQoJ2hlYWRlcicpO1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVySGVpZ2h0ID0gJGhlYWRlci5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICB2YXIgcSA9IDI7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSAwO1xyXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gaGVhZGVySGVpZ2h0ICogcSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLmNzcyh7J3BhZGRpbmctdG9wJzogaGVhZGVySGVpZ2h0fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5jc3Moeyd0b3AnOiAtaGVhZGVySGVpZ2h0fSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaGVhZGVyX2ZpeGVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbmltYXRlKHsndG9wJzogMH0sIDQwMCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5hbmltYXRlKHsndG9wJzogLWhlYWRlckhlaWdodH0sIFwiZmFzdFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRoZWFkZXIuY3NzKHsndG9wJzogMH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykuY3NzKHsncGFkZGluZy10b3AnOiAwfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJIZWlnaHQgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0T3RoZXIoKSB7XHJcbiAgICAgICAgJCgnLm1hcmluYS1pdGVtX19pbWctd3JhcHBlcicpLmhvdmVyKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLm1hcmluYS1pdGVtJykuZmluZCgnLm1hcmluYS1pdGVtX19oZWFkZXInKS5hZGRDbGFzcygnaG92ZXJlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5tYXJpbmEtaXRlbScpLmZpbmQoJy5tYXJpbmEtaXRlbV9faGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2hvdmVyZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIHBsYXkgdmlkZW8gaW4gYmxvZyBsaXN0aW5nXHJcbiAgICAgICAgJCgnLmpzLXZpZGVvLWhvdmVyJykuaG92ZXIoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuanMtdmlkZW8taG92ZXJfX3Bvc3RlcicpLmFkZENsYXNzKCd2aWRlby1wb3N0ZXJfaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCd2aWRlby5qcy12aWRlby1ob3Zlcl9fdmlkZW8nKVswXS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLmpzLXZpZGVvLWhvdmVyX19wb3N0ZXInKS5yZW1vdmVDbGFzcygndmlkZW8tcG9zdGVyX2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2ID0gJCh0aGlzKS5maW5kKCd2aWRlby5qcy12aWRlby1ob3Zlcl9fdmlkZW8nKVswXTtcclxuICAgICAgICAgICAgICAgICAgICB2LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdi5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59KTsiXSwiZmlsZSI6ImNvbW1vbi5qcyJ9
