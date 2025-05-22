# PDF report generation
from reportlab.pdfgen import canvas

def generate_pdf_report(filename="report.pdf"):
    c = canvas.Canvas(filename)
    c.drawString(100, 750, "Relatório de Atividades")
    c.save()
