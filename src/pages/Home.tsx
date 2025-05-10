import React from "react";
import Layout from "../components/layout/Layout";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Testimonials from "../components/sections/Testimonials";
import Pricing from "../components/sections/Pricing";
import HowItWorks from "../components/sections/HowItWorks";
import CallToAction from "../components/sections/CallToAction";

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Pricing />
      <HowItWorks />
      <CallToAction />
    </Layout>
  );
};

export default Home;