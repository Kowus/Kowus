(function () {
	var app = angular.module('work', ['ngSanitize']);
	
	
	app.controller('PicController', function () {
		this.pics = pictureInfo;
	});
	
	
	app.controller('BlogController', ['$http', function ($http) {
		var post = this;
		
		post.blogs = [];
		
		post.current = 0;
		post.setCurrent = function (nextBlog) {
			post.current = nextBlog || 0;
		};
		
		$http.get('/blog/J2nmnk209olq1RWfiq').success(function (data) {
			post.blogs = data;
		});
		
	}]);
	
	app.controller('CreateBlogController', ['$http', function ($http) {
		// TODO: Make an http post of the blog Content
		var posta = this;
		
		posta.bloga = {};
		posta.bloga2 = [];
		
		this.sendPosts = function () {
			/*
			$http({
				method:  'POST',
				url:     'http://localhost:3000/add/blog/Nlw19i39Iw2',
				data:    "help me',// Data should be JSON of key-value pairs
				headers: { 'Content-Type': 'application/x-www-form-url-encoded' }
			});
			*/
			$http.post('/add/blog/Nlw19i39Iw2', posta.bloga).success(function (response) {
				console.log(response);
			}).error(function (response) {
				console.log(response);
			});
			posta.bloga = {};
		};
		
		posta.vis = 0;
		posta.setVis = function (nextBlog) {
			posta.vis = nextBlog || 0;
		};
		
		posta.blogNum = 0;
		posta.setBlogNum = function (indexOfBlog) {
			posta.blogNum = indexOfBlog || 0;
		};
		
		$http.get('/blog/J2nmnk209olq1RWfiq').success(function (data) {
			posta.bloga2 = data;
			
		});
		
		
		this.updatePosts = function (indexOfBlog) {
			$http.post('Sjkqin28hn', posta.bloga2[indexOfBlog]).success(function (response) {
				console.log(response);
			}).error(function (response) {
				console.error(response);
			});

			
		};
		
	}]);
	
	
	var pictureInfo = [
		
		{
			name:        'Life In A Pixel',
			description: 'www.oususvchi.com',
			image:       '/images/oususvchi.jpg',
			url:         'http://www.oususvchi.com'
		}, {
			name:        'Hour Of Code 2015',
			description: 'Building Websites With Modern Frameworks',
			image:       '/images/hourOFCode15.jpg',
			url:         '#'
		}, {
			name:        'Kodeforidua',
			description: 'Mobile Computer Lab Sessions',
			image:       '/images/karate-pose.jpg',
			url:         '#'
		}
	];
	var blogG = [];
	
})();
