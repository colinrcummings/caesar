var App = React.createClass({
  getInitialState: function() {
    return {
      input: 'UBJpyrire!GRYYhfUBJlbhQRPBQRQguvf',
      result: null,
      shift: 13
    };
  },
  _handleInputChange: function(event) {
    this.setState({
      input: event.target.value
    });
  },
  _handleShiftChange: function(num) {
    this.setState({
      shift: num
    });
  },
  _handleDecode: function() {
    var {input, shift} = this.state;
    this.setState({
      result: {
        type: 'Decoding',
        output: this.getCaesar(input, shift)
      }
    });
  },
  _handleEncode: function() {
    var {input, shift} = this.state;
    this.setState({
      result: {
        type: 'Encoding',
        output: this.getCaesar(input, -shift + 26)
      }
    });
  },
  handleReset: function() {
    this.setState({
      input: '',
      result: null
    });
  },
  getCaesar: function(input, shift) {
    var result = '';
    for (var i = 0; i < input.length; i ++) {
      var char = input[i];
      if (char.match(/[a-z]/i)) {
        var code = input.charCodeAt(i);
        if ((code >= 65) && (code <= 90)) {
          char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else if ((code >= 97) && (code <= 122)) {
          char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
      }
      result += char;
    }
    return result;
  },
  render: function () {
    var {input, result, shift} = this.state;
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            <h1 className="inline">Caesar Cipher</h1>
            <a
              className="question-container inline"
              href="https://en.wikipedia.org/wiki/Caesar_cipher"
              target="_blank">
                <i
                  className="fa fa-question-circle"
                  title="About the Caesar Cipher"
                ></i>
            </a>
            <hr />
          </div>
        </div>
        {result ?
          <div className="row">
            <div className="col-md-12">
              <strong>Result of {result.type}:</strong>
              <p>{result.output}</p>
              <button
                type="button"
                className="btn btn-default"
                onClick={this.handleReset}
                >
                  Reset
                </button>
            </div>
          </div>
        :
          <div className="row">
            <div className="col-md-12">
              <Input
                shift={shift}
                value={input}
                onShiftChange={this._handleShiftChange}
                onValueChange={this._handleInputChange}
              />
              <Buttons
                inputLen={input.length}
                onDecodeClick={this._handleDecode}
                onEncodeClick={this._handleEncode}
              />
            </div>
          </div>
        }
      </div>
    );
  }
});

var Input = React.createClass({
  propTypes: {
    shift: React.PropTypes.number.isRequired,
    value: React.PropTypes.string,
    onShiftChange: React.PropTypes.func.isRequired,
    onValueChange: React.PropTypes.func.isRequired
  },
  render: function () {
    var {shift, value, onShiftChange, onValueChange} = this.props;
    return (
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter string for Caesar encoding/decoding..."
              value={value}
              onChange={onValueChange}
            />
            <div className="input-group-btn">
              <button
                type="button"
                className="btn btn-default dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Shift: {shift} <span className="caret"></span>
              </button>
              <ul className="dropdown-menu dropdown-menu-right">
                {
                  _.range(1,26).map((d) => {
                    return (
                      <li
                        key={'li-' + d}
                        className={d === shift ? 'active' : ''}
                        onClick={() => { onShiftChange(d); }}
                      >
                        <a href="javascript:void(0)">{d}</a>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
    );
  }
});

var Buttons = React.createClass({
  propTypes: {
    inputLen: React.PropTypes.number.isRequired,
    onDecodeClick: React.PropTypes.func.isRequired,
    onEncodeClick: React.PropTypes.func.isRequired
  },
  render: function () {
    var {inputLen, onDecodeClick, onEncodeClick} = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-default"
              disabled={inputLen ? false : true}
              onClick={onEncodeClick}
            >
              Encode
            </button>
            <button
              type="button"
              className="btn btn-default"
              disabled={inputLen ? false : true}
              onClick={onDecodeClick}
            >
              Decode
            </button>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.body
);
