import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const phrases = [
  "Your Dream Job Awaits",
  "Find Your Perfect Career",
  "Connecting Talent with Opportunity",
  "Unlock Your Potential Today"
];

const Landing = () => {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = deleting ? 50 : 100;
    const delay = deleting && charIndex === 0 ? 1000 : typingSpeed;

    const timeout = setTimeout(() => {
      if (!deleting && charIndex < phrases[phraseIndex].length) {
        setCurrentPhrase((prev) => prev + phrases[phraseIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (deleting && charIndex > 0) {
        setCurrentPhrase((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else if (!deleting && charIndex === phrases[phraseIndex].length) {
        setDeleting(true);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: "url('https://www.cardiff.ac.uk/__data/assets/image/0010/1191970/Graduation-2018-2018-5-29-10-3-51-566.jpeg')" }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center shadow-lg">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-md">
          {currentPhrase}
          <span className="blink">|</span>
        </h1>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          Discover amazing job opportunities or find top talent to grow your business.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition-all"
          >
            Login
          </Link>
          <Link
            to="/register/student"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition-all"
          >
            Register as Student
          </Link>
          <Link
            to="/register/employer"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md transition-all"
          >
            Register as Employer
          </Link>
        </div>
        <div className="mt-6 w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter your email as a graduate or employer"
            className="w-full p-3 rounded-lg text-black outline-none"
          />
          <Link
            to="/login"
            className="mt-4 block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-all text-center"
          >
            Get notified
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
