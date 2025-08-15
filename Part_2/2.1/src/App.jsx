const Header = ({name}) => (
  <h1>{name}</h1>
)

const Content = ({parts}) => (
  <>
    <Part part = {parts[0].name} exercises = {parts[0].exercises}/>
    <Part part = {parts[1].name} exercises = {parts[1].exercises}/>
    <Part part = {parts[2].name} exercises = {parts[2].exercises}/>
    <Part part = {parts[3].name} exercises = {parts[3].exercises}/>
  </>
)

const Part = ({part, exercises}) => (
  <p>
    {part} {exercises}
  </p>
)

const Total = (props) => (
  <p>
    <b>Total of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises + props.parts[3].exercises}</b>
  </p>
)

const Course = ({course}) => (
  <>
    <Header name = {course.name} />
    <Content parts = {course.parts} />
    <Total parts = {course.parts} />
  </>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  return <Course course={course} />
}

export default App