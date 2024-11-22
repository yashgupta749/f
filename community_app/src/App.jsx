import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Dummy Data for Features
const demoMessages = [
  { id: 1, user: "John", content: "Hi, how can I assist you with React?" },
  { id: 2, user: "Sarah", content: "I'm having trouble with hooks." },
];

const demoQuestions = [
  {
    id: 1,
    question: "How do I set up Redux in React?",
    answers: ["Use redux toolkit", "Follow the docs"],
    tags: ["React", "Redux"],
  },
  {
    id: 2,
    question: "What is JSX?",
    answers: ["JSX is a syntax extension for JavaScript"],
    tags: ["React", "JSX"],
  },
];

const demoFeatureRequests = [
  { id: 1, feature: "Dark mode support", status: "Open", votes: 10 },
  { id: 2, feature: "Offline mode", status: "In Progress", votes: 5 },
];

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Simulate login

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/chat" className="nav-link">
            Tutor Chat
          </Link>
          <Link to="/qa" className="nav-link">
            Q&A
          </Link>
          <Link to="/wishlist" className="nav-link">
            Wishlist
          </Link>
          <Link to="/settings" className="nav-link">
            Settings
          </Link>
          <Link to="/onboarding" className="nav-link">
            Onboarding
          </Link>
        </nav>

        <div className="content">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
            {/* Tutor Chat Room */}
            <Route
              path="/chat"
              element={<TutorChatRoom messages={demoMessages} />}
            />
            {/* Teaching Q&A */}
            <Route
              path="/qa"
              element={<TeachingQA questions={demoQuestions} />}
            />
            {/* Feature Wishlist */}
            <Route
              path="/wishlist"
              element={<FeatureWishlist requests={demoFeatureRequests} />}
            />
            {/* Settings */}
            <Route path="/settings" element={<Settings />} />
            {/* Onboarding */}
            <Route path="/onboarding" element={<Onboarding />} />
            {/* Login Page */}
            <Route
              path="/login"
              element={
                <div className="login-container">
                  <h1>Login</h1>
                  <form onSubmit={() => setIsAuthenticated(true)}>
                    <div className="form-group">
                      <label>Email:</label>
                      <input type="email" placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                      <label>Password:</label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                      />
                    </div>
                    <button type="submit">Login</button>
                  </form>
                </div>
              }
            />
          </Routes>
        </div>
        <footer className="footer">Footer - Community Platform</footer>
      </div>
    </Router>
  );
};

const Home = () => (
  <div className="page">
    <h1>Welcome to the Community Platform</h1>
  </div>
);

const TutorChatRoom = ({ messages }) => {
  const [newMessage, setNewMessage] = useState("");
  const [userPresence, setUserPresence] = useState({
    John: true,
    Sarah: false,
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      messages.push({
        id: messages.length + 1,
        user: "You",
        content: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="page">
      <h1>Tutor Chat Room</h1>
      <div className="chat-room">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <strong>{msg.user}</strong>: {msg.content}
            <br />
            <small>{userPresence[msg.user] ? "Online" : "Offline"}</small>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

const TeachingQA = ({ questions }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const handlePostQuestion = () => {
    if (newQuestion.trim()) {
      questions.push({
        id: questions.length + 1,
        question: newQuestion,
        answers: [],
      });
      setNewQuestion("");
    }
  };

  const handlePostAnswer = () => {
    if (newAnswer.trim() && selectedQuestionId !== null) {
      const question = questions.find((q) => q.id === selectedQuestionId);
      question.answers.push(newAnswer);
      setNewAnswer("");
    }
  };

  return (
    <div className="page">
      <h1>Teaching Q&A Section</h1>
      <div>
        <h2>Post a Question</h2>
        <textarea
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Write your question here..."
        />
        <button onClick={handlePostQuestion}>Post Question</button>
      </div>

      <div>
        <h2>Questions</h2>
        {questions.map((question) => (
          <div key={question.id} className="question">
            <strong>{question.question}</strong>
            <div>Tags: {question.tags.join(", ")}</div>
            <div>
              Answers: {question.answers.length}
              <button onClick={() => setSelectedQuestionId(question.id)}>
                Answer
              </button>
            </div>
            {selectedQuestionId === question.id && (
              <div>
                <textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Write your answer here..."
                />
                <button onClick={handlePostAnswer}>Post Answer</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureWishlist = ({ requests }) => (
  <div className="page">
    <h1>Feature Wishlist</h1>
    {requests.map((req) => (
      <div key={req.id} className="wishlist-item">
        <strong>{req.feature}</strong>
        <p>Status: {req.status}</p>
        <p>Votes: {req.votes}</p>
      </div>
    ))}
  </div>
);

const Settings = () => (
  <div className="page">
    <h1>Settings & Documentation</h1>
    <div>
      <h2>User Settings</h2>
      <p>
        Profile customization, notifications preferences, privacy settings...
      </p>
    </div>
  </div>
);

const Onboarding = () => (
  <div className="page">
    <h1>Onboarding</h1>
    <h2>Getting Started Guide</h2>
    <p>Learn how to use the platform effectively...</p>
    <h2>FAQs</h2>
    <p>Find answers to common questions...</p>
    <h2>Tutorial Videos</h2>
    <p>Watch tutorial videos to get started...</p>
  </div>
);

export default App;
