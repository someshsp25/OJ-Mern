import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { SignUp } from './pages/signup';
import { QuestionList } from './pages/QuestionList';
import { Code } from './pages/code';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<SignUp/>} />
        <Route path='/question' element={<QuestionList/>} />
        <Route path="/question/:questionId" element={<Code />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
