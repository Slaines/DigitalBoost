import React, { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, Search, BookOpen, Phone, Mail } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'How do I request a new service?',
    answer: 'You can request a new service by navigating to the "Order Service" page from the sidebar. Select your desired service category, choose a package, fill in the project details, and submit your request.',
  },
  {
    id: 2,
    question: 'What is the typical turnaround time for deliverables?',
    answer: 'Turnaround times vary depending on the service and package selected. Basic packages usually have faster delivery times, while premium packages may take longer due to the additional work involved. You can find the exact delivery time for each package on the "Order Service" page.',
  },
  {
    id: 3,
    question: 'How can I provide feedback on deliverables?',
    answer: 'Once a deliverable is submitted, you can provide feedback by accessing the deliverable in the "My Deliverables" section. Each deliverable has a feedback form where you can submit your comments and revision requests.',
  },
  {
    id: 4,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers. You can select your preferred payment method during checkout when ordering a service or when paying for an invoice.',
  },
  {
    id: 5,
    question: 'Can I request revisions to my deliverables?',
    answer: 'Yes, you can request revisions to your deliverables. The number of revisions allowed depends on your package. Basic packages typically include 1-2 revisions, while premium packages may offer unlimited revisions within a specified timeframe.',
  },
  {
    id: 6,
    question: 'How do I track the progress of my project?',
    answer: 'You can track the progress of your project in the "My Requests" section. Each project has a progress bar and displays the current status and next milestone. You can also view a detailed timeline of your project milestones on the Dashboard.',
  },
  {
    id: 7,
    question: 'What happens if I\'m not satisfied with the deliverables?',
    answer: 'If you\'re not satisfied with the deliverables, please submit your concerns through the feedback form. We\'ll work with you to address your concerns and make necessary adjustments. If we\'re unable to meet your expectations after revisions, please contact our support team to discuss options.',
  },
  {
    id: 8,
    question: 'Can I upgrade my package after placing an order?',
    answer: 'Yes, you can upgrade your package after placing an order, as long as the project hasn\'t been completed. Contact our support team with your request, and they\'ll assist you with the upgrade process.',
  },
];

const guides = [
  {
    id: 1,
    title: 'Getting Started Guide',
    description: 'Learn how to navigate the platform and place your first order',
    link: '#',
  },
  {
    id: 2,
    title: 'Providing Effective Feedback',
    description: 'Tips for communicating your needs clearly to get the best results',
    link: '#',
  },
  {
    id: 3,
    title: 'Understanding Service Packages',
    description: 'A detailed breakdown of what\'s included in each service package',
    link: '#',
  },
  {
    id: 4,
    title: 'Managing Your Projects',
    description: 'How to track progress and manage multiple projects efficiently',
    link: '#',
  },
];

const Support = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleFaq = (id: number) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Support</h1>
      
      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search FAQs and guides..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0055A4] focus:border-transparent"
        />
      </div>
      
      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-4">
            <MessageSquare className="h-6 w-6 text-[#0055A4]" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
          <p className="mt-2 text-gray-600">Connect with our support team for immediate assistance</p>
          <button className="mt-4 px-4 py-2 bg-[#0055A4] text-white rounded-md hover:bg-blue-700 transition-colors w-full">
            Start Chat
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-4">
            <Phone className="h-6 w-6 text-[#0055A4]" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Phone Support</h3>
          <p className="mt-2 text-gray-600">Call us for personalized assistance with complex issues</p>
          <button className="mt-4 px-4 py-2 bg-[#0055A4] text-white rounded-md hover:bg-blue-700 transition-colors w-full">
            +1 (888) 123-4567
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-4">
            <Mail className="h-6 w-6 text-[#0055A4]" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
          <p className="mt-2 text-gray-600">Send us an email for non-urgent inquiries</p>
          <button className="mt-4 px-4 py-2 bg-[#0055A4] text-white rounded-md hover:bg-blue-700 transition-colors w-full">
            support@example.com
          </button>
        </div>
      </div>
      
      {/* FAQs Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-medium text-gray-900">Frequently Asked Questions</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div key={faq.id} className="p-6">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full justify-between items-center text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="mt-4 prose text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No FAQs match your search. Try different keywords or contact our support team.
            </div>
          )}
        </div>
      </div>
      
      {/* Guides Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-medium text-gray-900 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-[#0055A4]" />
            Helpful Guides
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {guides.map((guide) => (
            <a
              key={guide.id}
              href={guide.link}
              className="block p-4 border border-gray-200 rounded-lg hover:border-[#0055A4] hover:shadow-md transition-all"
            >
              <h3 className="font-medium text-[#0055A4]">{guide.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{guide.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;