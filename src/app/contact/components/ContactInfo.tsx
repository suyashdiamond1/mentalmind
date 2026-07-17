'use client';

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 p-8 sm:p-10">
        <h2 className="text-2xl font-semibold text-stone-800 mb-6">Contact Information</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <span className="text-2xl">📧</span>
            <div>
              <h3 className="font-semibold text-stone-800">Email</h3>
              <a 
                href="mailto:studentaihelp@gmail.com"
                className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
              >
                studentaihelp@gmail.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-2xl">🏢</span>
            <div>
              <h3 className="font-semibold text-stone-800">Office Hours</h3>
              <p className="text-stone-600">Monday - Friday, 9 AM - 5 PM</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-2xl">💬</span>
            <div>
              <h3 className="font-semibold text-stone-800">AI Chatbot</h3>
              <p className="text-stone-600">Available 24/7 for immediate support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-red-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2rem] p-8 sm:p-10">
        <div className="flex items-start gap-4">
          <span className="text-3xl">🚨</span>
          <div>
            <h3 className="font-semibold text-red-900 mb-2">Emergency Resources</h3>
            <div className="space-y-3 text-red-800">
              <p className="font-medium bg-red-50 px-4 py-2 rounded-xl">📞 National Crisis Hotline: 988</p>
              <p className="font-medium bg-red-50 px-4 py-2 rounded-xl">💬 Crisis Text Line: Text HOME to 741741</p>
              <p className="font-medium bg-red-50 px-4 py-2 rounded-xl">🏥 Find your nearest emergency room</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}