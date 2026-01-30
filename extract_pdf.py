import sys
try:
    from pypdf import PdfReader
except ImportError:
    print("pypdf not installed")
    sys.exit(1)

try:
    reader = PdfReader("BFAS.pdf")
    text = ""
    with open("pdf_content.txt", "w", encoding="utf-8") as f:
        for page in reader.pages:
            text = page.extract_text()
            if text:
                f.write(text + "\n")
    print("PDF extraction complete. Check pdf_content.txt")
except Exception as e:
    print(f"Error reading PDF: {e}")
