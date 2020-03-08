$(document).ready(function () {

    const overViewDiv = $("#overview");

    $.get("/api/user_data").then(function (data) {
        console.log(data);
        $("#username").text(data.name);

        const user_id = data.id;

        $.get(`/api/user_routes/${user_id}`).then(function (res) {
            console.log(res);
            const routeData = res.Routes;
            loadCards(routeData);
        })
    })

    function loadCards(data) {
        console.log(data);

        if (data.length === 0) {
            overViewDiv.html("");
            const h1 = $(`<h1>No Routes Assigned</h1>`);
            overViewDiv.append(h1)
        }
        else {
            overViewDiv.html("");

            const heading = $(`
            <h4>All routes</h4>
            <hr>
            `)

            overViewDiv.append(heading);
            for (let i = 0; i < 3; i++) {
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
                ${data[i].completed ? "" : "<button class='btn btn-success complete'>COMPLETE</button>"}
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
                <button class="btn btn-success complete">COMPLETE</button>  
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
                <button class="btn btn-success complete">COMPLETE</button>  
            </div>
        </div>
                    `)
                    overViewDiv.append(card);
                }
            }
        }

    }
})



