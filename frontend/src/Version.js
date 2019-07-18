import React, { Component } from "react";
import "./Version.css";
import api from "./services/api";
import socketIOClient from "socket.io-client";
import { VERSION } from "./config/config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 8000,
  draggable: false,
});


class Version extends Component {
  state = {
    backendVersion: "",
  }

	Msg = () => (
		<div>
			 your frontend version is outdated, please refresh your page!'
			<button onClick={() => window.location.reload()} className={`button-refresh button-version`}>Refresh</button>
		</div>
	)


	notify = () => toast(this.Msg(), {
		position: "bottom-left",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	});

  subscribeToEvents() {
    const socket = socketIOClient("localhost:3200")
    socket.on("news", data => {
      console.log("data", data)
      data.version !== VERSION && this.notify();
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
        <span>version from build(frontend): {VERSION}</span>
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
