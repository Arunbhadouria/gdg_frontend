import { useState, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

// Import your local images
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";

const images = [slide1, slide2, slide3];

function Home() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  }, [current]);

  const prevSlide = useCallback(() => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  }, [current]);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  // Function to handle sign-up button click
  const handleSignUpClick = () => {
    navigate("/login");
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="text-center flex flex-col min-h-screen">
      {/* Full-width Carousel Container */}
      <div
        {...handlers}
        className="relative w-full overflow-hidden"
        style={{ height: "50vh" }}
      >
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full relative">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Left arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-70 p-3 rounded-full hover:bg-opacity-100 transition-all shadow-md z-10"
          aria-label="Previous slide"
        >
          &#10094;
        </button>

        {/* Right arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-70 p-3 rounded-full hover:bg-opacity-100 transition-all shadow-md z-10"
          aria-label="Next slide"
        >
          &#10095;
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                current === index
                  ? "bg-white scale-125"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Spacer between carousel and button */}
      <div className="h-12 md:h-20"></div>

      {/* Login/Sign-up button */}
      <div className="px-4">
        <button
          onClick={handleSignUpClick}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition text-lg font-medium"
        >
          Sign up
        </button>
      </div>

      {/* Spacer below button */}
      <div className="h-12 md:h-20"></div>
    </div>
  );
}

export default Home;
