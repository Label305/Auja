/**
 * Booting the app
 */
import React from 'react';
import flux from './Stores/flux';
import Scaffolding from './scaffolding.jsx'
function run() {
    React.render(<Scaffolding flux={flux}/>, document.body);
}
window.addEventListener('DOMContentLoaded', run);
    