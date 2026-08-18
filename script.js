// 1. تحديد العناصر الأساسية من الصفحة
const stageInputs = document.querySelectorAll('input[name="stage"]');
const bigbox1 = document.getElementById("bigbox1");             // حاوية الإعدادي
const smallbox1 = document.getElementById("smallbox1");           // حاوية الابتدائي
const classesContainer = document.getElementById("classesContainer"); // حاوية الفصول
const classesTitle = document.getElementById("classesTitle");   // عنوان حاوية الفصول
const classesList = document.getElementById("classesList");     // مكان أزرار الفصول
const nextColorBtn = document.getElementById("nextColorBtn");

// 2. الاستماع لتغيير "المرحلة التعليمية" (ابتدائي / إعدادي / KG)
stageInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
        // إعادة ضبط الخيارات السابقة وإخفاء الفصول
        uncheckAllGrades();
        hideClasses();

        if (e.target.id === "stage-prep") {
            bigbox1.style.display = "block";
            smallbox1.style.display = "none";
        } else if (e.target.id === "stage-primary") {
            bigbox1.style.display = "none";
            smallbox1.style.display = "block";
        } else {
            // في حال اختيار KG1 أو KG2
            bigbox1.style.display = "none";
            smallbox1.style.display = "none";
        }
    });
});

// 3. الاستماع لتغيير "الصف الدراسي" (عند اختيار أي صف)
document.addEventListener("change", (e) => {
    if (e.target.name === "grade") {
        const gradeShortName = e.target.getAttribute("data-short");
        const gradeFullName = e.target.getAttribute("data-name") || e.target.nextElementSibling?.textContent.trim();

        showClassesForGrade(gradeShortName, gradeFullName);
    }
});

// 4. دالة إنشاء الفصول (أول، ثاني، ثالث، رابع) بناءً على الصف المختار
function showClassesForGrade(shortName, fullName) {
    classesList.innerHTML = ""; // مسح الفصول القديمة
    classesTitle.textContent = `فصول (${fullName || 'الصف المختار'})`;

    // قائمة أسماء الفصول الأربعة
    const classSections = ["أول", "ثاني", "ثالث", "رابع"];

    classSections.forEach((section, index) => {
        const classId = `class-${index + 1}`;

        // إنشاء زر الاختيار Radio
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "class_section";
        radio.id = classId;
        radio.className = "cir-tabs__r";

        // إنشاء الـ Label الخاص بالزر
        const label = document.createElement("label");
        label.htmlFor = classId;
        label.className = "cir-tabs__t";

        // حماية من كلمة null: لو وُجدت السلسلة القصيرة تطبعها، وإلا تُظهر فقط اسم الفصل
        label.textContent = shortName ? `${shortName} ${section}` : `فصل ${section}`;

        // إضافة العناصر إلى القائمة
        classesList.appendChild(radio);
        classesList.appendChild(label);
    });

    // إظهار حاوية الفصول
    classesContainer.style.display = "block";
}

// دالة لإلغاء تحديد الصفوف عند تغيير المرحلة
function uncheckAllGrades() {
    const gradeInputs = document.querySelectorAll('input[name="grade"]');
    gradeInputs.forEach((input) => (input.checked = false));
}

// دالة لإخفاء حاوية الفصول ومسح محتواها
function hideClasses() {
    classesContainer.style.display = "none";
    classesList.innerHTML = "";
}

// 5. ميزة تغيير خلفية الصفحة عند الضغط على Next Color
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
