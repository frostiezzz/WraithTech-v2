'use strict'
import {path} from "../../../constant.js";

export default angular.module('wraithTech')
.component('searchProduct',
{
    templateUrl: 'components/searchProduct/searchProduct.html',
    controller: ['$http',
        function searchProductCtrl($http)
        {
            var ctrl = this;

            ctrl.$onInit = function()
            {
                $http.get(path.product.searchParams).then(
                    function(response)
                    {
                        response = response.data;
                        ctrl.types = response.types;
                        ctrl.brands = response.brands;
                    },
                    function()
                    {
                        console.log('searchParams api error');
                    }
                );
            }

            ctrl.searchName = "";
            ctrl.searchType = "";
            ctrl.searchBrand = "";

            ctrl.search = search;
            ctrl.clear = clear;

            function search()
            {
                var params = {
                    name: ctrl.searchName,
                    type: ctrl.searchType,
                    brand: ctrl.searchBrand
                }

                $http.get(path.product.search, {params:params}).then(
                    function(response)
                    {
                        response = response.data;
                        ctrl.onSearch({products:response});
                    },
                    function()
                    {
                        console.log('searchParams api error');
                    }
                );
            }

            function clear()
            {
                ctrl.searchName = "";
                ctrl.searchType = "";
                ctrl.searchBrand = "";

                ctrl.onClear();
            }
        }
    ],
    bindings: {
        onSearch: '&',
        onClear: '&'
    }
});
