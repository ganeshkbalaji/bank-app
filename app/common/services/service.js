(function() {

    'use strict';

    angular.module('app').factory('filteredSelection', function() {

        var _filter = {};
                            
        return {
            getFilter: function() {
                return _filter;
            },
            setFilter: function(filter) {
                _filter = filter
            }
        };

    });

})();