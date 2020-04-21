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

        makeTable(data);


        $("#routeSelect").html("");

        const initialOpt = `<option value="none" selected disabled hidden> Select a Route </option> `

        $("#routeSelect").append(initialOpt);

        for (let i = 0; i < data.length; i++) {
            try {
                const routeOption = $(`<option value=${data[i].id}>${data[i].store} | ${data[i].location} | ${data[i].time}</option>`);
                $("#routeSelect").append(routeOption);
            }
            catch{
                console.log(err);
            }
        }
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

$(".delete-route").click(function(e){
    e.preventDefault();

    id = $("#routeSelect").val();

    $.ajax({
        method: "DELETE",
        url: `/api/routes/${id}`
    }).then(function(data) {
        window.location.reload();
    })
}) 

$(".CREATE").on("click", function (e) {
    e.preventDefault();

    if (!$("#storeLocation").val() || !$("#storeProduct").val()) {
        $("#failureModal").modal("show");
        return;
    }

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

    $.post("/api/routes", newRoute).then(function () {
        getExistingRoutes();
        $("#successModal").modal("show");
        $("#storeSelector").val("");
        $("#storeLocation").val("");
        $("#hour").val("7");
        $("#minute").val("00");
        $("#meridiem").val("AM");
        $("#storeProduct").val("");
    })
})