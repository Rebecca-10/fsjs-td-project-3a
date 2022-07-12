console.log('Test');


(function () {
        "use strict";
        
        function EnableJobRoleInteraction() {
            const $yourJobRoleInput = $("#your-job-role");
            const $jobTitleSelect = $("#title");

            function ShowOrHideYourJobRoleDependingOnSelection() {
                $yourJobRoleInput.toggle($jobTitleSelect.val() === "other");
            }
           
            $jobTitleSelect.on("change", ShowOrHideYourJobRoleDependingOnSelection);
            ShowOrHideYourJobRoleDependingOnSelection();
        }
        
        function EnableTShirtDesignsAndColorsInteraction() {
            const $designSelect = $("#design");
            const $colorSelect = $("#color");
           
            const $placeholderOption = $('<option>Please select a T-shirt theme</option>');
            $colorSelect.prepend($placeholderOption);

            function MakeColorsVisibleByDesign(design) {
                let options = $colorSelect.children();
                for (let i = 0; i < options.length; i++) {
                    let $option = $(options[i]);
                    $option.toggle($option.data("belongstoshirt") === design);
                }
                $placeholderOption.toggle(design === "Select Theme");
                
                $colorSelect.val($colorSelect.find("option:visible")[0].value);
            }
            
            $designSelect.on("change", () => {     MakeColorsVisibleByDesign($designSelect.val());
            });
           
            MakeColorsVisibleByDesign($designSelect.val());
        }
       
        function EnableTShirtDesignsAndColorsInteraction_ExceedingExpectations() {
            const $designSelect = $("#design");
            const $colorSelect = $("#color");
            const $colorSelectLabel = $("label[for='color']");
            
            const $placeholderOption = $('<option>Please select a T-shirt theme</option>');
            $colorSelect.prepend($placeholderOption);

            function MakeColorsVisibleByDesign(design) {
                let options = $colorSelect.children();

                for (let i = 0; i < options.length; i++) {
                    let $option = $(options[i]);

                    $option.toggle($option.data("belongstoshirt") === design);
                }

               
                if (design === "Select Theme") {
                    $colorSelect.hide();
                    $colorSelectLabel.hide();
                } else {

                    for (let i = 0; i < options.length; i++) {
                        let $option = $(options[i]);

                        $option.toggle($option.data("belongstoshirt") === design);
                    }

                    if (design !== "Select Theme") {
                        $colorSelect.show();
                        $colorSelectLabel.show();
                        $colorSelect.val($colorSelect.find("option:visible")[0].value);
                    }
                }
                
                $designSelect.on("change", () => {
                    MakeColorsVisibleByDesign($designSelect.val());
                });
                MakeColorsVisibleByDesign($designSelect.val());
            }
           
            function EnableActivitySelectionAndTimeslots() {
                const $activityFieldset = $(".activities");
                const $activityCheckboxes = $('.activities input[type="checkbox"]');
                
                function UsedTimeslots() {
                    let result = [];
                    for (let i = 0; i < $activityCheckboxes.length; i++) {
                        let $checkbox = $($activityCheckboxes[i]);
                        let checkboxIsChecked = $checkbox.prop("checked");
                        let timeslot = $checkbox.data("timeslot");

                        if (checkboxIsChecked) {
                            result.push(timeslot);
                        }
                    }
                    return result;
                }

                function DisableActivitiesOnTimeslotsThatAreNotChecked(event) {
                   
                    if (event !== undefined) event.stopPropagation();
                    let usedTimeslots = UsedTimeslots();
                    for (let i = 0; i < $activityCheckboxes.length; i++) {
                        let $checkbox = $($activityCheckboxes[i]);
                        let $label = $checkbox.closest("label");
                        let checkboxIsChecked = $checkbox.prop("checked");
                        let timeslot = $checkbox.data("timeslot");

                        let shouldBeDisabled = usedTimeslots.indexOf(timeslot) > -1 && !checkboxIsChecked;
                        $checkbox.prop("disabled", shouldBeDisabled);
                        $label.toggleClass("label--inactive", shouldBeDisabled);
                    }
                }
                $activityFieldset.on("click", DisableActivitiesOnTimeslotsThatAreNotChecked);
                DisableActivitiesOnTimeslotsThatAreNotChecked();
            }
           
            function EnableActivityCostCalculation() {
                const $activityFieldset = $(".activities");
                const $activityCheckboxes = $('.activities input[type="checkbox"]');
             
                const $totalCostControl = $(`
        <div class="totalCost">
            <span class="totalCost__label">Total:</span>
            <span class="totalCost__cost">$0</span>
        </div>
        `);
                $activityFieldset.append($totalCostControl);

                function TotalCost() {
                    let result = 0;
                    for (let i = 0; i < $activityCheckboxes.length; i++) {
                        let $checkbox = $($activityCheckboxes[i]);
                        let checkboxIsChecked = $checkbox.prop("checked");
                        let cost = parseInt($checkbox.data("cost"), 10);

                        if (checkboxIsChecked) {
                            result += cost;
                        }
                    }
                    return result;
                }

                function UpdateTotalCost() {
                    $totalCostControl.find(".totalCost__cost").text("$" + TotalCost().toString());
                }
                $activityFieldset.on("click", UpdateTotalCost);
                UpdateTotalCost();
            }
            
            function EnablePaymentSectionDisplay() {
                const $paymentSelect = $("#payment");
                const options = $paymentSelect.children();

                function HideAll() {
                    for (let i = 0; i < options.length; i++) {
                        $("." + $(options[i]).data("connectedtocssclass")).hide();
                    }
                }

                function ShowSelectedPaymentSection() {
                    HideAll();
                    let selectedOption = $paymentSelect.find("option:selected");
                    let cssClass = "." + $(selectedOption).data("connectedtocssclass");
                    $(cssClass).show();
                }
                $paymentSelect.on("change", ShowSelectedPaymentSection);
                ShowSelectedPaymentSection();
            }
            
            function EnableFormValidation() {
                const $form = $("form");
               
                const rules = [];
               
                const validationControls = [];
               
                const validatedControlSelectors = [];
              
                $form.attr("novalidate", "novalidate");
               
                function OnlyDigits(text) {
                    var validCharacters = "1234567890";
                    for (let i = 0; i < text.length; i++) {
                        if (validCharacters.indexOf(text[i]) === -1) {
                            return false;
                        }
                    }
                    return true;
                }

                function RegisterValidationControlFor(selector, controlId, $control) {
                    const newControlInfo = {
                        for: selector,
                        name: controlId,
                        $control: $control
                    };
                    if ($control === undefined) {
                        newControlInfo.$control = $(controlId);
                    }
                    validationControls.push(newControlInfo);
                    validatedControlSelectors.push(selector);
                }

                function AppendValidationControlFor(selector) {
                    let controlId = '#validationControl_' + (validationControls.length + 1).toString();
                    let $control = $('<div id="' + controlId + '" class="validationControl" data-validatorFor="' + selector + '"></div>');
                    $control.insertAfter($(selector));
                    RegisterValidationControlFor(selector, controlId, $control);
                }

                function ShowValidationMessage(forSelector, message) {
                    
                    let messageHtml = $('<div/>').text(message).html().replace(/\n/g, "<br/>");
                    for (let i = 0; i < validationControls.length; i++) {
                        if (validationControls[i].for === forSelector) {
                            validationControls[i].$control.html(messageHtml);
                        }

                    }
                }

                function IsFormValid() {
                    $(".validationControl").html("");

                    let result = true;
                    for (let i = 0; i < rules.length; i++) {
                        let evaluatedRule = rules[i]();
                        if (evaluatedRule.for !== undefined) {
                            ShowValidationMessage(evaluatedRule.for, evaluatedRule.message);
                            result = false;
                        }
                    }
                    if (result === false) {
                        $("#registerButtonValidationControl").text("Sorry, there are still warnings. Please correct your data before submitting.");
                        window.setTimeout(() => {
                            $("#registerButtonValidationControl").text("");
                        }, 2000);
                    }
                    return result;
                }
               
                function PartialValidationFor(selector) {
                    console.log("executing partial validation for " + selector);
                    let $validator = $(".validationControl[data-validatorFor='" + selector + "']");
                    $validator.html("");

                    let result = true;
                    for (let i = 0; i < rules.length; i++) {
                        let evaluatedRule = rules[i]();
                        if (evaluatedRule.for === selector) {
                            ShowValidationMessage(evaluatedRule.for, evaluatedRule.message);
                        }
                    }
                }
                
                function AttachInstantValidationToDom() {
                    function AttachValidation(selector, validatedControlSelector) {
                        $(selector)
                            .on("blur", function (event) {
                                PartialValidationFor(validatedControlSelector);
                                event.stopPropagation();
                            })
                            .on("change", function (event) {
                                PartialValidationFor(validatedControlSelector);
                                event.stopPropagation();
                            })
                            .on("keyup", function (event) {
                                PartialValidationFor(validatedControlSelector);
                                event.stopPropagation();
                            })
                            .on("click", function (event) {
                                PartialValidationFor(validatedControlSelector);
                                event.stopPropagation();
                            });
                    };
                    for (let i = 0; i < validatedControlSelectors.length; i++) {
                        if (validatedControlSelectors[i] === ".activities") continue;
                        if (validatedControlSelectors[i] === ".credit-card-row1") continue; // its a virtual selector
                        AttachValidation(validatedControlSelectors[i], validatedControlSelectors[i]);
                    }
                    AttachValidation("#cc-num", ".credit-card-row1");
                    AttachValidation("#zip", ".credit-card-row1");
                    AttachValidation("#cvv", ".credit-card-row1");
                }
                AppendValidationControlFor("#name");
                AppendValidationControlFor("#email");
                RegisterValidationControlFor(".activities", "#registerActivitiesValidationControl");
                
                RegisterValidationControlFor(".credit-card-row1", "#cardnumber-zipcode-cvv-validation");
                AppendValidationControlFor("#payment");
               
                rules.push(() => {
                    if ($("#name").val() === "") {
                        return {
                            for: "#name",
                            message: "The name field shoudn't be blank."
                        };
                    }
                    return {};
                });
               
                rules.push(() => {
                    if ($("#email").val() === "") {
                        return {
                            for: "#email",
                            message: "The e-mail field is required. Please enter your email address."
                        };
                    }
                    const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                    if (!emailRegEx.test($("#email").val())) {
                        return {
                            for: "#email",
                            message: "The e-mail field does not contain a valid email address."
                        };
                    }
                    return {};
                });
                // check activity; at least one
                rules.push(() => {
                    if ($(".activities input:checked").length == 0) {
                        return {
                            for: ".activities",
                            message: "There should be at least one activity that is selected."
                        };
                    }
                    return {};
                });
             //more validation
                rules.push(() => {
                    let message = "";
                    if ($("#payment").val() !== "credit card") {
                        return {};
                    }
                    if ($("#cc-num").val().length < 13 ||
                        $("#cc-num").val().length > 16) {
                        message += "The credit card number should be between 13 and 16 numbers long.\n";
                    }
                    if (!OnlyDigits($("#cc-num").val())) {
                        message += "You have entered non-numerical characters into the credit card number.\n";
                    }
                    if ($("#zip").val().length !== 5) {
                        message += "The zip code should be 5 digits long.\n";
                    }
                    if (!OnlyDigits($("#zip").val())) {
                        message += "The zip code should contain only numerical characters.\n";
                    }
                    if ($("#cvv").val().length !== 3) {
                        message += "The cvv should be 3 digits long.\n";
                    }
                    if (!OnlyDigits($("#cvv").val())) {
                        message += "You have entered non-numerical characters into the cvv.\n";
                    }

                    if (message !== "") {
                        return {
                            for: ".credit-card-row1",
                            message: message.trim()
                        };
                    }
                    // split error message 
                    return {};
                });
                rules.push(() => {
                    if ($("#payment").val() === "select_method") {
                        return {
                            for: "#payment",
                            message: "Please select a payment method..."
                        };
                    }
                    return {};
                });
                // check that rules are applied 
                $form.on("submit", (event) => {
                    if (!IsFormValid()) {
                        event.preventDefault();
                    }
                });
                // more validation
                AttachInstantValidationToDom();
            }
            EnableJobRoleInteraction();
            // 
            EnableTShirtDesignsAndColorsInteraction_ExceedingExpectations();
            EnableActivitySelectionAndTimeslots();
            EnableActivityCostCalculation();
            EnablePaymentSectionDisplay();
            EnableFormValidation();
        })();
