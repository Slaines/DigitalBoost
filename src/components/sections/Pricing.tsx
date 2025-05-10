import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { pricingPlans } from "../../data";

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <Container>
        <SectionHeading
          title="Pricing Plans"
          subtitle="Flexible options designed to meet the needs of your growing business."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:-translate-y-2 ${
                plan.popular ? "border-2 border-blue-500 relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-blue-500 text-white py-1 px-4 text-sm font-semibold transform rotate-45 translate-x-[30%] translate-y-[50%]">
                    Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-gray-600 mb-8">
                  {plan.description}
                </p>
                
                <Link to="/onboarding">
                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
              
              <div className="bg-gray-50 p-8 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">
                  What's included:
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-blue-500 mt-0.5" />
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Need a custom plan? We've got you covered.
          </p>
          <Button variant="secondary">Contact Sales</Button>
        </div>
      </Container>
    </section>
  );
};

export default Pricing;