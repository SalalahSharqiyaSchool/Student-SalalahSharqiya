<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>محول نتائج مدرسة صلالة الشرقية</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Almarai', sans-serif; background-color: #f4ece0; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
        .upload-card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; border-top: 8px solid #0a3d34; width: 90%; max-width: 500px; }
        h2 { color: #0a3d34; margin-bottom: 10px; }
        .file-input-container { margin: 25px 0; padding: 30px; border: 2px dashed #c5a059; border-radius: 15px; cursor: pointer; background: #fff; transition: 0.3s; }
        .file-input-container:hover { background-color: #fdfaf5; border-color: #0a3d34; }
        .btn-convert { background: #0a3d34; color: #c5a059; border: none; padding: 18px 30px; border-radius: 10px; font-weight: bold; cursor: pointer; width: 100%; font-size: 1.1rem; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
        .btn-convert:active { transform: scale(0.98); }
        #status { margin-top: 20px; font-weight: bold; padding: 10px; border-radius: 8px; }
        .error { background: #fee2e2; color: #b91c1c; }
        .success { background: #dcfce7; color: #15803d; }
    </style>
</head>
<body>

<div class="upload-card">
    <h2>محول النتائج الذكي</h2>
    <p style="color: #666;">اختر ملف الإكسل وسأقوم بتحويله لك فوراً</p>
    
    <div class="file-input-container" onclick="document.getElementById('excelFile').click()">
        <div id="fileName">اضغط هنا لاختيار الملف من جهازك</div>
        <input type="file" id="excelFile" accept=".xls,.xlsx" style="display:none" onchange="showName()">
    </div>
    
    <button class="btn-convert" onclick="processExcel()">ابدأ التحويل الآن</button>
    
    <div id="status"></div>
</div>

<script>
    function showName() {
        const file = document.getElementById('excelFile').files[0];
        if (file) document.getElementById('fileName').innerText = "تم اختيار: " + file.name;
    }

    async function processExcel() {
        const fileInput = document.getElementById('excelFile');
        const status = document.getElementById('status');
        
        if (!fileInput.files[0]) {
            alert("من فضلك اختر ملف الإكسل أولاً");
            return;
        }

        status.className = "";
        status.innerHTML = "جاري التحليل... انتظر قليلاً";
        
        const reader = new FileReader();
        reader.readAsArrayBuffer(fileInput.files[0]);
        
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                
                // تحويل إلى مصفوفة بيانات خام
                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                
                // البحث عن صف العناوين تلقائياً
                let headerRowIndex = rows.findIndex(row => row.some(cell => String(cell).includes("اسم الطالب")));
                
                if (headerRowIndex === -1) {
                    throw new Error("لم أجد عمود (اسم الطالب). تأكد أن الملف هو كشف درجات البوابة التعليمية.");
                }

                const headers = rows[headerRowIndex];
                const nameIdx = headers.findIndex(h => String(h).includes("اسم الطالب"));
                const students = [];

                // المواد المستهدفة
                const subjects = ["التربية الإسلامية", "اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "العلوم", "الدراسات الاجتماعية", "تقنية المعلومات", "المهارات الحياتية"];

                for (let i = headerRowIndex + 1; i < rows.length; i++) {
                    const row = rows[i];
                    const name = String(row[nameIdx] || "").trim();

                    if (name && name.length > 8 && name !== "nan") {
                        let grades = {};
                        subjects.forEach(sub => {
                            let sIdx = headers.findIndex(h => String(h).includes(sub));
                            if (sIdx !== -1) {
                                // جلب الدرجة والمستوى (المستوى غالباً في العمود السابق أو الذي يليه)
                                let score = row[sIdx];
                                let level = row[sIdx - 1] || row[sIdx - 2] || "";
                                
                                // إذا كان المستوى ليس حرفاً (أ،ب،ج،د) نبحث في الجانب الآخر
                                if (!/^[أ-ي]$/.test(String(level).trim())) level = row[sIdx + 1] || "";

                                grades[sub] = {
                                    "score": score || "---",
                                    "level": String(level).trim() || "---"
                                };
                            }
                        });

                        students.push({
                            "name": name,
                            "searchName": name.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي'),
                            "status": "مستجد",
                            "grades": grades
                        });
                    }
                }

                if (students.length === 0) throw new Error("لم يتم استخراج أي بيانات طلاب. تأكد من محتوى الملف.");

                // تحميل الملف الناتج
                saveFile(students);
                status.className = "success";
                status.innerHTML = `نجح التحويل! تم تجهيز ${students.length} طالب. افحص مجلد التنزيلات (Downloads).`;

            } catch (err) {
                status.className = "error";
                status.innerHTML = "خطأ: " + err.message;
            }
        };
    }

    function saveFile(data) {
        const blob = new Blob([JSON.stringify(data, null, 4)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "students_final_results.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
</script>

</body>
</html>
