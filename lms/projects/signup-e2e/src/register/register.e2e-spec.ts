import { RegisterPage } from './register.po';
import { browser, logging, promise } from 'protractor';

var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 100ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return promise.delayed(50);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
}

describe('Register app testing.', () => {
  let page: RegisterPage;

  beforeEach(() => {
    page = new RegisterPage();
  });

  it('Tesiting signup with all valid inputs', () => {
    page.navigateTo();
    page.getFirstNameTextBox().sendKeys('Sukesh');
    page.getLastNameTextBox().sendKeys('Pabolu');
    page.getPasswordTextBox().sendKeys('Avengersxmen1!');
    page.getConfirmPasswordTextBox().sendKeys('Avengersxmen1!');
    page.getDateOfBirthDateOfBirthField().sendKeys('03/24/1995');
    page.getGenderField().click();
    page.clickOption("male");
    page.click("Next", 0);
    browser.driver.sleep(5000);
    page.click("Next", 1);
    browser.driver.sleep(5000);
    page.click("Register", 0);
  });
  

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});