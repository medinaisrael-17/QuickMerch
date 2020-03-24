for (let i = 0; i < 60; i++) {
    if (i < 10) {
        i = "0" + i
    }

    const timeEl = $(`<option value=${i}> ${i} </option>`)

    $("#minute").append(timeEl);
}

getExistingRoutes();

function getExistingRoutes() {
    $.get("/api/allroutes").then(function (data) {
        console.log(data);
        makeTable(data)
    })
}

function makeTable(data) {
    $("#routesTable").html("")

    const tableHeading = $(`
    <tr>
        <th>
        Store
        </th>
        <th>
        Location
        </th>
        <th>
        Arranged Time
        </th>
        <th>
        Product
        </th>
    </tr> 
    `)


    $("#routesTable").append(tableHeading);


    for (let i = 0; i < data.length; i++) {
        const tableElement = $(`
            <tr>
               <td>${data[i].store}</td>
               <td>${data[i].location}</td>
               <td>${data[i].time}</td>
               <td>${data[i].product}</td>
            </tr>
        `)
        $("#routesTable").append(tableElement);
    }
}

$("#myButton").on("click", function (e) {
    e.preventDefault();

    const hour = $("#hour").val();
    const minute = $("#minute").val();
    const meridiem = $("#meridiem").val();

    const routeTime = `${hour}:${minute} ${meridiem}`

    const newRoute = {
        store: $("#storeSelector").val(),
        location: $("#storeLocation").val().trim(),
        time: routeTime,
        product: $("#storeProduct").val().trim()
    }

    console.log(newRoute);

    $.post("/api/routes", newRoute).then(function () {
        getExistingRoutes();
        $("#storeSelector").val("");
        $("#storeLocation").val("");
        $("#hour").val("7");
        $("#minute").val("00");
        $("#meridiem").val("AM");
        $("#storeProduct").val("");
    })
})