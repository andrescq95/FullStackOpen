const Header = ({name}) => {
  return (
      <h2>{name}</h2>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </>
  )
}

const Part = ({part, exercises}) => (
  <p>
    {part} {exercises}
  </p>
)

const Total = ( {parts} ) => {
    //sum starts at 0, .reduce iterates through parts with the 'part' and adds the exercises to the sum
  return (
    <p>
      <b>Total of exercises: {parts.reduce((sum, part) => sum + part.exercises, 0)}</b>
    </p>
  )
}

const Course = ({ courses }) => (
  <>
    {courses.map(course => (
      <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </>
);

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}

export default App