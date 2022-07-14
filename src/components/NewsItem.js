import React from 'react'

const NewsItem = (props) => {

    const publishedAt = () => {
        let date = new Date(props.publishedAt);
        let minutes = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes();
        let hours = date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours();
        let d = date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate();
        let ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[date.getMonth()] + ' ' + d + ', ' + hours + ':' + minutes + ' ' + ampm + ' IST';
    }

    let { title, description, imageURL, URL, source } = props;

    return (
        <div className="card h-100">
            <span className="position-absolute badge rounded-pill bg-danger" style={{ left: '-2%', top: '-2%', padding: '0.5rem' }}>
                {source}
            </span>
            <img className="card-img-top" src={imageURL} alt='' />
            <div className="card-body text-center">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={URL} className="btn btn-primary btn-sm" rel="noreferrer" target='_blank'>Read more</a>
            </div>

            <div className="card-footer text-center">
                <small className="text-muted">Published on {publishedAt()}</small>
            </div>
        </div>
    )
}

export default NewsItem