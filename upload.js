<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>محول نتائج مدرسة صلالة الشرقية</title>
    <script src="https://cdn.sheetjs.com/xlsx-0.19.3/package/dist/xlsx.full.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Almarai', sans-serif; background-color: #f4ece0; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .upload-card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; border-top: 8px solid #0a3d34; width: 90%; max-width: 500px; }
        h2 { color: #0a3d34; margin-bottom: 10px; }
        p { color: #666; font-size: 0.9rem; }
        .file-input-container { margin: 20px 0; padding: 30px; border: 2px dashed #c5a059; border-radius: 15px; cursor: pointer; transition: 0.3s; }
        .file-input-container:hover { background-color: #fdfaf5; }
        .btn-convert { background: #0a3d34; color: #c5a059; border: none; padding: 15px 30px; border-radius: 10px; font-weight: bold; cursor: pointer; width: 100%; font-size: 1.1rem; transition: 0.3s; }
        .btn-convert:hover { opacity: 0.9; }
        #status { margin-top: 20px; font-weight: bold; min-height: 24px; }
    </style>
</head>
<body>

<div class="upload-card">
    <h2>محول الإكسل الذكي</h2>
    <p>يدعم صفوف (5، 6، 7، 8، 9)</p>
    
    <div class="file-input-container" onclick="document.getElementById('excelFile').click()">
        <div id="fileNameDisplay">اضغط لاختيار ملف الإكسل (xls/xlsx)</div>
        <input type="file" id="excelFile" accept=".xls,.xlsx" style="display:none" onchange="updateFileName()">
    </div>
    
    <button class="btn-convert" onclick="processExcel()">تحويل وحفظ الملف</button>
    
    <div id="status"></div>
</div>

<script>
    function updateFileName() {
        const input = document.getElementById('excelFile');
        const display = document.getElementById('fileNameDisplay');
        if (input.files.length > 0) {
            display.innerText = "الملف المختار: " + input.files[0].name;
            display.style.color = "#0a3d34";
        }
    }

    function processExcel() {
        const fileInput = document.getElementById('excelFile');
        const status = document.getElementById('status');
        
        if (!fileInput.files[0]) {
            alert("الرجاء اختيار ملف أولاً");
            return;
        }

        status.innerHTML = "جاري التحويل... <i class='fas fa-spinner fa-spin'></i>";
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                
                // تحويل الشيت إلى مصفوفة (Array of Arrays)
                const rows = XLSX.utils.sheet_to_json(firstSheet, {header: 1});
                
                // البحث عن صف العناوين
                let headerRowIndex = -1;
                for (let i = 0; i < rows.length; i++) {
                    if (rows[i].some(cell => String(cell).includes("اسم الطالب"))) {
                        headerRowIndex = i;
                        break;
                    }
                }

                if (headerRowIndex === -1) {
                    status.innerHTML = "<span style='color:red;'>خطأ: لم نجد عمود 'اسم الطالب'. تأكد من تنسيق الملف.</span>";
                    return;
                }

                const headers = rows[headerRowIndex];
                const nameColIndex = headers.findIndex(h => String(h).includes("اسم الطالب"));
                const students = [];

                // المواد التي سنبحث عنها في الترويسة
                const targetSubjects = ["التربية الإسلامية", "اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "العلوم", "الدراسات الاجتماعية", "المهارات الحياتية"];

                for (let i = headerRowIndex + 1; i < rows.length; i++) {
                    const currentRow = rows[i];
                    const studentName = String(currentRow[nameColIndex] || "").trim();

                    if (studentName && studentName.length > 8 && studentName !== "nan") {
                        let grades = {};
                        
                        targetSubjects.forEach(sub => {
                            let subIdx = headers.findIndex(h => String(h).includes(sub));
                            if (subIdx !== -1) {
                                // الدرجة في العمود، والمستوى غالباً قبله بـ 2 أو بعده حسب نظام الكشف
                                // الكود يحاول العثور على المستوى (أ، ب، ج) في الخلايا المجاورة
                                let score = currentRow[subIdx];
                                let level = currentRow[subIdx - 2] || currentRow[subIdx - 1] || "";

                                grades[sub] = {
                                    "score": score !== undefined ? score : "---",
                                    "level": (String(level).length === 1) ? level : "---"
                                };
                            }
                        });

                        students.push({
                            "name": studentName,
                            "searchName": studentName.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي'),
                            "status": "مستجد",
                            "grades": grades
                        });
                    }
                }

                if (students.length > 0) {
                    downloadJSON(students);
                    status.innerHTML = `<span style='color:green;'>نجح التحويل! تم تجهيز ${students.length} طالب.</span>`;
                } else {
                    status.innerHTML = "<span style='color:orange;'>لم يتم العثور على بيانات طلاب.</span>";
                }
            } catch (error) {
                console.error(error);
                status.innerHTML = "<span style='color:red;'>حدث خطأ أثناء قراءة الملف.</span>";
            }
        };

        reader.readAsArrayBuffer(file);
    }

    function downloadJSON(data) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 4));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "students_final_results.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
</script>

</body>
</html>
