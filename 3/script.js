// import { GetDatabase } from "./firebase.js";
// await GetDatabase().then((db) => {
//     console.log(db.val()[1]);
// })

document.querySelector(".check-update").addEventListener("click", () => {
    alert(`새로운 앱으로 업데이트를 시도합니다.\n업데이트 적용 시 Last Update가 변경되요.\n\n${document.querySelector(".date").innerHTML}`);
    location.reload();
});

document.getElementById("reset-data").addEventListener("click", () => {
    if (confirm("선택 과목과 테마 등 기기에 저장된 모든 데이터를 초기화할까요?") == true) {
        localStorage.removeItem("3");
        alert("데이터를 초기화했어요.");
        location.reload();
    }
})

var classSelect = document.querySelector("#class-select");
classSelect.addEventListener("input", (e) => {
    user_data["cls"] = classSelect.value;
    SaveUserData(user_data);
    ApplyData(user_data);
});

var themeSelect = document.querySelector("#theme-select");
themeSelect.addEventListener("input", (e) => {
    user_data["theme"] = themeSelect.value;
    SaveUserData(user_data);
    ApplyData(user_data);
});

var subjectSelect = document.querySelector("#subject-select");
subjectSelect.addEventListener("input", (e) => {
    subNameInput.value = user_data[subjectSelect.value][0];
    if (user_data[subjectSelect.value][1].startsWith("#")) {
        useCustomColor.checked = true;
        colorSelect.value = user_data[subjectSelect.value][1];
    }
    else {
        useCustomColor.checked = false;
        colorSelect.value = "#000000";
    }
    SaveUserData(user_data);
    ApplyData(user_data);
});

var useCustomColor = document.querySelector("#will-use-custom-color");
useCustomColor.addEventListener("change", (e) => {
    var target_subject = subjectSelect.value;

    if (useCustomColor.checked){
        user_data[target_subject][1] = colorSelect.value;
    }
    else {
        user_data[target_subject][1] = "none";
        colorSelect.value = "#000000";
    }

    SaveUserData(user_data);
    ApplyData(user_data);
});

var colorSelect = document.querySelector("#color-select");
colorSelect.addEventListener("input", (e) => {
    var target_subject = subjectSelect.value;

    if (useCustomColor.checked){
        user_data[target_subject][1] = colorSelect.value;
    }
    else {
        user_data[target_subject][1] = "none";
        colorSelect.value = "#000000";
    }

    SaveUserData(user_data);
    ApplyData(user_data);
});

var subNameInput = document.querySelector("#subject-input");
subNameInput.addEventListener("input", (e) => {
    var target_subject = subjectSelect.value;
    user_data[target_subject][0] = subNameInput.value;
    if (useCustomColor.checked) {
        user_data[target_subject][1] = colorSelect.value;
    }
    SaveUserData(user_data);
    ApplyData(user_data);
});


var common_subject = {
    "1": {  // 1반
        "2": { // 화요일
            "3": "공통",  // 교시
            "4": "공통",
        },
        "4": { // 목요일
            "1": "공통",  // 교시
            "2": "공통",
            "3": "공통",
        },
    },
    "2": {  // 2반
        "2": { // 화요일
            "3": "공통",  // 교시
            "4": "공통",
        },
        "4": { // 목요일
            "1": "공통",  // 교시
            "2": "공통?",
            "3": "공통",
        },
    },
    "3": {  // 3반
        "2": { // 화요일
            "3": "공통",  // 교시
            "4": "공통",
        },
        "4": { // 목요일
            "1": "공통",  // 교시
            "2": "공통",
            "3": "공통",
        },
    },
    "4": {  // 4반
        "2": { // 화요일
            "3": "공통",  // 교시
            "4": "공통",
        },
        "4": { // 목요일
            "1": "공통",  // 교시
            "2": "공통",
            "3": "공통",
        },
    },
    "5": {  // 5반
        "2": { // 화요일
            "3": "공통",  // 교시
            "4": "공통",
        },
        "4": { // 목요일
            "1": "공통",  // 교시
            "2": "공통",
            "3": "공통",
        },
    },
    "6": {  // 6반
        "2": { // 화요일
            "3": "공통",  // 교시
            "4": "공통",
        },
        "4": { // 목요일
            "1": "공통",  // 교시
            "2": "공통",
            "3": "공통",
        },
    },
    "7": {  // 7반
        "2": { // 화요일
            "3": "공통",  // 교시
            "4": "공통",
        },
        "4": { // 목요일
            "1": "공통",  // 교시
            "2": "공통",
            "3": "공통",
        },
    },
}

var subject_boxes = {
    "A": document.querySelectorAll("#A"),
    "B": document.querySelectorAll("#B"),
    "C": document.querySelectorAll("#C"),
    "D": document.querySelectorAll("#D"),
    "E": document.querySelectorAll("#E"),
    "F": document.querySelectorAll("#F"),
    "G": document.querySelectorAll("#G")
};

var _init_data = {
    "cls": "1",
    "theme": "light",
    "A": ["A", "none"],  // ["이름", "HEX 색상"]
    "B": ["B", "none"],
    "C": ["C", "none"],
    "D": ["D", "none"],
    "E": ["E", "none"],
    "F": ["F", "none"],
    "G": ["G", "none"],
}

var user_data = {};
/**
 * 저장되어있던 사용자 데이터 반환
 * @return {Object} Object
 */
function GetUserData() {
    return JSON.parse(localStorage.getItem("3"));
}

/**
 * data를 받아 즉시 적용함
 * @param {Object} data 적용할 데이터
 */
function ApplyData(data) {
    classSelect.value = data["cls"];
    themeSelect.value = data["theme"];

    ["A", "B", "C", "D", "E", "F", "G"].forEach((sub) => {
        var name = data[sub][0];
        var color = data[sub][1];
        subject_boxes[sub].forEach((e) => {
            e.innerHTML = name;
            if (color.startsWith("#")) {
                e.parentNode.style.setProperty("background-color", color, "important");
            }
            else {
                e.parentNode.style.backgroundColor = null;
            }
        });
    });

    DisplayCommonSubject(data["cls"]);  // 공통 과목
    document.querySelector("body").dataset.theme = data["theme"];  // 테마
    
}

/**
 * 사용자 데이터 저장
 * @param {Object} data 유저 데이터(Object)
 */
function SaveUserData(data) {
    localStorage.setItem("3", JSON.stringify(data));
    console.log("유저 데이터 저장함");
}

function CheckDataSaved() {
    return GetUserData() != null;
}

/**
 * cls반의 공통 과목으로 표시
 * @param {String} cls 반(String)
*/
function DisplayCommonSubject(cls="1"){
    var days = common_subject[cls];

    for (let i = 1; i <= 5; i++) {
        if (i in days) {
            for (let j = 1; j <= 7; j++) {
                if (j in days[i]) {
                    document.querySelector("#horizontal-line").children[i].children[j].innerHTML = days[i][j]
                }
            }
        }
    }
}

if (CheckDataSaved()) {
    console.log("저장된 데이터 불러옴");
    user_data = GetUserData();
    ApplyData(user_data);
}
else {
    console.log("이전에 저장된 데이터를 찾지 못함");
    DisplayCommonSubject("1");
    user_data = _init_data;
    SaveUserData(user_data);
}
subNameInput.value = user_data["A"][0];

if (user_data[subjectSelect.value][1].startsWith("#")) {
    useCustomColor.checked = true;
    colorSelect.value = user_data[subjectSelect.value][1];
}
else {
    useCustomColor.checked = false;
    colorSelect.value = "#000000";
}