import pdfplumber
with pdfplumber.open(r"dokument/Inbjudan KM INNE 2026 DUBBEL.pdf") as pdf:
    for i, page in enumerate(pdf.pages):
        print(f"=== Page {i+1} ===")
        text = page.extract_text()
        print(text)
