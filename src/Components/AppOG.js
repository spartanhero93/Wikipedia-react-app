import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { simpleAction } from '../actions/simpleAction'

class App extends Component {
  simpleAction = event => {
    this.props.simpleAction()
  }

  render () {
    return (
      <Wrapper>
        <h1>Hello Waifus</h1>
        <button onClick={this.simpleAction}>Test redux action</button>

        <pre>
          {JSON.stringify(this.props)}
        </pre>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  text-align:center;
`

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
