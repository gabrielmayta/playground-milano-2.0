/**
 *
 * Created by Gabriel Mayta
 *
 */

"use strict";

angular.module("playground-tabs-details.controller", []).controller("PlaygroundTabsDetailsHomeController", PlaygroundTabsDetailsHomeController);
PlaygroundTabsDetailsHomeController.$inject = ["$rootScope", "$scope", "$state", "RestService"];


function PlaygroundTabsDetailsHomeController($rootScope, $scope, $state, RestService) {

    $scope.favourites = false;
    var id_playground = $state.params.id;
    var tabTitles = {playground_0: 'Recensione', playground_1: 'Checkins', playground_2: 'Commenti'};

    $scope.figa = function () {
        $state.go("playground.checkins", {id: id_playground});
    };

    $rootScope.$watch('currentTabPage', function (currentTabPage) {
        $rootScope.pageTitle = tabTitles[currentTabPage];
    });

    RestService.get('playgrounds/' + id_playground).then(function (response) {
        $scope.playground = response.data;
    });

    if ($rootScope.IS_AUTH) {
        RestService.get('favourites/' + $rootScope.userData.id + '/' + id_playground).then(function (response) {
            if (response['data']) $scope.favourites = true;
        });
    }

    $scope.toggleFavourites = function () {
        if (!$scope.favourites) {
            RestService.post('favourites', {id_user: $rootScope.userData.id, id_playground: id_playground}).then(function (response) {
                if (response.data) $scope.favourites = true;
            });
        }
        else {
            RestService.remove('favourites/' + $rootScope.userData.id + '/' + id_playground).then(function (response) {
                if (response.message) $scope.favourites = false;
            });
        }
    };


}