$(document).ready(function () {
    $.get("/api/user_data").then(function (data) {
        console.log(data);
        $("#username").text(`${data.firstName} ${data.lastName}`);
        $("#contact").text(data.phoneNumber);
        $("#userEmail").text(data.email);
    })

    $.get("/api");
})



