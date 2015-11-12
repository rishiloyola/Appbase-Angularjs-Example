var myApp = angular.module('myApp',[]);

myApp.factory('client', function(){

  var appbase = new Appbase({
    url: 'https://scalr.api.appbase.io',
    appname: 'exampleapp',
    username: 'ne0iDDSOe',
    password: 'f0a3ac00-d950-4c1a-942f-6d631686755c'
  });

  function BindVariable (type, id, variableName, $scope) {
     this.$scope = $scope;
     this.$scope.$watch(variableName, function(){
       appbase.index({
               type: type,
               id: id,
               body: {
                   exampleVariable : $scope[variableName]
               }
        }).on('data', function(response) {
            console.log(response);
        }).on('error', function(error) {
            console.log(error);
        });
     })

   return {
     BindVariable: BindVariable
   }

})

myApp.controller('mycontroller', function (client,$scope) {

  client.BindVariable("example", "1", "exampleVariable", $scope);
  client.BindVariable("example", "2","exampleVariable2",$scope);

})
