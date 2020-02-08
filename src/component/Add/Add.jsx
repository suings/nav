import React from 'react';
import './Add.scss'
export default class Add extends React.Component {
    constructor(props) {
        super(props)
    }
    handleClick = () => {
        const site = {
            name: document.getElementById("inputName").value,
            link: document.getElementById("inputLink").value,
            imgLink: document.getElementById("inputImgLink").value
        }

        var storage = window.localStorage;
        if (storage['sites'] === undefined) { storage['sites'] = "[]" }

        var sites = JSON.parse(storage['sites'])
        sites.push(site)

        storage['sites'] = JSON.stringify(sites)

        window.location.href = "/"
    }
    render() {
        return <div className="addPage">
            <div>
                <div>
                    <p>名称</p>
                    <input type="text" id="inputName" />
                </div>

                <hr />
                <div>
                    <p>网址</p>
                    <input type="text" id="inputLink" />
                </div>
                <hr />
                <div>
                    <p>图片</p>
                    <input type="text" id="inputImgLink" />
                </div>
            </div>
            <button onClick={this.handleClick}>添加</button>
        </div>
    }
}