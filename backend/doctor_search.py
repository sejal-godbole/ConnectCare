from flask import Flask, request, jsonify, render_template
import smtplib
from email.message import EmailMessage
from flask_cors import CORS

# --- Flask App Setup ---
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from frontend

# --- Email Config (Replace with your actual credentials) ---
EMAIL_ADDRESS = "sunshinesandlilies@gmail.com"
EMAIL_PASSWORD = "xciqogheaxgibzag"  # App password (not Gmail password)

@app.route("/")
def home():
    return render_template("index.html")  # ✅ serves your HTML

# --- Email Sending Function ---
def send_email(to_email, doctor_name, place, time, user_name, symptoms, phone):
    msg = EmailMessage()
    msg['Subject'] = 'Appointment Confirmation - Connect Care'
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_email

    msg.set_content(f"""
Hello {user_name},

Your appointment has been successfully booked!

📅 Date & Time: {time}
👨‍⚕️ Doctor: {doctor_name}
📍 Location: {place}
📞 Phone: {phone}

📝 Symptoms/Notes:
{symptoms}

Thank you for using SmartHealth AI. Wishing you good health!

- Connect Care Team
""")

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return True
    except Exception as e:
        print(f"❌ Email sending error: {e}")
        return False

# --- Booking Endpoint ---
@app.route("/book_appointment", methods=["POST"])
def book_appointment():
    data = request.get_json()
    print("Received data:", data)  # 👈 debug line
    print("📥 Booking request received:", data)

    required_fields = ["name", "email", "phone", "datetime", "symptoms", "place", "doctor_name"]
    if not all(field in data for field in required_fields):
        return jsonify({"message": "❗ Missing required fields"}), 400

    success = send_email(
        to_email=data["email"],
        doctor_name=data["doctor_name"],
        place=data["place"],
        time=data["datetime"],
        user_name=data["name"],
        symptoms=data["symptoms"],
        phone=data["phone"]
    )

    if success:
        return jsonify({"message": "✅ Appointment booked and confirmation email sent."})
    else:
        return jsonify({"message": "❌ Failed to send email."}), 500

# --- Run App ---
if __name__ == "__main__":
    app.run(debug=True)
