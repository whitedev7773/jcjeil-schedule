// import { GetDatabase } from "./firebase.js";
// await GetDatabase().then((db) => {
//     console.log(db.val()[1]);
// })

document.querySelector(".check-update").addEventListener("click", () => {
    alert(`새로운 앱으로 업데이트를 시도합니다.\n업데이트 적용 시 Last Updates 일자가 변경된 후 최대 10분내로 업데이트가 적용되요.\n\n${document.querySelector(".date").innerHTML}`);
    location.reload();
});

document.getElementById("reset-data").addEventListener("click", () => {
    if (confirm("선택 과목과 테마 등 기기에 저장된 모든 데이터를 초기화할까요?") == true) {
        localStorage.removeItem("2");
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
        "1": { // 월요일
            "1": "영어",  // 교시
            "3": "체육",
            "5": "독서",
            "7": "자율",
        },
        "2": { // 화요일
            "1": "영어",  // 교시
            "2": "수학",
            "3": "수학",
            "5": "독서",
            "6": "한문",
        },
        "3": { // 수요일
            "4": "한문",  // 교시
        },
        "4": { // 목요일
            "1": "음악",  // 교시
            "2": "독서",
            "4": "수학",
            "5": "수학",
            "6": "영어",
        },
        "5": { // 금요일
            "4": "영어",  // 교시
            "5": "독서",
        },
    },
    "2": {  // 2반
        "1": { // 월요일
            "1": "체육",  // 교시
            "3": "독서",
            "5": "수학",
            "7": "자율",
        },
        "2": { // 화요일
            "1": "음악",  // 교시
            "2": "독서",
            "3": "영어",
            "5": "수학",
            "6": "한문",
        },
        "3": { // 수요일
            "4": "수학",  // 교시
        },
        "4": { // 목요일
            "1": "한문",  // 교시
            "2": "수학",
            "4": "독서",
            "5": "영어",
            "6": "영어",
        },
        "5": { // 금요일
            "4": "독서",  // 교시
            "5": "영어",
        },
    },
    "3": {  // 3반
        "1": { // 월요일
            "1": "영어",  // 교시
            "3": "수학",
            "5": "체육",
            "7": "자율",
        },
        "2": { // 화요일
            "1": "수학",  // 교시
            "2": "독서",
            "3": "한문",
            "5": "독서",
            "6": "영어",
        },
        "3": { // 수요일
            "4": "음악",  // 교시
        },
        "4": { // 목요일
            "1": "독서",  // 교시
            "2": "영어",
            "4": "독서",
            "5": "한문",
            "6": "수학",
        },
        "5": { // 금요일
            "4": "영어",  // 교시
            "5": "수학",
        },
    },
    "4": {  // 4반
        "1": { // 월요일
            "1": "수학",  // 교시
            "3": "미술",
            "5": "영어",
            "7": "자율",
        },
        "2": { // 화요일
            "1": "독서",  // 교시
            "2": "한문",
            "3": "독서",
            "5": "영어",
            "6": "수학",
        },
        "3": { // 수요일
            "4": "영어",  // 교시
        },
        "4": { // 목요일
            "1": "수학",  // 교시
            "2": "한문",
            "4": "영어",
            "5": "체육",
            "6": "독서",
        },
        "5": { // 금요일
            "4": "수학",  // 교시
            "5": "독서",
        },
    },
    "5": {  // 5반
        "1": { // 월요일
            "1": "수학",  // 교시
            "3": "영어",
            "5": "독서",
            "7": "자율",
        },
        "2": { // 화요일
            "1": "영어",  // 교시
            "2": "영어",
            "3": "수학",
            "5": "체육",
            "6": "독서",
        },
        "3": { // 수요일
            "4": "독서",  // 교시
        },
        "4": { // 목요일
            "1": "영어",  // 교시
            "2": "독서",
            "4": "수학",
            "5": "미술",
            "6": "한문",
        },
        "5": { // 금요일
            "4": "한문",  // 교시
            "5": "수학",
        },
    },
    "6": {  // 6반
        "1": { // 월요일
            "1": "독서",  // 교시
            "3": "수학",
            "5": "영어",
            "7": "자율",
        },
        "2": { // 화요일
            "1": "한문",  // 교시
            "2": "체육",
            "3": "독서",
            "5": "수학",
            "6": "영어",
        },
        "3": { // 수요일
            "4": "영어",  // 교시
        },
        "4": { // 목요일
            "1": "독서",  // 교시
            "2": "영어",
            "4": "미술",
            "5": "독서",
            "6": "수학",
        },
        "5": { // 금요일
            "4": "수학",  // 교시
            "5": "한문",
        },
    },
    "7": {  // 7반
        "1": { // 월요일
            "1": "독서",  // 교시
            "3": "영어",
            "5": "수학",
            "7": "자율",
        },
        "2": { // 화요일
            "1": "수학",  // 교시
            "2": "미술",
            "3": "체육",
            "5": "영어",
            "6": "독서",
        },
        "3": { // 수요일
            "4": "한문",  // 교시
        },
        "4": { // 목요일
            "1": "수학",  // 교시
            "2": "수학",
            "4": "한문",
            "5": "영어",
            "6": "독서",
        },
        "5": { // 금요일
            "4": "독서",  // 교시
            "5": "영어",
        },
    },
}

var subject_boxes = {
    "A": document.querySelectorAll("#A"),
    "B": document.querySelectorAll("#B"),
    "C": document.querySelectorAll("#C"),
    "D": document.querySelectorAll("#D")
};

var _init_data = {
    "cls": "1",
    "theme": "light",
    "A": ["A", "none"],  // ["이름", "HEX 색상"]
    "B": ["B", "none"],
    "C": ["C", "none"],
    "D": ["D", "none"]
}

var user_data = {};
/**
 * 저장되어있던 사용자 데이터 반환
 * @return {Object} Object
 */
function GetUserData() {
    return JSON.parse(localStorage.getItem("2"));
}

/**
 * data를 받아 즉시 적용함
 * @param {Object} data 적용할 데이터
 */
function ApplyData(data) {
    classSelect.value = data["cls"];
    themeSelect.value = data["theme"];

    ["A", "B", "C", "D"].forEach((sub) => {
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
    localStorage.setItem("2", JSON.stringify(data));
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