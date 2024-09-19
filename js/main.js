var SiteName = document.getElementById("SiteName");
var SiteURL = document.getElementById("SiteURL");
var sites = [];
// sites = JSON.parse(localStorage.getItem("sites"))
displaySite();
// check✔----------------------------------------------------------------------
document.getElementById('SiteName').addEventListener('input', function () {
    if (SiteName.value.trim().length < 3) {
        SiteName.classList.add('is-invalid');
        SiteName.classList.remove('is-valid')
        testName = true
    } else {
        SiteName.classList.remove('is-invalid');
        SiteName.classList.add('is-valid');
        testName = false
    }
});
document.getElementById('SiteURL').addEventListener('input', function () {
    if (!isValidURL(SiteURL.value)) {
        SiteURL.classList.add('is-invalid');
        SiteURL.classList.remove('is-valid')

    } else {
        SiteURL.classList.remove('is-invalid');
        SiteURL.classList.add('is-valid');

    }
});

// add sites and check------------------------------------------------

function addSite() {
    if (SiteName.value.trim() === "" || SiteURL.value.trim() === "") {
        messageError()
        return;
    }
    else if (!isValidURL(SiteURL.value) || testName == true) {
        messageError()
        return;
    }

    var site = {
        name: SiteName.value.trim(),
        url: SiteURL.value.trim()
    };
    sites.push(site);
    // localStorage.setItem("sites", JSON.stringify(sites));
    clearSite();
    displaySite();
    SiteName.classList.add('is-invalid');
    SiteURL.classList.add('is-invalid');


}
// check url------------------------------------------------------------------------
function isValidURL(url) {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9\-\.]+)\.([a-zA-Z]{2,})(:[0-9]+)?(\/.*)?$/;
    return regex.test(url);
}

// clear----------------------------------------------------------------------------------------
function clearSite() {
    SiteName.value = "";
    SiteURL.value = "";
}
// display--------------------------------------------------------------------------------------
function displaySite() {
    var box = "";
    for (var i = 0; i < sites.length; i++) {
        box += `<tr>
            <td>${i + 1}</td>
            <td>${sites[i].name}</td>
            <td><button onclick="visitSite('${sites[i].url}')" class="btn bg-warning  text-light btn-style2 "><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
            <td><button onclick="deleteSite(${i})" class="btn bg-danger text-light btn-style2 "><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = box;
}
// delete-------------------------------------------------------------------------------------------
function deleteSite(index) {
    sites.splice(index, 1);
    // localStorage.setItem("sites", JSON.stringify(sites));
    displaySite();
}
// visit-----------------------------------------------------------------------------------------
function visitSite(url) {
    window.open(url, "_blank");
}
// messageError-------------------------------------------------------------------------
function messageError() {
    document.getElementById('messageError').style.display = 'flex'
    document.getElementById('closeBtn').addEventListener('click', function () {
        document.getElementById('messageError').style.display = 'none';
    });
}
