describe('E2E: main page', function () {
  beforeEach(function () {
    browser.ignoreSynchronization = true;
    browser.driver.get('http://localhost:8080/index.html');
  });

  describe('Buttons exists', function () {
    it('should be 25', function () {
      expect(element.all(by.css('button.button')).count()).toBe(25);
    });
  });

  describe('Show notifications', function () {
    it('should be shown notifications', function () {
      var buttons = element.all(by.css('button.button'));
      buttons.each(function (button) {
        button.click();
      });

      var notifications = element.all(by.css('.notification'));
      expect(notifications.count())
        .toBe(buttons.count());
    });
  });
});
