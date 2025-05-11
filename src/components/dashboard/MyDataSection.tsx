import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { OnboardingData } from '../../context/OnboardingContext';

interface MyDataSectionProps {
  userData?: OnboardingData;
}

const MyDataSection: React.FC<MyDataSectionProps> = ({ userData: propUserData }) => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<OnboardingData | null>(propUserData || null);
  const [loading, setLoading] = useState<boolean>(!propUserData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If data was passed as props, use it
    if (propUserData) {
      setUserData(propUserData);
      setLoading(false);
      return;
    }
    
    // Otherwise fetch from Firestore
    const fetchUserData = async () => {
      if (!currentUser?.uid) {
        setError('You must be logged in to view your data');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const userDocRef = doc(db, 'userData', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setUserData(userDoc.data() as OnboardingData);
        } else {
          setError('No onboarding data found. Please complete the onboarding process.');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load your data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [currentUser, propUserData]);
  
  // If loading, show loading state
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Data</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }
  
  // If error, show error state
  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Data</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }
  
  // If no data, show empty state
  if (!userData || Object.keys(userData).length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Data</h1>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">No onboarding data found. Please complete the onboarding process.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Data</h1>
      <p className="text-gray-600 mb-8">
        Information you provided during the onboarding process.
      </p>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Service & Skills */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Service & Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Selected Service</p>
              <p className="text-indigo-600 font-medium">{userData.service}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Required Skills</p>
              <div className="flex flex-wrap gap-2">
                {userData.skills?.map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Company Name</p>
              <p className="font-medium">{userData.companyName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Company Size</p>
              <p className="font-medium">{userData.companySize}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Industry</p>
              <p className="font-medium">{userData.industry}</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Location</h2>
          <p className="text-sm font-medium text-gray-500 mb-1">Your Location</p>
          <p className="font-medium">{userData.location}</p>
        </div>

        {/* Budget */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Budget</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Budget Type</p>
              <p className="font-medium">{userData.budget?.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Budget Range</p>
              <p className="font-medium">{userData.budget?.range}</p>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Details</h2>
          <p className="text-sm font-medium text-gray-500 mb-1">Context & Goals</p>
          <p className="font-medium whitespace-pre-line">{userData.projectContext}</p>
        </div>
      </div>
    </div>
  );
};

export default MyDataSection;
