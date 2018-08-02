import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

class App extends Component {
  state = {
    term: '',
    count: 3,
    data: []
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
        `https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=${this.state.term}&limit=${this.state.count}`
      )
      .then(res => {
        const results = res.data
        results.shift()

        const data = []

        for (let i = 0; i < results[0].length; i++) {
          data[i] = new Array(results[0].length).fill()

          for (let j = 0; j < results.length; j++) {
            data[i][j] = results[j][i]
          }
        }
        this.setState({ data })
      })
  }

  render () {
    console.log(this.state.data[0])
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
        {this.state.data.map((items, index) => {
          return (
            <Data key={index}>
              <Title>{items[0]}</Title>
              <Description>{items[1]}</Description>
            </Data>
          )
        })}
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
    background: rgba(39, 41, 50, 0.85);
  }
`
const Data = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 1rem;
  flex-grow: 1;

  & > div {
    margin: 0 .1rem;
    padding: .5rem;
  }
`
const Title = styled.div`
  background: rgba(39, 41, 50, 0.05);
  min-width: 20%;
  font-size: 1.5rem;
`
const Description = styled.div`
  background: rgba(39, 41, 50, 0.95);
  color: #FFFFF2;
  min-width: 80%;
  font-size: 1.2rem;
  font-weight: 100;
`

/* End of Styling */
export default App
