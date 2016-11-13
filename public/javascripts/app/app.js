(function () {
    var app = angular.module('work', []);


    app.controller('PicController', function () {
        this.pics = pictureInfo;
    });
    /*
    app.controller('LinkController', function () {
        this.links = socialLinks;
    });*/


    var pictureInfo = [

        {
            name: 'Life In A Pixel',
            description: 'www.oususvchi.com',
            image: '/images/oususvchi.jpg',
            url: 'http://www.oususvchi.com'
        }, {
            name: 'Hour Of Code',
            description: 'Some Description',
            image: '/images/home.jpg',
            url: 'http://www.oususvchi.com'
        }
    ];
    /*
    var socialLinks = [
        {

        }
    ];*/

})();
