
const Header = ({ title }) => <h1>{title}</h1>

const App = () => {
  const header = 'Part 2'

  return (
    <>
      <Header title = {header} />
    </>
  )
}

export default App