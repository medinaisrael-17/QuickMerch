$(document).ready(function () {
    const signUpForm = $("form.signup");
    const emailInput = $("input#email-input");
    const nameInput = $("input#name-input");
    const phoneInput = $("input#phone-input");
    const passwordInput = $("input#password-input");

    signUpForm.on("submit", function (event) {
        event.preventDefault();
        const userData = {
            email: emailInput.val().trim(),
            name: nameInput.val().trim(),
            phoneNumber: phoneInput.val().trim(),
            password: passwordInput.val()
        };
        console.log(userData);

        if (!userData.email || !userData.name || !userData.phoneNumber || !userData.password) {
            return;
        }

        signUpUser(userData.email, userData.name, userData.phoneNumber, userData.password);
        emailInput.val("");
        nameInput.val("");
        phoneInput.val("");
        passwordInput.val("");
    });

    function signUpUser(email, name, phone, password) {
        $.post("/api/signup", {
            email: email,
            name: name,
            phoneNumber: phone,
            password: password
        }).then(function (data) {
            window.location.replace("/home");
        })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
})