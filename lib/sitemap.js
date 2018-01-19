/*
 * my-website ==> sitemap
 * Created By barnabasnomo on 1/19/18 at 12:12 AM
 * @soundtrack HUMBLE. - Kendrick Lamar
*/

/*
 * the-nomad.com ==> sitemap
 * Created By barnabasnomo on 12/27/17 at 9:09 PM
*/
const sm = require('sitemap'),
    Promise = require('bluebird'),
    Blog = require('../models/blog.model'),
    async = require('async'),
    fs = require('fs')
;

let sitemap = sm.createSitemap({
    hostname: 'https://barnabasnomo.com',
    cacheTime: 600000,
    urls: [
        {url: '/', changefreq: 'weekly', priority: 0.5},
        {url: '/about', changefreq: 'weekly', priority: 0.4},
        {url: '/activities', changefreq: 'weekly', priority: 0.4},
        {url: '/blog', changefreq: 'weekly', priority: 0.7},
    ]
});


let createSitemapXML = Promise.promisify(function (done) {
    async.parallel([
            /*
            Use another model like events shoudl the need arise
            function (callback) {
                Podcast.find({}, {permalink: 1,_id:0},function (err, podcasts) {
                    if(err) return callback(err);
                    addToSitemap(podcasts,'/podcasts/view');
                    callback();
                })
            },
            */
            function (callback) {
                Blog.find({publish:true}, {permalink: 1,_id:0},function (err, blogs) {
                    if(err) return callback(err);
                    addToSitemap(blogs,'/blog/');
                    callback();
                })
            }], (err, result) => {
            if (err) {
                console.error(err.message);
                return done(err);
            }
            sitemap.toXML(function (err, xml) {
                if (err) {
                    return done(err);
                }
                fs.writeFile('./public/sitemap.xml', xml, err => {
                    if (err) done(err);
                    return done(null, 'Successfully Generated XML File.');
                });
            });
        }
    )
});

function addToSitemap(object, route) {
    object.forEach(entry=>{
        sitemap.add({url: `${route}/${entry.permalink}`})
    });
}

module.exports = {
    createSitemapXML: createSitemapXML
};