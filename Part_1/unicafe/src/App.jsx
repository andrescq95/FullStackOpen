import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = (props) => {
  if (props.statistics[3] === 0) {
    return (
      <div>
        No feedback given.
      </div>
    )
  }
  return (
    <>
      <p>
        Good: {props.statistics[0]} <br />
        Neutral: {props.statistics[1]} <br />
        Bad: {props.statistics[2]} <br />
        All: {props.statistics[3]} <br />
        Average: {props.statistics[4]} <br />
        Positive: {props.statistics[5] } % <br />
      </p>
    </>
  )
}

const App = () => {
  const formHeaders = ['give feedback', 'statistics']
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    //Update the total of Good clicks
    const updatedGood = good + 1
    setGood(updatedGood)
    //Update the overall total of clicks
    const updatedTotal = updatedGood + neutral + bad
    setTotal(updatedTotal);
    //Calculate the average score (Score / Total)
    const totalScore = updatedGood * 1 + neutral * 0 + bad * -1;
    setAverage((totalScore) / (updatedTotal > 0 ? updatedTotal : 1));
    //Calculate the percentage of positive feedback
    setPositive(updatedGood / updatedTotal * 100);
  }

  const handleNeutralClick = () => {
    //Update the total of Neutral clicks
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    //Update the overall total of clicks
    const updatedTotal = updatedNeutral + good + bad
    setTotal(updatedTotal)
    //Calculate the average score (Score / Total)
    const totalScore = updatedNeutral * 0 + good * 1 + bad * -1;
    setAverage((totalScore) / (updatedTotal > 0 ? updatedTotal : 1));
    //Calculate the percentage of positive feedback
    setPositive(good / updatedTotal * 100);
  }

  const handleBadClick = () => {
    //Update the total of Bad clicks
    const updatedBad = bad + 1;
    setBad(updatedBad);
    //Update the overall total of clicks
    const updatedTotal = updatedBad + good + neutral
    setTotal(updatedTotal);
    //Calculate the average score (Score / Total)
    const totalScore = updatedBad * -1 + neutral * 0 + good * 1;
    setAverage((totalScore) / (updatedTotal > 0 ? updatedTotal : 1));
    //Calculate the percentage of positive feedback
    setPositive(good / updatedTotal * 100);
  }

  return (
    <>
      <Header title = {formHeaders[0]} />
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Header title = {formHeaders[1]} />
      <Statistics statistics = {[good, neutral, bad, total, average, positive]}/>
    </>
  )
}

export default App