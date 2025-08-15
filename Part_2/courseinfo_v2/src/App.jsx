import Course from './components/Course'

const App = ( {courses} ) => {
  return (
    <>
      <Course courses={courses} />
    </>
  )
}

export default App