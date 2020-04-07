$(document).ready(function () {
    console.log(navigator.userAgent);

    const visited = localStorage.getItem("visited");

    if (!visited) {
        alert("You haven't been here yet!");
        localStorage.setItem("visited", true);
    }

    // See if user is on Windows
    if (navigator.userAgent.indexOf("Android") !== -1) {
        alert("Welcome, Android user!");
    }
    // Then check for macOS
    else if (navigator.userAgent.indexOf("iPhone") !== -1) {
        alert("Welcome, iPhone user!");
    }
    // I give up
    else {
        alert("I don't know what you're using...");
    }


    const signUpForm = $("form.signup");
    const emailInput = $("input#email-input");
    const firstNameInput = $("input#firstName-input");
    const lastNameInput = $("input#lastName-input");
    const phoneInput = $("input#phone-input");
    const passwordInput = $("input#password-input");

    signUpForm.on("submit", function (event) {
        event.preventDefault();
        const userData = {
            email: emailInput.val().trim(),
            firstName: firstNameInput.val().trim(),
            lastName: lastNameInput.val().trim(),
            phoneNumber: phoneInput.val().trim(),
            password: passwordInput.val()
        };
        console.log(userData);

        if (!userData.email || !userData.firstName || !userData.lastName || !userData.phoneNumber || !userData.password) {
            return;
        }

        signUpUser(userData.email, userData.firstName, userData.lastName, userData.phoneNumber, userData.password);
        emailInput.val("");
        firstNameInput.val("");
        lastNameInput.val("")
        phoneInput.val("");
        passwordInput.val("");
    });

    function signUpUser(email, firstName, lastName, phone, password) {
        $.post("/api/signup", {
            email: email,
            name: name,
            firstName: firstName,
            lastName: lastName,
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

    $(document).on("click", ".fa-eye", function () {
        $("#password-input").attr("type", "text");
        $("#eye").removeClass("fa fa-eye");
        $("#eye").addClass("fa-eye-slash");
    })

    $(document).on("click", ".fa-eye-slash", function () {
        $("#password-input").attr("type", "password");
        $("#eye").removeClass("fa fa-eye-slash");
        $("#eye").addClass("fa fa-eye");
    })
})