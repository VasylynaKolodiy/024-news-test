import React from 'react';
import {Routes, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage/HomePage";
import NewsPage from "./pages/NewsPage/NewsPage";
import Header from "./components/Header/Header";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <div className='App container'>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/news' element={<NewsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </div>
  );
}

export default App;