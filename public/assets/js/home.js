$(document).ready(function () {

    let user_id;
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


    $.get("/api/user_data").then(function (data) {
        console.log(data);
        $("#username").text(data.name);
        user_id = data.id
        console.log(user_id);
        const userObj = {
            id: user_id
        }
        $.get("/api/user_routes", userObj).then(function (res) {
            console.log(res);
        })
    })


})



