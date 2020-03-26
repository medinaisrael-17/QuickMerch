$(document).ready(pageLoad());

async function pageLoad() {
    // targets the overview div
    const overViewDiv = $("#overview");

    //this is where we will hold our route data
    let routeData;

    //this is where we will hold our user's id
    let user_id;

    //this deconstructs the id from our api call
    const { id } = await getUserdata();

    //sets our global user_id to what we deconstructed
    user_id = id;

    //wait for the set route function 
    await setRoutes(user_id);


    console.log(routeData);

    //if no data then display that on the page
    if (routeData.length === 0) {
        overViewDiv.html("");
        const h1 = $(`<h1>No Routes Assigned</h1>`);
        overViewDiv.append(h1)
    }

    //run the loadIncompleted function to generate the cards
    loadIncompleted(routeData);

    //anytime the button at the top is clicked
    $("#myButton").click(function () {
        const status = $(this).attr("status");

        //and if the status attr is incomplete
        if (status === "incomplete") {
            // change to complete
            $(this).attr("status", "complete");
            $(this).text("Show Incomplete Routes");
            //load the completed routes
            loadCompleted(routeData);
        }
        else {
            //change to incomplete 
            $(this).attr("status", "incomplete")
            $(this).text("Show Completed Routes");
            //load incompleted routes
            loadIncompleted(routeData);
        }

    });

    //my .then function in the complete/undo button wasn't working as 
    //intended due to async issue, so I created one that 
    //waits on the data to be set
    async function updatePage(cb) {
        await getRoutes(user_id);
        await setRoutes(user_id);
        cb(routeData);
    }

    //handle the completion
    $(document).on("click", ".complete", function () {
        const id = $(this).attr("id");
        $.ajax({
            url: `/api/routes/${id}`,
            method: "PUT",
            data: { status: true },

        }).then(updatePage(loadIncompleted));
    });

    //handle undoing 
    $(document).on("click", ".undo", function () {
        const id = $(this).attr("id");
        $.ajax({
            url: `api/routes/${id}`,
            method: "PUT",
            data: { status: false }
        }).then(updatePage(loadCompleted));
    })

    //async function to set out routeData
    async function setRoutes(id) {
        //deconstruct the Routes info from the getRoutes function
        const { Routes } = await getRoutes(id);

        //set our global routeData variable to this
        routeData = Routes;

        //return it
        return routeData;
    }

    //gets the user data from our database in an axios call 
    function getUserdata() {
        return new Promise((resolve, reject) => {
            $.get("/api/user_data").then(data => {
                resolve(data);
            })
        });
    }

    //get the routes from our database who its assigned to 
    function getRoutes(id) {
        return new Promise((resolve, reject) => {
            $.get(`/api/user_routes/${id}`).then(data => {
                resolve(data);
            });
        });
    }

    //loads the completed routes 
    function loadCompleted(data) {
        const completedData = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].completed) {
                completedData.push(data[i]);
            }
        }
        // passes it to our loadCards
        loadCards(completedData, "Completed");
    }


    //loads the incompleted routes
    function loadIncompleted(data) {
        const incompleteData = [];
        for (let i = 0; i < data.length; i++) {
            if (!data[i].completed) {
                incompleteData.push(data[i]);
            }
        };
        // passes it to our loadCards
        loadCards(incompleteData, "Incomplete");
    }

    //creates cards and takes into account their status
    function loadCards(data, status) {
        overViewDiv.html("");

        const heading = $(`
            <h4>${status} Routes</h4>
            <hr>
            `)

        overViewDiv.append(heading);

        for (let i = 0; i < data.length; i++) {
            if (data[i].store === "H-E-B") {
                const card = $(`
                    <div class="card">
            <img class="storeImage"
                src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0002/3066/brand.gif?itok=lhacHCP3">
            <div class="content">
                <h6 class="location">${data[i].location}</h6>
                <hr>
                <p class="arrive"><strong>Arrive at: </strong> <em><span class="time">${data[i].time}</span></em></p>
                <p class="product"><strong>Product:</strong> <em><span class="toDo">${data[i].product}</span></em> </p>
                ${data[i].completed ? `<button class='btn btn-secondary undo'id=${data[i].id}>UNDO</button>` : `<button class='btn btn-success complete'id=${data[i].id}>COMPLETE</button>`}
            </div>
        </div>
                    `)
                overViewDiv.append(card)
            }
            else if (data[i].store === "Walmart") {
                const card = $(`
                    <div class="card">
            <img class="storeImage"
                src="data:image/png;base64,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">
            <div class="content">
                <h6 class="location">${data[i].location}</h6>
                <hr>
                <p class="arrive"><strong>Arrive at: </strong> <em><span class="time">${data[i].time}</span></em></p>
                <p class="product"><strong>Product:</strong> <em><span class="toDo">${data[i].product}</span></em> </p>
                ${data[i].completed ? `<button class='btn btn-secondary undo'id=${data[i].id}>UNDO</button>` : `<button class='btn btn-success complete'id=${data[i].id}>COMPLETE</button>`}
            </div>
        </div>
                    `)
                overViewDiv.append(card);
            }
            else if (data[i].store === "Randalls") {
                const card = $(`
                    <div class="card">
            <img class="storeImage"
                src="https://dynl.mktgcdn.com/p/UsjblGpF7V89qZ3q-qig9uyGjopHRek0GQqhTC05mGk/1746x1746.png">
            <div class="content">
                <h6 class="location">${data[i].location}</h6>
                <hr>
                <p class="arrive"><strong>Arrive at: </strong> <em><span class="time">${data[i].time}</span></em></p>
                <p class="product"><strong>Product:</strong> <em><span class="toDo">${data[i].product}</span></em> </p>
                ${data[i].completed ? `<button class='btn btn-secondary undo'id=${data[i].id}>UNDO</button>` : `<button class='btn btn-success complete'id=${data[i].id}>COMPLETE</button>`}  
            </div>
        </div>
                    `)
                overViewDiv.append(card);
            }
        }


    }

}

