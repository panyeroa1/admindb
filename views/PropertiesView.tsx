import React from 'react';
import { Property } from '../types';

interface PropertiesViewProps {
  properties: Property[];
}

const PropertiesView: React.FC<PropertiesViewProps> = ({ properties }) => {
  return (
    <div className="p-8 animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h2 className="text-2xl font-bold text-primary">Property Portfolio</h2>
           <p className="text-secondary mt-1">Manage {properties.length} active listings and assets.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-md">
           <span className="material-icons-outlined text-sm">add_home</span>
           Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map(property => (
          <div key={property.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
             {/* Image Placeholder */}
             <div className="h-48 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                    <span className="material-icons-outlined text-5xl opacity-50">
                        {property.type === 'apartment' ? 'apartment' : 
                         property.type === 'house' ? 'house' : 
                         property.type === 'villa' ? 'villa' : 'business'}
                    </span>
                </div>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                    {property.type}
                </div>
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-bold text-white uppercase tracking-wider ${
                    property.status === 'active' ? 'bg-green-500' :
                    property.status === 'pending' ? 'bg-orange-500' :
                    property.status === 'sold' ? 'bg-red-500' : 'bg-blue-500'
                }`}>
                    {property.status}
                </div>
             </div>

             <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{property.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
                    <span className="material-icons-outlined text-sm">location_on</span>
                    <span className="truncate">{property.address}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-b border-gray-50 py-3 mb-4">
                    {property.bedrooms && (
                        <div className="flex items-center gap-1">
                            <span className="material-icons-outlined text-sm">bed</span>
                            {property.bedrooms} Beds
                        </div>
                    )}
                    {property.bathrooms && (
                        <div className="flex items-center gap-1">
                            <span className="material-icons-outlined text-sm">bathtub</span>
                            {property.bathrooms} Baths
                        </div>
                    )}
                    {property.size && (
                        <div className="flex items-center gap-1">
                            <span className="material-icons-outlined text-sm">square_foot</span>
                            {property.size} m²
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-primary">€{property.price.toLocaleString()}</div>
                    <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                        <span className="material-icons-outlined">arrow_forward</span>
                    </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesView;