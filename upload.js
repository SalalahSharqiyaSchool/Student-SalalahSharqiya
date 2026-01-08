import pandas as pd
import json
import os

def convert_excel_to_json(file_path, output_path):
    # قراءة ملف الإكسل (دعم .xls و .xlsx)
    df = pd.read_excel(file_path, header=None)
    
    # تحويل كافة الخلايا إلى نصوص لتسهيل البحث عن الكلمات المفتاحية
    df_clean = df.astype(str).apply(lambda x: x.str.strip())

    students_data = []
    
    # 1. البحث التلقائي عن عمود "الاسم" وعمود "حالة القيد"
    # سنبحث في أول 10 صفوف عن الصف الذي يحتوي على ترويسة الجدول
    name_col = -1
    status_col = -1
    
    for r in range(len(df_clean)):
        row_list = df_clean.iloc[r].tolist()
        for c, cell in enumerate(row_list):
            if "اسم الطالب" in cell or "الاسم" == cell:
                name_col = c
            if "حالة القيد" in cell or "مستجد" in cell or "منقول" in cell:
                status_col = c
        if name_col != -1: break # وجدنا الترويسة

    # 2. تحديد أماكن المواد (بحث ديناميكي)
    # سنقوم بمسح الصف الذي وجدنا فيه الاسم لنعرف أماكن المواد
    subjects_mapping = {}
    header_row = df_clean.iloc[r].tolist()
    
    potential_subjects = [
        "التربية الإسلامية", "اللغة العربية", "اللغة الإنجليزية", 
        "الرياضيات", "العلوم", "الدراسات الاجتماعية", 
        "تقنية المعلومات", "التربية البدنية", "الفنون البصرية", 
        "الفنون الموسيقية", "المهارات الحياتية"
    ]

    for c, cell in enumerate(header_row):
        for sub in potential_subjects:
            if sub in cell:
                # عادة الدرجة هي نفس العمود أو بجانبه والمستوى بجانبه
                # في نظام عمان: العمود الأول للمادة هو الدرجة، والثاني هو المستوى
                subjects_mapping[sub] = (c, c-2 if c-2 >=0 else c-1) # تعديل تقريبي حسب شكل الكشف

    # 3. استخراج البيانات
    for index, row in df.iterrows():
        # نتخطى صفوف الترويسة
        if index <= r: continue
        
        student_name = str(row[name_col]).strip() if name_col != -1 else ""
        status = str(row[status_col]).strip() if status_col != -1 else "مستجد"
        
        # التأكد أن هذا الصف يحتوي على طالب فعلي وليس صفاً فارغاً
        if len(student_name) < 8 or "اسم الطالب" in student_name or student_name == "nan":
            continue

        results = {}
        for subject, cols in subjects_mapping.items():
            # الدرجة غالباً تكون هي الرقم، والمستوى هو الحرف (أ، ب، ج)
            val1 = row[cols[0]]
            val2 = row[cols[1]]
            
            # تحديد أيهما الدرجة وأيهما المستوى
            score = val1 if not str(val1).isalpha() else val2
            level = val2 if str(val2).isalpha() else val1

            results[subject] = {
                "score": str(score) if pd.notnull(score) else "---",
                "level": str(level) if pd.notnull(level) else "---"
            }

        students_data.append({
            "name": student_name,
            "searchName": student_name.replace("أ","ا").replace("إ","ا").replace("ة","ه"), # للبحث السهل
            "status": status,
            "grades": results
        })

    # حفظ الملف
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(students_data, f, ensure_ascii=False, indent=4)
    
    return len(students_data)

if __name__ == "__main__":
    # قم بتغيير المسار حسب الملف الذي ترفعه (سادس، سابع، الخ)
    input_file = "/home/ubuntu/upload/report.xls" 
    output_file = "/home/ubuntu/students_final_results.json"
    
    try:
        count = convert_excel_to_json(input_file, output_file)
        print(f"تم بنجاح معالجة {count} طالب.")
    except Exception as e:
        print(f"خطأ: {e}")
