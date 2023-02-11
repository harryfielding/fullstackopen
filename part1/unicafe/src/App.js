import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  console.log("app rerendered")
  console.log("good: ", good, ", neutral: ", neutral, ", bad: ", bad)

  //create an array containing objects for each state and its state change function to pass into the Feedback component
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
      <p>good: {states[0].state}</p>
      <p>neutral: {states[1].state}</p>
      <p>bad: {states[2].state}</p>
      <p>all: {all}</p>
      <p>average: {getAverage()}</p>
      <p>positive: {getPositive()}%</p>
    </div>
  )
}

export default App