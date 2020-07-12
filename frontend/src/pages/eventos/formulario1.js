import React from 'react'
import ReactDOM from 'react-dom'
import MultiStep from 'react-multistep'
//import './css/custom.css'
//import './css/normilize.css'
//import './css/skeleton.css'
import StepOne from './stepOne'
import StepTwo from './stepTwo'
import StepThree from './stepThree'
import StepFour from './stepFour'

const steps = [
  { component: <StepOne /> },
  { component: <StepTwo /> },
  { component: <StepThree /> },
  { component: <StepFour /> }
]

const Formulario1 = () => (
  <div className='container'>
    <MultiStep steps={steps} />    
  </div>
)

//ReactDOM.render(<Formulario1 />, document.getElementById('app'))

export default Formulario1;