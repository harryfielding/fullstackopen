import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  console.log("app rerendered")
  console.log("good: ", good, ", neutral: ", neutral, ", bad: ", bad)

  //create an array containing objects for each state and its state change function to pass into the Feedback and Statistics components (I have now realised this makes the code a lot less readable but I'm too far in now)
  const states = [{state: good, stateChange: setGood}, 
                  {state: neutral, stateChange: setNeutral}, 
                  {state: bad, stateChange: setBad}]

  return (
    <div>
      <Feedback states={states} />
      <Statistics states={states} />
    </div>
  )
}

const Feedback = ({ states }) => {
  //function that returns function that will be run on each button click
  const handleClick = (state, stateChange) => {
    const eventHandler = () => stateChange(state+1)
    return eventHandler
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button label="good" onClick={handleClick(states[0].state, states[0].stateChange)} />
      <Button label="neutral" onClick={handleClick(states[1].state, states[1].stateChange)} />
      <Button label="bad" onClick={handleClick(states[2].state, states[2].stateChange)} />
    </div>
  )
}

const Button = ({ label, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{label}</button>
    </>
  )
}

const Statistics = ({ states }) => {
  const all = states[0].state + states[1].state + states[2].state

  const getAverage = () => (states[0].state-states[2].state)/all

  const getPositive = () => [states[0].state/all]*100

  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine label="good" value={states[0].state} />
      <StatisticLine label="neutral" value={states[1].state} />
      <StatisticLine label="bad" value={states[2].state} />
      <StatisticLine label="all" value={all} />
      <StatisticLine label="average" value={getAverage()} />
      <StatisticLine label="positive" value={getPositive()} percent={true} />
    </div>
  )
}

const StatisticLine = ({ label, value, percent }) => {
  return (
    <>
      <p>{label}: {value}{percent ? '%' : null}</p>
    </>
  )
}

export default App