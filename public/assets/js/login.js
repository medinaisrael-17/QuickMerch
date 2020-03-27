$(document).ready(function () {
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
})