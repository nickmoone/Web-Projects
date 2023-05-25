var reasons = [
    "",
    "Enkel geel licht: doorvaart toegestaan als dit qua hoogte kan, tegenliggende vaart mogelijk.",
    "Dubbel geel licht: doorvaart toegestaan als dit qua hoogte kan, <u>geen</u> tegenliggende vaart mogelijk.",
    "Rood licht: doorvaart verboden.",
    "Rood boven groen: doorvaart verboden, maar wordt binnenkort toegestaan.",
    "Groen licht: doorvaart toegestaan.",
    "Groen boven rood: lichtconfiguratie niet bekend.",
    "Geen bruglichten: zelf situatie inschatten.",
    "Dubbel rood licht: doorvaart verboden, brug is buiten bedrijf.",
    "Dubbel groen licht: doorvaart toegestaan, brug is buiten bedrijf.",
];

function changeColor(circle) {
    if (circle.id.includes("left")) {
        var otherCircle = document.getElementById(circle.id.replace("left", "right"));
    } else {
        var otherCircle = document.getElementById(circle.id.replace("right", "left"));
    }

    if (circle.classList.contains("color-red")) {
        circle.classList.remove("color-red");
        otherCircle.classList.remove("color-red");
        circle.classList.add("color-green");
        otherCircle.classList.add("color-green");
    } else if (circle.classList.contains("color-green")) {
        circle.classList.remove("color-green");
        otherCircle.classList.remove("color-green");
        circle.classList.add("color-black");
        otherCircle.classList.add("color-black");
    } else {
        circle.classList.remove("color-black");
        otherCircle.classList.remove("color-black");
        circle.classList.add("color-red");
        otherCircle.classList.add("color-red");
    }

    checkPermission();
}

function toggleLight(light) {
    if (light.classList.contains("color-yellow")) {
        light.classList.remove("color-yellow");
        light.classList.add("color-black");
    } else {
        light.classList.remove("color-black");
        light.classList.add("color-yellow");
    }

    checkPermission();
}

function checkPermission() {
    var left1 = document.getElementById("left1").classList;
    var right1 = document.getElementById("right1").classList;
    var left2 = document.getElementById("left2").classList;
    var right2 = document.getElementById("right2").classList;
    var lights = document.getElementsByClassName("light");

    var isAllowed = false;
    var reason = 0;

    if (left1.contains("color-red") && right1.contains("color-red")) {
        isAllowed = false;

        if (left2.contains("color-green") && right2.contains("color-green")) {
            reason = 4;
        } else if (left2.contains("color-red") && right2.contains("color-red")) {
            reason = 8;
        } else if (left2.contains("color-black") && right2.contains("color-black")) {
            reason = 3;
        }
    } else if (left1.contains("color-green") && right1.contains("color-green")) {
        if (left2.contains("color-green") && right2.contains("color-green")) {
            isAllowed = true;
            reason = 9;
        } else if (left2.contains("color-red") && right2.contains("color-red")) {
            isAllowed = null;
            reason = 6;
        } else if (left2.contains("color-black") && right2.contains("color-black")) {
            isAllowed = true;
            reason = 5;
        }
    } else if (left1.contains("color-black") && right1.contains("color-black")) {
        if (left2.contains("color-green") && right2.contains("color-green")) {
            isAllowed = true;
            reason = 5;
        } else if (left2.contains("color-red") && right2.contains("color-red")) {
            isAllowed = false;
            reason = 3;
        } else if (left2.contains("color-black") && right2.contains("color-black")) {
            isAllowed = true;
            reason = 7;
        }
    }

    if (lights[0].classList.contains("color-yellow") ^ lights[1].classList.contains("color-yellow")) {
        isAllowed = true;
        reason = 1;
    } else if (lights[0].classList.contains("color-yellow") && lights[1].classList.contains("color-yellow")) {
        isAllowed = true;
        reason = 2;
    }

    var permissionElement = document.getElementById("permission");
    if (isAllowed != null) {
        permissionElement.innerHTML = isAllowed ? "Doorvaren toegestaan" : "Doorvaren niet toegestaan";
    } else {
        permissionElement.innerHTML = "Onbekend";
    }

    var reasonElement = document.getElementById("reason");
    reasonElement.innerHTML = reasons[reason];
}

window.onload = (event) => {
    checkPermission();
};