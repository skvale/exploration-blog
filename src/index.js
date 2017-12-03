import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import registerServiceWorker from './registerServiceWorker'
import 'papercss/dist/paper.min.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
