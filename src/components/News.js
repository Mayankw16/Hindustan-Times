import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(60);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    }, [])

    const fetchArticles = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setPage(page + 1);
        setTotalResults(parsedData.totalResults);
    }

    return (
        <>
            <h2 className='text-center' style={{ marginTop: '5.5rem', marginBottom: '1.5rem' }}>Hindustan Today <span className="badge bg-secondary" id='topHeadlines'>Top Headlines</span></h2>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchArticles}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container my-3">
                    {<div className="row row-cols-1 row-cols-md-3 g-4">
                        {articles.map((element) => {
                            return <div className="col" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageURL={element.urlToImage} URL={element.url} publishedAt={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>}
                </div>

            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News