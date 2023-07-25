(function ($) {

    $('.carousel').append('<div class="carousel__dots-navigation"></div>');

    const $carousel = $('.carousel');
    const $container = $('.carousel__container');
    const $items = $('.carousel__item');
    const $dotsNavigation = $carousel.find('.carousel__dots-navigation');

    const containerWidth = $container.outerWidth();
    const itemWith = $items.first().outerWidth();
    const gap = parseInt($container.css('gap'), 10);

    const itemsPerPage = getComputedStyle(document.documentElement, null).getPropertyValue('--carousel-items-per-page');
    const pages = Math.ceil($items.length / itemsPerPage);


    let dotsFragment = $(document.createDocumentFragment());

    let scrollCoordinate;

    for (let i = 0; i < pages; i++) {
        dotsFragment.append('<button class="carousel__dot" type="button">' + i + '</button>');
    }

    $dotsNavigation.append(dotsFragment);

    currentDot();

    $('.carousel__dot').on('click', function () {
        const $this = $(this);

        const pageIndex = $this.index();

        $container.animate({
            scrollLeft: containerWidth * pageIndex + gap * pageIndex
        }, 500, currentDot);

        currentDot();

    });

    function currentDot() {
        const estimatedPage = Math.round($container.scrollLeft() / (containerWidth + gap))
        const normalizedPage = Math.min(Math.max(estimatedPage, 0), pages);
        const $targetDot = $dotsNavigation.find('.carousel__dot:nth-child(' + (normalizedPage + 1) + ')');
        if( !$targetDot.hasClass('carousel__dot--current') ) {
            $('.carousel__dot--current').removeClass('carousel__dot--current');
            $targetDot.addClass('carousel__dot--current');
        }
    }

    $container.on('scroll', currentDot);

})(jQuery);


