import React from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Button from "../ui/Button";

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-white to-blue-50">
      <Container>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Boost Your Digital Presence with Expert Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              We help businesses thrive online with professional website development, 
              SEO, digital marketing, content creation, and social media management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/onboarding">
                <Button size="lg">Get Started</Button>
              </Link>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
            <div className="mt-8 flex items-center text-gray-500">
              <span className="inline-flex items-center justify-center">
                <span className="flex -space-x-2">
                  {/* Use reliable image URLs instead of dynamically generated ones */}
                  {[
                    "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
                    "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
                    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
                    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                  ].map((imgSrc, i) => (
                    <img
                      key={i}
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                      src={`${imgSrc}?auto=compress&cs=tinysrgb&w=100`}
                      alt="Customer"
                    />
                  ))}
                </span>
                <span className="ml-3 text-sm">
                  <span className="font-semibold text-gray-900">250+ </span>
                  satisfied clients and counting
                </span>
              </span>
            </div>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-teal-400 opacity-30 blur"></div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Digital Marketing Strategy"
                  className="rounded-lg shadow-xl w-full object-cover h-[400px] md:h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;