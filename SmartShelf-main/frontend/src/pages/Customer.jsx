import React, { useState, useEffect } from "react";
import { Camera, Upload, X, CheckCircle, Star } from "lucide-react";

// ProductSearch Component with improved dropdown functionality
const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Mock product database
  const allProducts = [
    {
      id: 1,
      name: "Coca Cola 500ml",
      price: "₹40",
      availability: "In Stock",
      aisle: "A-12",
    },
    {
      id: 2,
      name: "Coca Cola 1L",
      price: "₹75",
      availability: "Low Stock",
      aisle: "A-12",
    },
    {
      id: 3,
      name: "Coca Cola Zero 500ml",
      price: "₹45",
      availability: "Out of Stock",
      aisle: "A-13",
    },
    {
      id: 4,
      name: "Pepsi 500ml",
      price: "₹38",
      availability: "In Stock",
      aisle: "A-12",
    },
    {
      id: 5,
      name: "Pepsi 1L",
      price: "₹70",
      availability: "In Stock",
      aisle: "A-12",
    },
    {
      id: 6,
      name: "Sprite 500ml",
      price: "₹40",
      availability: "Low Stock",
      aisle: "A-13",
    },
    {
      id: 7,
      name: "Fanta Orange 500ml",
      price: "₹40",
      availability: "In Stock",
      aisle: "A-13",
    },
    {
      id: 8,
      name: "Thumbs Up 500ml",
      price: "₹40",
      availability: "Out of Stock",
      aisle: "A-12",
    },
    {
      id: 9,
      name: "Limca 500ml",
      price: "₹40",
      availability: "In Stock",
      aisle: "A-13",
    },
    {
      id: 10,
      name: "Mountain Dew 500ml",
      price: "₹42",
      availability: "In Stock",
      aisle: "A-12",
    },
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 0) {
      // Filter products based on search term
      const filteredResults = allProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const filteredResults = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filteredResults);
      setShowDropdown(true);
    }
  };

  const selectProduct = (product) => {
    setSearchTerm(product.name);
    setResults([product]);
    setShowDropdown(false);
  };

  return (
    <div className="space-y-4 relative">
      <h2 className="text-xl font-semibold text-gray-800">🔍 Find Products</h2>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search for products... (try 'cola', 'pepsi', 'sprite')"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
            onFocus={() => {
              if (searchTerm.trim() && results.length > 0) {
                setShowDropdown(true);
              }
            }}
          />

          {/* Dropdown Results */}
          {showDropdown && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => selectProduct(product)}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Aisle: {product.aisle}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        {product.price}
                      </p>
                      <p
                        className={`text-sm ${
                          product.availability === "In Stock"
                            ? "text-green-600"
                            : product.availability === "Low Stock"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {product.availability}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Selected Product Display */}
      {!showDropdown && results.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700">Search Results:</h3>
          {results.map((product) => (
            <div
              key={product.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    Aisle: {product.aisle}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    {product.price}
                  </p>
                  <p
                    className={`text-sm ${
                      product.availability === "In Stock"
                        ? "text-green-600"
                        : product.availability === "Low Stock"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.availability}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {searchTerm.trim() && results.length === 0 && !showDropdown && (
        <div className="text-center py-4 text-gray-500">
          No products found for "{searchTerm}". Try searching for "cola",
          "pepsi", or "sprite".
        </div>
      )}
    </div>
  );
};

