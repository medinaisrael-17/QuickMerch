$(document).ready(function () {

    const overViewDiv = $("#overview");

    let routeData;

    $.get("/api/user_data").then(function (data) {
        console.log(data);
        $("#username").text(data.name);

        const user_id = data.id;

        $.get(`/api/user_routes/${user_id}`).then(function (res) {
            console.log(res);
            routeData = res.Routes;
            $("#myButton").text("Show Completed Routes");

            if (routeData.length === 0) {
                overViewDiv.html("");
                const h1 = $(`<h1>No Routes Assigned</h1>`);
                overViewDiv.append(h1)
            }

            loadIncompleted(routeData);
        })
    })

    $("#myButton").click(function () {
        const status = $(this).attr("status");
        console.log("clicked");
        if (status === "incomplete") {
            $(this).attr("status", "complete");
            $(this).text("Show Incomplete Routes");
            loadCompleted(routeData);
        }
        else {
            $(this).attr("status", "incomplete")
            $(this).text("Show Completed Routes");
            loadIncompleted(routeData);
        }

    });

    $(document).on("click", ".complete", function () {
        const id = $(this).attr("id");
        $.put(`/api/routes/${id}`, {status: true}).then(loadIncompleted(routeData));
    })

    function loadCompleted(data) {
        const completedData = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].completed) {
                completedData.push(data[i]);
            }
        }
        loadCards(completedData, "Completed");
    }

    function loadIncompleted(data) {
        const incompleteData = [];
        for (let i = 0; i < data.length; i++) {
            if (!data[i].completed) {
                incompleteData.push(data[i]);
            }
        };
        loadCards(incompleteData, "Incomplete");
    }

    function loadCards(data, status) {
        // console.log(data);
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
                ${data[i].completed ? `<button class='btn btn-secondary complete'id=${data[i].id}>UNDO</button>` : `<button class='btn btn-success complete'id=${data[i].id}>COMPLETE</button>`}
            </div>
        </div>
                    `)
                overViewDiv.append(card)
            }
            else if (data[i].store === "Walmart") {
                const card = $(`
                    <div class="card">
            <img class="storeImage"
                src="https://www.usaddress.com/blog/wp-content/uploads/2019/06/Walmart-Logo.jpg">
            <div class="content">
                <h6 class="location">${data[i].location}</h6>
                <hr>
                <p class="arrive"><strong>Arrive at: </strong> <em><span class="time">${data[i].time}</span></em></p>
                <p class="product"><strong>Product:</strong> <em><span class="toDo">${data[i].product}</span></em> </p>
                ${data[i].completed ? `<button class='btn btn-secondary complete'id=${data[i].id}>UNDO</button>` : `<button class='btn btn-success complete'id=${data[i].id}>COMPLETE</button>`}
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
                ${data[i].completed ? `<button class='btn btn-secondary complete'id=${data[i].id}>UNDO</button>` : `<button class='btn btn-success complete'id=${data[i].id}>COMPLETE</button>`}  
            </div>
        </div>
                    `)
                overViewDiv.append(card);
            }
        }


    }
})



