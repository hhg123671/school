const stagePrep = document.getElementById("stage-prep");
const stagePrimary = document.getElementById("stage-primary");
const stageKg1 = document.getElementById("stage-kg1");
const stageKg2 = document.getElementById("stage-kg2");

const bigbox1 = document.getElementById("bigbox1"); // حاوية الإعدادي
const smallbox1 = document.getElementById("smallbox1"); // حاوية الابتدائي
const nextColorBtn = document.getElementById("nextColorBtn");

// عند الضغط على إعدادي
if (stagePrep) {
    stagePrep.addEventListener("click", function () {
        if (bigbox1) bigbox1.style.display = "block";
        if (smallbox1) smallbox1.style.display = "none";
    });
}

// عند الضغط على ابتدائي
if (stagePrimary) {
    stagePrimary.addEventListener("click", function () {
        if (bigbox1) bigbox1.style.display = "none";
        if (smallbox1) smallbox1.style.display = "block";
    });
}

// إخفاء الحاويات عند اختيار KG1 أو KG2
const hideBoxes = () => {
    if (bigbox1) bigbox1.style.display = "none";
    if (smallbox1) smallbox1.style.display = "none";
};

if (stageKg1) stageKg1.addEventListener("click", hideBoxes);
if (stageKg2) stageKg2.addEventListener("click", hideBoxes);

// تغيير الخلفية التفاعلي
const gradients = [
    "linear-gradient(to right, #0ed2da, #5f29c7)",
    "linear-gradient(to right, #ff7e5f, #feb47b)",
    "linear-gradient(to right, #6a11cb, #2575fc)",
    "linear-gradient(to right, #00b09b, #96c93d)"
];
let currentGradientIndex = 0;

if (nextColorBtn) {
    nextColorBtn.addEventListener("click", () => {
        currentGradientIndex = (currentGradientIndex + 1) % gradients.length;
        document.body.style.background = gradients[currentGradientIndex];
        document.body.style.backgroundAttachment = "fixed";
    });
}
