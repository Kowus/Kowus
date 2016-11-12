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
        }, {
            name: 'WOEP',
            description: 'Some Description',
            image: '/images/work.jpg',
            url: 'http://www.oususvchi.com'
        }, {
            name: 'Calabule',
            description: 'Some Calabule',
            image: '/images/work.jpg',
            url: 'http://www.oususvchi.com'
        },
        {
            name: 'Poker',
            description: 'Hello World!',
            image: '/images/about.jpg',
            url: 'Kowus.xyz'
        }

    ];
    /*
    var socialLinks = [
        {

        }
    ];*/

})();
