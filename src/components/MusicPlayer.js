import React from 'react'

const MusicPlayer = (props) => {
    const { artist, duration, id, image_url, is_playing, time, title, votes } = props

    let progress = Math.floor((time / duration) * 100);

    const onPlay = () => {
        console.log('onPlay');
    }

    const onNext = () => {
        console.log('onNext');
    }

    return (
        <div className="flex flex-col items-center">
            <img src={image_url} alt="Album Cover" className="w-64 h-64 mb-4 rounded-lg" />
            <h2 className="text-xl font-bold mb-2">{artist}</h2>
            <div>
                <h3 className="text-2xl font-bold">
                    {title}
                </h3>
            </div>
            <div className="flex space-x-4">
                <button className="p-2 bg-blue-500 rounded-full text-white">Play/Pause</button>
                <button className="p-2 bg-blue-500 rounded-full text-white">Next</button>
            </div>
            <div className="w-full h-4 bg-gray-300 rounded-full mt-4">
                <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>
                <span className="text-sm">
                    {progress}%
                </span>
            </div>
        </div>
    )
}

export default MusicPlayer