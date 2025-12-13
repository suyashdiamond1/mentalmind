import React from 'react';

const LocationMap: React.FC = () => {
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="h-96 w-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="AI Nexus Office Location"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=37.4419,-122.1430&z=14&output=embed"
          className="border-0"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Visit Our Office
        </h3>
        <p className="text-sm text-text-secondary">
          We welcome visitors by appointment. Schedule a tour to see our AI research lab and meet our team.
        </p>
      </div>
    </div>
  );
};

export default LocationMap;