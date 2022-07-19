const nameField = document.querySelector('#name');
const jobTitle = document.querySelector('#title');
const otherJob = document.querySelector('#other-job-role');
const shirtDesign = document.querySelector('#design');
const shirtColor = document.querySelector('#color');
const activities = document.querySelector('#activities');
const activitiesCost = document.querySelector('#activities-cost');
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const form = document.getElementsByTagName('form')[0];
const email = document.querySelector('#email');
const cardNum = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const checkboxes = activities.querySelectorAll('[type="checkbox"]');


nameField.focus();
//Hides the Other Job field, until that option is selected
//from the Job Field dropdown menu
otherJob.style.display = 'none';
//Makes Credit card appear as the first payment option
//while hidding paypal and bitcoin
payment.children[1].setAttribute('selected','');
paypal.setAttribute('hidden', '');
bitcoin.setAttribute('hidden', '');
//Disables the shirtcolor menu
shirtColor.disabled = true;

jobTitle.addEventListener('change', e => {
    if(jobTitle.options[6].selected){
        otherJob.style.display = '';
    } else {
        otherJob.style.display = 'none';
    }
})

jshirtDesign.addEventListener('change', e => {
    /**
     * Event reporting that the user made a selection on the
     * Design dropdown menu, thus can pick and option from the
     * filtered color menu (Shirtcolor.lenght);
     */    
    shirtColor.disabled = false;
 
  
    for(let i = 0; i < shirtColor.length; i++){
        if(e.target.value !== shirtColor.children[i].getAttribute('data-theme')){
            // shirtColor.children[0].textContent = `Pick a Color`;
            // shirtColor.selectedIndex = '-1';
            shirtColor.children[i].hidden = true;
            shirtColor.children[i].removeAttribute('selected');
           
        } else {
            shirtColor.children[i].hidden = false;
            shirtColor.children[i].setAttribute('selected', true);
        } 
    }
});
console.log(checkboxes[1].getAttribute('data-day-and-time'));

/Counter of all selected events
let totalCost= 0;
activities.addEventListener('change', e => {
    let clicked = e.target
    let eventCost = parseInt(clicked.getAttribute('data-cost'));
    //Ternary operator that adds /substracts checked/unchecked events
    totalCost = clicked.checked ? totalCost + eventCost
                                :  totalCost - eventCost;
    activitiesCost.innerHTML= `Total $${totalCost}`;
    
    // for(let i = 0; i< checkboxes.length; i++){
    //     if(clicked.getAttribute('data-day-and-time') && )
    // }
      
});
//Activities accesibility listener
activities.addEventListener('focusin', e => {
    /**
     * This event listener uses focusin instead of focus, because
     * the it bubbles, which is nedded since the event listene is usend activities which is the parentNode of all the checkboxes
     * 
     * Use tab to go DOWN the activities list and space bar to check which to attend
     * Use tab + shift go UP the list
     */
    let target = e.target;
    for(let i=0; i< checkboxes.length; i++){
        if(target == checkboxes[i]){
            checkboxes[i].parentNode.classList.add('focus');                  
        } else{
            checkboxes[i].parentNode.classList.remove('focus'); 
        }
    }  
})

payment.addEventListener('change', e => {
    let option = e.target.value;
    let paymentOptions = [creditCard, paypal, bitcoin];
    
    for(let i = 0; i< paymentOptions.length; i++){   
        if(option === paymentOptions[i].id ){
            paymentOptions[i].hidden = false;
        }else {
            paymentOptions[i].hidden = true;
        }
    } 
});
// Helper functions to Show or Hide Hints
function showHint(element){
   
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'inline-block';
}
function hideHint(element){
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
}    
//Individual validator function with accesibility feature to show or hide hints
const nameValidator = () => {
const nameIsValid = nameField.value.trim().length > 0

nameIsValid ? hideHint(nameField) : showHint(nameField);

return nameIsValid;
}

const emailValidator = () => {
const emailIsValid  = /^[^@]+@[^@]+\.[a-z]+$/i.test(email.value);

emailIsValid ? hideHint(email) : showHint(email);

return emailIsValid;
}
const activitiesValidator = () => {
let activityBox = document.getElementById('activities-box');
let activitiesIsValid = false;
if(totalCost > 0){
    activitiesIsValid = true
} 
activitiesIsValid ? hideHint(activityBox) : showHint(activityBox);
return activitiesIsValid;
}
// Validates the credit card information
const creditCardValidator = () => {
const cardNumIsValid = /^\d{13,16}$/.test(cardNum.value);
const zipCodeIsValid = /^\d{5}$/.test(zipCode.value)
const cvvIsValid = /^\d{3}$/.test(cvv.value);

cardNumIsValid ? hideHint(cardNum) : showHint(cardNum);
zipCodeIsValid ? hideHint(zipCode) : showHint(zipCode);
cvvIsValid     ? hideHint(cvv)     : showHint(cvv);
return cardNumIsValid && zipCodeIsValid && cvvIsValid;
}

form.addEventListener('submit', e => {
    if(!nameValidator()){
        e.preventDefault();     
    }
    if(!emailValidator()){
        e.preventDefault();
    }

    if(!activitiesValidator()){
        e.preventDefault();
    }
    if(payment.value === 'credit-card'){
        if(!creditCardValidator()){
            e.preventDefault();
        }  
    }
});

