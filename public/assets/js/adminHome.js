$(document).ready(function () {
    $(".navigation").on("click", function () {
        const location = $(this).attr("data-location");

        switch (location) {
            case "create":
                window.location.replace("/admin/create")
                break;
            case "assign":
                window.location.replace("/admin/assign")
                break;
            case "directory":
                window.location.replace("/admin/directory")
                break;
            case "logout":
                window.location.replace("/logout")
                break;
        }
    })

    $(".CONFIRM").on("click", function() {
        $.get("/api/allroutes").then(function (data) {

            for (let i = 0; i < data.length; i++) {
                const update = {
                    id: data[i].id
                }
                $.ajax({
                    method: "PUT",
                    url: "/api/unassign",
                    data: update
                }).then(function() {
                    
                })
            }
                $("#confirmModal").modal("hide");
                    $("#sucessModal").modal("show");
        })
    })    

    // function unassignAllRotes() {
        
    // }
})