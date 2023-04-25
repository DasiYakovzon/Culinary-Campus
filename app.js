
//main
let f = -1, count = 0;
let thisPerson = { i: 0, password: "0", name: "", course: [], sum: 0 };
let userName = document.getElementById('userN');
userName.innerHTML = thisPerson.name;
if (window.location.href.includes("Main")) {
    const btn = document.querySelector('.btn');
    $(document).ready(function () {
        $("form")
            .find(".btn")
            .on("click", function () {
                f++;
                if (f === 1) {
                    let connect = document.getElementById('connect');
                    const pwd = document.querySelector('.pwd');
                    let p = pwd.value;
                    const name = document.querySelector('.user');
                    let u = user.value;
                    let personP = JSON.parse(localStorage.getItem('personP')) || [];
                    let i = 0;
                    for (; i < personP.length; i++) {
                        if (personP[i].name === (u) && personP[i].password === (p)) {
                            thisPerson = personP[i];
                            sessionStorage.setItem('thisPerson', JSON.stringify(thisPerson));
                        }
                    }
                    if (personP.length === i) {
                        thisPerson = { i: i, password: p, name: u, course: [], sum: 0 };
                        sessionStorage.setItem('thisPerson', JSON.stringify(thisPerson));
                        personP.push(thisPerson);
                        localStorage.setItem('personP', JSON.stringify(personP));
                    }
                    thisPerson = JSON.parse(sessionStorage.getItem('thisPerson'));
                    connect.innerHTML = '';
                    let userName = document.getElementById('userN');
                    userName.innerHTML = thisPerson.name;
                ////פונקציה שמוסיפה את השם וגם איחול לפי שעה
                    let d = new Date(); 
                    if ((d.getHours()) > 06 && (d.getHours()) < 12)
                        alert('בוקר טוב!! ' + thisPerson.name);
                    else if ((d.getHours()) >= 12 && (d.getHours()) < 18)
                        alert('צהרים טובים!!' + thisPerson.name);
                    else if ((d.getHours()) > 18 && (d.getHours()) <= 22)
                        alert(' ערב טוב!! ' + thisPerson.name);
                    else if ((d.getHours()) >=22 && (d.getHours()) <= 24)
                        alert('לילה טוב!!' + thisPerson.name);
                }
                $(this).parent().css({
                    height: "350px",
                    transform: "translateY(50px)"
                });
                $(this).siblings(".form-group").css({
                    top: "20%"
                });
                $(this).siblings(".links").css({
                    top: "65%"
                });
            });

        /*-------- focus in ---------*/
        $(".pwd").on("focusin", function () {
            $(this).siblings(".user").css({
                "z-index": "1",
                background: "rgba(0,0,0,.1)"
            });
            $(this).css({
                "z-index": "2",
                background: "#fff"
            });
        });

        $(".user").on("focusin", function () {
            $(this).siblings(".pwd").css({
                "z-index": "1",
                background: "rgba(0,0,0,.1)"
            });
            $(this).css({
                "z-index": "2",
                background: "#fff"
            });
        });
        /*----------- focus out ---------*/
        $(".pwd").on("focusout", function () {
            $(this).siblings(".user").css({
                "z-index": "1",
                background: "rgba(0,0,0,.1)"
            });
            $(this).css({
                "z-index": "2",
                background: "#fff"
            });
        });
        $(".user").on("focusout", function () {
            $(this).siblings(".pwd").css({
                "z-index": "1",
                background: "rgba(0,0,0,.1)"
            });
            $(this).css({
                "z-index": "2",
                background: "#fff"
            });
        });
    });

    // 
    const form = document.querySelector('.login');
    const user = document.querySelector('.user');
    form.user.onkeypress = (event) => {
        if ((event.key < 'א' || event.key > 'ת') && (event.key < 'a' || event.key > 'z') && (event.key < 'A' || event.key > 'Z')) {
            event.preventDefault();
        }
    }

    const pwd = document.querySelector('.pwd');
    form.pwd.onkeypress = (event) => {
        count++;
        if ((event.key > 'א' && event.key < 'ת') || count > 8) {
            event.preventDefault();
        }
    }

}

