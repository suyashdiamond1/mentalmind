'use client';

export default function TrustIndicators() {
  const stats = [
    { value: '5,000+', label: 'Students Helped' },
    { value: '24/7', label: 'Available Support' },
    { value: '100%', label: 'Confidential' },
    { value: '50+', label: 'Universities' },
  ];

  return (
    <section className="py-16 px-4 bg-indigo-600">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats?.map((stat, index) => (
            <div key={index} className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat?.value}
              </div>
              <div className="text-blue-200 text-sm md:text-base">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}