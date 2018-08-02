import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

class App extends Component {
  state = {
    term: '',
    count: 3,
    titles: [],
    descriptions: [],
    links: []
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
        `https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=${this.state.term}&limit=${this.state.count} `
      )
      .then(res => {
        const data = res.data
        const titles = data[1]
        const descriptions = data[2]
        const links = data[3]
        this.setState({
          titles,
          descriptions,
          links
        })
      })
  }

  render () {
    console.log(this.state.links)
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
        <DataContainer>
          <Data>
            {this.state.titles.map(title => {
              return <Title>{title}</Title>
            })}
            {this.state.descriptions.map(description => (
              <Description>{description}</Description>
            ))}
          </Data>
        </DataContainer>
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
const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Data = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 1rem;

  & > div {
    margin: 0 .1rem;
    padding: .5rem;
  }
`
const Title = styled.div`
  background: rgba(39, 41, 50, 0.05);
  width: 20%;
  font-size: 1.5rem;
`
const Description = styled.div`
  background: rgba(39, 41, 50, 0.95);
  color: #FFFFF2;
  font-size: 1.2rem;
  font-weight: 100;
`

/* End of Styling */
export default App
