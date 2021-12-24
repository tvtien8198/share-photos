import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FiDownload } from 'react-icons/fi';
import { AiTwotoneDelete } from 'react-icons/ai';
import { HiExternalLink } from 'react-icons/hi';

import { client, urlFor } from '../client';

const Pin = ({ pin }) => {
    const [postHovered, setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false);

    const navigate = useNavigate();

    const { postedBy, image, _id, destination } = pin;

    const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    const deletePin = (id) => {
        client
        .delete(id)
        .then(() => {
            window.location.reload();
        });
    };

    let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.googleId);

    alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

    const savePin = (id) => {
        if (alreadySaved?.length === 0) {
        setSavingPost(true);

        client
            .patch(id)
            .setIfMissing({ save: [] })
            .insert('after', 'save[-1]', [{
                _key: uuidv4(),
                userId: user?.googleId,
                postedBy: {
                    _type: 'postedBy',
                    _ref: user?.googleId,
                },
            }])
            .commit()
            .then(() => {
                window.location.reload();
                setSavingPost(false);
            });
        }
    };


    return (
        <div className="m-2">
          <div
            onMouseEnter={() => setPostHovered(true)}
            onMouseLeave={() => setPostHovered(false)}
            onClick={() => navigate(`/pin-detail/${_id}`)}
            className="pinOverlay relative cursor-zoom-in w-auto shadow-lg rounded-xl overflow-hidden transition-all duration-500 ease-in-out"
          >
            <img className="rounded-xl w-full shadow-md lazyload blur-up" data-src={(urlFor(image).width(250).url())} alt="user-post" />
            {postHovered && (
              <div
                className="absolute top-0 w-full h-full flex flex-col justify-between p-3 z-50"
                style={{ height: '100%' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <a
                      href={`${image?.asset?.url}?dl=`}
                      download
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="bg-white w-8 h-8 p-2 rounded-full flex items-center justify-center text-dark text-xl outline-none"
                    ><FiDownload fontSize={20} />
                    </a>
                  </div>
                  {alreadySaved?.length !== 0 ? (
                    <button type="button" className="bg-red-500 text-white font-medium px-3 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                      {pin?.save?.length}  Đã lưu
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        savePin(_id);
                      }}
                      type="button"
                      className="bg-red-500 text-white px-3 py-1 font-medium text-base rounded-3xl hover:shadow-md outline-none"
                    >
                      {pin?.save?.length}   {savingPost ? 'Đang lưu' : 'Lưu'}
                    </button>
                  )}
                </div>
                <div className=" flex justify-between items-center gap-2 w-full">
                  {destination?.slice(8).length > 0 ? (
                    <a
                      href={destination}
                      target="_blank"
                      className="bg-white flex items-center gap-2 text-black font-bold py-1 pl-3 pr-3 rounded-full shadow-md"
                      rel="noreferrer"
                    >
                      {' '}
                      <HiExternalLink fontSize={20} />
                      {destination?.slice(8, 15)}...
                    </a>
                  ) : undefined}
                  {
               postedBy?._id === user?.googleId && (
               <button
                 type="button"
                 onClick={(e) => {
                   e.stopPropagation();
                   deletePin(_id);
                 }}
                 className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark outline-none"
               >
                 <AiTwotoneDelete fontSize={20} />
               </button>
               )
            }
                </div>
              </div>
            )}
          </div>
          <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={postedBy?.image}
              alt="user-profile"
            />
            <p className="font-semibold capitalize">{postedBy?.userName}</p>
          </Link>
        </div>
      );
}

export default Pin
