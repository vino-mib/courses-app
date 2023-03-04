import React, { useState } from 'react';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import SearchBar from './components/Courses/components/SearchBar/SearchBar.jsx';
import Button from './common/Button/Button.jsx';
import { mockedCoursesList } from './mock';
import getAuthorNames from './helpers/getAuthorNames';

const App = () => {
  const [courses, setCourses] = useState(mockedCoursesList);

  const onSearch = (keyword) => {
    const result = mockedCoursesList.filter(course => {
      course = {...course, authors: getAuthorNames(course.authors) };
      return Object.values(course).some(val => val.toString().toLowerCase().includes(keyword.toLowerCase()))
    });
    setCourses(result);
  }
  
  return (
    <React.Fragment>
      <Header></Header>
      <div className="container-fluid">
        <div className="row mt-md-3 mb-md-3">
          <div className="col-md-8">
            <SearchBar onSearch={onSearch}></SearchBar>
          </div>
          <div className="col-md-4">
            <Button class="btn btn-outline-primary float-right" label="Add new course"></Button>
          </div>
        </div>
        <Courses list={courses}></Courses>
      </div>
    </React.Fragment>
  );
}

export default App;
