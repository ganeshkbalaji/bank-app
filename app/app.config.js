(function() {

    'use strict';

    angular.module('app').config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/main");

        $stateProvider
            .state('main',{
                url: "/main",
                views: {
                    'filters': {
                        templateUrl: './app/main/savings-filters.html',
                        controller: function($scope, filteredSelection){

                            $scope.filter = {};
                            filteredSelection.setFilter($scope.filter);

                        }
                    },
                    'tabledata': {
                        templateUrl: './app/main/savings-tabledata.html',
                        controller: function($scope, filteredSelection){

                            $scope.accounts = [];
                            // alert("tabledata")
                            $scope.addAccount = function() {
                                console.log("Account Added");

                                // $scope.filter = {};

                               $scope.filterByCategory = function (account) {  
                                    if(filteredSelection.getFilter().all === true) { 
                                        return true; 
                                        } else { 
                                            return filteredSelection.getFilter()[account.type] || noFilter(filteredSelection.getFilter()); 
                                        } 
                                };


                                function noFilter(filterObj) {
                                    for (var key in filterObj) {
                                        if (filterObj[key]) {
                                            return false;
                                        }
                                    }
                                    return true;
                                }
                                var newAccount = {};
                                if ($scope.type === 'checking') {
                                    newAccount = {
                                    'type': $scope.type,
                                    'bic': $scope.bic,
                                    'iban': $scope.iban,
                                    'amount': $scope.amount,
                                    };
                                } else {
                                    newAccount = {
                                    'type': $scope.type,
                                    'amount': $scope.amount,
                                    'date': $scope.date,
                                    'maturity': $scope.maturity
                                    }
                                }

                                $scope.accounts.push(newAccount);

		                        localStorage.setItem('newAccount', JSON.stringify($scope.accounts));

                                // console.log(localStorage.getItem('newAccount'));
                                console.log(JSON.parse(localStorage.getItem('newAccount')));

                                $scope.accounts = JSON.parse(localStorage.getItem('newAccount'));

                            }

                        }
                    }
                }
            })

    });

})();