import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, CheckCircle, AlertTriangle } from 'lucide-react';

const StaffDashboard = () => {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch flags from backend
  useEffect(() => {
    const fetchFlags = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/employee/checkflags", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Flags:", data);
        setFlags(data.data || []);
      } catch (error) {
        console.error("Error fetching flags:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlags();
  }, []);

  // Image slider component
  const ImageSlider = ({ images, flagId }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
      return (
        <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 text-sm">No images</span>
        </div>
      );
    }

    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
      <div className="relative w-32 h-24">
        <img
          src={images[currentIndex]?.url}
          alt={`Flag ${flagId} - ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-lg cursor-pointer"
          onClick={() => {
            setSelectedImage(images);
            setCurrentImageIndex(currentIndex);
          }}
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
            >
              <ChevronLeft size={12} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
            >
              <ChevronRight size={12} />
            </button>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              {currentIndex + 1}/{images.length}
            </div>
          </>
        )}
      </div>
    );
  };

  // Full screen image modal
  const ImageModal = ({ images, currentIndex, onClose }) => {
    const [index, setIndex] = useState(currentIndex);

    const nextImage = () => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
      setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="relative max-w-4xl max-h-full">
          <img
            src={images[index]?.url}
            alt={`Flag image ${index + 1}`}
            className="max-w-full max-h-full object-contain"
          />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-20 text-white rounded-full p-2 hover:bg-opacity-30"
          >
            <X size={24} />
          </button>
          
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white rounded-full p-2 hover:bg-opacity-30"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white rounded-full p-2 hover:bg-opacity-30"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
                {index + 1} of {images.length}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Handle closing a flag
  const handleCloseFlag = async (flagId, action) => {
    try {
      const response = await fetch("http://localhost:4000/employee/closeflags", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ flagId, action })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the flag from the local state
      setFlags(prevFlags => prevFlags.filter(flag => flag._id !== flagId));
    } catch (error) {
      console.error("Error closing flag:", error);
      alert("Error closing flag. Please try again.");
    }
  };

  const getPriority = (flag) => {
    if (flag.priority) {
      return flag.priority;
    }
    // Fallback logic based on user count
    const userCount = flag.users?.length || 0;
    if (userCount >= 5) return 'high';
    if (userCount >= 2) return 'medium';
    return 'low';
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-700',
  };

  const filteredFlags = flags.filter((flag) => {
    const priority = getPriority(flag);
    return filter === 'all' || filter === priority;
  });

  const handleLogout = () => {
    localStorage.removeItem('staff-auth');
    // Navigate to login page - you'll need to handle this based on your routing setup
    window.location.href = '/staff-login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading flags...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">Error loading flags: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Staff Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Filter */}
      <div className="flex justify-end mb-6">
        <select
          className="border rounded-md p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Alerts ({flags.length})</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      {/* Alert Cards */}
      <div className="space-y-6">
        {filteredFlags.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No flags to display</h2>
            <p className="text-gray-500">
              {filter === 'all' 
                ? "All shelves are properly stocked!" 
                : `No ${filter} priority flags found.`
              }
            </p>
          </div>
        ) : (
          filteredFlags.map((flag) => {
            const priority = getPriority(flag);
            return (
              <div
                key={flag._id}
                className="flex justify-between items-center bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex-1">
                  <h2 className="text-xl font-bold">Shelf Code: {flag.shelfCode}</h2>
                  <p className="text-gray-700">Empty shelf reported</p>
                  <p className="text-sm text-gray-500">
                    Reported by: {flag.users?.length || 0} user(s)
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    Images: {flag.images?.length || 0}
                  </p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[priority]}`}
                  >
                    Priority: {priority}
                  </span>
                </div>

                {/* Image Slider */}
                <div className="mx-4">
                  <ImageSlider images={flag.images} flagId={flag._id} />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button 
                    className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-1 rounded"
                    onClick={() => handleCloseFlag(flag._id, 'refilled')}
                  >
                    Mark as Refilled
                  </button>
                  <button 
                    className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-1 rounded"
                    onClick={() => handleCloseFlag(flag._id, 'ignored')}
                  >
                    Ignore
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          images={selectedImage}
          currentIndex={currentImageIndex}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default StaffDashboard;