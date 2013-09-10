angular.module("umbraco").controller("Bellements.MultiplePrevaluesController", function ($scope) {
  //object prevalues are stored as a string and require parsing - angular.fromJson(str) to the rescue!
  var valuesPrevalue = angular.fromJson($scope.model.config.values);

  var validatedCurrentValue = _.find(valuesPrevalue.options, function (option) {
    return option.value == $scope.model.value;
  });

  var hasNoValidatedCurrentValue = typeof (validatedCurrentValue) === 'undefined';

  if ($scope.model.value === "" || $scope.model.value === null || hasNoValidatedCurrentValue) {
    $scope.model.value = valuesPrevalue.defaultValue;
  }

  $scope.options = valuesPrevalue.options;

  $scope.isError = true;
});