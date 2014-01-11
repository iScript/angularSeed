define([
    'angular',
    'angularResource'
],function(angular,angularResource){

    /* Services */
    angular.module('myApp.services', ['ngResource']).
    factory('RestFul', function ($resource) {
        //return $resource('/index/best',{});
    }).
    factory('socket',function($rootScope){
        var socket = io.connect('http://localhost:8080'); 
        return {
            on: function (eventName, callback) { 
                socket.on(eventName, function () { 
                    var args = arguments; 
                    $rootScope.$apply(function () { 
                        callback.apply(socket, args); 
                    }); 
                });
            },
            emit: function (eventName, data, callback) { 
                socket.emit(eventName, data, function () { 
                    var args = arguments; 
                    $rootScope.$apply(function () { 
                        if (callback) { callback.apply(socket, args); } 
                    }); 
                }) 
            } 
        }
    });
});
