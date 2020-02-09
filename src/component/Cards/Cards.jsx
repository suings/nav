import React from 'react'
import { Sortable, Button } from 'zent';
import './Cards.scss'
import 'zent/css/dialog.css'
import 'zent/css/button.css'

const imgError = (e) => {
    e.target.src = "/errorImg.png"
    e.target.onerror = null;
}

class Card extends React.Component {
    render() {
        return <div
            className={this.props.editMode ? "card" : "card card-disable"}
            index={this.props.index}
            href={this.props.link}

            // onClick={() => window.open(this.props.link)}
            onTouchStart={() => { if (!this.props.editMode) { window.TimeOutEvent = setTimeout(() => { this.props.changeEditMode() }, 200) } }}
            onMouseDown={() => { if (!this.props.editMode) { window.TimeOutEvent = setTimeout(() => { this.props.changeEditMode() }, 200) } }}
            onMouseUp={() => { clearTimeout(window.TimeOutEvent) }}
            onTouchEnd={() => { clearTimeout(window.TimeOutEvent) }}
            onTouchCancel={() => { clearTimeout(window.TimeOutEvent) }}
            onClick={() => {
                if (this.props.editMode) {
                    console.log("TODO: 进入单个编辑模式")
                } else {
                    window.location.href = this.props.link
                }
            }}
        >
            <img alt="" src={this.props.imgLink} onError={imgError} />
            <p>
                {this.props.name}
            </p>
            <i className={this.props.editMode ? "" : "hidden"} onClick={() => { this.props.removeIndex(this.props.index) }} />
        </div>

    }
}

class Cards extends React.Component {
    state = {
        editMode: false,
        sites: [],
        newSites: [],
        oldSites: []
    }

    constructor(props) {
        super(props);
        console.log("Cards state: \n", this.state)

        var storage = window.localStorage;
        if (storage['sites'] === undefined) { storage['sites'] = "[]" }
        this.state.sites = JSON.parse(storage['sites']);
        // window.changeEditMode = this.changeEditMode
    }

    handleChange = (sites) => {
        console.log("newSites: ", sites)

        this.setState({ tmpSites: sites })
        // this.setState({ sites })
    }
    handleRemove = (removeIndex) => {
        const { sites } = this.state;
        const newSites = sites.filter((site, index) => index !== removeIndex)
        this.setState({ sites: newSites })
        window.localStorage['sites'] = JSON.stringify(newSites);
    }
    changeEditMode = (mode = undefined) => {
        this.setState({
            editMode: mode === undefined ? !this.state.editMode : mode
        })


    }

    handleCancel = () => {
        this.changeEditMode(false)
    }
    handleSubmit = () => {
        this.changeEditMode(false)
    }
    render() {
        if (this.state.editMode) {
            return <Sortable
                className="cards"
                items={this.state.sites}
                filterClass="card-disable"
                dragClass="card-isdragging"
                onChange={this.handleChange}
                onClick={() => { console.log("Sortable Onclick") }}
            >
                {this.state.sites.map((site, index) => (
                    <Card key={index} index={index}
                        {...site}
                        editMode={this.state.editMode}
                        removeIndex={this.handleRemove}
                        changeEditMode={this.changeEditMode}
                    />
                ))}

                <a className="card" href="/#/add" style={{ visibility: this.state.editMode ? "hidden" : "initial" }}
                >
                    <img alt="添加" src="/加号.png" />
                    <p>添加</p>
                </a>

                <div className="actionbar">
                    <Button size="small" onClick={this.handleCancel}>取消</Button>
                    编辑
                    <Button size="small" onClick={this.handleSubmit}>确认</Button>
                </div>
            </Sortable>
        } else {
            return <div className="cards">
                {this.state.sites.map((site, index) => (
                    <Card key={index} index={index}
                        {...site}
                        editMode={this.state.editMode}
                        removeIndex={this.handleRemove}
                        changeEditMode={this.changeEditMode}
                    />
                ))}

                <a className="card" href="/#/add" style={{ visibility: this.state.editMode ? "hidden" : "initial" }}
                >
                    <img alt="添加" src="/加号.png" />
                    <p>添加</p>
                </a>

            </div>
        }

    }
}

export default Cards;