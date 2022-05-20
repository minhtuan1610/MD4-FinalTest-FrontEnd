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
            <button class="btn btn-primary" data-bs-target="#exampleModal1" data-bs-toggle="modal" data-bs-whatever="@getbootstrap" 
            type="button" onclick="showCityForm(${data.id})">Chỉnh sửa</button>
            <button class="btn btn-primary" type="button" onclick="deleteCity(${data.id})">Xoá</button>
            </td>
        </tr>`;
    return cityChoosen;
}

// Choose Nation
function displayNation(html_id, selectedNationId) {
    let nation = "";
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/nations/",
        success: function (data) {
            nation += `<option>--Chọn quốc gia--</option>`;
            for (let i = 0; i < data.length; i++) {
                if (selectedNationId !== data[i].id) {
                    nation += `<option value="${data[i].id}">${data[i].name}</option>`;
                } else {
                    nation += `<option selected value="${data[i].id}">${data[i].name}</option>`;
                }
            }
            document.getElementById(html_id).innerHTML = nation;
        }
    })
}

// Add City
function showCreateForm() {
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
    displayNation("nation-name", null);
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
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/city/' + id,
        success: function (data) {
            console.log(data);
            let content = `<div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel1">Sửa thành phố</h5>
                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label class="col-form-label" for="city1-name">Tên thành phố:</label>
                        <input class="form-control" id="city1-name" type="text" value="${data.name}">
                    </div>
                    <div class="mb-3">
                        <label class="col-form-label" for="nation1-name">Quốc gia:</label>
                        <select aria-label="Default select example" class="form-select" id="nation1-name"></select>
                    </div>
                    <div class="mb-3">
                        <label class="col-form-label" for="area1-name">Diện tích:</label>
                        <input class="form-control" id="area1-name" type="number" value="${data.area}">
                    </div>
                    <div class="mb-3">
                        <label class="col-form-label" for="population1-name">Dân số:</label>
                        <input class="form-control" id="population1-name" type="number" value="${data.population}">
                    </div>
                    <div class="mb-3">
                        <label class="col-form-label" for="gdp1-name">GDP:</label>
                        <input class="form-control" id="gdp1-name" type="number" value="${data.gdp}">
                    </div>
                    <div class="mb-3">
                        <label class="col-form-label" for="description1-text">Giới thiệu:</label>
                        <textarea class="form-control" id="description1-text">${data.description}</textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Thoát</button>
                <button class="btn btn-primary" onclick="editCity(${id})" type="button"
                        data-bs-dismiss="modal">Sửa thành phố</button>
            </div>`;
            $(`#edit-city`).html(content);
            displayNation("nation1-name", data.nation.id);
        }
    });
    event.preventDefault();
}

function editCity(id) {
    let cityName = $(`#city1-name`).val();
    let nationName = $(`#nation1-name`).val();
    let areaName = $(`#area1-name`).val();
    let populationName = $(`#population1-name`).val();
    let gdpName = $(`#gdp1-name`).val();
    let descriptionName = $(`#description1-text`).val();
    let city = {
        "name": cityName,
        "nation": {"id": nationName},
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
        type: "PUT",
        data: JSON.stringify(city),
        url: `http://localhost:8080/city/${id}`,
        success: function () {
            alert("City updated successfully");
            listCity();
        }
    })
    event.preventDefault();
}

// Delete City
function deleteCity(cityId) {
    event.preventDefault();
    let check = confirm("Thành phố này sẽ bị xoá, bạn muốn xoá chứ?");
    if (check) {
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/city/${cityId}`,
            success: function () {
                alert("City deleted successfully")
                listCity();
            }
        })
    }
}