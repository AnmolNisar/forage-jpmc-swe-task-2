import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

interface IState {
  data: ServerRespond[],
  intervalId: NodeJS.Timeout | null, // Track the interval ID to clear it later
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      intervalId: null, // Initialize intervalId to null
    };
  }

  renderGraph() {
    return (<Graph data={this.state.data}/>);
  }

  getDataFromServer() {
    const intervalId = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({ data: serverResponds });
      });
    }, 100); // Fetch data every 100ms

    this.setState({ intervalId }); // Save the interval ID to state so we can clear it later
  }

  componentWillUnmount() {
    // Clear the interval when the component unmounts to avoid memory leaks
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button
            className="btn btn-primary Stream-button"
            onClick={() => this.getDataFromServer()}
          >
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
