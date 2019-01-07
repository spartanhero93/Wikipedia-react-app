import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

class App extends Component {
  state = {
    term: '',
    count: 3,
    data: [],
  }

  reorganizeArrData = data => {
    if (!data.length) return
    data.shift()
    return data[0].map((_, index) => data.map(column => column[index]))
  }

  handleRangeCount = event => {
    this.setState({
      count: event.target.value,
    })
  }

  handleInputChange = event => {
    this.setState({
      term: event.target.value,
    })
  }
  newFetchData = async () => {
    try {
      const URL = `https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=`
      const { data } = await axios.get(
        `${URL}${this.state.term}&limit=${this.state.count}`
      )
      const result = await this.reorganizeArrData(data)
      this.setState({ data: result })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { handleInputChange, handleRangeCount, newFetchData } = this
    const { count, term, data } = this.state
    return (
      <Wrapper>
        <h1>Wikipedia Viewer</h1>
        <h5>Search Wikipedia:</h5>
        <input
          onChange={handleInputChange}
          type='text'
          value={term}
          placeholder='Type here...'
        />
        <Button onClick={newFetchData}>Submit Search</Button>
        <input
          onChange={handleRangeCount}
          value={count}
          type='range'
          min='3'
          max='50'
          required
        />
        count: {count}
        <UserTip dataAvailable={data.length}>
          Click on titles for a link to article
        </UserTip>
        {data.map((items, index) => {
          return (
            <Data key={index}>
              <Title target='__blank' href={items[2]}>
                {items[0]}
              </Title>
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
  text-align: center;
  margin: 2rem 8rem;
  font-size: 1.5rem;

  @media (max-width: 600px) {
    margin: 1rem 1rem;
    font-size: 1.1rem;
  }
`
const Button = styled.button`
  background-color: rgba(39, 41, 50, 0.95);
  color: #fffff2;
  border: none;
  border-radius: 0.3rem;
  padding: 1rem;
  cursor: pointer;
  width: 60%;
  align-self: center;
  margin: 0.6rem 0;

  &:hover {
    background: rgba(39, 41, 50, 0.85);
  }
`
const UserTip = styled.div`
  text-align: center;
  display: ${props => (props.dataAvailable > 0 ? `visible` : 'none')};
  margin: 0.5rem 0;
`

const Data = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 1rem;
  flex-grow: 1;
  overflow-wrap: break-word;

  & > div {
    margin: 0 0.1rem;
    padding: 0.5rem;
  }
`
const Title = styled.a`
  display: block;
  text-decoration: none;
  color: rgba(39, 41, 50, 0.95);
  background: rgba(39, 41, 50, 0.05);
  min-width: 20%;
  line-height: 4rem;

  :hover {
    text-decoration: underline;
  }
`
const Description = styled.div`
  background: rgba(39, 41, 50, 0.95);
  color: #fffff2;
  min-width: 80%;
  font-weight: 100;
`

/* End of Styling */
export default App
