import './App.css';
import LoadingBar from 'react-top-loading-bar'
import React, {useState} from 'react'
import Navbar from './components/navbar';
import News from './components/news';
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  const apikey = process.env.REACT_APP_NEWS_API
  const [progress,setProgress] = useState(0);
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={progress}
          />
          <Routes>
            <Route path='/' element={<News setProgress={setProgress}  apikey = {apikey} key='general' pageSize={12} country='in' category='general' colour='danger'/>}></Route>
            <Route path='/business' element={<News setProgress={setProgress}  apikey  = {apikey} key='business' pageSize={12} country='in' category='business' colour='primary'/>}></Route>
            <Route path='/entertainment' element={<News setProgress={setProgress}  apikey  = {apikey} key='entertainment' pageSize={12} country='in' category='entertainment' colour='secondary'/>}></Route>
            <Route path='/health' element={<News setProgress={setProgress}  apikey  = {apikey} key='health' pageSize={12} country='in' category='health' colour='success'/>}></Route>
            <Route path='/science' element={<News setProgress={setProgress}  apikey = {apikey} key='science' pageSize={12} country='in' category='science' colour='warning'/>}></Route>
            <Route path='/sports' element={<News setProgress={setProgress}  apikey  = {apikey} key='sports' pageSize={12} country='in' category='sports' colour='info'/>}></Route>
            <Route path='/technology' element={<News setProgress={setProgress}  apikey  = {apikey} key='technology' pageSize={12} country='in' category='technology' colour='dark'/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App;