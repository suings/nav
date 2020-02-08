import React from "react";
import './Search.scss'
import 'zent/css/input.css'
import 'zent/css/icon.css'
import { Input } from "zent";

export default class Search extends React.Component {
    state = {
        inputValue: "",
        engine: "google",
        searchEngine: {
            google: {
                name: "Google",
                icon: "/google.png",
                url: "https://www.google.com/search?q="
            },
            baidu: {
                name: "百度",
                icon: "/baidu.png",
                url: "https://www.baidu.com/s?ie=UTF-8&wd="
            }
        }
    }
    onPressEnter = () => {
        const inputValue = document.getElementById("input").value;
        window.location.href = this.state.searchEngine[this.state.engine].url + inputValue;
    }
    changeEngine = () => {
        this.setState({ engine: this.state.engine === "google" ? "baidu" : "google" })
        document.querySelector("link[rel='icon'").href = (this.state.engine + "_logo.png")
    }

    render() {
        document.querySelector("link[rel='icon'").href = (this.state.engine + "_logo.png")
        return (
            <div className="search">
                <div className="imgContainer">
                    <img
                        className="icon"
                        src={this.state.searchEngine[this.state.engine].icon}
                        alt={this.state.searchEngine[this.state.engine].name}
                        onClick={this.changeEngine}
                    />
                </div>
                <Input icon="search" id="input" onPressEnter={this.onPressEnter} size="large" showClear />
            </div>
        )
    }
}