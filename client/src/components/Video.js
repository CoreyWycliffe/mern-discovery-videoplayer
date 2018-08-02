import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { Icon } from 'semantic-ui-react'
import Duration from './Duration'
import Transitions from './Transition'

export default class Vid extends Component {
  constructor(props){
    super(props);
    this.state = {
      playing: true,
      played: 0,
      volume: 0.8,
      duration: 0
    }
  }

  onPlay = () => {
    // console.log('onPlay')
    this.setState({ playing: true })
  }
  onPause = () => {
    // console.log('onPause')
    this.setState({ playing: false })
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  // setVolume = e => {
  //   this.setState({ volume: parseFloat(e.target.value) })
  // }
  volumeDown = () => {
    if (this.state.volume > 0.3){
      let newVol = this.state.volume - 0.2;
      this.setState({ volume: newVol })
    }
  }
  volumeUp = () => {
    if (this.state.volume < 1){
      let newVol = this.state.volume + 0.2;
      this.setState({ volume: newVol })
    }
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onDuration = (duration) => {
    // console.log('onDuration', duration)
    this.setState({ duration })
  }
  onProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  ref = player => {
    this.player = player
  }

  render () {
    const { playing, volume, played, duration } = this.state
    const SEPARATOR = ' · '
    // console.log(this.state);
    return (
      <div className='player-wrapper'>
        <ReactPlayer
          ref={this.ref}
          className='react-player'
          playing={playing}
          volume={volume}
          url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
          width='100%'
          height='100vh'
          onPlay={this.onPlay}
          onPause={this.onPause}
          onSeek={e => console.log('onSeek', e)}
          onDuration={this.onDuration}
          onProgress={this.onProgress}
        />
        {/*<h1 onClick={this.playPause}>{this.state.playing ? 'Pause' : 'Play'}</h1>*/}
        <span className="volume-controllers">
          <Transitions cname="volume-down" name="volume down" onClick={this.volumeDown}/>
          <Transitions cname="volume-up" name="volume up" onClick={this.volumeUp}/>
        </span>
        <span>
        <Duration className="time-passed" seconds={duration * played} />
        <input
          className="range-slider"
          type='range' min={0} max={1} step='any'
          value={played}
          onMouseDown={this.onSeekMouseDown}
          onChange={this.onSeekChange}
          onMouseUp={this.onSeekMouseUp}
        />
        <Duration className="time-remaining" seconds={duration * (1 - played)} />
        </span>
        <tr>
          <th>elapsed</th>
          <td><Duration seconds={duration * played} /></td>
        </tr>
        <tr>
          <th>remaining</th>
          <td><Duration seconds={duration * (1 - played)} /></td>
        </tr>
      </div>
    )
  }
}
