// Function to validate form input before submitting data
function validateActivityForm() {
    var activityName = document.getElementById("activityName").value;
    var activityDescription = document.getElementById("activityDescription").value;

    if (activityName.trim() === "") {
        alert("Activity name is required");
        return false;
    }

    if (activityDescription.trim() === "") {
        alert("Activity description is required");
        return false;
    }

    return true;
}

// Function to show activity data from local storage
function showActivities() {
    var activityList;
    if (localStorage.getItem("activityList") === null) {
        activityList = [];
    } else {
        activityList = JSON.parse(localStorage.getItem("activityList"));
    }

    var html = "";

    activityList.forEach(function (activity, index) {
        html += "<tr>";
        html += "<td>" + activity.name + "</td>";
        html += "<td>" + activity.description + "</td>";
        html +=
            '<td><button onclick="deleteActivity(' + index + ')" class="btn btn-danger">Delete</button><button onclick="updateActivity(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#activityTable tbody").innerHTML = html;
}

// Load all activity data from local storage when the document or page loads
window.onload = showActivities;

// Function to add activity data to local storage
function addActivity() {
    // If form is validated
    if (validateActivityForm()) {
        var activityName = document.getElementById("activityName").value;
        var activityDescription = document.getElementById("activityDescription").value;

        var activityList;
        if (localStorage.getItem("activityList") === null) {
            activityList = [];
        } else {
            activityList = JSON.parse(localStorage.getItem("activityList"));
        }

        activityList.push({
            name: activityName,
            description: activityDescription
        });

        localStorage.setItem("activityList", JSON.stringify(activityList));
        showActivities();
        document.getElementById("activityName").value = "";
        document.getElementById("activityDescription").value = "";

        // Alert the user
        alert("Activity added successfully!");
    }
}

// Function to delete activity data from local storage
function deleteActivity(index) {
    if (confirm("Are you sure you want to delete this activity?")) {
        var activityList;
        if (localStorage.getItem("activityList") === null) {
            activityList = [];
        } else {
            activityList = JSON.parse(localStorage.getItem("activityList"));
        }

        activityList.splice(index, 1);
        localStorage.setItem("activityList", JSON.stringify(activityList));
        showActivities();

        // Alert the user
        alert("Activity deleted successfully!");
    }
}

// Function to update/edit activity data in local storage
function updateActivity(index) {
    // Submit button will hide and update button will show for updating data in local storage
    document.getElementById("addActivityBtn").style.display = "none";
    document.getElementById("updateActivityBtn").style.display = "block";

    var activityList;
    if (localStorage.getItem("activityList") === null) {
        activityList = [];
    } else {
        activityList = JSON.parse(localStorage.getItem("activityList"));
    }

    document.getElementById("activityName").value = activityList[index].name;
    document.getElementById("activityDescription").value = activityList[index].description;

    document.querySelector("#updateActivityBtn").onclick = function () {
        if (validateActivityForm()) {
            activityList[index].name = document.getElementById("activityName").value;
            activityList[index].description = document.getElementById("activityDescription").value;

            localStorage.setItem("activityList", JSON.stringify(activityList));

            document.getElementById("activityName").value = "";
            document.getElementById("activityDescription").value = "";

            // Update button will hide, and Submit button will show
            document.getElementById("addActivityBtn").style.display = "block";
            document.getElementById("updateActivityBtn").style.display = "none";

            showActivities(); // Call showActivities to refresh the displayed data

            // Alert the user
            alert("Activity updated successfully!");
        }
    };
}
