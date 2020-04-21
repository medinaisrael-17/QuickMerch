$.get("/api/allusers").then(function (data) {


    makeTable(data);
})


function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '')

    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

    if (match) {
        return `(${match[1]})-${match[2]}-${match[3]}`
    }
    return phoneNumber;
}

function makeTable(data) {

    for (let i = 0; i < data.length; i++) {
        if (!data[i].isAdmin) {
            const formattedNumber = formatPhoneNumber(data[i].phoneNumber);
            const tableElement = $(`
            <tr>
                <td>${data[i].firstName} ${data[i].lastName}</td>
                <td><a href="mailto:${data[i].email}" target="_top">${data[i].email}</a></td>
                <td><a href="sms:+1${data[i].phoneNumber}">${formattedNumber}</a></td>
            </tr>
        `)
            $("#employeeTable").append(tableElement);
        }
        else {
            
        }
    }
}