import React from 'react'
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();
    const responseGoogle = (res) => {
        localStorage.setItem('user', JSON.stringify(res.profileObj))
        const { name, googleId, imageUrl } = res.profileObj

        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl,
        };

        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true });
          });
    }

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className="relative w-full h-full">
                <video 
                    src={shareVideo} 
                    type='video/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />
                <div className="absolute flex flex-col items-center justify-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} alt="logo" width="100%" />
                    </div>
                    <div className="shadow-2xl">
                        <GoogleLogin
                            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                            render={(renderProps) => (
                                <button
                                    type='button'
                                    className='bg-mainColor flex justify-center items-center p-3 font-bold rounded-lg cursor-pointer outline-none'
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    <FcGoogle fontSize={24} className='mr-4 fo' /> Đăng nhập với Google
                                </button>
                            )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy="single_host_origin"
                        />
                    </div>
                    <p className='pt-5 text-white'>Chia sẽ hình ảnh Onepiece</p>
                </div>
            </div>
        </div>
    )
}

export default Login
