import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { useEffect, useState } from 'react'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PlayVideo = () => {

    const {videoId}=useParams();
    const [apiData, setApiData] = useState(null)
    const [channelData, setChannelData] = useState(null)
    const [commentData, setCommentData] = useState([])

    const fetchVideoData = async () => {
        // Fetching Videos Data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY} `
        await fetch(videoDetails_url)
            .then(res => res.json())
            .then(data => setApiData(data.items[0]));
    }

    const fetchAnotherData = async () => {
        if (!apiData) return;

        // Fetching Channel Data
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY} `
        await fetch(channelData_url)
            .then(res => res.json())
            .then(data => setChannelData(data.items[0]));

        // Fetching Comment Data
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
        await fetch(comment_url)
            .then(res => res.json())
            .then(data => setCommentData(data.items));
    }

    useEffect(() => {
        fetchVideoData()
    }, [videoId])

    useEffect(() => {
        fetchAnotherData()
    }, [apiData])

    return (
        <div className='play_video'>
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
            <div className="play_video_info">
                <p>{apiData ? value_converter(apiData.statistics.viewCount) : "16K"} Views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}</p>
                <div>
                    <span><img src={like} alt="like" />{apiData ? value_converter(apiData.statistics.likeCount) : "155"}</span>
                    <span><img src={dislike} alt="dislike" /></span>
                    <span><img src={share} alt="share" />Share</span>
                    <span><img src={save} alt="save" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="name" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : "Channel Name"}</p>
                    <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className='vid_description'>
                <p>{apiData ? apiData.snippet.description.slice(0, 500) : 'Description Here'}</p>
                <hr />
                <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 123} Comments</h4>
                {commentData.map((item, index) => (
                    <div key={index} className="comment">
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="userImg" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className="comment_action">
                                <img src={like} alt="like" />
                                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="disLike" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlayVideo;
