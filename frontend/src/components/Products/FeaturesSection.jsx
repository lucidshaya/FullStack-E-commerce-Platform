
import React from 'react';
import { Truck, ShieldCheck, CreditCard, RefreshCw } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "Free delivery on all orders over $50"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Quality Guarantee",
      description: "30-day return policy on all items"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Secure Payment",
      description: "We accept all major credit cards"
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Easy Returns",
      description: "Hassle-free returns within 30 days"
    }
  ];

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-black text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-base text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;