//recipes from json
if (window.location.href.includes("recipe")) {
    thisPerson = JSON.parse(sessionStorage.getItem('thisPerson'));
    let userName = document.getElementById('userN');
    userName.innerHTML = thisPerson.name;
    const start = () => {
        const data = {
            recipes: [],
        }
        const loadProducts = () => {
            let p = $.ajax({
                method: 'GET',
                url: '/recipes.json',
                success: (data) => {
                    globalRecipes = data;
                    addRecipe(data);
                }
            });
        }
        loadProducts();
    }
    start();

    const addRecipe = (r_arr) => {

        for (let i = 0; i < r_arr.length; i++) {
            createRecipe(r_arr[i]);
        }
    }

    const createRecipe = (object) => {
        const srecipes = document.getElementById('recipes');
        let div = document.createElement('div');
        div.classList.add('recipe');
        const a = document.createElement('a');
        const image = document.createElement('img');
        let h5 = document.createElement('h5');
        h5.classList.add('two');
        image.src = object.img;
        image.width = 300;
        h5.innerHTML = object.name;
        a.append(image);
        a.href = "preperation.html";
        a.onclick = () => {
            sessionStorage.setItem('object', JSON.stringify(object));
            createPreperation();
        }
        div.append(a, h5);
        srecipes.append(div);
    }
    // sort recipes

    const TypeToSort = document.querySelectorAll('.typeToSort');

    for (let i = 0; i < TypeToSort.length; i++) {
        TypeToSort[i].onclick = (event) => {
            event.preventDefault();
            const srecipes = document.getElementById('recipes');
            srecipes.innerHTML = "";
            const holiday = TypeToSort[i].innerHTML;
            const data = {
                categoryHoliday: [],
            }
            sort(globalRecipes, holiday);

        }

    }

    const sort = (a, holiday) => {
        let flag = false;
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[i].category.length; j++) {
                if (a[i].category[j] === holiday) {
                    createRecipe(a[i]);
                    flag = true;
                }
            }
        }
        if (!flag) {
            let h2 = document.createElement('h2');
            h2.innerHTML = "לא נמצא מתכון עבור:" + holiday;
            const srecipes = document.getElementById('recipes');
            srecipes.append(h2);
        }
    }
}
if (window.location.href.includes("preperation")) {
    thisPerson = JSON.parse(sessionStorage.getItem('thisPerson'));
    let userName = document.getElementById('userN');
    userName.innerHTML = thisPerson.name;
    let timeCount;
    const createPreperation = () => {
        let currentRecipe = JSON.parse(sessionStorage.getItem('object'));
        let backgroundOfPage = document.getElementById('background');
        const preperaionF = document.getElementById('preperaionR');
        let img = currentRecipe.img;
        backgroundOfPage.style = `background-image: url(${img}); width: 100%;`;
        backgroundOfPage.classList.add('bg');
        const timer = document.createElement('button');
        timer.id = 'setTime';
        timer.innerHTML = "זמן ההכנה:" + currentRecipe.time + "שעות";
        let bttn = document.querySelector('.bttn');
        bttn.onclick = (event) => {
            timeCount = currentRecipe.time * 60;
            settings(timeCount);
        }
        let b = document.createElement('b');
        let h1 = document.createElement('p');
        b.innerHTML = currentRecipe.name;
        h1.append(b);
        h1.classList.add('sizeP');
        let image = document.createElement('img');
        image.src = currentRecipe.img;
        let h2 = document.createElement('h2');
        h2.innerHTML = "החומרים:";
        let div = document.createElement('div');
        for (let i = 0; i < currentRecipe.ingredients.length; i++) {
            let p = document.createElement('p');
            p.innerHTML = currentRecipe.ingredients[i];
            div.append(p);
        }
        let h2i = document.createElement('h2');
        h2i.innerHTML = "אופן ההכנה:";
        let div2 = document.createElement('div');

        for (let j = 0; j < currentRecipe.howToPrepare.length; j++) {
            let pp = document.createElement('p');
            pp.innerHTML += j + 1 + " .";
            pp.innerHTML += currentRecipe.howToPrepare[j];
            div2.append(pp);
        }
        let div3 = document.createElement('div');
        if (currentRecipe.variation.length != 0) {

            let h2i2 = document.createElement('h2');
            h2i2.innerHTML = "גיוונים:";
            div3.append(h2i2);
            for (let i = 0; i < currentRecipe.variation.length; i++) {
                let p = document.createElement('p');
                p.innerHTML += i + 1 + " .";
                p.innerHTML += currentRecipe.variation[i];
                div3.append(p);
            }
        }
        let MainDiv = document.createElement('div');
        MainDiv.classList.add('backOfRecipe');
        MainDiv.append(h1, image, h2, div, h2i, div2, div3, timer);
        MainDiv.style.padding = "5px";
        preperaionF.append(MainDiv);
    }
    createPreperation();


}
const settings = (timeCount) => {
    let bttn = document.querySelector('.bttn');
    let count = timeCount;
    bttn.innerHTML = count + " דקות";
    sessionStorage.setItem('count', JSON.stringify(count));
    function timerM() {
        if (count > 0) {
            setTimeout(() => {
                bttn.innerText = count + " דקות";
                timerM();
            }, 60);
            count--;
        }
        else {
            bttn.classList.add('animate__animated');
            bttn.style = "background-color: red !important";
            bttn.innerHTML = `<i class="icons fas fa-bell" style="color: white;"></i>להתחלת הטימר `;
        }
    }
    timerM();
    bttn.classList.remove('animate__animated');
    bttn.classList.remove('animate__flash');
}
// courses
if (window.location.href.includes("course")) {
    thisPerson = JSON.parse(sessionStorage.getItem('thisPerson'));
    let userName = document.getElementById('userN');
    userName.innerHTML = thisPerson.name;
    if (thisPerson === null) {
        alert('התחבר אלינו!');
        location.href = 'http://127.0.0.1:5501/Main.html';
    }
    let sumCourse = thisPerson.sum;
    if (sumCourse === null)
        sumCourse = 0;
    const data2 = {
        course: [],
    }
    const loadCourses = () => {
        let p = $.ajax({
            method: 'GET',
            url: '/courses.json',
            success: (data2) => {
                addCourse(data2);
            }
        });
    }
    loadCourses();
    let course = [], k = 0;
    const addCourse = (a) => {
        for (let i = 0; i < a.length; i++) {
            createCourse(a[i]);
        }
    }
    const createCourse = (object) => {
        const row = document.getElementById('row');
        let div = document.createElement('div');
        div.classList.add('col-md-7');
        let div2 = document.createElement('div');
        div2.classList.add('thumbnail');
        let div3 = document.createElement('div');
        div3.classList.add('caption');
        let video = document.createElement('video');
        video.src = object.video;
        video.muted = "muted";
        video.style = "width:100%";
        let a = document.createElement('a');
        a.href = object.video;
        let p = document.createElement('p');
        p.innerHTML = object.p;
        let h3 = document.createElement('h3');
        h3.innerHTML = "מחיר:" + object.price;
        let button = document.createElement('button');
        button.type = button;
        let span = document.createElement('span');
        span.innerHTML = "להוספה לסל";
        button.append(span);
        button.classList.add('button');
        button.style = "vertical-align:middle";
        button.onclick = () => {
            alert(thisPerson.name);
            let array = JSON.parse(sessionStorage.getItem('thisPerson')) || [];
            let J = 0, inCourse = false;
            for (; J < array.course.length; J++) {
                if (array.course[J].id === object.id) {
                    alert('את כבר בפנים!!');
                    inCourse = true;
                    return;
                }
            }
            if (!inCourse) {
                let index = thisPerson.i;
                array.course.push(object);
                let personP = JSON.parse(localStorage.getItem('personP'));
                sumCourse += parseInt(object.price);
                thisPerson.sum = sumCourse;
                thisPerson.course = array.course;
                personP[index] = thisPerson;
                sessionStorage.setItem('thisPerson', JSON.stringify(thisPerson));
                localStorage.setItem('personP', JSON.stringify(personP));
                alert('הקורס נוסף בהצלחה');
            }

        }
        div3.append(p, h3);
        a.append(video, div3);
        div2.append(a);
        div.append(div2, button);
        row.append(div);

    }
}
let flag = false;
if (window.location.href.includes("MyCart")) {
    thisPerson = JSON.parse(sessionStorage.getItem('thisPerson'));
    let userName = document.getElementById('userN');
    userName.innerHTML = thisPerson.name;
    let course = thisPerson.course; 
    const MyCourses = document.getElementById('MyCourses');
    let h2 = document.createElement('h2');
    let sum = JSON.parse(localStorage.getItem('sum'));
    MyCourses.append(h2);
    let tbody = document.createElement('tbody');
    let table = document.querySelector('.table');
    for (let i = 0; i < course.length; i++) {
        let td = document.createElement('td');
        let tr = document.createElement('tr');
        td.innerHTML = course[i].name;
        let td2 = document.createElement('td');
        td2.innerHTML = course[i].time;
        let td3 = document.createElement('td');
        td3.innerHTML = course[i].price;
        let deletee = document.createElement('td');
        let a = document.createElement('a');
        a.innerHTML = "מחיקה";
        a.href = "#";
        a.style = " text-decoration: none; color: #2FA7E2;";
        deletee.append(a);
        tr.append(td, td2, td3, deletee);
        a.onclick = () => {
            thisPerson.sum= thisPerson.sum- course[i].price;
            course.splice(i, 1);
            thisPerson.course = course;
            th2.innerHTML = thisPerson.sum;
            tr.remove();
            sessionStorage.setItem('thisPerson', JSON.stringify(thisPerson));
            let personP = JSON.parse(localStorage.getItem('personP'));
            personP[thisPerson.i].course = course;
            localStorage.setItem('personP', JSON.stringify(personP));
        }
        tbody.append(tr);
    }
    let buttonB = document.createElement('button');
    buttonB.classList.add('button');
    buttonB.innerHTML = 'לתשלום כעת';
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerHTML = "לתשלום:";
    let td = document.createElement('td');
    td.innerHTML = "";
    let th2 = document.createElement('th');
    th2.innerHTML = thisPerson.sum;
    tr.append(th, td, th2);
    tbody.append(tr);
    table.append(tbody);
    MyCourses.append(table, buttonB);
    const payment = document.getElementById('payment');
    buttonB.onclick = () => {
        payment.style.display = 'initial';
        payment.style.direction = 'ltr';
    }
    const close = document.getElementById('close');
    close.onclick = () => {
        payment.style.display = 'none';
    }
    // card visa
    (function (modules) {

        var installedModules = {}; // The require function

        function __webpack_require__(moduleId) {

            if (installedModules[moduleId])
                return installedModules[moduleId].exports; // Create a new module (and put it into the cache)

            var module = (installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: false
            }); // Execute the module function

    /******/ /******/ modules[moduleId].call(
                module.exports,
                module,
                module.exports,
                __webpack_require__
            ); // Flag the module as loaded

    /******/ /******/ module.loaded = true; // Return the exports of the module

    /******/ /******/ return module.exports;
            /******/
        } // expose the modules object (__webpack_modules__)

  /******/ /******/ __webpack_require__.m = modules; // expose the module cache

  /******/ /******/ __webpack_require__.c = installedModules; // __webpack_public_path__

  /******/ /******/ __webpack_require__.p = "/scripts/dist/"; // Load entry module and return exports

  /******/ /******/ return __webpack_require__(0);
        /******/
    })(
  /************************************************************************/
  /******/[
    /* 0 */
    /***/ function (module, exports, __webpack_require__) {
                __webpack_require__(1);

                /***/
            },
    /* 1 */
    /***/ function (module, exports, __webpack_require__) {
                "use strict";

                var _creditCardType = __webpack_require__(2);

                var _creditCardType2 = _interopRequireDefault(_creditCardType);

                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule ? obj : { default: obj };
                }

                $(document).on("input change", "#input--cc input", function () {
                    var ccNum = $(this).val();
                    var ccType = (0, _creditCardType2.default)(ccNum);

                    if (!ccNum.length || typeof ccType === "undefined" || !ccType.length) {
                        $("#input--cc").removeClass().addClass("creditcard-icon");
                        return;
                    }

                    var creditcardType = ccType[0].type;

                    var ccTypes = {
                        "american-express": "AE",
                        "master-card": "MC",
                        visa: "VI",
                        discover: "DI"
                    };

                    $("#input--cc")
                        .removeClass()
                        .addClass("creditcard-icon")
                        .addClass("creditcard-icon--" + creditcardType); //set creditcard icon

                    // select creditcard type
                    $(".creditcard-type > select").val(ccTypes[creditcardType]);
                    // set the creditcard type <select> to the value entered
                });

                /***/
            },
    /* 2 */
    /***/ function (module, exports) {
                "use strict";

                var types = {};
                var VISA = "visa";
                var MASTERCARD = "master-card";
                var AMERICAN_EXPRESS = "american-express";
                var DINERS_CLUB = "diners-club";
                var DISCOVER = "discover";
                var JCB = "jcb";
                var UNIONPAY = "unionpay";
                var MAESTRO = "maestro";
                var CVV = "CVV";
                var CID = "CID";
                var CVC = "CVC";
                var CVN = "CVN";
                var testOrder = [
                    VISA,
                    MASTERCARD,
                    AMERICAN_EXPRESS,
                    DINERS_CLUB,
                    DISCOVER,
                    JCB,
                    UNIONPAY,
                    MAESTRO
                ];

                function clone(x) {
                    var prefixPattern, exactPattern, dupe;

                    if (!x) {
                        return null;
                    }

                    prefixPattern = x.prefixPattern.source;
                    exactPattern = x.exactPattern.source;
                    dupe = JSON.parse(JSON.stringify(x));
                    dupe.prefixPattern = prefixPattern;
                    dupe.exactPattern = exactPattern;

                    return dupe;
                }

                types[VISA] = {
                    niceType: "Visa",
                    type: VISA,
                    prefixPattern: /^4$/,
                    exactPattern: /^4\d*$/,
                    gaps: [4, 8, 12],
                    lengths: [16],
                    code: {
                        name: CVV,
                        size: 3
                    }
                };

                types[MASTERCARD] = {
                    niceType: "MasterCard",
                    type: MASTERCARD,
                    prefixPattern: /^(5|5[1-5]|2|22|222|222[1-9]|2[3-6]|27[0-1]|2720)$/,
                    exactPattern: /^(5[1-5]|222[1-9]|2[3-6]|27[0-1]|2720)\d*$/,
                    gaps: [4, 8, 12],
                    lengths: [16],
                    code: {
                        name: CVC,
                        size: 3
                    }
                };

                types[AMERICAN_EXPRESS] = {
                    niceType: "American Express",
                    type: AMERICAN_EXPRESS,
                    prefixPattern: /^(3|34|37)$/,
                    exactPattern: /^3[47]\d*$/,
                    isAmex: true,
                    gaps: [4, 10],
                    lengths: [15],
                    code: {
                        name: CID,
                        size: 4
                    }
                };

                types[DINERS_CLUB] = {
                    niceType: "Diners Club",
                    type: DINERS_CLUB,
                    prefixPattern: /^(3|3[0689]|30[0-5])$/,
                    exactPattern: /^3(0[0-5]|[689])\d*$/,
                    gaps: [4, 10],
                    lengths: [14],
                    code: {
                        name: CVV,
                        size: 3
                    }
                };

                types[DISCOVER] = {
                    niceType: "Discover",
                    type: DISCOVER,
                    prefixPattern: /^(6|60|601|6011|65|64|64[4-9])$/,
                    exactPattern: /^(6011|65|64[4-9])\d*$/,
                    gaps: [4, 8, 12],
                    lengths: [16, 19],
                    code: {
                        name: CID,
                        size: 3
                    }
                };

                types[JCB] = {
                    niceType: "JCB",
                    type: JCB,
                    prefixPattern: /^(2|21|213|2131|1|18|180|1800|3|35)$/,
                    exactPattern: /^(2131|1800|35)\d*$/,
                    gaps: [4, 8, 12],
                    lengths: [16],
                    code: {
                        name: CVV,
                        size: 3
                    }
                };

                types[UNIONPAY] = {
                    niceType: "UnionPay",
                    type: UNIONPAY,
                    prefixPattern: /^(6|62)$/,
                    exactPattern: /^62\d*$/,
                    gaps: [4, 8, 12],
                    lengths: [16, 17, 18, 19],
                    code: {
                        name: CVN,
                        size: 3
                    }
                };

                types[MAESTRO] = {
                    niceType: "Maestro",
                    type: MAESTRO,
                    prefixPattern: /^(5|5[06-9]|6\d*)$/,
                    exactPattern: /^5[06-9]\d*$/,
                    gaps: [4, 8, 12],
                    lengths: [12, 13, 14, 15, 16, 17, 18, 19],
                    code: {
                        name: CVC,
                        size: 3
                    }
                };

                function creditCardType(cardNumber) {
                    var type, value, i;
                    var prefixResults = [];
                    var exactResults = [];

                    if (!(typeof cardNumber === "string" || cardNumber instanceof String)) {
                        return [];
                    }

                    for (i = 0; i < testOrder.length; i++) {
                        type = testOrder[i];
                        value = types[type];

                        if (cardNumber.length === 0) {
                            prefixResults.push(clone(value));
                            continue;
                        }

                        if (value.exactPattern.test(cardNumber)) {
                            exactResults.push(clone(value));
                        } else if (value.prefixPattern.test(cardNumber)) {
                            prefixResults.push(clone(value));
                        }
                    }

                    return exactResults.length ? exactResults : prefixResults;
                }

                creditCardType.getTypeInfo = function (type) {
                    return clone(types[type]);
                };

                creditCardType.types = {
                    VISA: VISA,
                    MASTERCARD: MASTERCARD,
                    AMERICAN_EXPRESS: AMERICAN_EXPRESS,
                    DINERS_CLUB: DINERS_CLUB,
                    DISCOVER: DISCOVER,
                    JCB: JCB,
                    UNIONPAY: UNIONPAY,
                    MAESTRO: MAESTRO
                };

                module.exports = creditCardType;

                /***/
            }
            /******/
        ]
    );
}
//join us
if (window.location.href.includes("joinus")) {
    thisPerson = JSON.parse(sessionStorage.getItem('thisPerson'));
    let userName = document.getElementById('userN');
    userName.innerHTML = thisPerson.name;
    let iframe = document.querySelector('.iframe');
    let map = document.querySelector('.map');
    iframe.onmouseover = () => {
       map.style="opacity:100%;";
    }
    //כשגוללים כלפי מטה את הדף (px 1000) 
    //האנימציה פועלת. וכן להפך.
    const func = () => {
        $(document).ready(function () {
            $(window).scroll(function () {
                if ($(document).scrollTop() > 1000) {
                    $("p").addClass("animate__animated");
                    $("p").addClass("animate__zoomIn");
                } else {
                    $("p").removeClass("animate__animated");
                    $("p").removeClass("animate__zoomIn");

                }
                if ($(document).scrollTop() > 1000) {
                    $("label").addClass("animate__animated");
                    $("label").addClass("animate__shakeX");
                }
                else {
                    $("label").removeClass("animate__animated");
                    $("label").removeClass("animate__shakeX");
                }
            });
        });
    }
    func();
}

