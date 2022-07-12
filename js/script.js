//console.log('Test'); 1)testing connection

`use strict`
const form = document.querySelector(`form`);
const nameElement = document.querySelector(`#name`);
const emailElement = document.querySelector(`#email`);
const titleSelectElement = document.querySelector(`#title`);
const titleOptionElements = document.querySelectorAll(`#title option`);
const otherJobElement = document.querySelector(`#other-job-role`);
const designElement = document.querySelector(`#design`);
const colorElement = document.querySelector(`#color`);
const colorElements = document.querySelector(`#color`).children;
const activitiesElement = document.querySelector('#activities');
const activitiesElements = document.querySelectorAll('#activities input');
const activitiesBoxElement = document.querySelector('#activities-box');
const activitiesCostElement = document.querySelector('#activities-cost');
const paymentElement = document.querySelector('#payment');
const creditCardElement = document.querySelector('#credit-card');
const ccNumElement = document.querySelector('#cc-num');
const zipElement = document.querySelector('#zip');
const cvvElement = document.querySelector('#cvv');
const paypalElement = document.querySelector('#paypal');
const bitcoinElement = document.querySelector('#bitcoin');

otherJobElement.style.display = `none`;
// when the page first loads, the first text field should have the focus state 
nameElement.focus();
// set total to zero, start counting from zero
let totalCost = 0;
let totalActivitiesChecked = 0;
// Disable "Color" selector by default
colorElement.disabled = true;
// by default Hide the PayPal and BitCoin text 
paypalElement.style.display = `none`;
bitcoinElement.style.display = `none`;
// Sets the deafult selection to Credit Card
paymentElement.value = `credit-card`;
// validation
const nameRegEx = new RegExp(/^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/);
const emailRegEx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `i`);
const ccNumRegEx = new RegExp(/^\d{13,16}$/);
const zipRegEx = new RegExp(/^\d{5}$/);
const cvvRegEx = new RegExp(/^\d{3}$/);
// Toggle job role
titleSelectElement.addEventListener(`change`, e => {
    for ( let i = 0; i < titleOptionElements.length; i++ ) {
        const titleValue = e.target.value;
        if ( titleValue === `other` ) {
            otherJobElement.style.display = `block`;
            otherJobElement.focus();
        } else {            
            otherJobElement.style.display = `none`;
        }
    }
});
designElement.addEventListener(`change`, e => {
    // Enable "Color" dropdown on any "Design" field selection
    colorElement.disabled = false;
    
    for ( let i = 0; i < colorElements.length; i++ ) {
        const designValue = e.target.value;
        let colorOption = colorElements[i].getAttribute(`data-theme`);
        
        // Compares the design selection with the options and
        // display corresponding shirt types
        if ( designValue === colorOption ) {
            colorElements[i].hidden = false;
            colorElements[i].setAttribute(`selected`, ``);
        } else {        
            colorElements[i].hidden = true;
            colorElements[i].removeAttribute(`selected`);
        }
    }
});
// Listener to calculate total cost and count number of checkbox for validation
activitiesElement.addEventListener('change', e => {
    const activityCheck = e.target;
    const activityValue = parseInt(activityCheck.getAttribute(`data-cost`));
    const activityTime = activityCheck.getAttribute(`data-day-and-time`);
    if ( activityCheck.checked ) {
        totalCost += activityValue;
        totalActivitiesChecked++;
    } else {        
        totalCost -= activityValue;
        totalActivitiesChecked--;
    }
    activitiesCostElement.innerHTML = `Total: $${totalCost}`;
    
    // disable the duplicate time event
    for ( let i = 0; i < activitiesElements.length; i++) {
        if ( activitiesElements[i] !== activityCheck && activitiesElements[i].getAttribute(`data-day-and-time`) === activityTime ) {
            if( activityCheck.checked === true ) {
                activitiesElements[i].parentElement.classList.add(`disabled`);
                activitiesElements[i].disabled = true;
            } else {       
                activitiesElements[i].parentElement.classList.remove(`disabled`);
                activitiesElements[i].disabled = false;
            }
        }
    }
});
// Set focus styling on Activities when focused
// Code from from Checkboxes warm ups
activitiesElements.forEach( element => {
    element.addEventListener('focus', e => element.parentElement.classList.add('focus'));
    element.addEventListener('blur', e => {
        const active = document.querySelector('.focus');
        if (active) active.classList.remove('focus');
    })
});
// Display payment message
paymentElement.addEventListener('change', e => {
    creditCardElement.style.display = `none`;
    const paymentValue = e.target.value;
    if ( paymentValue === `paypal` ) {
        paypalElement.style.display = `block`;
        bitcoinElement.style.display = `none`;
    } else if ( paymentValue === `bitcoin` ) {
        paypalElement.style.display = `none`;
        bitcoinElement.style.display = `block`;
    } else {        
        creditCardElement.style.display = `block`;
        paypalElement.style.display = `none`;
        bitcoinElement.style.display = `none`;
    }
});
/**
 * Function expression to set passed validation styling
 * for element with valid entry and hide error messaging
 *
 * @param {HTML element} element - Selected element
 */  
