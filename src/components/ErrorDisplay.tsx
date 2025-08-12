import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  onClear?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  error, 
  onRetry, 
  onClear 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <FaExclamationTriangle className="mx-auto h-16 w-16 text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Connection Error
        </h2>
        
        <p className="text-gray-600 mb-8">
          {error}
        </p>
        
        <div className="space-y-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          )}
          
          {onClear && (
            <button
              onClick={onClear}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
