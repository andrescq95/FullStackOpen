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
        <h1>Web development curriculum</h1>
        {courses.map(course => (
            <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
            </div>
        ))}
    </>
);

export default Course