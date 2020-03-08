$(document).ready(function () {
    try {
        //display current date
        $("#date").text(moment().format("dddd, MMMM Do"));

        //display current time 
        const update = function () {
            const now = moment().format("h:mm a");
            $("#time").text(now);
        }

        setInterval(update, 1000);
    }
    catch {
        return;
    }

    const routePreviewDiv = $("#routePreview")


    $.get("/api/user_data").then(function (data) {
        console.log(data);
        $("#username").text(data.firstName);
        user_id = data.id
        console.log(user_id);

        $.get(`/api/user_routes/${user_id}`).then(function (res) {
            console.log(res);
            const routeData = res.Routes;
            loadCards(routeData);
        })
    })

    function loadCards(data) {
        console.log(data);

        if (data.length === 0) {
            routePreviewDiv.html("");
            let h1 = $(`<h1>No Routes Assigned</h1>`);
            routePreviewDiv.append(h1)
        }
        else {
            routePreviewDiv.html("");
            for (let i = 0; i < 3; i++) {
                if (data[i].completed === true) {
                    console.log("skip");
                }

                else {

                    if (data[i].store === "H-E-B") {
                        let img = $(`
                       <div class="myOverviewCard">
                       <img src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0002/3066/brand.gif?itok=lhacHCP3"
                           class="card-img-top" alt="store">
                       <div class="smallContent">
                           <h5>${data[i].location}</h5>
                           <p class="smallText"><em><span class="time">${data[i].time}</span></em></p>
                           <a href="/routes">Click for more...</a>
                       </div>
                   </div>
                       `);
                        routePreviewDiv.append(img)
                    }
                    else if (data[i].store === "Walmart") {
                        let img = $(`
                       <div class="myOverviewCard">
                       <img src="https://www.usaddress.com/blog/wp-content/uploads/2019/06/Walmart-Logo.jpg"
                           class="card-img-top" alt="store">
                       <div class="smallContent">
                           <h5>${data[i].location}</h5>
                           <p class="smallText"><em><span class="time">${data[i].time}</span></em></p>
                           <a href="/routes">Click for more...</a>
                       </div>
                   </div>
                       `);
                        routePreviewDiv.append(img);
                    }
                    else if (data[i].store === "Randalls") {
                        let img = $(`
                    <div class="myOverviewCard">
                    <img src="https://dynl.mktgcdn.com/p/UsjblGpF7V89qZ3q-qig9uyGjopHRek0GQqhTC05mGk/1746x1746.png"
                        class="card-img-top" alt="store">
                    <div class="smallContent">
                        <h5>${data[i].location}</h5>
                        <p class="smallText"><em><span class="time">${data[i].time}</span></em></p>
                        <a href="/routes">Click for more...</a>
                    </div>
                </div>
                    `)
                        routePreviewDiv.append(img);
                    }
                }

            }
        }

    }



})



