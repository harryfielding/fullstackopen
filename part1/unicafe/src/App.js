import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  console.log("app rerendered")
  console.log("good: ", good)
  console.log("neutral: ", neutral)
  console.log("bad: ", bad)

  return (
    <div>
      <Feedback good={good} setGood={setGood} 
                neutral={neutral} setNeutral={setNeutral}
                bad={bad} setBad={setBad} />
    </div>
  )
}

const Feedback = (props) => {
  const clickGood = () => props.setGood(props.good+1)
  const clickNeutral = () => props.setNeutral(props.neutral+1)
  const clickBad = () => props.setBad(props.bad+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button label="good" onClick={clickGood} />
      <Button label="neutral" onClick={clickNeutral} />
      <Button label="bad" onClick={clickBad} />
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
export default App