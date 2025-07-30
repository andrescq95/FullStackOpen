const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
        <>
        <Part part = {props.part[0].name} exercises = {props.part[0].exercises}/>
        <Part part = {props.part[1].name} exercises = {props.part[1].exercises}/>
        <Part part = {props.part[2].name} exercises = {props.part[2].exercises}/>
        </>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]} </p>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
      }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
      }
    const part3 = {
        name: 'State of a component',
        exercises: 14
      }
    return (
        <>
            <Header course = {course} />
            <Content part = {[part1, part2, part3]} />
            <Total exercises = {[part1.exercises, part2.exercises, part3.exercises]} />
        </>
    )
  }

  export default App