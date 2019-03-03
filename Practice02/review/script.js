var display = document.getElementById("display")
var next = document.getElementById("next")
var back = document.getElementById("back")
var link = ["https://upload.wikimedia.org/wikipedia/commons/0/09/Deep_Fried_Pizza.jpg", "https://upload.wikimedia.org/wikipedia/commons/a/ae/Kartoffel_pizza_%28with_border%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/7/70/Pizza_in_deep_fat_fryer_2.jpg"]

var counter = 0

next.addEventListener(
    "click",
    function edit() {
        counter = counter + 1
        document.getElementById("display").src = link[counter]
    }
)

back.addEventListener(
    "click",
    function edit() {
        counter = counter - 1
        dispaly.src = link[counter]
    }
)