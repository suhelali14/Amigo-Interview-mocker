
# Amigo Placement Partner

Amigo Placement Partner is an innovative platform designed to help users prepare for real-world job interviews by simulating mock interviews and coding challenges. This platform offers an engaging experience for users to test and improve their skills, with features like a real-time leaderboard system and personalized interview feedback generated using cutting-edge AI.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Mock Interviews and Coding Challenges:** Amigo Placement Partner equips users with essential experience to succeed in real-world job interviews by simulating interview environments and coding tests.
- **User-Centric Interface:** The platform features an intuitive, responsive design built with Tailwind CSS and Shadcn UI, improving user satisfaction by 30% across devices.
- **Real-Time Leaderboard:** A dynamic ranking system allows users to view their performance in real-time, encouraging competition and skill improvement.
- **Generative AI Model for Interview Feedback:** A custom Generative AI model provides personalized interview questions and feedback to users using LoRA fine-tuning with Python.
- **Secure Authentication:** Integrated secure authentication using Clerk to manage user sessions and ensure data privacy.
- **Efficient Data Management:** Data handling and storage are streamlined using Drizzle ORM and PostgreSQL for seamless performance.

---

## Tech Stack

- **Frontend:** Next.js, React.js, Tailwind CSS, Shadcn UI
- **Backend:** Next.js API, Axios, Drizzle ORM
- **Database:** PostgreSQL
- **AI/ML:** Python (LoRA fine-tuning for Generative AI)
- **Authentication:** Clerk
- **Hosting:** Vercel (Frontend), Neon (Database)

---

## Installation

To get started with the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/amigo-placement-partner.git
   ```
2. Navigate to the project directory:
   ```bash
   cd amigo-placement-partner
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables. Create a `.env.local` file in the root of your project and add the following variables:
   ```
   DATABASE_URL=your_database_url
   CLERK_API_KEY=your_clerk_api_key
   AI_MODEL_API=your_ai_model_endpoint
   ```
5. Run the application:
   ```bash
   npm run dev
   ```

6. The app should now be running on [http://localhost:3000](http://localhost:3000).

---

## Usage

1. **Sign Up/Login**: Users can securely sign up or log in via Clerk.
2. **Mock Interviews**: Users can choose from a variety of interview questions and coding challenges tailored to different job roles.
3. **Leaderboard**: View real-time rankings based on performance in interviews and coding tests.
4. **Generative AI Feedback**: After completing a mock interview, users receive personalized feedback and tips based on their performance.

---

## Screenshots

Include relevant screenshots or gifs of your app’s interface:

1. **Homepage:**
   ![Homepage](./screenshots/homepage.png)

2. **Mock Interview Interface:**
   ![Mock Interview](./screenshots/mock-interview.png)

3. **Leaderboard:**
   ![Leaderboard](./screenshots/leaderboard.png)

---

## API Endpoints

Below are some key API endpoints used in the project:

- **GET /api/interviews**: Fetches mock interview questions for the user.
- **POST /api/submit-performance**: Submits user performance data for leaderboard ranking.
- **GET /api/leaderboard**: Retrieves current leaderboard standings.
- **POST /api/feedback**: Fetches personalized feedback from the Generative AI model.

---

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the project.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For any inquiries or further information, feel free to reach out to me at:

- Email: suhelalipakjade@gmail.com
- GitHub: [Your GitHub Profile](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourusername)

---

