/**
 * @jsx React.DOM
 */

define(['react'], function(React) {
   
    return {
        /**
         * Current query
         */
        query: '',

        /**
         * Original source of the menu
         */
        originalSource: null,

        /**
         * Reference to the searchable property
         */
        searchableProperty: null,

        /**
         * Store the original source just before mounting
         */
        componentWillMount: function() {
            this.originalSource = this.props.item.getTarget();  
            this.searchableProperty = this.props.item.getProperty('searchable');
        },

        /**
         * Handle searching
         * @param e
         */
        handleSearch: function(e) {
            this.query = e.target.value;
            
            var target = this.originalSource;
            if(this.query != '') {
                //Get target, replace %s with query and escape it so we have a nice url
                target = this.searchableProperty.getTarget().replace('%s', this.query.escapeURL(true));
            }

            flux.actions.updateResource(this.props.item, target);
        },
        
        /**
         * Fetch the form used for searching, when the property was not attached it will return an empty string
         * @return {*}
         */
        getSearchableForm: function() {
            if(!this.props.item.hasProperty('searchable')) {
                return '';
            }
            return (
                <input type="text" onChange={this.handleSearch} placeholder="Search.." />  
            );
        }
    }
    
});