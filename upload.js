<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>محول ملفات النتائج - مدرسة صلالة الشرقية</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Almarai', sans-serif; background-color: #f4ece0; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .upload-card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; border-top: 8px solid #0a3d34; width: 90%; max-width: 500px; }
        h2 { color: #0a3d34; }
        .file-input { margin: 20px 0; padding: 20px; border: 2px dashed #c5a059; border-radius: 10px; cursor: pointer; }
        .btn-convert { background: #0a3d34; color: #c5a059; border: none; padding: 15px 30px; border-radius: 10px; font-weight: bold; cursor: pointer; width: 100%; font-size: 1.1rem; }
        .btn-convert:disabled { background: #ccc; cursor: not-allowed; }
        #status { margin-top: 20px; font-weight: bold; }
    </style>
</head>
<body>

<div class="upload-card">
    <h2>محول الإكسل إلى JSON</h2>
    <p>اختر ملف إكسل (سادس، سابع، ثامن، أو تاسع)</p>
    
    <div class="file-input" onclick="document.getElementById('excelFile').click()">
        <span>اضغط هنا لاختيار الملف</span>
        <input type="file" id="excelFile" accept=".xls,.xlsx" style="display:none">
    </div>
    
    <button class="btn-convert" id="convertBtn" onclick="processExcel()">تحويل وحفظ الملف</button>
    
    <div id="status"></div>
</div>

<script>
    function processExcel() {
        const fileInput = document.getElementById('excelFile');
        const status = document.getElementById('status');
        
        if (!fileInput.files[0]) {
            alert("الرجاء اختيار ملف أولاً");
            return;
        }

        status.innerHTML = "جاري المعالجة...";
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            
            // تحويل الشيت إلى مصفوفة بيانات
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, {header: 1});
            
            // ابحث عن صف الترويسة (الذي يحتوي على اسم الطالب)
            let headerIndex = jsonData.findIndex(row => row.includes("اسم الطالب") || row.includes("الاسم"));
            
            if (headerIndex === -1) {
                status.innerHTML = "<span style='color:red;'>خطأ: لم يتم العثور على عمود (اسم الطالب)</span>";
                return;
            }

            const headers = jsonData[headerIndex];
            const students = [];
            const subjects = ["التربية الإسلامية", "اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "العلوم", "الدراسات الاجتماعية", "المهارات الحياتية"];

            // استخراج البيانات
            for (let i = headerIndex + 1; i < jsonData.length; i++) {
                const row = jsonData[i];
                const name = row[headers.indexOf("اسم الطالب")] || row[headers.indexOf("الاسم")];

                if (name && name.length > 10) {
                    let grades = {};
                    subjects.forEach(sub => {
                        let subIdx = headers.findIndex(h => h && h.includes(sub));
                        if (subIdx !== -1) {
                            grades[sub] = {
                                "score": row[subIdx] || "---",
                                "level": row[subIdx + 1] || "---" // المستوى غالباً بجانب الدرجة
                            };
                        }
                    });

                    students.append({
                        "name": name.trim(),
                        "searchName": name.trim().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي'),
                        "status": "مستجد",
                        "grades": grades
                    });
                }
            }

            downloadJSON(students);
            status.innerHTML = `<span style='color:green;'>تم التحويل بنجاح! تم معالجة ${students.length} طالب.</span>`;
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
