// makeCards();

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
            console.log(data);
            resolve(data);
        })
    })
}

async function makeCards(id) {
    $("#showCards").html("");


    const routeData = await getIndRoutes(id);

    console.log(routeData);

    let firstName = routeData.firstName;

    let lastName = routeData.lastName;

    let loopThru = routeData.Routes;

    if(loopThru.length === 0) {
        const h1 = $(`<h1>${firstName} ${lastName} Has No Routes Assigned</h1>`);

        $("#showCards").append(h1);
    }

    for (let i = 0; i < loopThru.length; i++) {
        try {
            if (loopThru[i].isAssigned && !loopThru[i].completed) {

                const assingedCard = $(`
                    <div class="card assigned-card incomplete">
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
                    <div class="card assigned-card complete">
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
            console.log("error");
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

    console.log(assinger);

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
    location.reload()
})
