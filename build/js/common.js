jQuery(function () {
    "use strict";

    $(document).ready(function () {
        initSly();
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
                $(window).resize(function(e) {
                    $frame.sly('reload');
                });
            }
        });
    }

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0U2x5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0U2x5KCkge1xyXG4gICAgICAgICQoJy5qcy1zbHktd3JhcHBlcicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJHdyYXBwZXIgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgbWluID0gJHdyYXBwZXIuZGF0YSgnc2x5LW1pbicpIHx8IDA7XHJcbiAgICAgICAgICAgIHZhciBtYXggPSAkd3JhcHBlci5kYXRhKCdzbHktbWF4JykgfHwgMDtcclxuICAgICAgICAgICAgdmFyIHZpZXdwb3J0ID0gJCh3aW5kb3cpLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgaWYgKG1pbiA8PSB2aWV3cG9ydCAmJiBtYXggPj0gdmlld3BvcnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkZnJhbWUgPSAkd3JhcHBlci5maW5kKCcuanMtc2x5LWZyYW1lJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHNjcm9sbGJhciA9ICR3cmFwcGVyLmZpbmQoJy5qcy1zbHktc2Nyb2xsYmFyJyk7XHJcbiAgICAgICAgICAgICAgICAkZnJhbWUuc2x5KHtcclxuICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1OYXY6ICdiYXNpYycsXHJcbiAgICAgICAgICAgICAgICAgICAgc21hcnQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VEcmFnZ2luZzogMSxcclxuICAgICAgICAgICAgICAgICAgICB0b3VjaERyYWdnaW5nOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbGVhc2VTd2luZzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCYXI6ICRzY3JvbGxiYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQnk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBlbGFzdGljQm91bmRzOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdIYW5kbGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZHluYW1pY0hhbmRsZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjbGlja0JhcjogMVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkZnJhbWUuc2x5KCdyZWxvYWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59KTsiXSwiZmlsZSI6ImNvbW1vbi5qcyJ9
