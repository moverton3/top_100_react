import React, { Component } from 'react';
import axios from 'axios';
import { Header, Segment, Container, Input, Button, Form, Icon, Grid,  } from 'semantic-ui-react';

class App extends Component {
  state = {
    songs: [],
    newSongTitle: '',
    newSongArtist: '',
  }

  componentDidMount(){
    axios.get('/api/songs')
    .then( res => {
      this.setState({songs: res.data})
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let { newSongArtist, newSongTitle } = this.state
    axios.post('api/songs', {artist: newSongArtist, title: newSongTitle})
    .then( res => {
      this.setState({songs: [...this.state.songs, res.data],
      songs: [...this.state.songs, res.data],
      newSongArtist: '',
      newSongTitle: ''
    })
  })
}

    handleDelete = (id) => {
      axios.delete(`api/songs/${id}`)
      .then( res => {
        if(res.data.status === 'ok') {
          this.setState({
            songs: this.state.songs.filter(song => song.id !== id)
          })
        }
      })
    }

  render() {
    return (
      <div>
          <Segment clearing>
            <Container text>
              <Header as='h1' floated='left'>Billboard Charts</Header>
              <Header as='h1' floated='right'>Top 100</Header>
            </Container>
          </Segment>
        <Container textAlign='center'>
          <form onSubmit={this.handleSubmit}>
            <Input placeholder
              value={this.state.newSongArtist}
              name='newSongArtist'
              onChange={this.handleChange}
              placeholder="Artist"
            />
            <Input placeholder
              value={this.state.newSongTitle}
              name='newSongTitle'
              onChange={this.handleChange}
              placeholder="Title"
            />
              <Button inverted color='blue submit'><Icon fitted name='add circle'/>Submit</Button>
        </form>
      </Container>
        <Grid centered columns={8}>
        <Grid.Column>
            <ol>
              {this.state.songs.map( song => {
              return(
              <li key={ song.id } >
                Artist: {song.artist} Title: {song.title}
                <button onClick={() => this.handleDelete(song.id)}>Delete</button>
              </li>
              )
            })}
          </ol>
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}

export default App;
