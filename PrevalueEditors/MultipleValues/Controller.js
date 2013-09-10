angular.module('umbraco').controller('Bellements.PrevalueEditors.MultipleValuesController', function ($scope, assetsService) {
  //Start: Private functions
  function init() {
    var requiresInitializing = ($scope.model.value === "" || $scope.model.value === null) && angular.isObject($scope.model.value) == false;
    $scope.newItem = { key: '', value: '' };

    if (requiresInitializing) {
      $scope.model.value = { options: [], defaultValue: '' };
    } else {
      //model.value is saved as a string and when returned does not parse into JSON, hence angular.fromJson($scope.model.value) - not sure if bug or... /fryface
      $scope.model.value = angular.fromJson($scope.model.value);
    }

    assetsService.loadCss('/App_Plugins/Bellements/PrevalueEditors/MultipleValues/Style.css');
  }
  //End: Private functions

  //Start: Public functions
  $scope.addItem = function (evt) {
    evt.preventDefault();

    var itemIsEmpty = $scope.newItem.key.length === 0 || $scope.newItem.value.length === 0;

    if (itemIsEmpty == false) {
      $scope.model.value.options.push($scope.newItem);

      var optionsLength = $scope.model.value.options.length;
      var hasOneItem = optionsLength === 1;
      if (hasOneItem) {
        $scope.model.value.defaultValue = $scope.newItem.value;
      }

      $scope.newItem = { key: '', value: '' };
    }
  };
  $scope.removeItem = function (item, evt) {
    evt.preventDefault();

    $scope.model.value.options = _.reject($scope.model.value.options, function (x) {
      return x.value === item.value;
    });

    var optionsLength = $scope.model.value.options.length;
    var hasNoOptions = optionsLength === 0;

    if (hasNoOptions) {
      $scope.model.value.defaultValue = '';
    } else {
      var foundItem = _.find($scope.model.value.options, function (option) {
        return option.value == $scope.model.value.defaultValue;
      });

      var hasNoFoundItem = typeof (foundItem) === 'undefined';
      if (hasNoFoundItem) {
        $scope.model.value.defaultValue = _.first($scope.model.value.options).value;
      }
    }
  };
  //End: Public functions

  //Initialize!
  init();
});