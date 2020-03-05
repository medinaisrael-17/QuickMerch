$(document).ready(function () {
    $.get("/api/user_data").then(function (data) {
        console.log(data);
        $("#username").text(data.name);
        $("#contact").text(data.phoneNumber);
        $("#userEmail").text(data.email);
    })

    $.get("/api")
})



