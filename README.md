# Speechify - Real-Time Text-to-Speech & Speech-to-Text Converter

**Speechify** is a powerful, real-time text-to-speech (TTS) and speech-to-text (STT) conversion tool built using the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to seamlessly convert text into speech and speech into text, with additional features like multi-language support, downloadable MP3 files, and the ability to save conversions for future reference. Whether you're a developer, content creator, or just someone who loves experimenting with voice technology, Speechify is here to make your life easier.

## 🌟 **Key Features**

### 1. **Real-Time Text-to-Speech Conversion**
   - Convert any text into natural-sounding speech instantly.
   - Supports multiple languages for global accessibility.
   - Download the converted speech as an MP3 file for offline use.

### 2. **Real-Time Speech-to-Text Conversion**
   - Transcribe spoken words into text in real-time.
   - Ideal for note-taking, transcription, and accessibility purposes.

### 3. **Multi-Language Support**
   - Supports a wide range of languages for both text-to-speech and speech-to-text conversions.
   - Break language barriers and communicate effectively.

### 4. **Save Your Work**
   - Save your converted text and speech for future reference.
   - Access your saved files anytime from your user profile.

### 5. **Downloadable MP3 Files**
   - After converting text to speech, download the audio file in MP3 format.
   - Perfect for creating podcasts, audiobooks, or voiceovers.

### 6. **User-Friendly Interface**
   - Clean, modern, and responsive design powered by **Tailwind CSS**.
   - Easy navigation and intuitive controls for a seamless user experience.

### 7. **Toast Notifications**
   - Get real-time feedback on your actions with **React Toastify**.
   - Stay informed about the status of your conversions and downloads.

## 🛠️ **Tech Stack**

Speechify is built using the **MERN stack**, ensuring a robust and scalable architecture. Here's a breakdown of the technologies used:

### Frontend:
- **React.js** (v19.0.0) - For building a dynamic and responsive user interface.
- **Tailwind CSS** (v4.0.14) - For styling and creating a modern, sleek design.
- **React Router DOM** (v7.4.0) - For seamless navigation between pages.
- **React Toastify** (v11.0.5) - For displaying toast notifications.

### Backend:
- **Node.js** - For server-side logic and handling API requests.
- **Express.js** - For building RESTful APIs and managing routes.

### Database:
- **MongoDB** - For storing user data, saved conversions, and other relevant information.


## 🚀 **Getting Started**

### Prerequisites:
- Node.js (v16 or higher)
- MongoDB (for database setup)
- Git (for version control)

### Installation:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/speechify.git
   cd speechify
   ```

2. **Set Up Environment Variables:**
   - Create a `.env` file in the root directory in backend and add the following variables:
   
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

3. **frontend Run:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **backend Run:**
   ```bash
   cd backend
   npm install
   node index.js
   ```

5. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000`.


## 📂 **Project Structure**

```
speechify/
├── frontend/                  # Frontend (React)
│   ├── public/                # Static assets
│   ├── src/                   # React components, pages, and styles
│   └── package.json           # Frontend dependencies
├── backend/                   # Backend (Node.js + Express)
│   ├── models/                # MongoDB models
│   ├── routes/                # API routes
│   ├── controllers/           # Business logic
│   └── package.json           # Backend dependencies
├── .env                       # Environment variables
├── .gitignore                 # Files to ignore in Git
└── README.md                  # Project documentation
```


## 🤝 **Contributing**

We welcome contributions from the community! If you'd like to contribute to Speechify, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.


## 📜 **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 🌐 **Live Demo**

Check out the live demo of Speechify: [https://speechify-chi.vercel.app/](https://speechify-chi.vercel.app/)

## 📧 **Contact**

If you have any questions or feedback, feel free to reach out:

- **Email**: deepakcode21@gmail.com
- **GitHub**: [deepakcode21](https://github.com/deepakcode21)

**Speechify** is more than just a tool; it's a gateway to seamless communication. Try it out today and experience the future of voice technology! 🚀
