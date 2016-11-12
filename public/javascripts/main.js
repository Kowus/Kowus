$(document).ready(function () {

    $("#owl-demo").owlCarousel({

        // navigation : true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        autoplay: 3000,
        loop: true,
        nav: true,
        items: 1,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        dots: false

        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false

    });


    $('.main').height($(window).height());
    $('#404Page').height($(window).height());

    $('#contactlink').click(function () {
        $('#contact').toggleClass("ran raner");
    });
});