const newsitem=(props)=>{
  
    let { title, description, imgUrl, NewsUrl, author, date,source,colour} = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display: 'flex',justifyContent:'flex-end',position:'absolute',right:0}}>
            <span className={`badge rounded-pill bg-${colour}`} style={{left:'95%',zIndex:'2' }}>{source}
          </span>
          </div>
          
          <img
            src={
              !imgUrl
                ? "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/light-rail-1582950111.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*"
                : imgUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={NewsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default newsitem;
