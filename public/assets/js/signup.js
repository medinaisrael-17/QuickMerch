$(document).ready(function () {
    console.log(navigator.userAgent);

    const visited = localStorage.getItem("visited");

    if (!visited) {
        $("#initial-modal").modal('show');
    }

    $("#next-button").click(function () {
        $("#initial-modal").modal("hide");
        
        // See if user is on Windows
        if (navigator.userAgent.indexOf("Android") !== -1) {
            $("#android-modal-1").modal("show");
            localStorage.setItem("visited", true);
        }
        // Then check for macOS
        else if (navigator.userAgent.indexOf("iPhone") !== -1) {
            $("#iphone-modal-1").modal("show");
            localStorage.setItem("visited", true);
        }
        // I give up
        else {
            alert("I don't know what you're using...");
        }
    });




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
            $("#alert .msg").text("Please Fill Every Field.");
            $("#alert").fadeIn(500);
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
        console.log(err);

        const strErr = JSON.stringify(err.responseJSON);
        const actaulErr = JSON.parse(strErr);

        if (actaulErr.errors[0].message == "users.email must be unique") {
            console.log("In err");
            $("#alert .msg").text("Account Found! Please Log In.");
            $("#alert").fadeIn(500);
            return;
        };
        
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