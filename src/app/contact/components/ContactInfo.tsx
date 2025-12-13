'use client';

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <span className="text-2xl">📧</span>
            <div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              <a 
                href="mailto:studentaihelp@gmail.com"
                className="text-indigo-600 hover:text-indigo-700"
              >
                studentaihelp@gmail.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-2xl">🏢</span>
            <div>
              <h3 className="font-semibold text-gray-900">Office Hours</h3>
              <p className="text-gray-600">Monday - Friday, 9 AM - 5 PM</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-2xl">💬</span>
            <div>
              <h3 className="font-semibold text-gray-900">AI Chatbot</h3>
              <p className="text-gray-600">Available 24/7 for immediate support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <span className="text-3xl">🚨</span>
          <div>
            <h3 className="font-bold text-red-900 mb-2">Emergency Resources</h3>
            <div className="space-y-2 text-red-800">
              <p className="font-medium">📞 National Crisis Hotline: 988</p>
              <p className="font-medium">💬 Crisis Text Line: Text HOME to 741741</p>
              <p className="font-medium">🏥 Find your nearest emergency room</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}