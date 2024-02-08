import React, {useEffect, useState} from 'react';
import NewsItems from './newsitem';
import Spin from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{

  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);
  

  //changing state using constructor
  //we cant change props.
  //but we can change the states.
  const Capitalize = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateNews = async()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  
  useEffect(()=>{
    document.title = `${Capitalize(props.category)} - NewsDaily`
    updateNews();
    // eslint-disable-next-line
  },[])
  
  // handlePrevclick = async()=>{
    
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c2d800ea2db74305a54b6bb1c06bb97c&page=${state.page - 1}&pageSize=${props.pageSize}`;
  //   // setState({loading: true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // setState({
  //   //   page: state.page - 1,
  //   //   articles :parsedData.articles,
  //   //   loading: false
  //   // });
  //   setState({page: --state.page});
  //   updateNews();
  // }
  // handlenextclick = async()=>{
  //       // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c2d800ea2db74305a54b6bb1c06bb97c&page=${state.page + 1}&pageSize=${props.pageSize}`;
  //       // setState({loading: true});
  //       // let data = await fetch(url);
  //       // let parsedData = await data.json();
  //       // setState({
  //       //   page: state.page + 1,
  //       //   articles :parsedData.articles,
  //       //   loading: false
  //       // });

  //       setState({page: ++state.page});
  //       updateNews();
        
  // }

  const fetchMoreData = async() => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)
    setLoading(false);
  };

  
    
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{margin:'35px 0px',marginTop:'90px'}}>NewsDaily - Top {Capitalize(props.category)} Headlines</h1>
        {loading && <Spin/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spin/>}
        >
        <div className="container">
        <div className="row">
        {articles.map((element)=>{
          return <div className="col-md-4" key = {element.url}>
            <NewsItems title={element.title} description={element.description} imgUrl = {element.urlToImage} NewsUrl ={element.url} author = {element.author} date = {element.publishedAt} source={element.source.name} colour={props.colour}/>
          </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={state.page<=1} type="button" className="btn btn-dark" onClick={handlePrevclick}>&larr; Previous</button>
          <button disabled={state.page>Math.ceil(state.totalResults/props.pageSize)-1} type="button" className="btn btn-dark" onClick={handlenextclick}>Next &rarr;</button>
        </div> */}
      </div>
    )
}

News.defaultProps = {
  country: 'in',
  pageSize : 12,
  category : 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}
export default News