import React from 'react'
import ReactDOM from 'react-dom'
import { FormProvider } from 'react-advanced-form'
import rules from './validation-rules'
import messages from './validation-messages'
import SyncValidation from './SyncValidation'

const App = () => (
  /* Validation rules and messages are applied application-wide */
  <FormProvider rules={rules} messages={messages}>
    <SyncValidation />
  </FormProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))
