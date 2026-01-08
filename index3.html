<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>بوابة مدرسة صلالة الشرقية الرقمية</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    
    <style>
        :root {
            --royal-green: #0a3d34;
            --royal-gold: #c5a059;
            --bg-gold: #f4ece0;
        }

        body { 
            font-family: 'Almarai', sans-serif; 
            margin: 0; 
            background-color: var(--bg-gold);
            color: #333;
        }

        .royal-header { 
            background: var(--royal-green);
            padding: 15px 5%; 
            border-bottom: 4px solid var(--royal-gold); 
            display: flex; justify-content: space-between; align-items: center;
            color: white;
        }
        .header-brand { display: flex; align-items: center; gap: 10px; }
        .header-brand img { height: 50px; }
        .header-brand h1 { margin: 0; font-size: 1.2rem; color: var(--royal-gold); }

        .container { max-width: 800px; margin: 20px auto; padding: 0 15px; }

        .search-box { 
            background: white; padding: 30px; border-radius: 15px; 
            box-shadow: 0 5px 20px rgba(0,0,0,0.1); text-align: center; 
            border-top: 5px solid var(--royal-gold);
        }
        input[type="text"] { 
            width: 100%; max-width: 350px; padding: 15px; border-radius: 10px; 
            border: 1px solid #ddd; margin-bottom: 10px; text-align: center; font-size: 1.1rem;
            font-family: 'Almarai', sans-serif;
        }
        .btn-royal { 
            background: var(--royal-green); color: var(--royal-gold); 
            border: none; padding: 15px 40px; border-radius: 10px; 
            font-weight: 800; cursor: pointer; width: 100%; max-width: 350px;
            transition: 0.3s; margin-top: 10px;
        }
        .btn-royal:hover { opacity: 0.9; transform: scale(1.02); }

        /* صندوق الاقتراحات */
        #suggestions {
            max-width: 350px; margin: 0 auto 20px; background: white;
            border: 1px solid #ddd; border-radius: 0 0 10px 10px;
            display: none; text-align: right; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            max-height: 200px; overflow-y: auto;
            position: relative; z-index: 100;
        }
        .suggestion-item { padding: 12px 15px; cursor: pointer; border-bottom: 1px solid #eee; font-size: 0.9rem; }
        .suggestion-item:hover { background: #f1f1f1; color: var(--royal-green); }

        #resultView { display: none; }
        .student-card {
            background: white; border-radius: 15px; padding: 20px;
            margin-bottom: 20px; border-right: 8px solid var(--royal-green);
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .student-card h2 { margin: 0 0 15px 0; color: var(--royal-green); font-size: 1.4rem; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9rem; }

        .table-container { background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        table { width: 100%; border-collapse: collapse; }
        th { background: var(--royal-green); color: var(--royal-gold); padding: 12px; font-size: 0.9rem; }
        td { padding: 12px; text-align: center; border-bottom: 1px solid #eee; font-size: 0.95rem; }

        #ai-btn { 
            position: fixed; bottom: 25px; left: 25px; background: var(--royal-green); 
            color: var(--royal-gold); width: 60px; height: 60px; border-radius: 50%; 
            display: none; align-items: center; justify-content: center; 
            cursor: pointer; font-size: 25px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); z-index: 1000;
        }
        #ai-box {
            position: fixed; bottom: 95px; left: 20px; width: 350px; height: 450px;
            background: white; border-radius: 15px; display: none; flex-direction: column;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 1001; overflow: hidden; border: 1px solid #ddd;
        }
        .ai-head { background: var(--royal-green); color: white; padding: 15px; display: flex; justify-content: space-between; }
        .ai-content { flex: 1; overflow-y: auto; padding: 15px; background: #f9f9f9; font-size: 0.9rem; line-height: 1.6; }

        @media (max-width: 600px) {
            .royal-header { flex-direction: column; gap: 10px; }
            .info-grid { grid-template-columns: 1fr; }
            #ai-box { width: 90%; left: 5%; bottom: 20px; height: 70%; }
        }

        @media print {
            .no-print, #ai-btn, #ai-box, .royal-header { display: none !important; }
            body { background: white; }
            #resultView { display: block !important; }
            .official-header { display: flex !important; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
        }
        .official-header { display: none; }
    </style>
</head>
<body>

<header class="royal-header no-print">
    <div class="header-brand">
        <img src="logo.png" onerror="this.src='https://raw.githubusercontent.com/Omanya/DigitalPortal/main/logo.png'">
        <h1>مدرسة صلالة الشرقية (5-10)</h1>
    </div>
    <div style="font-size: 0.8rem; opacity: 0.8;">بوابة النتائج الرقمية</div>
</header>

<div class="container">
    <section id="searchView" class="no-print">
        <div class="search-box">
            <h2 style="color: var(--royal-green);">استعلام النتائج بالاسم</h2>
            <div style="position: relative;">
                <input type="text" id="nameInput" placeholder="أدخل اسم الطالب (ثلاثي أو رباعي)" autocomplete="off">
                <div id="suggestions"></div>
            </div>
            <button class="btn-royal" onclick="searchStudent()">عرض النتيجة</button>
        </div>
    </section>

    <section id="resultView">
        <div class="official-header">
            <div style="font-size: 10pt;">سلطنة عُمان<br>وزارة التربية والتعليم<br>مدرسة صلالة الشرقية</div>
            <img src="logo.png" style="height: 60px;" onerror="this.src='https://raw.githubusercontent.com/Omanya/DigitalPortal/main/logo.png'">
            <div style="font-size: 10pt; text-align: left;">نتائج الطلاب<br>2025/2026 م</div>
        </div>

        <div class="student-card">
            <h2 id="resName"></h2>
            <div class="info-grid">
                <div>حالة القيد: <b id="resStatus"></b></div>
                <div>المستوى العام: <b id="resLevel" style="font-size: 1.1rem; color: #d35400;"></b></div>
            </div>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>المادة الدراسية</th>
                        <th>الدرجة</th>
                        <th>المستوى</th>
                    </tr>
                </thead>
                <tbody id="gradesBody"></tbody>
            </table>
        </div>

        <div class="no-print" style="text-align: center; margin-top: 20px;">
            <button class="btn-royal" onclick="window.print()">طباعة الشهادة</button>
            <p onclick="location.reload()" style="color: #666; cursor: pointer; text-decoration: underline;">بحث جديد</p>
        </div>
    </section>
</div>

<div id="ai-btn" onclick="toggleAI()"><i class="fa-solid fa-robot"></i></div>
<div id="ai-box">
    <div class="ai-head">
        <span>المستشار الذكي</span>
        <i class="fa-solid fa-times" onclick="toggleAI()" style="cursor:pointer;"></i>
    </div>
    <div id="aiChat" class="ai-content"></div>
    <div style="padding: 10px; border-top: 1px solid #eee; display: flex; gap: 5px;">
        <input type="text" id="aiInp" style="flex:1; padding:8px; border:1px solid #ddd; border-radius:5px;" placeholder="اسأل المعلم...">
        <button onclick="sendMsg()" style="background:var(--royal-green); color:var(--royal-gold); border:none; padding:8px 15px; border-radius:5px;"><i class="fa-solid fa-paper-plane"></i></button>
    </div>
</div>

<script>
    let currentData = null;
    let allStudents = [];

    // دالة تنظيف النصوص العربية للبحث الفعال
    function normalizeArabic(text) {
        if (!text) return "";
        return text.toString()
            .replace(/[أإآ]/g, 'ا')
            .replace(/ة/g, 'ه')
            .replace(/ى/g, 'ي')
            .replace(/[\u064B-\u0652]/g, "") 
            .replace(/\s+/g, '') 
            .trim();
    }

    // تحميل البيانات عند فتح الصفحة
    window.onload = async () => {
        try {
            const res = await fetch("students_final_results.json?v=" + Date.now());
            if (!res.ok) throw new Error("File Not Found");
            allStudents = await res.json();
            
            allStudents.forEach(s => {
                s.normalizedName = normalizeArabic(s.name);
            });
            console.log("Data loaded: " + allStudents.length);
        } catch(e) {
            alert("خطأ: لم يتم العثور على ملف students_final_results.json بجانب الصفحة.");
        }
    };

    const nameInput = document.getElementById('nameInput');
    const suggestionsBox = document.getElementById('suggestions');

    // منطق الاقتراحات
    nameInput.oninput = () => {
        const val = normalizeArabic(nameInput.value);
        if(val.length < 2) {
            suggestionsBox.style.display = 'none';
            return;
        }
        const matches = allStudents.filter(s => s.normalizedName.includes(val)).slice(0, 8);
        if(matches.length > 0) {
            suggestionsBox.innerHTML = matches.map(m => 
                `<div class="suggestion-item" onclick="selectName('${m.name.replace(/'/g, "\\'")}')">${m.name}</div>`
            ).join('');
            suggestionsBox.style.display = 'block';
        } else {
            suggestionsBox.style.display = 'none';
        }
    };

    function selectName(name) {
        nameInput.value = name;
        suggestionsBox.style.display = 'none';
        searchStudent();
    }

    async function searchStudent() {
        const inputVal = normalizeArabic(nameInput.value);
        if(!inputVal) return;
        
        const found = allStudents.find(s => s.normalizedName === inputVal || s.normalizedName.includes(inputVal));
        
        if(found) {
            currentData = found;
            document.getElementById('resName').innerText = found.name;
            document.getElementById('resStatus').innerText = found.status || "مستجد";
            
            let rows = '', totalScore = 0, count = 0;
            // دعم كلا التسميتين (grades أو results)
            const marks = found.grades || found.results;

            for (let sub in marks) {
                const score = marks[sub].score;
                const level = marks[sub].level;
                
                if(!isNaN(parseFloat(score))) {
                    totalScore += parseFloat(score);
                    count++;
                }
                rows += `<tr><td style="text-align:right;">${sub}</td><td>${score || '-'}</td><td>${level || '-'}</td></tr>`;
            }
            
            const avg = count > 0 ? (totalScore / count) : 0;
            let generalLevel = avg >= 90 ? 'أ' : avg >= 80 ? 'ب' : avg >= 65 ? 'ج' : avg >= 50 ? 'د' : 'هـ';

            document.getElementById('resLevel').innerText = generalLevel + " (" + avg.toFixed(1) + "%)";
            document.getElementById('gradesBody').innerHTML = rows;
            document.getElementById('searchView').style.display = 'none';
            document.getElementById('resultView').style.display = 'block';
            document.getElementById('ai-btn').style.display = 'flex';
        } else { 
            alert("الاسم غير موجود. تأكد من كتابة الاسم كما هو في كشف المدرسة."); 
        }
    }

    function toggleAI() {
        const box = document.getElementById('ai-box');
        box.style.display = box.style.display === 'flex' ? 'none' : 'flex';
        if(box.style.display === 'flex' && !document.getElementById('aiChat').innerHTML) runAI();
    }

    async function runAI() {
        const chat = document.getElementById('aiChat');
        chat.innerHTML = 'جاري تحليل نتيجتك...';
        const marks = found.grades || found.results;
        const p = `أنت معلم عماني، حلل درجات الطالب ${currentData.name}: ${JSON.stringify(marks)}. أعط نصيحة تربوية قصيرة.`;
        try {
            const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(p)}`);
            const text = await res.text();
            chat.innerHTML = text.replace(/\n/g, '<br>');
        } catch(e) { chat.innerHTML = "المستشار الذكي غير متاح حالياً."; }
    }

    async function sendMsg() {
        const inp = document.getElementById('aiInp');
        const chat = document.getElementById('aiChat');
        if(!inp.value) return;
        chat.innerHTML += `<div style="color:var(--royal-green); margin-top:10px;"><b>أنت:</b> ${inp.value}</div>`;
        const q = inp.value; inp.value = '';
        const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent("أجب كمعلم عماني: " + q)}`);
        const text = await res.text();
        chat.innerHTML += `<div style="margin-top:5px;"><b>المعلم:</b> ${text.replace(/\n/g, '<br>')}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }
</script>
</body>
</html>
