(function () {
	var app = angular.module('work', []);
	
	
	app.controller('PicController', function () {
		this.pics = pictureInfo;
	});
	
	
	app.controller('BlogController', ['$http', function ($http) {
		var post = this;
		
		post.blogs = [];
		
		post.current = 0;
		post.setCurrent = function (newBlog) {
			post.current = newBlog || 0;
		};
		
		$http.get('/blog/J2nmnk209olq1RWfiq').success(function (data) {
			post.blogs = data;
		});
		
	}]);
	
	app.controller('CreateBlog',['$http', function ($http) {
		// TODO: Make an http post of the blog Content
		
	}]);
	
	
	var pictureInfo = [
		
		{
			name:        'Life In A Pixel',
			description: 'www.oususvchi.com',
			image:       '/images/oususvchi.jpg',
			url:         'http://www.oususvchi.com'
		}, {
			name:        'Hour Of Code 2015',
			description: 'Some Description',
			image:       '/images/hourOFCode15.jpg',
			url:         '#'
		}, {
			name:        'Kodeforidua',
			description: 'Some Description',
			image:       '/images/karate-pose.jpg',
			url:         '#'
		}
	];
	/*
	 var socialLinks = [
	 {
	 
	 }
	 ];*/
	
})();
