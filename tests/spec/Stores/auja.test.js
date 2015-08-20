import matchers from '../matchers';

import Store from '../../../src/Stores/auja';

describe('Auja store', function () {

    beforeEach(function () {
        this.addMatchers(matchers);
    });

    it('its state should have all keys', function () {
        var store = new Store();

        expect(store.getState()).toHaveKeys([
            'title',
            'authenticated',
            'debug',
            'colors',
            'user',
            'buttons',
            'menu',
            'routes',
            'authentication'
        ]);

    });

    it('its state should have all colors', function () {
        var store = new Store();

        expect(store.getState().colors).toHaveKeys([
            'main',
            'secondary',
            'alert'
        ]);

    });

    it('its state should have user', function () {
        var store = new Store();

        expect(store.getState().user).toHaveKeys([
            'name'
        ]);

    });

    it('to pass the authenticated parameter from a message to the auja state', function () {
        var store = new Store();

        expect(store.getState().authenticated).toEqual(false);

        store.message({
            authenticated: true
        });
        expect(store.getState().authenticated).toEqual(true);

    });
});

