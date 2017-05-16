var app = angular.module('notification', []);

app.provider('Notification', function () {
  this.options = {
    message: 'This is default message',
    delay: undefined,
    templateUrl: 'notification.html',
    onClose: undefined,
    closeOnClick: false,
    notificationClass: 'neutral',
    container: '#notification-wrapper',
    buttonOneText: 'Button One',
    buttonTwoText: 'Button Two'
  };

  this.setOptions = function (options) {
    if (!angular.isObject(options)) {
      throw new Error('Options should be an object.');
    }
    this.options = angular.extend({}, this.options, options);
  };

  this.$get = function ($timeout, $http, $compile, $templateCache,
    $rootScope, $sce, $q, $templateRequest) {
    //
    var options = this.options;
    var messageElements = [];

    var uuid = function () {
      var s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    };

    var notification = function (args) {
      var deferred = $q.defer();

      if (typeof args !== 'object') {
        throw new Error('Args: Object require');
      }

      args.scope = args.scope || $rootScope;
      args.template = args.templateUrl || options.templateUrl;
      args.delay = args.delay || options.delay;
      args.message = args.message || options.message;
      args.onClose = args.onClose || options.onClose;
      // For Confirm Box
      args.buttonOne = args.buttonOne || options.buttonOne;
      args.buttonTwo = args.buttonTwo || options.buttonTwo;
      args.buttonOneText = args.buttonOneText || options.buttonOneText;
      args.buttonTwoText = args.buttonTwoText || options.buttonTwoText;
      args.closeOnClick = (args.closeOnClick !== null && args.closeOnClick
         !== undefined) ? args.closeOnClick : options.closeOnClick;
      args.container = args.container || options.container;
      args.notificationClass = args.notificationClass || options.notificationClass;

      $templateRequest(args.template).then(function (template) {
        // Creating scope for the each notification template
        var scope = args.scope.$new();
        var templateElement = $compile(template)(scope);

        scope.message = $sce.trustAsHtml(args.message);
        scope.title = $sce.trustAsHtml(args.title);
        scope.delay = args.delay;
        scope.onClose = args.onClose;
        scope.notificationClass = args.notificationClass;
        scope.buttonOne = args.buttonOne;
        scope.buttonTwo = args.buttonTwo;
        scope.uuid = 'notifiy-' + uuid();
        scope.buttonOneText = args.buttonOneText;
        scope.buttonTwoText = args.buttonTwoText;
        /**
         * closeEvent
         */
        scope.close = function () {
          if (scope.onClose) {
            scope.onClose(templateElement);
          }
          templateElement.remove();
          messageElements.splice(messageElements.indexOf(templateElement), 1);
          scope.$destroy();
        };

        // Close on click
        if (args.closeOnClick) {
          templateElement.bind('click', scope.close());
        }

        /**
         * For Confirm Box
         */
        if (args.buttonOne) {
          scope.buttonOne = args.buttonOne;
        }
        if (args.buttonTwo) {
          scope.buttonTwo = args.buttonTwo;
        }

        // Automatically hide the notification on the duration of delay.
        if (angular.isNumber(args.delay)) {
          $timeout(function () {
            scope.close();
          }, args.delay);
        }

        angular.element(document.querySelector(args.container))
        .prepend(templateElement);

        messageElements.push(templateElement);
        deferred.resolve(scope);
      }).catch(function (err) {
        throw new
        Error('Template (' + args.template + ')  not loaded. ' + err);
      });
      return deferred.promise;
    };

    notification.alert = function (args) {
      return this(args);
    };

    notification.clearAll = function () {
      angular.forEach(messageElements, function (element) {
        element.remove();
      });
      messageElements = [];
    };

    notification.close = function (id) {
      document.querySelector('#' + id).remove();
    };

    return notification;
  };
});
