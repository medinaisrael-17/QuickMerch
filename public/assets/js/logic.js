//display current date
$("#date").text(moment().format("dddd, MMMM Do"));

//display current time 
const update = function () {
    const now = moment().format("h:mm a")
    $("#time").text(now)
}

setInterval(update, 1000)
