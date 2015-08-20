import matchers from '../matchers';

import Store from '../../../src/Stores/message';

describe('Message store', function () {

    beforeEach(function () {
        this.addMatchers(matchers);
    });

    it('should have a message object', function () {

        var store = new Store();

        expect(store.getMessage()).toBeAnObject();
    });

    it('should store a message object', function () {

        var store = new Store();

        store.dispatch({
            authenticated: true
        });

        expect(store.getMessage().authenticated).toBe(true);

    });

    it('should reset its state', function () {

        var store = new Store();

        store.dispatch({
            authenticated: true
        });

        expect(store.getMessage().authenticated).toBe(true);

        store.reset();

        expect(store.getMessage().authenticated).toBeUndefined();

    });

});

