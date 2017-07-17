### Angular Notificaion Service (Foundation 6)
[![Build Status](https://travis-ci.org/Innovaccer/angular-notificaition-service.svg?branch=master)](https://travis-ci.org/Innovaccer/angular-notificaition-service)

#### [Demo](https://innovaccer.github.io/angular-notificaition-service/)  

#### [Source Code](https://github.com/Innovaccer/angular-notificaition-service)

##### Usage:


#### Config
- **message** - string *required*
- **title** - string *required*
- **callback** - function callback method on notification close
- **closeOnClick** - close on click. default: false
- **buttonOne** - call back for Button One click.
- **buttonOneText** - 'Button 1'
- **buttonTwo** - call back for Button Two click
- **buttonTwoText** - 'Button 2'
- **Delay** - Time after which notification remove.
- **Type** - neutral, alert, success, info and warning. default: neutral

#### Available Methods:
Neutral
```
Notification.alert({
  title: 'Title Here',
  message: 'message
})
```

Success
```
Notification.alert({
  title: 'Title Here',
  message: 'message'
})
```

Info
```
Notification.alert({
  title: 'Title Here',
  message: 'message'
})
```

Warning
```
Notification.alert({
  title: 'Title Here',
  message: 'message'
})
```
Alert
```
Notification.alert({
  title: 'Title Here',
  message: 'message'
})
```

###### Use:

```
var app = angular.module('myApp', []);

app.controller('myCtrl',  function(alertService) {
  // calling alert service.
  alertService.alert.neutral({
    title: 'title here', // Required
    message: 'message here' // Required
    callback: someMethod // Optional
  });
})
```

###### Using Alert Service as Confirm Box

```
Notification.alert({
  title: 'Hello',
  message: 'Notification message',
  buttonOne: buttonOne,
  buttonOneText: 'Button 1',
  buttonTwo: buttonTwo,
  buttonTwoText: buttonTwoText
});
```

###### Example
```
var buttonOne = function (uuid) {
  Notification.close(uuid);
  console.log('hello');
};

var buttonTwo = function (uuid) {
  Notification.close(uuid);
  console.log('close');
};

Notification.alert({
  title: 'Hello',
  message: 'Notification message',
  buttonOne: buttonOne,
  buttonOneText: 'Button 1'
});

Notification.alert({
  title: 'Hello',
  message: 'Notification message',
  buttonTwo: buttonTwo,
  buttonTwoText: buttonTwoText,
  closeOnClick: true,
  delay: 5000
});

alertService.alert.warning({
  title: 'Hello',
  message: 'Notification message'
});
```
