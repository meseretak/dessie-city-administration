'use client';
import { useEffect } from 'react';
import { RefreshCcw, AlertOctagon, Home } from 'lucide-react';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    console.error('Global Application Error:', error);
    // Automatically recover from deployment chunk mismatches
    if (error.name === 'ChunkLoadError' || error.message.includes('Failed to load chunk')) {
      window.location.reload();
    }
  }, [error]);

  const handleReset = () => {
    if (error.name === 'ChunkLoadError' || error.message.includes('Failed to load chunk')) {
      window.location.reload();
    } else {
      reset();
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md w-full p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
            <AlertOctagon className="w-10 h-10 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong!</h1>
        <p className="text-gray-600 mb-8 text-sm">
          We apologize for the inconvenience. An unexpected error has occurred while processing your request. Our technical team has been notified.
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={handleReset}
            className="w-full px-6 py-3 bg-[#0d4a28] text-white font-semibold rounded-xl hover:bg-[#1a6b3c] transition-all flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
          
          <a 
            href="/"
            className="w-full px-6 py-3 bg-gray-50 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2 border border-gray-200"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
