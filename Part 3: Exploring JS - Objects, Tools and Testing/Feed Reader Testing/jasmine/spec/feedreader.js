/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    "use strict";

    //RSS feed variable test suites
    describe('RSS Feeds', function() {
        
        //Check allFeeds variable is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //1~~Check feed's url is defined and not empty
         it('url defined', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined;
                expect(feed.url.length).not.toBe(0);
            }
         });


        //2~~Check feed's name is defined and not empty
         it('name defined', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined;
                expect(feed.name.length).not.toBe(0);
            }
            
         });
    });


    //Menu functionality test suites
    describe('The Menu',function() {

        //1~~ Check that default state of menu is hidden on page load
         it('is hidden', function() {
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });

         //2~~Check the menu toggle on or off
          it('toggle on and off', function() {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });


    //Initial Entries feed test suite
    describe('Initial Entries', function() {
        
        //Complete work and load feed
         beforeEach(function(done) {
            loadFeed(0, done); //loadFeed() is asynchronous
         });

        //Completed work checking
        it('complete works', function () {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

        

    //New Feed Selection test suite
    describe('New Feed Selection', function() {
        
        // Two feeds are loaded and comaparing both contents
        let preUrl;
        let newUrl;
        beforeEach(function(done) {

            // 1st feed load
            loadFeed(0,function() {
                preUrl = $('.feed').html();
            
                // 2nd feed load
                loadFeed(1, function() {
                    newUrl = $('.feed').html();
                    done();
                });
            });
        });
        
        // Comparing both the feeds by their contents.
        it('content changes when it load', function(done) {
            expect(newUrl).not.toBe(preUrl);
            done();
        });
    });

}());
