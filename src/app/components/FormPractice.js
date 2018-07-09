import React, { Component } from "react";
import logo from '../../logo.svg';


class FormPractice extends Component{
    constructor() {
        super();
        this.state = {
          textInput: "",
          print: false,
          mail: ""
        }
      }
    
      getInputTextValue = (e) => {
        this.setState({
          textInput: e.target.value,
          print: false
        })
      }
    
      postGreetings = (e) => {
        e.preventDefault();
        this.setState({
          print: true
        })
      }
    
      getInputMailValue = (e) => {
        this.setState({
          mail: e.target.value
        })
      }
      resetAll = (e) => {
        this.setState({
          textInput: "",
          print: false,
          mail: ""
        })
      }
    
      render() {
        const { textInput, print, mail } = this.state;
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome Friends!</h1>
            </header>
            <div className="App-intro">
              <form >
                <input type="text" value={textInput} onChange={this.getInputTextValue} name="enter-text" list="myGreetings" placeholder="...Hello!"/>
                <datalist id="myGreetings">
                  <option>Hi!</option>
                  <option>Bonjour!</option>
                  <option>Konnichiwa!</option>
                  <option>Ni Hao!</option>
                </datalist>
                <input type="email" name="mail" id="mail" placeholder="...@mail.com" onChange={this.getInputMailValue} value={mail} />
                <button onClick={this.postGreetings}>Say something!</button>
                <div>{(print)
                  ? <p>{textInput}</p>
                  : ""
                }
                </div>
                <div>
                  {(print && !textInput) ? "Say hi?" : ""}
                </div>
                <p>
                  {(print && textInput && mail) ? <span onClick={this.resetAll}>Again?</span> : ""}
                </p>
              </form>
            </div >
          </div >
        );
      }
}


export { FormPractice };