const keys = ["조식", "중식", "석식"];
var box = {
    "조식": document.querySelector("#breakfast"),
    "중식": document.querySelector("#lunch"),
    "석식": document.querySelector("#dinner"),
}

var today = GetToday();
var date_select = document.querySelector("#date-select");
date_select.value = today;

date_select.addEventListener("change", async (e) => {
    console.log("날짜 변경", date_select.value);
    Update(date_select.value);
});

async function GetInfo(date="2023-03-02") {
    date = date.replaceAll("-", "");
    var server_url = `https://jcjeil-schedule-backend.fly.dev/get-menu?date=${date}`;
    return axios.get(server_url);
}

function ApplyInfo(data={}) {
    keys.forEach((k) => {
        box[k].children[1].innerHTML = ''
        if (data.hasOwnProperty(k)) {
            data[k].forEach((menu_name) => {
                var menu_elemnt = document.createElement("p");
                menu_elemnt.innerHTML = menu_name;
                box[k].children[1].appendChild(menu_elemnt);
            });
        }
    });
}

function GetToday() {
    var date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}


function Update(date) {
    loading.classList.toggle('hidden', false);
    keys.forEach((k) => {
        box[k].children[1].innerHTML = ''
        box[k].classList.toggle('hidden', true);
    });
    GetInfo(date).then((res) => {
        if (!res) { return }
        ApplyInfo(res.data);
        loading.classList.toggle('hidden', true);
        keys.forEach((k) => {
            box[k].classList.toggle('hidden', false);
        });
    });
}

// 접속 시 실행
loading.classList.toggle('hidden', false);
keys.forEach((k) => {
    box[k].children[1].innerHTML = ''
    box[k].classList.toggle('hidden', true);
});

Update(today);