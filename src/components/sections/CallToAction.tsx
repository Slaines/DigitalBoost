import React from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";

const CallToAction: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Boost Your Digital Presence?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the first step toward transforming your online presence. 
            Our team of experts is ready to help you grow your business.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 border border-white border-opacity-20">
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-md bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-md bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="How can we help?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-md bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30"
                  ></textarea>
                </div>
                <Button variant="secondary" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 border border-white border-opacity-20 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4">Schedule a Call</h3>
                <p className="text-blue-100 mb-6">
                  Prefer to talk directly? Schedule a free 30-minute consultation 
                  with our digital strategy experts.
                </p>
              </div>
              <div>
                <Button variant="outline" size="lg" className="w-full border-white text-white hover:bg-white hover:text-blue-700">
                  Book Consultation
                </Button>
                <p className="text-sm text-blue-200 mt-4">
                  No obligation, cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CallToAction;