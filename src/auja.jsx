import React from 'react';
import flux from './Stores/flux';
import Scaffolding from './scaffolding.jsx'

React.renderComponent(<Scaffolding flux={flux}/>, document.body);
    