/**
 * Page factory will create page objects based on input
 */
define(['build/Objects/page'], function(Page) {

    return new function() {

        /**
         * Create the page
         */
        this.createPage = function(data) {
            var page = new Page();
            page.setContent(data.page);
            return page;
        }

    };

});