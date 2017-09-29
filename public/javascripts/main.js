$(function () {
    $("#owl-demo").owlCarousel({
        slideSpeed: 2000,
        paginationSpeed: 2000,
        singleItem: true,
        autoplay: 3000,
        loop: true,
        nav: true,
        items: 1,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        dots: false
    });
    $('#404Page').height($(window).height());
    $('#contactlink').click(function () {
        $('#contact').toggleClass("ran raner");
    });

    $("#newCat").click(function () {
        $("#catZone").append("<div class='input-group'  style=\"margin: 25px\">" +
            "<input class='form-control' name='categories' placeholder='New Category'>" +
            "<span class='input-group-btn' id='trash_it' style='padding: 0;'>" +
            "<button class='btn btn-danger btn-sm' type='button' onclick='$(this).parents()[1].remove()' style='height: auto; padding: 4px 8px; position: absolute; bottom: 0;border-radius: 5px'>" +
            "<i class='fa fa-trash-o'></i>" +
            "</button>" +
            "</span>" +
            "</div>");
    });
});
/*
var appCache = window.applicationCache;
appCache.update();
window.addEventListener('load', function(e) {
    window.applicationCache.addEventListener('updateready', function(e) {
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
	        if (confirm('A new version of this site is available. Load it?')) {
		        window.location.reload();
	        }
        } else {
            // Manifest didn't changed. Nothing new to server.
        }
    }, false);

}, false);

function handleCacheEvent(e) {
    //...
}

function handleCacheError(e) {
    alert('Error: Cache failed to update!');
}

// Fired after the first cache of the manifest.
appCache.addEventListener('cached', handleCacheEvent, false);

// Checking for an update. Always the first event fired in the sequence.
appCache.addEventListener('checking', handleCacheEvent, false);

// An update was found. The browser is fetching resources.
appCache.addEventListener('downloading', handleCacheEvent, false);

// The manifest returns 404 or 410, the download failed,
// or the manifest changed while the download was in progress.
appCache.addEventListener('error', handleCacheError, false);

// Fired after the first download of the manifest.
appCache.addEventListener('noupdate', handleCacheEvent, false);

// Fired if the manifest file returns a 404 or 410.
// This results in the application cache being deleted.
appCache.addEventListener('obsolete', handleCacheEvent, false);

// Fired for each resource listed in the manifest as it is being fetched.
appCache.addEventListener('progress', handleCacheEvent, false);

// Fired when the manifest resources have been newly redownloaded.
appCache.addEventListener('updateready', handleCacheEvent, false);
*/
