$(document).ready(function () {
    // $(document).click("button", function(event) {
    //     event.preventDefault();
    // });

    const loginForm = $("form.login");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");

    loginForm.on("submit", function (event) {
        event.preventDefault();

        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val()
        }

        if (!userData.email || !userData.password) {
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
                else if($("#admin").prop("checked") == false) {
                    window.location.replace("/home")
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    $(document).on("click", ".fa-eye", function() {
        $("#password-input").attr("type", "text");
        $("#eye").removeClass("fa fa-eye");
        $("#eye").addClass("fa-eye-slash");
    })

    $(document).on("click", ".fa-eye-slash", function() {
        $("#password-input").attr("type", "password");
        $("#eye").removeClass("fa fa-eye-slash");
        $("#eye").addClass("fa fa-eye");
    })
})