const validationPass = element => {
    element.parentElement.classList.add(`valid`);
    element.parentElement.classList.remove(`not-valid`);
    element.parentElement.lastElementChild.style.display = `none`;
}
/**
 * Function expression to set failed validation styling
 * for element with invalid entry and show error messaging
 * Update: Added additional messaging based on blank 
 * field value
 *
 * @param {HTML element} element - Selected element
 */   
const validationFail = element => {
    element.parentElement.classList.add(`not-valid`);
    element.parentElement.classList.remove(`valid`);
    element.parentElement.lastElementChild.style.display = `block`;
    if ( element === emailElement && emailElement.value === `` ) {
        element.nextElementSibling.innerHTML = `Email address cannot be blank`;
    } else if ( element === emailElement && emailElement.value !== `` ) {
        element.nextElementSibling.innerHTML = `Email address must be formatted correctly`;
    } else if ( element === ccNumElement && ccNumElement.value === `` ) {
        element.nextElementSibling.innerHTML = `Credit card number cannot be blank`;
    } else if ( element === ccNumElement && ccNumElement.value !== `` ) {
        element.nextElementSibling.innerHTML = `Credit card number must be between 13 - 16 digits`;
    } else if ( element === zipElement && zipElement.value === `` ) {
        element.nextElementSibling.innerHTML = `Zip Code cannot be blank`;
    } else if ( element === zipElement && zipElement.value !== `` ) {
        element.nextElementSibling.innerHTML = `Zip Code must be 5 digits`;
    } else if ( element === cvvElement && cvvElement.value === `` ) {
        element.nextElementSibling.innerHTML = `CVV cannot be blank`;
    } else if ( element === cvvElement && cvvElement.value !== `` ) {
        element.nextElementSibling.innerHTML = `CVV must be 3 digits`;
    }
}
/**
 * Function expression to set failed validation styling
 * for element with invalid entry
 *
 * @param {HTML element} elementName - Selected element
 * @param {RegEx} regExPattern - RegEx pattern used for test
 */  
const elementValidator = (elementName, regExPattern) => {
    const isValid = regExPattern.test(elementName.value); 
    if ( isValid ) {
      validationPass(elementName);
    } else {
      validationFail(elementName);
    }
    return isValid;
}
/**
 * Function expression to determine at least one 
 * activity has been selected
 *
 */  
const activitiesValidator = () => {
    const totalActivitiesIsValid = totalActivitiesChecked > 0;
    if ( totalActivitiesIsValid ) {
        validationPass(activitiesBoxElement);
    } else {
        validationFail(activitiesBoxElement);
    }
    return totalActivitiesIsValid;
}
form.addEventListener('submit', e => {
    if (!elementValidator(nameElement, nameRegEx)) {
      console.log('Invalid name prevented submission');
      e.preventDefault();
    }
  
    if (!elementValidator(emailElement, emailRegEx)) {
      console.log('Invalid email prevented submission');
      e.preventDefault();
    }
  
    if (!activitiesValidator()) {
      console.log('Invalid number of activities selected prevented submission');
      e.preventDefault();
    }
  
    if (!elementValidator(ccNumElement, ccNumRegEx)) {
      console.log('Invalid credit card number prevented submission');
      e.preventDefault();
    }
  
    if (!elementValidator(zipElement, zipRegEx)) {
      console.log('Invalid zip code prevented submission');
      e.preventDefault();
    }
  
    if (!elementValidator(cvvElement, cvvRegEx)) {
      console.log('Invalid cvv number prevented submission');
      e.preventDefault();
    }
});

// Utilize focusout event listener to find out of focused  
// input field and display appropiate error message
// input field and display appropriate error message
form.addEventListener('focusout', e => {
    // Switch statement to trigger corresponding error message
    switch (e.target) {
        case nameElement:            
            if (!elementValidator(nameElement, nameRegEx)) {
                console.log('Invalid name prevented submission');
                e.preventDefault();
            }
            break;
        
        case emailElement:
            if (!elementValidator(emailElement, emailRegEx)) {
            console.log('Invalid email prevented submission');
            e.preventDefault();
            }
            break;
        case activitiesBoxElement.lastElementChild.firstElementChild:  
            if (!activitiesValidator() && e.target.getAttribute(`name`) === `express` ) {
                console.log('Invalid number of activities selected prevented submission');
                e.preventDefault();
            }
            break;
        case ccNumElement:
            if (!elementValidator(ccNumElement, ccNumRegEx)) {
                console.log('Invalid credit card number prevented submission');
                e.preventDefault();
            }
            break;        
        
        case zipElement:
            if (!elementValidator(zipElement, zipRegEx)) {
            console.log('Invalid zip code prevented submission');
            e.preventDefault();
            }
            break;
        
        case cvvElement:
            if (!elementValidator(cvvElement, cvvRegEx)) {
            console.log('Invalid cvv number prevented submission');
            e.preventDefault();
            }
            break;
    }
});
// Second focusout event listener to find any updates made  
// in the checkbox fields and display appropriate error message
activitiesBoxElement.addEventListener('focusout', e => {
    const checkBoxGroup = e.target.parentElement.parentElement;
    if ( (totalActivitiesChecked < 0 && checkBoxGroup !== activitiesBoxElement) || (totalActivitiesChecked > 0 && checkBoxGroup === activitiesBoxElement) ) {
        if (!activitiesValidator()) {
            console.log('Invalid number of activities selected prevented submission');
            e.preventDefault();
        }
    }    
});