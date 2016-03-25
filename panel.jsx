/**
 * Created by root on 3/22/16.
 */
var har = require('./har.js');
var manager = require('./manager.js');
var React = require('react');
var ReactDOM = require('react-dom');

chrome.devtools.network.onRequestFinished.addListener(function (req) {
    var domainRegex = new RegExp(manager.getDomainFilter());
    if (domainRegex.test(req.request.url)) {
        har.appendToHar(req);
        console.log(har.getHar());
    }
});

var MainPanel = React.createClass({
    render: function () {
        return <div className="ui container"><ControlComponent /></div>
    }
});

var ControlComponent = React.createClass({
    render: function () {
        return <div className="control"><FilterField /><FileTarget /><ToggleButton />
        </div>
    }
});

var ToggleButton = React.createClass({
    getInitialState: function () {
        return {running: false}
    },
    handleChange: function (event) {
        this.setState({running: !this.state.running});
        har.setToggleActive(!this.state.running);
    },
    render: function () {
        return <button className={ (this.state.running ? "negative" : "positive") + " ui button"} type="button"
                       onClick={this.handleChange}>{this.state.running ? "Stop": "Run"}</button>
    }
});

var FilterField = React.createClass({
    getInitialState: function () {
        return {domain: ''}
    },
    handleChange: function (event) {
        this.setState({domain: event.target.value});
        har.setDomainFilter(event.target.value);
    },
    render: function () {
        return <div classID="filter_field" className="field">
            <div className="ui top attached label">URL Filter</div>
            <div className="ui labeled input">
                <div className="ui label">http://</div>
                <input type="text" value={this.state.domain} onChange={this.handleChange}/>
            </div>
        </div>
    }
});

var FileTarget = React.createClass({
    getInitialState: function () {
        return {filePath: ''}
    },
    handleChange: function (event) {
        this.setState({'filePath': event.target.value});
        har.setSpecTarget(event.target.value);
    },
    render: function () {
        return <div className="field"><div className="ui input"><input type="file" value={this.state.filePath} onChange={this.handleChange}/>
        </div></div>
    }
});

ReactDOM.render(<MainPanel />, document.getElementById('base'));
