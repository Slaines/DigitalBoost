import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { testimonials } from "../../data";

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Don't just take our word for it — hear from our clients about their experiences."
          centered
        />
        
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-0 -top-10 text-blue-200 opacity-30">
            <Quote size={80} />
          </div>
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4 py-8"
                >
                  <div className="bg-white rounded-lg p-6 md:p-8 shadow-md">
                    <div className="flex items-center mb-6">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">
                      "{testimonial.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-blue-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-blue-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;