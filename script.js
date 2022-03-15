function trackOrder(ID = document.getElementById("tracking_id").value) {
    var Alert = document.getElementById("trackingStatus");
    var button = document.getElementById("trackButton");
    Alert.innerHTML = `
    <div class="center" style="text-align: center;padding-top: 10%;">
            <i class="fa-solid fa-spin fa-circle-notch mb-3" style="font-size: 100px;"></i><br>
            Loading..
    </div>
    `;
    button.disabled = true;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Searching..`;
    var url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT1ULtcs8RSY0R4tAYthO0ZrIMxmYPqOSbZ3LtjYyUNNLiOcr3ZFWCQeDWFelzoZMpn9b0nem-Kyvyu/pub?gid=0&single=true&output=csv';
    $(document).ready(function () {
        $.ajax({
            url: url,
            dataType: "text",
            success: function (data) {
                var c = 0;
                var certificates_data = data.split(/\r?\n|\r/);
                for (var count = 0; count < certificates_data.length; count++) {
                    var cell_data = certificates_data[count].split(",");
                    for (var cell_count = 0; cell_count < cell_data.length; cell_count += 1) {
                        if (cell_data[cell_count] == ID) { // Docket No Exists
                            button.innerHTML = `<i class="fa-solid fa-check"></i>  Result Found`;
                            if (cell_data[cell_count + 13] == "NA") { //Out Docket not Exits
                                if (cell_data[cell_count + 1] == "NA") { //Date in Not Exist
                                    AlertText = `
                                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>Transit!</strong> Your order is in transit.<br>
                                        <strong>Name :</strong> ${cell_data[cell_count - 4]}<br>
                                        <strong>Model :</strong> ${cell_data[cell_count + 2]}<br>
                                        <button type="button" class="btn-close" onclick="showImg()" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    `;
                                    Alert.innerHTML = AlertText;
                                }
                                else {
                                    var d1 = new Date(cell_data[cell_count + 1]);
                                    var d2 = new Date();
                                    var diff = d2.getTime() - d1.getTime();
                                    var daydiff = Math.floor(diff / (1000 * 60 * 60 * 24));
                                    if (daydiff < 3) {
                                        AlertText = `
                                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>On Repairing!</strong> Your Product is Being Repaired.<br>
                                        <strong>Name :</strong> ${cell_data[cell_count - 4]}<br>
                                        <strong>Model :</strong> ${cell_data[cell_count + 2]}<br>
                                        <button type="button" class="btn-close" onclick="showImg()" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    `;
                                        Alert.innerHTML = AlertText;

                                    }
                                    else if (daydiff < 5) {
                                        AlertText = `
                                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>Dispatched Soon!</strong> Your Product will be dispatched within 2 days.<br>
                                        <strong>Name :</strong> ${cell_data[cell_count - 4]}<br>
                                        <strong>Model :</strong> ${cell_data[cell_count + 2]}<br>
                                        <button type="button" class="btn-close" onclick="showImg()" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    `;
                                        Alert.innerHTML = AlertText;
                                    }
                                    else {
                                        AlertText = `
                                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>Support!</strong> Please Contact Customer Support.<br>
                                        <strong>Name :</strong> ${cell_data[cell_count - 4]}<br>
                                        <strong>Model :</strong> ${cell_data[cell_count + 2]}<br>
                                        <button type="button" class="btn-close" onclick="showImg()" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    `;
                                        Alert.innerHTML = AlertText;

                                    }

                                }
                            }
                            else if (cell_data[cell_count + 13] != "NA") { //Out Docket no Exits
                                AlertText = `
                                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>Dispatched!</strong> Your Order is Dispatched with Tracking No. ${cell_data[cell_count + 13]}<br>
                                        <strong>Name :</strong> ${cell_data[cell_count - 4]}<br>
                                        <strong>Model :</strong> ${cell_data[cell_count + 2]}<br>
                                        <button type="button" class="btn-close" onclick="showImg()" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    `;
                                Alert.innerHTML = AlertText;
                            }
                            c = c + 1;
                        }
                    }
                }
                if (c == 0) {
                    button.innerHTML = `<i class="fa-solid fa-xmark"></i>   No Data Found`;
                    AlertText = `
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>No Result Found!</strong> Please Enter a Valid Docket No
                    </div>
                    `;
                    Alert.innerHTML = AlertText;

                }
            }
        });
    });
}

function showImg(){
    var Alert = document.getElementById("trackingStatus");
    AlertText = `
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        class="img-fluid" alt="Sample image">
    `;
    Alert.innerHTML = AlertText;
    // Reset Form
    document.getElementById("tracking_id").value = "";
    var button = document.getElementById("trackButton");
    button.disabled = false;
    button.innerHTML = "Track Now";

}