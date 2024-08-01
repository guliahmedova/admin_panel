
const RecommendCarCard = (props) => {
    const { carName, retweet, imgUrl, rentPrice, percentage } = props.item
    return (
        <div className="recommend__car-card">
            <div className="recommend__car-top">
                <h3>
                    <span>
                        <i className='ri-refresh-line'></i>
                        {percentage}% Recommended
                    </span>
                </h3>
            </div>

            <div className="recommend__car-img">
                <img src={imgUrl} alt="" />
            </div>
            <div className="recommend__car-bottom">
                <h4>{carName}</h4>
                <div className='recommend__car-other'>
                    <div className='recommend__icons'>
                        <p><i className='ri-repeat-line'></i>{retweet}K</p>
                        <p><i className='ri-settings-2-line'></i></p>
                        <p><i className='ri-timer-flash-line'></i></p>
                    </div>
                    <span>${rentPrice}/n</span>
                </div>
            </div>
        </div>
    )
}

export default RecommendCarCard