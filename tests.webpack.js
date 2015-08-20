var context = require.context('./tests/spec/Stores', true, /\.test\.js$/);
context.keys().forEach(context);