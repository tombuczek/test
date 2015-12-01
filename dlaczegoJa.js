            .get('/api/users/exists', config)
                .success(function(result) {
                  if (username === scope.storedUsername) {
                    ngModel.$setValidity('unique', true);
                  } else if (result.exists) {
                    ngModel.$setValidity('unique', false);
                  }
                });
            }
          });
        }
      };
    }
  ]
);

profileValidation.directive('existingUsername',
  [
    '$http',
    function($http) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {

          element.bind('keyup', function() {

            if (element.val().length > 0) {
              ngModel.$setValidity('exists', false);
            } else {
              element.removeClass('ng-dirty');
              ngModel.$setPristine();
            }

            var username = element.val();
            if (username) {
              var config = { params: { username: username } };
              $http
                .get('/api/users/exists', config)
                .success(function(result) {
                  ngModel.$setValidity('exists', result.exists);
                });
            }
          });
        }
      };
  }]);

profileValidation.directive(
  'uniqueEmail',
  [
    '$http',
    function($http) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function getUnique(scope, element, attrs, ngModel) {
          element.bind('keyup', function() {
            ngModel.$setValidity('unique', true);
            var email = element.val();
            if (email) {
              var config = { params: { email: email } };
              $http
                .get('/api/users/exists', config)
                .success(function(result) {
                  if (email === scope.storedEmail) {
                    ngModel.$setValidity('unique', true);
                  } else if (result.exists) {
                    ngModel.$setValidity('unique', false);
                  }
                });
            }
          });
        }
      };
    }
  ]
);