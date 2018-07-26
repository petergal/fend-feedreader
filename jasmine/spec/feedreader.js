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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a valid URL defined in every entry', function() {
            allFeeds.forEach(item => {
                expect(item.url).toBeDefined();
                expect(item.url.trim()).not.toBe('');
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a valid name defined in every entry', function() {
            allFeeds.forEach(item => {
                expect(item.name).toBeDefined();
                expect(item.name.trim()).not.toBe('');
            });
        });
    });

    /* A test suite that tests the menu feature. */
    describe('The menu', function() {


        /* This test ensures that the menu element is hidden by default. */
        it('element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* This test ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('element changes visibility (display and hide) ' +
            'when the menu item is clicked (twice)',
            function() {
                let menuIcon = $('.menu-icon-link'),
                    body = $('body');
                menuIcon.click();
                expect(body.hasClass('menu-hidden')).toBeFalsy();
                menuIcon.click();
                expect(body.hasClass('menu-hidden')).toBeTruthy();
            });

    });

    /* A test suite that tests the initial Feed load. */
    describe('Initial Entries', function() {

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

        beforeEach(function(done) {
            setTimeout(function() {
                loadFeed(1, done);
            }, 3000);
        });

        // TODO delete testcode
        // console.log("calling loadFeed now..." + performance.now());
        // // call loadFeed with the first feed 0 or call init();
        // loadFeed(0, done);
        // console.log("after calling loadFeed..." + performance.now());

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('contain at least a single entry within the .feed-container',
            function(done) {
                expect($('.entry-link').length > 0).toBe(true);
                done();
            });
    });

    /* A test suite that tests the selection of a new feed in the menu. */
    describe('New Feed Selection', function() {

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 12000;

        let content_1, content_2;

        beforeEach(function(done) {
            setTimeout(function() {
                loadFeed(1);
            }, 3000);
            setTimeout(function() {
                content_1 = $('.entry-link')[0].innerText;
            }, 6000);
            setTimeout(function() {
                loadFeed(2);
            }, 7000);
            setTimeout(function() {
                content_2 = $('.entry-link')[0].innerText;
                done();
            }, 10000);
        });

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('contains changed content',
            function(done) {
                expect(content_1 !== content_2).toBe(true);
                // TODO delete testcode
                // console.log($('.entry-link')[0].innerText);
                done();
            });

    });

}());
