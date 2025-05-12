import React, { useState } from 'react';
import {
  User,
  Building2,
  CreditCard,
  Shield,
  Edit,
  Check,
  X,
  Mail,
  Phone,
  Globe,
  Briefcase,
  MapPin,
  Calendar,
  BadgeCheck
} from 'lucide-react';
import { GoogleIcon, MicrosoftIcon } from '../icons/SocialIcons';
import { toast } from '../../utils/toast';

interface Address { line1?: string; city?: string; zip?: string; country?: string }
interface Subscription { tier: "Startup"|"Growth"|"Enterprise"; nextBillingDate: string }
interface Linked { google: boolean; microsoft: boolean }

export interface MyDataProps {
  user: {
    name?: string;
    email: string;
    phone?: string;
    company?: { name?: string; website?: string; industry?: string };
    billingAddress?: Address;
    subscription?: Subscription;
    linked?: Linked;
  };
  onSave(path: string, value: unknown): Promise<void>;   // e.g. "company.website"
}

type Section = 'personal' | 'company' | 'billing' | 'security';

const MyDataSection: React.FC<MyDataProps> = ({ user, onSave }) => {
  // Guard against undefined user prop
  if (!user) {
    return <div className="p-6 text-center text-gray-500">Loading profile…</div>;
  }
  
  // Destructure with defaults for safety
  const { 
    name = "", 
    email = "", 
    phone = "", 
    company = {}, 
    billingAddress = {}, 
    subscription = { tier: "Startup", nextBillingDate: "" },
    linked = { google: false, microsoft: false }
  } = user;
  
  const [activeSection, setActiveSection] = useState<Section>('personal');
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({
    name,
    email,
    phone,
    'company.name': company?.name || '',
    'company.website': company?.website || '',
    'company.industry': company?.industry || '',
    'billingAddress.line1': billingAddress?.line1 || '',
    'billingAddress.city': billingAddress?.city || '',
    'billingAddress.zip': billingAddress?.zip || '',
    'billingAddress.country': billingAddress?.country || '',
  });
  const [isSubmitting, setIsSubmitting] = useState<{ [key: string]: boolean }>({});

  // Handle input change
  const handleInputChange = (field: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Toggle edit mode for a field
  const toggleEditMode = (field: string) => {
    setEditMode(prev => ({
      ...prev,
      [field]: !prev[field]
    }));

    // If turning off edit mode, reset the form value to the original
    if (editMode[field]) {
      const originalValue = getOriginalValue(field);
      setFormValues(prev => ({
        ...prev,
        [field]: originalValue
      }));
    }
  };

  // Get original value from user object based on field path
  const getOriginalValue = (path: string): any => {
    if (!path.includes('.')) {
      return user[path as keyof typeof user] || '';
    }
    
    const [parent, child] = path.split('.');
    if (parent === 'company' && user.company) {
      return user.company[child as keyof typeof user.company] || '';
    } else if (parent === 'billingAddress' && user.billingAddress) {
      return user.billingAddress[child as keyof Address] || '';
    }
    return '';
  };

  // Save changes for a field
  const saveField = async (field: string) => {
    try {
      setIsSubmitting({ ...isSubmitting, [field]: true });
      await onSave(field, formValues[field]);
      setEditMode({ ...editMode, [field]: false });
      toast.success(`${field.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim()} updated successfully`);
    } catch (error) {
      toast.error(`Failed to update: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting({ ...isSubmitting, [field]: false });
    }
  };

  // Render an editable field
  const renderEditableField = (label: string, field: string, icon: React.ReactNode, type: string = 'text') => {
    const isEditing = editMode[field] || false;
    const isLoading = isSubmitting[field] || false;
    
    return (
      <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3 text-gray-500">{icon}</div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              {!isEditing ? (
                <p className="font-medium">{formValues[field] || 'Not set'}</p>
              ) : (
                <input
                  type={type}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formValues[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  disabled={isLoading}
                />
              )}
            </div>
          </div>
          <div>
            {!isEditing ? (
              <button
                onClick={() => toggleEditMode(field)}
                className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <Edit size={16} />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleEditMode(field)}
                  className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100"
                  disabled={isLoading}
                >
                  <X size={16} />
                </button>
                <button
                  onClick={() => saveField(field)}
                  className="p-1.5 rounded-full text-green-600 hover:bg-green-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-t-2 border-green-600 rounded-full animate-spin" />
                  ) : (
                    <Check size={16} />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render a read-only field
  const renderReadOnlyField = (label: string, value: string | undefined, icon: React.ReactNode) => {
    return (
      <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="mr-3 text-gray-500">{icon}</div>
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium">{value || 'Not set'}</p>
          </div>
        </div>
      </div>
    );
  };

  // Navigation tabs
  const renderTabs = () => {
    const tabs: { id: Section; label: string; icon: React.ReactNode }[] = [
      { id: 'personal', label: 'Personal', icon: <User size={18} /> },
      { id: 'company', label: 'Company', icon: <Building2 size={18} /> },
      { id: 'billing', label: 'Billing', icon: <CreditCard size={18} /> },
      { id: 'security', label: 'Security', icon: <Shield size={18} /> }
    ];

    return (
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`
                  flex items-center py-4 px-1 border-b-2 font-medium text-sm
                  ${activeSection === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    );
  };

  // Render personal information section
  const renderPersonalSection = () => (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
      {renderEditableField('Full Name', 'name', <User size={18} />)}
      {renderEditableField('Email Address', 'email', <Mail size={18} />, 'email')}
      {renderEditableField('Phone Number', 'phone', <Phone size={18} />, 'tel')}
    </div>
  );

  // Render company information section
  const renderCompanySection = () => (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Company Information</h2>
      {renderEditableField('Company Name', 'company.name', <Building2 size={18} />)}
      {renderEditableField('Website', 'company.website', <Globe size={18} />, 'url')}
      {renderEditableField('Industry', 'company.industry', <Briefcase size={18} />)}
    </div>
  );

  // Render billing information section
  const renderBillingSection = () => (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Billing Information</h2>
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-800 mb-3">Subscription</h3>
        {renderReadOnlyField('Plan', subscription?.tier, <BadgeCheck size={18} />)}
        {renderReadOnlyField('Next Billing Date', subscription?.nextBillingDate, <Calendar size={18} />)}
      </div>
      
      <div>
        <h3 className="text-md font-medium text-gray-800 mb-3">Billing Address</h3>
        {renderEditableField('Street Address', 'billingAddress.line1', <MapPin size={18} />)}
        {renderEditableField('City', 'billingAddress.city', <MapPin size={18} />)}
        {renderEditableField('Postal Code', 'billingAddress.zip', <MapPin size={18} />)}
        {renderEditableField('Country', 'billingAddress.country', <MapPin size={18} />)}
      </div>
    </div>
  );

  // Render security section
  const renderSecuritySection = () => (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Security & Connections</h2>
      
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-800 mb-3">Connected Accounts</h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 text-gray-500">
                  <GoogleIcon size={18} />
                </div>
                <div>
                  <p className="font-medium">Google</p>
                  <p className="text-sm text-gray-500">
                    {linked?.google ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              <button className="px-3 py-1 text-sm font-medium rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200">
                {linked?.google ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 text-gray-500"><MicrosoftIcon size={18} /></div>
                <div>
                  <p className="font-medium">Microsoft</p>
                  <p className="text-sm text-gray-500">
                    {linked?.microsoft ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              <button className="px-3 py-1 text-sm font-medium rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200">
                {linked?.microsoft ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-md font-medium text-gray-800 mb-3">Password</h3>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3 text-gray-500"><Shield size={18} /></div>
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-gray-500">Update your password</p>
              </div>
            </div>
            <button className="px-3 py-1 text-sm font-medium rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">My Data</h1>
      
      {renderTabs()}
      
      <div className="bg-gray-50 p-6 rounded-lg">
        {activeSection === 'personal' && renderPersonalSection()}
        {activeSection === 'company' && renderCompanySection()}
        {activeSection === 'billing' && renderBillingSection()}
        {activeSection === 'security' && renderSecuritySection()}
      </div>
    </div>
  );
};

export default MyDataSection;
