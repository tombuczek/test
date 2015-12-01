   var challengeBlockEscapedName = challengeBlockName.replace(/\s/, '%20');
    var username = typeof window.username !== 'undefined' ?
      window.username :
      '';

    var link = 'https://www.facebook.com/dialog/feedf?' +
      'app_id=1644598365767721' +
      '&display=page&' +
      'caption=I%20just%20completed%20the%20' +
      challengeBlockEscapedName +
      '%20section%20on%20Free%20Code%20Camp%2E' +
      '&link=http%3A%2F%2Ffreecodecamp%2Ecom%2F' +
      username +
      '&redirect_uri=http%3A%2F%2Ffreecodecamp%2Ecom%2Fmap';

    main.setMapShare(challengeBlockName);
    window.ga('send', 'event', 'FB_LINK', 'SHARE', 'Facebook map share');
    window.location.href = link;
  });
});

var profileValidation =
  window.angular.module('profileValidation', ['ui.bootstrap']);

profileValidation.controller(
  'profileValidationController',
  [
    '$scope',
    '$http',
    function($scope, $http) {
      $http.get('/account/api').success(function(data) {
        $scope.user = data.user;

        $scope.user.username = $scope.user.username ?
          $scope.user.username.toLowerCase() :
          null;

        $scope.storedUsername = data.user.username;
        $scope.storedEmail = data.user.email;
        $scope.user.email = $scope.user.email ?
          $scope.user.email.toLowerCase() :
          null;

        $scope.user.twitterHandle = $scope.user.twitterHandle ?
          $scope.user.twitterHandle.toLowerCase() :
          null;

        $scope.asyncComplete = true;
      });
    }
  ]
);

profileValidation.controller(
  'pairedWithController',
  [
    '$scope',
    function($scope) { $scope.existingUser = null; }
  ]
);

profileValidation.controller('emailSignUpController', function() {});

profileValidation.controller('emailSignInController', function() {});

profileValidation.controller('URLSubmitController', function() {});

profileValidation.controller('nonprofitFormController', function() {});

profileValidation.controller(
  'doneWithFirst100HoursFormController',
  function() {}
);

profileValidation.controller('submitStoryController', function() {});

profileValidation.directive(
  'uniqueUsername',
  [
    '$http',
    function($http) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {

          element.bind('keyup', function() {

            ngModel.$setValidity('unique', true);
            var username = element.val();
            if (username) {
              var config = { params: { username: username } };
              $http
                .get('/api/users/exists', config)
                .success(function(result) {
                  if (username === scope.storedUsern