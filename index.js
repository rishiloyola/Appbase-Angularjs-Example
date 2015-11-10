var myApp = angular.module('myApp', []);

myApp.service('client',function(client){
  
  var appbase = new Appbase({
     url: 'https://scalr.api.appbase.io',
     appname: 'checkin',
     username: '6PdfXag4h',
     password: 'b614d8fa-03d8-4005-b6f1-f2ff31cd0f91'
  });
  
  this.updateData = function(exampleVariable){
    return appbase.index({
          index: 'checkin',
          type: 'example',
          id: '1',
          body: {
            exampleVariable : exampleVariable       
          } 
    });
  }
    
  this.streamData = function(){
      return appbase.getStream({
            type: 'books',
            id: '1'
      })
  }
  
})

myApp.controller('mycontroller', function ($scope, client) {
  
  var updateobj = client.updateData($scope.exampleVariable);
  updateobj.on('data', function(response) {
    console.log(response);
  }).on('error', function(error) {
    console.log(error);
  });
  
  var streamobj = client.streamData();
  streamobj.on('data', function(response) {
    $scope.exampleVariable = response._source.exampleVariable;
  }).on('error', function(error) {
    console.log(error)
  })

})
