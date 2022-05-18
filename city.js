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
            <td><a href="${data.id}" onclick="">Chỉnh sửa</a>&nbsp;<a href="${data.id}" onclick="">Xoá</a></td>
        </tr>`;
    return cityChoosen;
}