import React from 'react'

const MusicPlayer = (props) => {
    const { artist, duration, id, image_url, is_playing, time, title, votes, votes_required } = props

    let progress = Math.floor((time / duration) * 100);

    const pauseSong = () => {
        console.log('Paused');
        const requestOptions = {
            method : 'PUT',
            headers: {'content-type': 'application/json', credentials: 'include'}
        };
        fetch("/spotify/pause", requestOptions)
    }

    const playSong = () => {
        console.log('playSong');
        const requestOptions = {
            method : 'PUT',
            headers: {'content-type': 'application/json', credentials: 'include'}
        };
        fetch("/spotify/play", requestOptions)
    }

    const skipSong = () => {
        console.log('skipped');
        const requestOptions = {
            method : 'POST',
            headers: {'content-type': 'application/json', credentials: 'include'}
        };
        fetch("/spotify/skip", requestOptions)
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
                <button className="p-2 bg-blue-500 rounded-full text-white" onClick={() => {is_playing ? pauseSong() : playSong() }}>Play/Pause</button>
                <button className="p-2 bg-blue-500 rounded-full text-white" onClick={() => skipSong()}>Next {votes} /
{votes_required}
</button>
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