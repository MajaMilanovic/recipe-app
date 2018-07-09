import React, { Component } from "react";

class Modal extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            title: "",
            veg: "",
            content: "",
            path: "http://localhost:3004/recipes"
        }
    }

    openModal = (e) => {
        this.setState({
            modal: true
        })
    }
    closeModal = (e) => {
        this.setState({
            modal: false
        })
    }

    getInputTitle = (e) => {
        const title = e.target.value;
        this.setState({
            title
        })
    }
    getRadioValue = (e) => {
        const veg = e.target.id;
        this.setState({
            veg
        })
    }

    getTextareaValue = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    postRecipe = (e) => {
        e.preventDefault();

        const { title, veg, content, path } = this.state;
        const date = new Date().toLocaleDateString();
        const id = Math.floor(Math.random() * 300);

        const recipe = {
            id,
            title,
            veg,
            date,
            content
        }

        postData(recipe, path)
            .then(response => {
                this.setState({
                    modal: false
                })
                this.props.refreshFeed(path);
            })
    }

    render() {
        const { modal, title, veg } = this.state;
        return (
            <div className="open-modal">
                <p onClick={this.openModal}>Create Recipe</p>
                <div className={(!modal) ? "modal-holder" : "modal-holder-open"}>
                    <div className="modal-content">
                        <span className="close" onClick={this.closeModal}>X</span>
                        <div className="modal-body">
                            <input type="text" name="recipe-title" id="input-title"
                                value={title}
                                onChange={this.getInputTitle}
                                placeholder="Recipe title" />
                            <label htmlFor="recipe-title">This is how your recipe is called. </label>
                            <div className="choose-type">
                                <input type="radio" name="vegan-or-meat"
                                    onChange={this.getRadioValue}
                                    value={veg} id="vegan" className="input-radio" /> <span className="radio-button">Vegan</span>
                                <input type="radio" name="vegan-or-meat"
                                    onChange={this.getRadioValue}
                                    value={veg} id="meat" className="input-radio" /> <span className="radio-button">Meat</span>
                            </div>
                            <textarea name="recipe-content"
                                onChange={this.getTextareaValue}
                                id="recipe-content" cols="70" rows="10" placeholder="Recipe text goes here..."></textarea>
                            <button onClick={this.postRecipe}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export { Modal };