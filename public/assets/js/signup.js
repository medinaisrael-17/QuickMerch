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
            $("#computer-modal-1").modal("show");
            localStorage.setItem("visited", true);
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

        userData.firstName = nameCase(userData.firstName);

        userData.lastName = nameCase(userData.lastName);

        if (!userData.email || !userData.firstName || !userData.lastName || !userData.phoneNumber || !userData.password) {
            $("#alert .msg").text("Please Fill Every Field.");
            $("#alert").fadeIn(500);
            return;
        }

        if (!verifyPassword(userData.password)) {
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

        $("#alert .msg").text("Account Found! Please Log In.");
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

    function nameCase(word) {

        const eachLetter = word.split("")

        eachLetter[0] = eachLetter[0].toUpperCase();

        for (let i = 1; i < eachLetter.length; i++) {
            eachLetter[i] = eachLetter[i].toLowerCase();
        };

        return eachLetter.join("");
    }

    function verifyPassword(password) {

        const upperCasedCharacters = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z'
        ];

        const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        let hasNum = false;

        let hasUpper = false;

        const eachChar = password.split("");

        if (eachChar.length < 8) {
            $("#alert .msg").text("Password Must Be At Least 8 Characters.");
            $("#alert").fadeIn(500);
            return false;
        }

        for (let i = 0; i < eachChar.length; i++) {
            if (numericCharacters.indexOf(eachChar[i]) !== -1) {
                hasNum = true;
            }
            if (upperCasedCharacters.indexOf(eachChar[i]) !== -1) {
                hasUpper = true;
            }
        }

        if (hasUpper && hasNum) {
            return true;
        }

        else {
            $("#alert .msg").text("Password Must Contain A Number And A Capital Letter.");
            $("#alert").fadeIn(500);
            return false
        }

    }
})