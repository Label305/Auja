/**
 * @jsx React.DOM
 */
define([
    'build/Stores/auja',
    'build/Components/Scaffolding/header.react',
    'build/Components/Scaffolding/body.react'
], function (Store, Header, Body) {

    var Style = React.createClass({
        /**
         * Combine items into a neatly formatted string
         * @param name will be prefixed with ".auja-"
         * @param property_name the CSS property to be styled
         * @param value the value it should take
         * @returns {string}
         */
        entry: function (name, property_name, value) {
            var result = "";
            result += ".auja-" + name + " {\n";
            result += "\t" + property_name + ": " + value + "!important;\n";
            result += "}\n\n";
            return result;
        },
        parse: function (colors) {
            var result = "\n";
            for (var name in colors) {
                result += this.entry('bg-' + name, 'background-color', colors[name]);
                result += this.entry('color-' + name, 'color', colors[name]);
                result += this.entry('border-' + name, 'border-color', colors[name]);
            }
            return result;
        },
        render: function () {
            var style = this.parse(this.props.auja.colors);

            return (
                <style>
                    {style}
                </style>
                );
        }
    });

    return React.createClass({
        mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('AujaStore')],
        getStateFromFlux: function () {
            return flux.store('AujaStore').getState();
        },
        componentWillMount: function () {
            flux.actions.initialize();
        },
        render: function () {
            document.title = this.state.title;

            return (
                <div id="auja">
                    <Header auja={this.state} />
                    <Body flux={this.props.flux} auja={this.state} />
                    <Style auja={this.state} />
                </div>
                );
        }
    });

});