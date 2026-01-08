import pandas as pd
import json
import os
import re
import glob

def convert_all_excel_to_single_json(input_folder, output_file):
    all_students_data = []
    excluded_keywords = ["عماني", "ذكر", "أنثى", "الجنسية", "الاسم", "مستجد", "منقول", "الجنس", "جمهورية"]
    
    # تعريف المواد ومواقعها (تنسيق الصف الخامس)
    subjects_mapping_g5 = {
        "التربية الإسلامية": (48, 46), "اللغة العربية": (43, 41), "اللغة الإنجليزية": (38, 36),
        "الرياضيات": (33, 30), "العلوم": (28, 25), "الدراسات الاجتماعية": (23, 21),
        "تقنية المعلومات": (19, 16), "التربية البدنية": (13, 11), "الفنون البصرية": (9, 6),
        "الفنون الموسيقية": (3, 1)
    }
    
    # تعريف المواد ومواقعها (تنسيق الصف السادس - بناءً على التحليل)
    # نلاحظ أن الأعمدة في الصف السادس زحفت لليمين
    subjects_mapping_g6 = {
        "التربية الإسلامية": (79, 77), "اللغة العربية": (74, 72), "اللغة الإنجليزية": (69, 67),
        "الرياضيات": (64, 61), "العلوم": (59, 56), "الدراسات الاجتماعية": (54, 52),
        "تقنية المعلومات": (50, 47), "التربية البدنية": (44, 42), "الفنون البصرية": (40, 37),
        "الفنون الموسيقية": (34, 32)
    }

    excel_files = glob.glob(os.path.join(input_folder, "*.xls*"))
    for file_path in excel_files:
        file_name = os.path.basename(file_path)
        grade_match = re.search(r'(\d+)', file_name)
        grade_num = int(grade_match.group(1)) if grade_match else 0
        grade_name = f"الصف {grade_num}" if grade_num else "غير محدد"
        
        # اختيار الخريطة المناسبة بناءً على الصف
        mapping = subjects_mapping_g6 if grade_num >= 6 else subjects_mapping_g5
        name_cols = [84, 83, 85] if grade_num >= 6 else [53, 52, 54]
        
        try:
            df = pd.read_excel(file_path, header=None)
            file_students_count = 0
            for index, row in df.iterrows():
                row_str_list = [str(cell).strip() for cell in row.tolist()]
                if "منقول" in row_str_list or "مستجد" in row_str_list:
                    status = "منقول" if "منقول" in row_str_list else "مستجد"
                    name_candidate = ""
                    for col_idx in name_cols:
                        if col_idx < len(row):
                            val = str(row[col_idx]).strip()
                            if len(val) > 5 and not val.isdigit() and val not in excluded_keywords:
                                name_candidate = val
                                break
                    
                    if name_candidate:
                        results = {}
                        for subject, (score_col, level_col) in mapping.items():
                            if score_col < len(row) and level_col < len(row):
                                score = row[score_col]
                                level = row[level_col]
                                try:
                                    if pd.notnull(score):
                                        s_str = str(score).replace(' ', '')
                                        if s_str.replace('.','',1).isdigit():
                                            score_val = float(s_str)
                                            if score_val.is_integer(): score_val = int(score_val)
                                        else: score_val = s_str
                                    else: score_val = ""
                                except: score_val = str(score) if pd.notnull(score) else ""
                                level_val = str(level).strip() if pd.notnull(level) else ""
                                results[subject] = {"score": score_val, "level": level_val}
                        
                        all_students_data.append({
                            "name": name_candidate, "status": status, "grade": grade_name, "results": results
                        })
                        file_students_count += 1
            print(f"Done: {file_students_count} students from {grade_name}")
        except Exception as e:
            print(f"Error processing {file_name}: {e}")

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_students_data, f, ensure_ascii=False, indent=4)
    return len(all_students_data)

if __name__ == "__main__":
    total = convert_all_excel_to_single_json(".", "students_final_results.json")
    print(f"\nTotal students merged: {total}")
