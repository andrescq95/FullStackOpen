import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Display = (props) => {
  return (
    <>
      <p>
        Good: {props.statistics[0]} <br />
        Neutral: {props.statistics[1]} <br />
        Bad: {props.statistics[2]}
      </p>
    </>
  )
}

const App = () => {
  const formHeaders = ['give feedback', 'statistics']
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <>
      <Header title = {formHeaders[0]} />
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Header title = {formHeaders[1]} />
      <Display statistics = {[good, neutral, bad]}/>
    </>
  )
}

export default App