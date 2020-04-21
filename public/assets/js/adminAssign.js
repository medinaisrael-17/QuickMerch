populate();

$("#cardShowSelect").change(function () {
    let user_id = $("#cardShowSelect").val();


    makeCards(user_id);
})

function getRoutes() {
    return new Promise((resolve, reject) => {
        $.get(`/api/allroutes`).then(data => {
            resolve(data);
        })
    })
}

function getIndRoutes(id) {
    return new Promise((resolve, reject) => {
        $.get(`/api/user_routes/${id}`).then(data => {
            resolve(data);
        })
    })
}

function getEmployees() {
    return new Promise((resolve, reject) => {
        $.get(`/api/allusers`).then(data => {
            resolve(data);
        })
    })
}

function getUserInfo(id) {
    return new Promise((resolve, reject) => {
        $.get(`/api/user/${id}`).then(data => {
            resolve(data);
        })
    })
}

async function makeCards(id) {
    $("#showCards").html("");


    const routeData = await getIndRoutes(id);

    let firstName = routeData.firstName;

    let lastName = routeData.lastName;

    let loopThru = routeData.Routes;

    if (loopThru.length === 0) {
        const h1 = $(`<h1>${firstName} ${lastName} Has No Routes Assigned</h1>`);

        $("#showCards").append(h1);
    }

    for (let i = 0; i < loopThru.length; i++) {
        try {
            if (loopThru[i].isAssigned && !loopThru[i].completed) {

                const assingedCard = $(`
                    <div class="card assigned-card incomplete" data-route-id=${loopThru[i].id} data-user-id=${routeData.id}>
                        <section class="left">
                            <h6>${loopThru[i].store}</h6>
                            <p class="location">${loopThru[i].location}</p>
                            <p>${loopThru[i].time}</p>
                            <i class="fas fa-exchange-alt assigner"></i>
                        </section>
                        <section class="right">
                            <img class="profilePicture" src="/assets/images/defaultProfile.png" />
                            <h6>${`${firstName} ${lastName}`}</h6>
                        </section>
                    </div>
                `)

                $("#showCards").append(assingedCard);
            }
            else if ((loopThru[i].isAssigned && loopThru[i].completed)) {

                const assingedCard = $(`
                    <div class="card assigned-card complete" data-route-id=${loopThru[i].id} data-user-id=${routeData.id}>
                        <section class="left">
                            <h6>${loopThru[i].store}</h6>
                            <p class="location">${loopThru[i].location}</p>
                            <p>${loopThru[i].time}</p>
                            <i class="fas fa-exchange-alt assigner"></i>
                        </section>
                        <section class="right">
                            <img class="profilePicture" src="/assets/images/defaultProfile.png" />
                            <h6>${`${firstName} ${lastName}`}</h6>
                        </section>
                    </div>
                `)

                $("#showCards").append(assingedCard);
            }
        }
        catch {
            console.log(err);
        }

    }
}

async function populate() {
    $("#routeSelect").html("")
    $("#employeeSelect").html("")
    $("#cardShowSelect").html("")

    const routeData = await getRoutes();
    for (let i = 0; i < routeData.length; i++) {
        try {
            if (!routeData[i].isAssigned) {
                const routeOption = $(`<option value=${routeData[i].id}>${routeData[i].store} | ${routeData[i].location} | ${routeData[i].time}</option>`);
                $("#routeSelect").append(routeOption);
            }
        }
        catch{
            console.log(err);
        }
    }

    const employeeData = await getEmployees()

    for (let i = 0; i < employeeData.length; i++) {
        if (!employeeData[i].isAdmin) {
            const employeeOption = $(`<option value=${employeeData[i].id}>${employeeData[i].firstName} ${employeeData[i].lastName}</option>`);
            $("#employeeSelect").append(employeeOption);
        }
    }

    const initialOpt = `<option value="none" selected disabled hidden> Select an Employee </option> `;

    $("#cardShowSelect").append(initialOpt);

    for (let i = 0; i < employeeData.length; i++) {
        if (!employeeData[i].isAdmin) {
            const employeeOption = $(`<option value=${employeeData[i].id}>${employeeData[i].firstName} ${employeeData[i].lastName}</option>`);
            $("#cardShowSelect").append(employeeOption);
        }
    }
}

$(".assignButton").on("click", function (event) {
    event.preventDefault();
    const assinger = {
        user_id: $("#employeeSelect").val(),
        id: $("#routeSelect").val()
    }

    $.ajax({
        method: "PUT",
        url: `/api/routes/`,
        data: assinger
    }).then(function (data) {
        $("#successModal").modal("show");
        populate();
        $("#cardShowSelect").val($("#employeeSelect").val());
    })
})

$(".refreshButton").on("click", function () {
    window.location.reload()
})

$("#showCards").on("click", ".card", function (e) {
    e.stopPropagation();

    let userID = $(this).attr("data-user-id");

    let routeID = $(this).attr("data-route-id");

    let store = $(this).children(".left").children("h6").text();

    let location = $(this).children(".left").children(".location").text();

    let name = $(this).children(".right").children("h6").text();

    $("#unassignModal .modal-body").html(`<p>Are you sure you want to unassign <span class="modal-store">${store}</span> on <span class="modal-location">${location}</span> from <span class="modal-name">${name}</span>?</p>`);

    $("#unassignModal").modal("show");

    $(".unassign").click(function () {

        const data = {
            id:routeID
        };

        $.ajax({
            method: "PUT",
            url: "/api/unassign",
            data: data
        }).then(function() {
            routeID = '';
            userID = '';

            $("#unassignModal").modal("hide");

            window.location.reload();
            
        })
    })

})