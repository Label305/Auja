import matchers from '../matchers';

import Store from '../../../src/Stores/panel';

describe('Panel store', function () {

    beforeEach(function () {
        this.addMatchers(matchers);
    });

    it('should have an array of panels in its state', function () {
        var store = new Store();

        expect(store.getState().panels).toBeAnObject();
        expect(store.getState().height).toBeAnInteger();

    });

    it('should be able to add panels', function () {
        var store = new Store();

        expect(store.getState().panels.length).toBe(0);

        store.addPanel({
            type: 'menu',
            menu: []
        });

        expect(store.getState().panels.length).toBe(1);

    });

    it('should add _index after adding', function () {
        var store = new Store();

        expect(store.getState().panels.length).toBe(0);

        var panel = {
            type: 'menu',
            menu: []
        };

        store.addPanel(panel);

        expect(store.getState().panels[0]._index).toBe(0);

    });

    it('should be able to update a panel', function () {
        //TODO implement updating
    });

});

