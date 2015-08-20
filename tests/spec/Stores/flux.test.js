import matchers from '../matchers';

import Store from '../../../src/Stores/flux';

describe('Flux', function () {

    beforeEach(function () {
        this.addMatchers(matchers);
    });

    it('should have all actions', function () {
        expect(Store.actions).toHaveKeys([
            'initialize',
            'resize',
            'click',
            'submit',
            'handle',
            'onPanelScroll',
            'extendResource',
            'updateResource',
            'processFail'
        ]);
    });


});

