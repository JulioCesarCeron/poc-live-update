import React, { Component } from "react"
import "./Version.css"
import api from "./services/api"
import socketIOClient from "socket.io-client";
import {VERSION} from './config/config'

class Version extends Component {
  state = {
    backendVersion: "",
  }

  subscribeToEvents() {
    const socket = socketIOClient("localhost:3200");
    socket.on("news", data => {
      console.log('data', data);
      data.version !== VERSION && alert('please, refresh this page');
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
        <span>version from build(frontend): 0.0.0</span>
        <br />
        <span>version from DB: {backendVersion}</span>
        <br />
        <button className="button-version" onClick={() => this.getData()}>
          get backend version
        </button>
      </div>
    )
  }
}

export default Version
