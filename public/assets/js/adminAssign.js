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

makeCards()

function getUserInfo(id) {
    return new Promise((resolve, reject) => {
        $.get(`/api/user/${id}`).then(data => {
            console.log(data);
            resolve(data);
        })
    })
}

async function makeCards() {
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

                $("#assignedRoutes").append(assingedCard);
            }
        }
        catch {
            console.log("error");
        }

    }
}
