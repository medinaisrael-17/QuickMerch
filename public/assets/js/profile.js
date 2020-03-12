$(document).ready(function () {
    $.get("/api/user_data").then(function (data) {
        $("#username").text(`${data.firstName} ${data.lastName}`);

        const formattedNumber = formatPhoneNumber(data.phoneNumber);

        $("#contact").text(formattedNumber);
        
        $("#userEmail").text(data.email);
    })

    function formatPhoneNumber(phoneNumber) {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '')

        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

        if (match) {
            return `(${match[1]})${match[2]}-${match[3]}`
        }
        return null;
    }
})



