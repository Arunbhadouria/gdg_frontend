import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Events() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 48,
    minutes: 0,
    seconds: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newSeconds = prevTime.seconds - 1;
        const newMinutes =
          newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;

        return {
          hours: newHours < 0 ? 0 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Countdown Timer in Extreme Top Right */}

      <div className="max-w-4xl mx-auto pt-16">
        {/* Main Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Join GDG On-Campus MITS-DU
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Ready to take your tech journey to the next level? We're recruiting
            passionate individuals to join our Google Developer Group family.
            This is your chance to be part of something bigger, learn from
            experts, and grow with a community that shares your passion for
            technology.
          </p>
        </div>

        {/* Recruitment Drive Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 text-white text-center">
          <div className="flex flex-col items-center">
            {/* Logo in circle - using the imported logo */}
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg overflow-hidden">
              <img
                src={logo}
                alt="GDG Logo"
                className="w-20 h-20 object-contain"
              />
            </div>

            <h2 className="text-3xl font-bold mb-4">GDG Recruitment 2025</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              We're looking for enthusiastic developers, designers, and tech
              enthusiasts to join our core team. As a GDG member, you'll get
              exclusive access to Google events, networking opportunities with
              industry professionals, and the chance to shape the tech community
              in our region.
            </p>

            <button
              onClick={handleRegisterClick}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              Register
            </button>

            <p className="text-sm mt-4 opacity-80">
              Applications are reviewed on a rolling basis. Early applicants
              have higher chances of selection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
