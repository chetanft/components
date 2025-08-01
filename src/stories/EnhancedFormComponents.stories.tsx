import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Input } from '../components/atoms/Input/Input';
import { Dropdown } from '../components/molecules/Dropdown/Dropdown';
import { DatePicker } from '../components/molecules/DatePicker/DatePicker';
import { AlertInformational, User, Mail, Phone, Calendar, Clock } from '../components/atoms/Icons';

const meta: Meta = {
  title: 'Enhanced/Form',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input and Dropdown components enhanced with the new Label component, supporting mandatory indicators, optional text, and suffix icons.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Sample dropdown options
const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'in', label: 'India' },
];

const departmentOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'Human Resources' },
];

// Input component variations
export const InputVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px', minWidth: '400px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
        Input with Enhanced Label Features
      </h2>
      
      {/* Basic Input */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Basic Label
        </h3>
        <Input
          label="Full Name"
          placeholder="Enter your full name"
        />
      </div>

      {/* Mandatory Input */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Mandatory Field
        </h3>
        <Input
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          labelMandatory={true}
        />
      </div>

      {/* Optional Input */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Optional Field
        </h3>
        <Input
          label="Middle Name"
          placeholder="Enter your middle name"
          labelOptional={true}
        />
      </div>

      {/* Input with Suffix Icon */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          With Suffix Icon
        </h3>
        <Input
          label="Phone Number"
          placeholder="Enter your phone number"
          type="tel"
          labelSuffixIcon={true}
        />
      </div>

      {/* Input with Custom Icon */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          With Custom Icon
        </h3>
        <Input
          label="Contact Email"
          placeholder="Enter contact email"
          type="email"
          labelSuffixIcon={true}
          labelIcon={<Mail />}
        />
      </div>

      {/* Mandatory with Icon */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Mandatory with Custom Icon
        </h3>
        <Input
          label="User Information"
          placeholder="Enter user details"
          labelMandatory={true}
          labelSuffixIcon={true}
          labelIcon={<User />}
        />
      </div>

      {/* Optional with Icon */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Optional with Icon
        </h3>
        <Input
          label="Alternative Contact"
          placeholder="Enter alternative contact"
          type="tel"
          labelOptional={true}
          labelSuffixIcon={true}
          labelIcon={<Phone />}
        />
      </div>
    </div>
  ),
};

// DatePicker component variations
export const DatePickerVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px', minWidth: '400px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
        DatePicker with Enhanced Label Features
      </h2>
      
      {/* Basic DatePicker */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Basic Label
        </h3>
        <DatePicker
          label="Birth Date"
          placeholder="Select birth date"
        />
      </div>

      {/* Mandatory DatePicker */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Mandatory Field
        </h3>
        <DatePicker
          label="Start Date"
          placeholder="Select start date"
          labelMandatory={true}
        />
      </div>

      {/* Optional DatePicker */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Optional Field
        </h3>
        <DatePicker
          label="End Date"
          placeholder="Select end date"
          labelOptional={true}
        />
      </div>

      {/* DatePicker with Suffix Icon */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          With Suffix Icon
        </h3>
        <DatePicker
          label="Event Date"
          placeholder="Select event date"
          labelSuffixIcon={true}
        />
      </div>

      {/* DatePicker with Custom Icon */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          With Custom Icon
        </h3>
        <DatePicker
          label="Meeting Date"
          placeholder="Select meeting date"
          labelSuffixIcon={true}
          labelIcon={<Calendar />}
        />
      </div>

      {/* DatePicker with Time */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          With Time and Custom Icon
        </h3>
        <DatePicker
          label="Appointment Time"
          placeholder="Select appointment time"
          showTime={true}
          labelMandatory={true}
          labelSuffixIcon={true}
          labelIcon={<Clock />}
        />
      </div>

      {/* Backward Compatibility - required prop */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Backward Compatibility (required prop)
        </h3>
        <DatePicker
          label="Legacy Required Date"
          placeholder="Select date"
          required={true}
        />
      </div>
    </div>
  ),
};

// Dropdown component variations
export const DropdownVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px', minWidth: '400px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
        Dropdown with Enhanced Label Features
      </h2>
      
      {/* Basic Dropdown */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Basic Label
        </h3>
        <Dropdown
          label="Country"
          placeholder="Select your country"
          options={countryOptions}
        />
      </div>

      {/* Mandatory Dropdown */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Mandatory Field
        </h3>
        <Dropdown
          label="Department"
          placeholder="Select your department"
          options={departmentOptions}
          labelMandatory={true}
        />
      </div>

      {/* Optional Dropdown */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Optional Field
        </h3>
        <Dropdown
          label="Secondary Department"
          placeholder="Select secondary department"
          options={departmentOptions}
          labelOptional={true}
        />
      </div>

      {/* Dropdown with Suffix Icon */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          With Suffix Icon
        </h3>
        <Dropdown
          label="Priority Level"
          placeholder="Select priority level"
          options={[
            { value: 'high', label: 'High Priority' },
            { value: 'medium', label: 'Medium Priority' },
            { value: 'low', label: 'Low Priority' },
          ]}
          labelSuffixIcon={true}
        />
      </div>

      {/* Dropdown with Custom Icon */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          With Custom Icon
        </h3>
        <Dropdown
          label="User Role"
          placeholder="Select user role"
          options={[
            { value: 'admin', label: 'Administrator' },
            { value: 'manager', label: 'Manager' },
            { value: 'user', label: 'Regular User' },
          ]}
          labelSuffixIcon={true}
          labelIcon={<User />}
        />
      </div>

      {/* Mandatory with Icon */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Mandatory with Icon
        </h3>
        <Dropdown
          label="Contact Method"
          placeholder="Select contact method"
          options={[
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone' },
            { value: 'sms', label: 'SMS' },
          ]}
          labelMandatory={true}
          labelSuffixIcon={true}
          labelIcon={<AlertInformational />}
        />
      </div>

      {/* Optional with Icon */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Optional with Icon
        </h3>
        <Dropdown
          label="Backup Contact"
          placeholder="Select backup contact method"
          options={[
            { value: 'email', label: 'Backup Email' },
            { value: 'phone', label: 'Backup Phone' },
          ]}
          labelOptional={true}
          labelSuffixIcon={true}
          labelIcon={<Phone />}
        />
      </div>

      {/* Backward Compatibility - required prop */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
          Backward Compatibility (required prop)
        </h3>
        <Dropdown
          label="Legacy Required Field"
          placeholder="Select an option"
          options={countryOptions}
          required={true}
        />
      </div>
    </div>
  ),
};

// Complete form example
export const CompleteForm: Story = {
  render: () => {
          const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        department: '',
        role: '',
        bio: '',
        startDate: '',
        meetingTime: '',
      });

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

            const handleDropdownChange = (field: string) => (value: string | number) => {
          setFormData(prev => ({ ...prev, [field]: value }));
        };

        const handleDateChange = (field: string) => (value: string) => {
          setFormData(prev => ({ ...prev, [field]: value }));
        };

    return (
      <div style={{ maxWidth: '600px', padding: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
          Employee Registration Form
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {/* First Name - Mandatory */}
          <Input
            label="First Name"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleInputChange('firstName')}
            labelMandatory={true}
          />

          {/* Last Name - Mandatory */}
          <Input
            label="Last Name"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleInputChange('lastName')}
            labelMandatory={true}
          />

          {/* Email - Mandatory with Icon */}
          <Input
            label="Work Email"
            placeholder="Enter work email"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            labelMandatory={true}
            labelSuffixIcon={true}
            labelIcon={<Mail />}
          />

          {/* Phone - Optional with Icon */}
          <Input
            label="Phone Number"
            placeholder="Enter phone number"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            labelOptional={true}
            labelSuffixIcon={true}
            labelIcon={<Phone />}
          />

          {/* Country - Mandatory */}
          <Dropdown
            label="Country"
            placeholder="Select country"
            options={countryOptions}
            value={formData.country}
            onChange={handleDropdownChange('country')}
            labelMandatory={true}
          />

          {/* Department - Mandatory with Icon */}
          <Dropdown
            label="Department"
            placeholder="Select department"
            options={departmentOptions}
            value={formData.department}
            onChange={handleDropdownChange('department')}
            labelMandatory={true}
            labelSuffixIcon={true}
            labelIcon={<User />}
          />

          {/* Role - Optional */}
          <Dropdown
            label="Job Title"
            placeholder="Select job title"
            options={[
              { value: 'junior', label: 'Junior' },
              { value: 'senior', label: 'Senior' },
              { value: 'lead', label: 'Team Lead' },
              { value: 'manager', label: 'Manager' },
            ]}
            value={formData.role}
            onChange={handleDropdownChange('role')}
            labelOptional={true}
          />

                      {/* Start Date - Mandatory with Icon */}
            <DatePicker
              label="Start Date"
              placeholder="Select start date"
              value={formData.startDate}
              onChange={handleDateChange('startDate')}
              labelMandatory={true}
              labelSuffixIcon={true}
              labelIcon={<Calendar />}
            />

            {/* Meeting Time - Optional with Time */}
            <DatePicker
              label="Meeting Time"
              placeholder="Select meeting time"
              value={formData.meetingTime}
              onChange={handleDateChange('meetingTime')}
              showTime={true}
              labelOptional={true}
              labelSuffixIcon={true}
              labelIcon={<Clock />}
            />

            {/* Bio - Optional with Icon - Full width */}
            <div style={{ gridColumn: 'span 2' }}>
              <Input
                label="Bio"
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={handleInputChange('bio')}
                labelOptional={true}
                labelSuffixIcon={true}
                labelIcon={<AlertInformational />}
              />
            </div>
        </div>

        {/* Form Data Display */}
        <div style={{ 
          marginTop: '30px', 
          padding: '16px', 
          backgroundColor: '#F8F8F9', 
          borderRadius: '8px',
          border: '1px solid #CED1D7'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
            Form Data Preview
          </h3>
          <pre style={{ fontSize: '12px', lineHeight: '1.4', margin: 0 }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
}; 