"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface FormErrors {
  referrerName?: string;
  referrerEmail?: string;
  refereeName?: string;
  refereeEmail?: string;
  course?: string;
}

const ReferAndEarn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    refereeName: '',
    refereeEmail: '',
    course: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.referrerName) newErrors.referrerName = 'Referrer name is required';
    if (!formData.referrerEmail) newErrors.referrerEmail = 'Referrer email is required';
    if (!formData.refereeName) newErrors.refereeName = 'Referee name is required';
    if (!formData.refereeEmail) newErrors.refereeEmail = 'Referee email is required';
    if (!formData.course) newErrors.course = 'Course selection is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.referrerEmail)) newErrors.referrerEmail = 'Invalid email format';
    if (!emailRegex.test(formData.refereeEmail)) newErrors.refereeEmail = 'Invalid email format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await fetch(`${API_URL}/api/referrals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Referral submitted successfully!' });
        setFormData({
          referrerName: '',
          referrerEmail: '',
          refereeName: '',
          refereeEmail: '',
          course: ''
        });
        setTimeout(() => setIsModalOpen(false), 2000);
      } else {
        throw new Error('Failed to submit referral');
      }
    } catch (error) {
      console.error('Submission error:', error); // Log the error
      setSubmitStatus({ type: 'error', message: 'Failed to submit referral. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Refer & Earn Rewards</h1>
          <p className="text-xl mb-8">Share the gift of learning and earn rewards for every successful referral</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Refer Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Refer a Friend</h2>
              
              {submitStatus.message && (
                <Alert className={`mb-4 ${submitStatus.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <AlertDescription>
                    {submitStatus.message}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input
                      type="text"
                      value={formData.referrerName}
                      onChange={(e) => setFormData({...formData, referrerName: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.referrerName && (
                      <p className="text-red-500 text-sm mt-1">{errors.referrerName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Your Email</label>
                    <input
                      type="email"
                      value={formData.referrerEmail}
                      onChange={(e) => setFormData({...formData, referrerEmail: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.referrerEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.referrerEmail}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Friend&apos;s Name</label>
                    <input
                      type="text"
                      value={formData.refereeName}
                      onChange={(e) => setFormData({...formData, refereeName: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.refereeName && (
                      <p className="text-red-500 text-sm mt-1">{errors.refereeName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Friend&apos;s Email</label>
                    <input
                      type="email"
                      value={formData.refereeEmail}
                      onChange={(e) => setFormData({...formData, refereeEmail: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.refereeEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.refereeEmail}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Course</label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select a course</option>
                      <option value="web-development">Web Development</option>
                      <option value="data-science">Data Science</option>
                      <option value="mobile-development">Mobile Development</option>
                    </select>
                    {errors.course && (
                      <p className="text-red-500 text-sm mt-1">{errors.course}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Submit Referral
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferAndEarn;