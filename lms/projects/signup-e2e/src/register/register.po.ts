import { $, browser, by, element } from 'protractor';

export class RegisterPage {
    navigateTo() {
        return browser.get('/signup/5c84badee16f191041fe09d3');
    }

    getFirstNameTextBox() {
        return element(by.name('firstName'));
    }

    getLastNameTextBox() {
        return element(by.name('lastName'));
    }

    getPasswordTextBox() {
        return element(by.name('password'));
    }

    getConfirmPasswordTextBox() {
        return element(by.name('confirmPassword'));
    }

    getDateOfBirthDateOfBirthField() {
        return element(by.name('dateOfBirth'));
    }

    getGenderField() {
        return element(by.tagName('mat-select'));
    }

    clickOption(optionValue) {
        $(`.mat-option[value="${optionValue}"]`).click();
    }

    click(txt, i) {
        element.all(by.partialButtonText(txt)).get(i).click;
    }
}