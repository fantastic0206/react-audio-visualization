import React, { Component,useState,useEffect,} from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import AudioAnalyser from './AudioAnalyser';
const timer=null;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempsecond:0,
      tempminute:0,
      second:null,
      minute:null,
      audio: null,
      
    };
    
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }
  
  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
    // console.log(this.state.audio);
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();  
      clearInterval(this.timer)

    } else {
      this.getMicrophone();
      this.setState({
        second:'00',
        tempsecond:0,
        minute:'00',
        tempminute:0
      })
      this.timeCounter();
      
    }
  }
  timeCounter() {
   this.timer=setInterval(()=>{
     if(this.state.audio === null) return;
     
     this.setState({tempsecond:this.state.tempsecond+1})
     if(this.state.tempsecond < 10)
      this.setState({second:'0' + this.state.tempsecond});
     else if (this.state.tempsecond > 59) {
       this.setState({tempminute:this.state.tempminute + 1,tempsecond:0,second:'00'})
       if(this.state.tempminute < 10)
        this.setState({minute:'0' + this.state.tempminute});
       else 
        this.setState({minute:this.state.tempminute});
      
      }
     else this.setState({second:this.state.tempsecond});
    }, 1000);
   
  }

  render() {
    return (
      <div className="App marginApp">
        {this.state.audio ? <AudioAnalyser audio={this.state.audio} width={1200} height={300} /> :<canvas width="1200" height="300"/>}
        <div className="controls">
          <div className="butdiv">
            {/* <button className="micbutton" onClick={this.toggleMicrophone}>
              {this.state.audio ? 'Stop microphone' : 'Get microphone input'}

            </button> */}
            <IconButton aria-label="delete" className="butmargin" onClick={this.toggleMicrophone}>
              {this.state.audio ? <PauseIcon className="icon1"/> : <PlayArrowIcon className="icon1"/>}
            </IconButton>
            <div>
              {this.state.audio ? <div className="stopicontime"><StopIcon/><div>{this.state.minute}:{this.state.second}</div></div>:<div className="counter"></div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
