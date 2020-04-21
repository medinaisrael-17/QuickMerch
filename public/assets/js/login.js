$(document).ready(function () {

    const loginForm = $("form.login");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");


    $("#email-input").change(function(e) {
        if ($("#email-input").val() == "isrmed_34@yahoo.com") {
            $("#admin").css("display", "inline");
            $("#adminLabel").css("display", "inline");
        }
    })
 
    loginForm.on("submit", function (event) {
        event.preventDefault();

        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val()
        }

        if (!userData.email || !userData.password) {
            $("#alert .msg").text("Please Fill Every Field.");
            $("#alert").fadeIn(500);
            return;
        }

        loginUser(userData.email, userData.password)
        emailInput.val("");
        passwordInput.val("");
    })

    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        })
            .then(function () {
                if ($("#admin").prop("checked") == true) {
                    window.location.replace("/admin/home")
                }
                else if ($("#admin").prop("checked") == false) {
                    window.location.replace("/home")
                }
            })
            .catch(handleLoginErr)
    }

    function handleLoginErr(err) {
        console.log(err);

        if (err.status == 401) {
            
            $("#alert .msg").text("Incorrect Username or Password!");
            $("#alert").fadeIn(500);
            return;
        }
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