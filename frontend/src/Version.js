import React, { Component } from "react"
import "./Version.css"
import api from "./services/api"
import socket from 'socket.io-client'

class Version extends Component {
  state = {
    backendVersion: "",
  }

  subscribeToEvents = () => {
    const io = socket('http://localhost:3200');
    io.on('newVersion', (data) => {
      console.log("newVersion", data);
    })
  }

  async getData() {
    const response = await api.get("version")
    this.setState({
      backendVersion: response.data.version,
    })
  }

  componentDidMount() {
    this.subscribeToEvents()
    this.getData()
  }

  render() {
    const { backendVersion } = this.state
    return (
      <div className="container">
        <h1>poc live-update</h1>
        <span>front version: 0.0.0</span>
        <br />
        <span>back version: {backendVersion}</span>
        <br />
        <button className="button-version" onClick={() => this.getData()}>
          get backend version
        </button>
      </div>
    )
  }
}

export default Version
