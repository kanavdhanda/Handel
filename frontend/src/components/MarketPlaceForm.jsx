import React, { useState } from 'react';

const MarketplaceForm = () => {
  const [formData, setFormData] = useState({
    incorporationDocuments: null,
    gstCertificate: null,
    iecNumber: '',
    iecCertificate: null,
    termsOfService: '',
    privacyPolicy: '',
    returnsPolicy: '',
    bankAccountDetails: '',
    paymentGatewayDocs: null,
    commercialInvoice: null,
    packingList: null,
    customsDeclaration: null,
    certificateOfOrigin: null,
    phytosanitaryCertificate: null,
    gstDocumentation: null,
    courierWaybill: null,
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderSection = () => {
    switch (currentStep) {
      case 1:
        return (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Registration</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Incorporation Documents
              </label>
              <label>
              <input
                type="file"
                name="incorporationDocuments"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                GST Certificate
              </label>
              <input
                type="file"
                name="gstCertificate"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                IEC Number
              </label>
              <input
                type="text"
                name="iecNumber"
                value={formData.iecNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                IEC Certificate
              </label>
              <input
                type="file"
                name="iecCertificate"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </section>
        );
      case 2:
        return (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Marketplace Specific</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">Terms of Service</label>
              <textarea
                name="termsOfService"
                value={formData.termsOfService}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                rows="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Privacy Policy</label>
              <textarea
                name="privacyPolicy"
                value={formData.privacyPolicy}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                rows="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Returns and Refunds Policy
              </label>
              <textarea
                name="returnsPolicy"
                value={formData.returnsPolicy}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                rows="4"
              />
            </div>
          </section>
        );
      case 3:
        return (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Financial Setup</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bank Account for International Transactions
              </label>
              <input
                type="text"
                name="bankAccountDetails"
                value={formData.bankAccountDetails}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Gateway Integration Documents
              </label>
              <input
                type="file"
                name="paymentGatewayDocs"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </section>
        );
      case 4:
        return (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Documentation</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">Commercial Invoice</label>
              <input
                type="file"
                name="commercialInvoice"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Packing List</label>
              <input
                type="file"
                name="packingList"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Courier Waybill</label>
              <input
                type="file"
                name="courierWaybill"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-6 bg-gray-100 rounded-lg shadow-lg w-[1000px]">
      {renderSection()}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="px-10 py-2 bg-red-800 text-white border-white border-2 transition-all rounded-md shadow-md hover:bg-red-700"
          >
            Back
          </button>
        )}
        {currentStep < 4 && (
          <button
            type="button"
            onClick={nextStep}
            className="px-10 py-2 bg-amber-800 text-white border-white border-2 transition-all rounded-md shadow-md hover:bg-amber-700"
          >
            Next
          </button>
        )}
        {currentStep === 4 && (
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default MarketplaceForm;