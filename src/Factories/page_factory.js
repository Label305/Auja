/**
 * Page factory will create page objects based on input
 */


import Page from '../Objects/page';

module.exports = new function () {

    /**
     * Create the page
     */
    this.createPage = function (data) {
        var page = new Page();
        page.setContent(data.page);
        return page;
    }

};

