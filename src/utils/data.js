import luffy from '../assets/luffy.jpg'
import zoro from '../assets/zoro.jpg'
import nami from '../assets/nami.jpg'
import sanji from '../assets/sanji.jpg'
import usopp from '../assets/usopp.jpg'
import chopper from '../assets/chopper.png'
import robin from '../assets/robin.png'
import franky from '../assets/franky.png'
import brook from '../assets/brook.jpg'
import jinbei from '../assets/jinbei.jpg'
import other from '../assets/other.png'

export const categories = [
    {
      name: 'luffy',
      image: luffy,
      fullName: 'Monkey D Luffy'
    },
    {
      name: 'zoro',
      image: zoro,
      fullName: 'Roronoa Zoro'
    },
    {
      name: 'nami',
      image: nami,
      fullName: 'Nami'
    },
    {
      name: 'sanji',
      image: sanji,
      fullName: 'Vinsmoke Sanji'
    },
    {
      name: 'usopp',
      image: usopp,
      fullName: 'Usopp'
    },
    {
      name: 'chopper',
      image: chopper,
      fullName: 'Tony Chopper'
    },
    {
      name: 'robin',
      image: robin,
      fullName: 'Nico Robin'
    },
    {
      name: 'franky',
      image: franky,
      fullName: 'Franky'
    }, {
      name: 'brook',
      image: brook,
      fullName: 'Brook'
    },
    {
      name: 'jinbei',
      image: jinbei,
      fullName: 'Jinbei'
    }, {
      name: 'other',
      image: other,
      fullName: 'Hình ảnh khác'
    }
];

export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
};

export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedBy->{
                _id,
                userName,
                image
              },
              save[]{
                _key,
                postedBy->{
                  _id,
                  userName,
                  image
                },
              },
            }`;
    return query;
};

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;

export const pinDetailQuery = (pinId) => {
    const query = `*[_type == "pin" && _id == '${pinId}']{
        image{
        asset->{
            url
        }
        },
        _id,
        title, 
        about,
        category,
        destination,
        postedBy->{
        _id,
        userName,
        image
        },
        save[]{
        postedBy->{
            _id,
            userName,
            image
        },
        },
        comments[]{
        comment,
        _key,
        postedBy->{
            _id,
            userName,
            image
        },
        }
    }`;
    return query;
};

export const pinDetailMorePinQuery = (pin) => {
    const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
        image{
        asset->{
            url
        }
        },
        _id,
        destination,
        postedBy->{
        _id,
        userName,
        image
        },
        save[]{
        _key,
        postedBy->{
            _id,
            userName,
            image
        },
        },
    }`;
    return query;
};

export const userCreatedPinsQuery = (userId) => {
    const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
};
  
export const userSavedPinsQuery = (userId) => {
    const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
};