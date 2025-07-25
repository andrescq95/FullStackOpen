const Header = (props) => {
    return (
        <h1>{props.courser}</h1>
    )
}

const Content = (props) => {
    console.log(props)
    return (
        <>
        <Part part = {props.parts[0]} exercise = {props.exercise[0]}/>
        <Part part = {props.parts[1]} exercise = {props.exercise[1]}/>
        <Part part = {props.parts[2]} exercise = {props.exercise[2]}/>
        </>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercise}
        </p>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <>
            <Header courser={course} />
            <Content parts = { [part1,part2,part3]} exercise={[exercises1,exercises2,exercises3]}/>
            <Total exercises1 = {exercises1} exercises2 = {exercises2} exercises3 = {exercises3}/>
        </>
    )
  }

  export default App