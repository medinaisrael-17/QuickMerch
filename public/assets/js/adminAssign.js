makeCards();

populate();

function getRoutes() {
    // $.get("/api/allroutes").then(function (data) {
    //     // console.log(data);
    //     return data
    // })

    return new Promise((resolve, reject) => {
        $.get(`/api/allroutes`).then(data => {
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

async function makeCards() {
    $("#showCards").html("");


    const routeData = await getRoutes()

    console.log(routeData);

    for (let i = 0; i < routeData.length; i++) {
        try {
            if (routeData[i].isAssigned && !routeData[i].completed) {
                const { firstName, lastName } = await getUserInfo(routeData[i].UserId);

                console.log(`${firstName} ${lastName}`);

                const assingedCard = $(`
                    <div class="card assigned-card">
                        <section class="left">
                            <h6>${routeData[i].store}</h6>
                            <p>${routeData[i].location}</p>
                            <p>${routeData[i].time}</p>
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
            const employeeOption = $(`<option value=${employeeData[i].id}>${employeeData[i].firstName} ${employeeData[i].lastName}</option>`)
            $("#employeeSelect").append(employeeOption);
        }

    }
}

$("#myButton").on("click", function() {
    const assinger = {
        user_id: $("#employeeSelect").val(),
        id: $("#routeSelect").val()
    }

    console.log(assinger);

    $.ajax({
        method: "PUT",
        url: `/api/routes/`,
        data: assinger
    }).then(function(event) {
        event.preventDefault();
        $("#successModal").modal("show");
    })
})
