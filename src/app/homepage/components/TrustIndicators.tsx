'use client';

export default function TrustIndicators() {
  const stats = [
    { value: '56k+', label: 'Students Helped' },
    { value: '24/7', label: 'Available Support' },
    { value: '100%', label: 'Confidential' },
    { value: '15+', label: 'Universities' },
  ];

  return (
    <section className="py-20 px-4 bg-emerald-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats?.map((stat, index) => (
            <div key={index} className="text-white">
              <div className="text-4xl md:text-5xl font-semibold mb-3">
                {stat?.value}
              </div>
              <div className="text-emerald-200/80 text-sm md:text-base tracking-wide uppercase font-medium">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}