// ShelfStatus Component with Camera Feature
const ShelfStatus = ({ onFlag, currentPoints }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [showImageOptions, setShowImageOptions] = useState(false);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setShowImageOptions(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera if available
      });
      setCameraStream(stream);
      setShowCamera(true);
      setShowImageOptions(false);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "Unable to access camera. Please check permissions or try selecting an image instead."
      );
    }
  };

  const capturePhoto = () => {
    const video = document.getElementById("cameraVideo");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");
    setSelectedImage(imageData);
    stopCamera();
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    setIsSubmitting(true);

    try {
      // Step 1: Get user ID from localStorage or fallback
      let email = localStorage.getItem("email");
      // Step 2: Convert base64 to Blob
      const blob = await (await fetch(selectedImage)).blob();
      const file = new File([blob], "shelf.jpg", { type: blob.type });

      // Step 3: Create FormData and append fields
      const formData = new FormData();
      formData.append("shelfCode", "A-12");
      formData.append("priority", "high");
      formData.append("image", file); // single file
      formData.append("email", email); // append userId

      // Step 4: Send POST request
      const response = await fetch("http://localhost:4000/customer/flagItem", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Flag Item Response:", result);

      if (response.ok) {
        onFlag(currentPoints); // Pass current points to show notification
      } else {
        alert(result?.message || "Failed to flag item.");
      }
    } catch (error) {
      console.error("Error submitting flag:", error);
      alert("Error submitting flag. Please try again.");
    }

    setIsSubmitting(false);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        📸 Report Empty Shelf
      </h2>

      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
        {!selectedImage && !showCamera && (
          <div className="space-y-4">
            <p className="text-gray-600">
              Help us keep shelves stocked! Take a photo of an empty shelf.
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowImageOptions(!showImageOptions)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Upload size={20} />
                Add Photo
              </button>
            </div>

            {showImageOptions && (
              <div className="flex gap-4 justify-center mt-4">
                <button
                  onClick={startCamera}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Camera size={18} />
                  Take Photo
                </button>
                <label className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 cursor-pointer">
                  <Upload size={18} />
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        )}

        {showCamera && (
          <div className="space-y-4">
            <div className="relative">
              <video
                id="cameraVideo"
                ref={(video) => {
                  if (video && cameraStream) {
                    video.srcObject = cameraStream;
                    video.onloadedmetadata = () => {
                      video.play().catch((err) => {
                        console.warn("Auto-play failed:", err);
                      });
                    };
                  }
                }}
                className="w-full max-w-md mx-auto rounded-lg"
                autoPlay
                playsInline
              />
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={capturePhoto}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Camera size={20} />
                Capture
              </button>
              <button
                onClick={stopCamera}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <X size={20} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {selectedImage && (
          <div className="space-y-4">
            <div className="flex justify-center items-center">
              <img
                src={selectedImage}
                alt="Empty shelf"
                className="max-w-full max-h-64 rounded-lg shadow-md"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// NotificationCard Component
const NotificationCard = ({ currentPoints }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2">
          <CheckCircle className="text-blue-600" size={24} />
          Report Submitted! 📤
        </h3>
      </div>

      <p className="text-blue-700 mb-4">
        Thank you for reporting the empty shelf! Your report has been successfully submitted to our team.
      </p>

      <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-blue-800 font-semibold">Current Points:</span>
          <span className="text-2xl font-bold text-blue-600">{currentPoints}</span>
        </div>
        <div className="text-sm text-gray-600">
          <p className="mb-1">🎯 <strong>You'll earn +50 points</strong> when an employee marks this task as completed!</p>
          <p>💡 Keep flagging empty shelves to earn more rewards</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-yellow-800 text-sm">
          <strong>⏰ What's next?</strong> Our team will restock this shelf soon. Points will be added automatically to your account once completed.
        </p>
      </div>
    </div>
  );
};

// Main Customer Component
const Customer = () => {
  const [hasContributed, setHasContributed] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [isLoadingPoints, setIsLoadingPoints] = useState(true);

  // Fetch current points when component mounts
  useEffect(() => {
    fetchCurrentPoints();
  }, []);

  const fetchCurrentPoints = async () => {
    try {
      setIsLoadingPoints(true);
      
      // Get user ID from localStorage or fallback
      let email = localStorage.getItem("email");
      const response = await fetch(`http://localhost:4000/customer/fetchPoints?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      
      if (response.ok && result.points !== undefined) {
        setCurrentPoints(result.points);
      } else {
        console.error("Failed to fetch points:", result);
        // Set default points if API fails
        setCurrentPoints(1200);
      }
    } catch (error) {
      console.error("Error fetching points:", error);
      // Set default points if API fails
      setCurrentPoints(1200);
    } finally {
      setIsLoadingPoints(false);
    }
  };

  const handleFlag = (points) => {
    setHasContributed(true);
    setCurrentPoints(points);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white p-6">
      {/* Header */}
      <div className="bg-blue-600 text-white py-4 px-6 rounded-lg shadow-md mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">🛒 SmartShelf by Walmart</h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm opacity-90">Your Points</p>
            <p className="font-bold text-lg">
              {isLoadingPoints ? "Loading..." : currentPoints}
            </p>
          </div>
          <span className="text-sm font-medium">📍 Bengaluru #1293</span>
        </div>
      </div>

      {/* Promo */}
      <div className="max-w-4xl mx-auto bg-blue-100 text-blue-900 border-l-4 border-blue-500 p-4 rounded shadow mb-6">
        🏆 Flag empty shelves and earn{" "}
        <span className="font-bold text-green-700">Green Points</span>! Redeem
        for discounts
      </div>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow p-6 space-y-6">
        <ProductSearch />
        <ShelfStatus onFlag={handleFlag} currentPoints={currentPoints} />
        {hasContributed && <NotificationCard currentPoints={currentPoints} />}
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-12">
        Need help? Visit the{" "}
        <a href="#" className="text-blue-600 underline">
          Help Center
        </a>{" "}
        or call support at 1-800-WALMART.
      </div>
    </div>
  );
};

export default Customer;