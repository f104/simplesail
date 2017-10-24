jQuery(function () {
    "use strict";

    $(document).ready(function () {
        initSly();
        initLink();
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

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0U2x5KCk7XHJcbiAgICAgICAgaW5pdExpbmsoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTbHkoKSB7XHJcbiAgICAgICAgJCgnLmpzLXNseS13cmFwcGVyJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkd3JhcHBlciA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBtaW4gPSAkd3JhcHBlci5kYXRhKCdzbHktbWluJykgfHwgMDtcclxuICAgICAgICAgICAgdmFyIG1heCA9ICR3cmFwcGVyLmRhdGEoJ3NseS1tYXgnKSB8fCAwO1xyXG4gICAgICAgICAgICB2YXIgdmlld3BvcnQgPSAkKHdpbmRvdykub3V0ZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICBpZiAobWluIDw9IHZpZXdwb3J0ICYmIG1heCA+PSB2aWV3cG9ydCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRmcmFtZSA9ICR3cmFwcGVyLmZpbmQoJy5qcy1zbHktZnJhbWUnKTtcclxuICAgICAgICAgICAgICAgIHZhciAkc2Nyb2xsYmFyID0gJHdyYXBwZXIuZmluZCgnLmpzLXNseS1zY3JvbGxiYXInKTtcclxuICAgICAgICAgICAgICAgICRmcmFtZS5zbHkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbU5hdjogJ2Jhc2ljJyxcclxuICAgICAgICAgICAgICAgICAgICBzbWFydDogMSxcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZURyYWdnaW5nOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRHJhZ2dpbmc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVsZWFzZVN3aW5nOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJhcjogJHNjcm9sbGJhcixcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCeTogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsYXN0aWNCb3VuZHM6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ0hhbmRsZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBkeW5hbWljSGFuZGxlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrQmFyOiAxXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkZnJhbWUuc2x5KCdyZWxvYWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdExpbmsoKSB7XHJcbiAgICAgICAgJCgnLmpzLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBocmVmID0gJCh0aGlzKS5kYXRhKCdsaW5rJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGhyZWY7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59KTsiXSwiZmlsZSI6ImNvbW1vbi5qcyJ9
