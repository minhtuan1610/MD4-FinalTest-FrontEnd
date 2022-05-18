// List City
function listCity() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/",
        success: function (data) {
            let cityList = '<thead>\n' +
                '        <tr>\n' +
                '            <th scope="col">#</th>\n' +
                '            <th scope="col">Thành phố</th>\n' +
                '            <th scope="col">Quốc gia</th>\n' +
                '            <th scope="col"></th>\n' +
                '        </tr>\n' +
                '        </thead>\n' +
                '        <tbody class="table-group-divider">';
            for (let i = 0; i < data.length; i++) {
                cityList += getCity(data[i]);
            }
            `</tbody>`;
            document.getElementById("city-table").innerHTML = cityList;
        }
    })
}

function getCity(data) {
    let cityChoosen = `<tbody class="table-group-divider">
        <tr>
            <th scope="row">${data.id}</th>
            <td>${data.name}</td>
            <td>${data.nation.name}</td>
            <td>
            <button class="btn btn-primary" data-bs-target="#exampleModal" data-bs-toggle="modal" data-bs-whatever="@getbootstrap" type="button" onclick="">Chỉnh sửa</button>
            &nbsp;
            <button class="btn btn-primary" type="button" onclick="deleteCity(${data.id})">Xoá</button>
            </td>
        </tr>`;
    return cityChoosen;
}

// Choose Nation
function displayNation() {
    let nation = "";
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/nations/",
        success: function (data) {
            nation += `<option selected>--Chọn quốc gia--</option>`;
            for (let i = 0; i < data.length; i++) {
                nation += `<option value="${data[i].id}">${data[i].name}</option>`;
            }
            document.getElementById("nation-name").innerHTML = nation;
        }
    })
}

// Add City
function showCreateForm() {
    displayNation();
    let content = `<div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Thêm thành phố</h5>
                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label class="col-form-label" for="city-name">Tên thành phố:</label>
                        <input class="form-control" id="city-name" type="text">
                    </div>
                    <div class="mb-3">
                        <label class="col-form-label" for="nation-name">Quốc gia:</label>
                        <select aria-label="Default select example" class="form-select" id="nation-name"></select>
                    </div>
                    <div class="mb-3">
                        <label class="col-form-label" for="area-name">Diện tích:</label>
                        <input class="form-control" id="area-name" type="number">
                    </div>
                    <div class="mb-3">
                        <label class="col-form-label" for="population-name">Dân số:</label>
                        <input class="form-control" id="population-name" type="number">
                    </div>
                    <div class="mb-3">
                        <label class="col-form-label" for="gdp-name">GDP:</label>
                        <input class="form-control" id="gdp-name" type="number">
                    </div>
                    <div class="mb-3">
                        <label class="col-form-label" for="description-text">Giới thiệu:</label>
                        <textarea class="form-control" id="description-text"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Thoát</button>
                <button class="btn btn-primary" onclick="addCity()" type="button" data-bs-dismiss="modal">Thêm thành phố</button>
            </div>`;
    $('#show-modal').html(content);
}

function addCity() {
    let cityName = $(`#city-name`).val();
    let nationName = $(`#nation-name`).val();
    let areaName = $(`#area-name`).val();
    let populationName = $(`#population-name`).val();
    let gdpName = $(`#gdp-name`).val();
    let descriptionName = $(`#description-text`).val();
    let city = {
        "name": cityName,
        "nation": {"id": parseInt(nationName)},
        "area": areaName,
        "population": populationName,
        "gdp": gdpName,
        "description": descriptionName
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(city),
        url: "http://localhost:8080/city/",
        success: function () {
            alert("City created successfully");
            listCity();
        }
    })
    event.preventDefault();
}

// Edit City
function showCityForm(id) {
}

function editCity(id) {
}

// Delete City
function deleteCity(city) {
    event.preventDefault();
    let check = confirm("Thành phố này sẽ bị xoá, bạn muốn xoá chứ?");
    if (check) {
        let cityID = city;
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/city/${cityID}`,
            success: function () {
                alert("City deleted successfully")
                listCity();
            }
        })
    }
}