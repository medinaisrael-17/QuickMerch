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
        if (data.email === "isrmed_34@yahoo.com") {
            window.location.replace("/admin/home");
        }
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
            return;
        }

        const incompleteArr = []

        for (let j = 0; j < data.length; j++) {
            if (!data[j].completed) {
                incompleteArr.push(data[j]);
            }
        }

        routePreviewDiv.html("");
        for (let i = 0; i < 3; i++) {
            if (incompleteArr[i].store === "H-E-B") {
                let img = $(`
                       <div class="myOverviewCard">
                       <img src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0002/3066/brand.gif?itok=lhacHCP3"
                           class="card-img-top" alt="store">
                       <div class="smallContent">
                           <h5>${incompleteArr[i].location}</h5>
                           <p class="smallText"><em><span class="time">${incompleteArr[i].time}</span></em></p>
                           <a href="/routes">Click for more...</a>
                       </div>
                   </div>
                       `);
                routePreviewDiv.append(img)
            }
            else if (incompleteArr[i].store === "Walmart") {
                let img = $(`
                       <div class="myOverviewCard">
                       <img src="data:image/png;base64,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"
                           class="card-img-top" alt="store">
                       <div class="smallContent">
                           <h5>${incompleteArr[i].location}</h5>
                           <p class="smallText"><em><span class="time">${incompleteArr[i].time}</span></em></p>
                           <a href="/routes">Click for more...</a>
                       </div>
                   </div>
                       `);
                routePreviewDiv.append(img);
            }
            else if (incompleteArr[i].store === "Randalls") {
                let img = $(`
                    <div class="myOverviewCard">
                    <img src="https://dynl.mktgcdn.com/p/UsjblGpF7V89qZ3q-qig9uyGjopHRek0GQqhTC05mGk/1746x1746.png"
                        class="card-img-top" alt="store">
                    <div class="smallContent">
                        <h5>${incompleteArr[i].location}</h5>
                        <p class="smallText"><em><span class="time">${incompleteArr[i].time}</span></em></p>
                        <a href="/routes">Click for more...</a>
                    </div>
                </div>
                    `)
                routePreviewDiv.append(img);
            }
        }

    }


})


