#!/usr/bin/env python3
"""
국어 어휘 엑셀을 korean/source.json 으로 옮긴다.

엑셀을 그때그때 읽지 않고 JSON 을 한 번 만들어 커밋해 두는 이유:

  * 레벨 파일을 만드는 스크립트는 Node 로 돌아간다. 엑셀을 읽으려면
    파이썬과 openpyxl 이 필요한데, 레벨을 다시 뽑을 때마다 그 둘을
    갖춰야 하는 것은 번거롭다.
  * 엑셀은 원본 그대로 두고 싶다. 손으로 고친 흔적이 JSON 쪽에 남으면
    무엇이 원본이고 무엇이 수정인지 diff 로 보인다.

원본 엑셀은 korean/Korean_essential_voca.xlsx 하나면 된다.
CSAT_Korean_Essential_Vocabulary_800.xlsx 의 800개는 순번·어휘명까지
이 파일 안에 그대로 들어 있음을 확인했다.

    python3 scripts/korean/xlsx-to-json.py
"""

import json
import sys
from pathlib import Path

try:
    import openpyxl
except ImportError:
    sys.exit('openpyxl 이 필요합니다:  pip install openpyxl')

ROOT = Path(__file__).resolve().parents[2]
XLSX = ROOT / 'korean' / 'Korean_essential_voca.xlsx'
OUT = ROOT / 'korean' / 'source.json'

# 시트마다 머리글 줄 위치와 열 순서가 제각각이라 여기에 적어 둔다.
# (시트 이름, 머리글이 있는 줄, 뽑아 올 열 번호)
SHEETS = {
    'idiom': ('사자성어_300개', 0, {'no': 1, 'hanja': 2, 'word': 3, 'meaning': 4, 'example': 5}),
    'concept': ('개념어_200개', 1, {'no': 0, 'field': 1, 'word': 2, 'meaning': 3, 'example': 4}),
    'classic': ('고전문학 필수 어휘 150 개', 0, {'no': 0, 'word': 1, 'meaning': 2, 'field': 3, 'example': 4}),
}

CSAT_SHEETS = [
    '수능 국어 필수 어휘 (1~200)',
    '수능 국어 필수 어휘(201~400)',
    '수능 국어 필수 어휘 (401~600)',
    '수능 국어 필수 어휘 (601~800)',
]
CSAT_COLS = {'no': 0, 'word': 1, 'hanja': 2, 'field': 3, 'meaning': 4, 'example': 5}


def cell(v):
    return '' if v is None else str(v).strip()


def read(wb, sheet, header_row, cols):
    ws = wb[sheet]
    out = []
    for i, row in enumerate(ws.iter_rows(values_only=True)):
        if i <= header_row:
            continue
        if all(c is None or str(c).strip() == '' for c in row):
            continue
        rec = {k: cell(row[c]) for k, c in cols.items()}
        rec['no'] = int(float(rec['no'])) if rec['no'] else 0
        out.append(rec)
    return out


def main():
    if not XLSX.exists():
        sys.exit(f'원본 엑셀이 없습니다: {XLSX}')

    wb = openpyxl.load_workbook(XLSX, read_only=True, data_only=True)
    data = {}
    for key, (sheet, hr, cols) in SHEETS.items():
        data[key] = read(wb, sheet, hr, cols)

    csat = []
    for sheet in CSAT_SHEETS:
        csat += read(wb, sheet, 2, CSAT_COLS)
    data['csat'] = csat
    wb.close()

    # 사자성어 용례는 엑셀에 큰따옴표로 감싸여 있다. 화면에 그대로 쓰면
    # 따옴표가 겹쳐 보이므로 여기서 벗겨 둔다.
    for r in data['idiom']:
        r['example'] = r['example'].strip('"').strip('“”').strip()

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        json.dumps(data, ensure_ascii=False, indent=1) + '\n',
        encoding='utf-8',
    )

    total = sum(len(v) for v in data.values())
    for k, v in data.items():
        print(f'  {k:8} {len(v):>4}')
    print(f'  {"합계":8} {total:>4}  →  {OUT.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
