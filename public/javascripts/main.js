$(document).ready(function () {
    $('#statusMessage').hide();
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
    function ness() {
        var tt = $('#messCon').text().toString();

        if (tt == "Message Sent") {
            $('#statusMessage').show(400, 'linear').delay(5000).removeClass('alert-danger').addClass('alert-success').hide('slow', 'linear');
        } else /*if(tt == 'Message Not Sent')*/{
            $('#statusMessage').show(400, 'linear').delay(5000).removeClass('alert-success').addClass('alert-danger').hide('slow', 'linear');
        }
        // $('#some').text($('#statusMessage').text());
    }

    ness();

});