var app = angular.module('ShoeApp', []);

app.controller('ShoeController', ['$http', function($http){
    var self = this;
    self.newShoe = {
        name: '',
        cost: '',
    };



    self.displayShoes= function(){
        $http({
        method: 'GET',
        url: '/shoe'
    }).then(function successCallback(response) {
        self.shoeArray = response.data;
        
    }).catch(function(response) {
        console.log('error on /shoe GET', response.status);
        
    })};

    self.createShoe = function(){
        $http({
        method: 'POST',
        url: '/shoe',
        data: self.newShoe
    }).then(function successCallback(response) {
        self.displayShoes();
            
    }).catch(function(error) {
        console.log('error on /shoe POST', error.status);
    
    })};

    self.displayShoes();
}]);//end controller
