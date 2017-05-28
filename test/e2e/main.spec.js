describe('E2E: main page', function() {
    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.driver.get('http://localhost:8080/index.html');
    });

    describe('Buttons exists', function() {
        it('should be 16', function() {
            expect(element.all(by.css('.button')).count()).toBe(16);
        });
    });
})
