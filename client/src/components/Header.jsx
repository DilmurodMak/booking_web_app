import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const {user} = useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  
  // Form state for search
  const [searchLocation, setSearchLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState('');

  // Handle clicks outside the menu to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuOpen && 
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        menuButtonRef.current && 
        !menuButtonRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    }
    
    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);
    
    // Prevent body scrolling when menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Function to get the first letter of the user's name
  const getFirstLetter = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "";
  };

  // Function to handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Close the menu
    setMobileMenuOpen(false);
    
    // Build query parameters
    const params = new URLSearchParams();
    if (searchLocation) params.append('location', searchLocation);
    if (checkInDate) params.append('checkIn', checkInDate);
    if (checkOutDate) params.append('checkOut', checkOutDate);
    if (guestCount) params.append('guests', guestCount);
    
    // Navigate to home page with search filters
    navigate(`/?${params.toString()}`);
  };
  
  // Function to handle menu link clicks
  const handleMenuLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="flex justify-between items-center px-4 md:px-14 relative z-10">
      <Link to={"/"} className="logo flex items-center gap-1 text-primary">
        <span className="font-bold text-xl">ConferenceHub</span>
      </Link>
      
      {/* Desktop search bar - hidden on mobile */}
      <div className="search hidden md:flex border border-gray-300 rounded-full py-2 px-4 gap-2 shadow-md shadow-gray-200">
        <div className="pt-0.5">Anywhere</div>
        <div className="border-l border-gray-300"></div>
        <div className="pt-0.5">Any week</div>
        <div className="border-l border-gray-300"></div>
        <div className="pt-0.5">Add guests</div>
        <button className="bg-primary text-white rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center gap-2 relative z-30">
        {/* Hamburger menu button - only shown on mobile */}
        <button 
          ref={menuButtonRef}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden border border-gray-300 rounded-full p-2 bg-white hover:shadow-md transition-shadow"
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        
        <Link
          to={user ? "/account" : "/login"}
          className="profile items-center flex border border-gray-300 rounded-full py-2 px-4 gap-2 bg-white hover:shadow-md transition-shadow"
        >
          {!user ? (
            <div className="user">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#717171ff"
                className="w-7 h-7"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <>
              <div className="bg-rose-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                {getFirstLetter()}
              </div>
            </>
          )}
        </Link>
      </div>
      
      {/* Semi-transparent overlay when menu is open */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" />
      )}
      
      {/* Mobile menu with search and user sections */}
      {mobileMenuOpen && (
        <div 
          ref={menuRef}
          className="absolute top-16 left-0 right-0 bg-white p-4 shadow-md z-20 md:hidden rounded-b-lg"
        >
          <div className="flex flex-col gap-4">
            {/* Mobile search section */}
            <form onSubmit={handleSearch} className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Search filters</h3>
              
              {/* Location search */}
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Location</label>
                <div className="border border-gray-300 rounded-full py-2 px-4 flex items-center">
                  <input 
                    type="text" 
                    placeholder="Location you are looking for?" 
                    className="w-full border-none focus:outline-none p-0 m-0 bg-transparent"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Date filters */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Check in</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-2xl py-2 px-3"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Check out</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-2xl py-2 px-3"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Guests */}
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Guests</label>
                <input 
                  type="number" 
                  placeholder="Number of guests" 
                  min="1"
                  className="w-full border border-gray-300 rounded-full py-2 px-3"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                />
              </div>
              
              {/* Search button */}
              <button 
                type="submit" 
                className="bg-primary text-white py-2 px-4 rounded-full w-full mt-2"
              >
                Search
              </button>
            </form>
            
            {/* User menu section */}
            <div className="border-t pt-3">
              {user ? (
                <>
                  <Link 
                    to="/account" 
                    className="flex items-center py-3 px-2 hover:bg-gray-100 rounded-lg"
                    onClick={handleMenuLinkClick}
                  >
                    <span className="mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </span>
                    My Account
                  </Link>
                  <Link 
                    to="/account/bookings" 
                    className="flex items-center py-3 px-2 hover:bg-gray-100 rounded-lg"
                    onClick={handleMenuLinkClick}
                  >
                    <span className="mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </span>
                    My Bookings
                  </Link>
                  <Link 
                    to="/account/user-places" 
                    className="flex items-center py-3 px-2 hover:bg-gray-100 rounded-lg"
                    onClick={handleMenuLinkClick}
                  >
                    <span className="mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </span>
                    My Accommodations
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="flex items-center py-3 px-2 hover:bg-gray-100 rounded-lg"
                    onClick={handleMenuLinkClick}
                  >
                    <span className="mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="flex items-center py-3 px-2 hover:bg-gray-100 rounded-lg"
                    onClick={handleMenuLinkClick}
                  >
                    <span className="mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                    </span>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
