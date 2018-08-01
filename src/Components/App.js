import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

class App extends Component {
  state = {
    term: '',
    count: 3,
    titles: [],
    descriptions: []
  }

  handleRangeCount = event => {
    this.setState({
      count: event.target.value
    })
  }

  handleInputChange = event => {
    this.setState({
      term: event.target.value
    })
  }

  fetchData = () => {
    axios
      .get(
        `https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=${this.state.term}&limit=50 `
      )
      .then(res => {
        console.log(res.data)
      })
  }

  render () {
    return (
      <Wrapper>
        <h1>Wikipedia Viewer</h1>
        <h5>Search Wikipedia:</h5>
        <input
          onChange={this.handleInputChange}
          type='text'
          value={this.state.term}
          placeholder='Type here...'
        />
        <Button onClick={this.fetchData}>Submit Search</Button>
        <Button>or generate a random article</Button>
        <input
          onChange={this.handleRangeCount}
          value={this.state.count}
          type='range'
          min='3'
          max='50'
        />
        count: {this.state.count}
        <div>
          <Data>
            <Title />
            <Description />
          </Data>
        </div>
      </Wrapper>
    )
  }
}

/* Styling */

// <=== Variables ===>//
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
  text-align:center;
  line-height: 3.4rem;
  margin: 2rem 8rem;

`
const Button = styled.button`
  background-color: rgba(39, 41, 50, 0.95);
  color: #FFFFF2;
  border: none;
  border-radius: .3rem;
  padding: 1rem;
  cursor: pointer;
  width: 60%;
  align-self:center;
  margin: 0.6rem 0;

  &:hover {
    background: rgba(39, 41, 50, 0.85)
  }
`
const Data = styled.div`

`
const Title = styled.div`
`
const Description = styled.div`
`

/* End of Styling */
export default App
