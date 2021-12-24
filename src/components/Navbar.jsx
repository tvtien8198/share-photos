import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
    const navigate = useNavigate();
  
    if (user) {
      return (
        <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
          <div className="flex justify-start items-center w-full px-2 rounded-3xl bg-white border-none outline-none focus-within:shadow-md shadow-sm">
            <IoMdSearch fontSize={24} className="ml-1" />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm"
              value={searchTerm}
              onFocus={() => navigate('/search')}
              className="p-2 w-full bg-white outline-none "
            />
          </div>
          <div className="flex gap-3 ">
            <Link to={`user-profile/${user?._id}`} className="hidden md:block ">
              <img data-src={user.image} alt="user-pic" className="w-14 h-12 rounded-full shadow-md lazyload blur-up" />
            </Link>
            <Link to="/create-pin" className="bg-gray-500 shadow-md text-white rounded-full w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
              <IoMdAdd fontSize={24} />
            </Link>
          </div>
        </div>
      );
    }
  
    return null;
};
  
export default Navbar;
