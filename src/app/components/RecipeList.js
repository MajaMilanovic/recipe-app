import React, { Component, Fragment } from "react";
import { getData } from "../service/GETService";
import { Recipe } from "../entities/Recipe";
import { RecipeItem } from "./RecipeItem";
import "./recipe.css";
import { postData } from "../service/POSTService";
import { formatString } from "../utils/helper";


class RecipeList extends Component {
    constructor() {
        super();
        this.state = {
            recipes: [],
            modal: false,
            title: "",
            veg: "",
            content: "",
            path: "http://localhost:3004/recipes",
            search: "",
            error: false
        }
    }

    refreshFeed = (url) => {
        return getData(url)
            .then(data => {
                this.setState({
                    recipes: data.reverse().map(item => {
                        return new Recipe(item)
                    })
                })
            })
            .catch(error => {
                this.setState((prevState, currentProps) => {
                    return { ...prevState, error: true }
                })
            })
    }

    componentDidMount() {
        const { path } = this.state;
        this.refreshFeed(path);
    }

    openModal = (e) => {
        this.setState({
            modal: true,
            title: "",
            veg: "",
            content: "",
            vegan: false,
            meat: false
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
        if (veg === "vegan") {
            this.setState({ vegan: true, meat: false })
        } else if (veg === "meat") {
            this.setState({ meat: true, vegan: false })
        }
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
                    modal: false,
                })
                this.refreshFeed(path);
            })
    }

    getInputSearchValue = (e) => {
        const search = e.target.value;
        this.setState({
            search
        })
    }

    render() {
        const { recipes, modal, title, veg, path, search, error, content, vegan, meat } = this.state;
        return (
            <Fragment>
                {(error)
                    ? <div className="container-error">
                        <p>Oh, no! Sorry, we are not available at the moment.Please try later in couple of minutes.</p>
                    </div>
                    : <div className="container">
                        <h1 className="page-title" id="page-title">Recipes: </h1>
                        <div className="search-bar-wrapper">
                            <input type="search" name="search"
                                value={search} onChange={this.getInputSearchValue}
                                id="input-search" placeholder="search recipes..." />
                        </div>
                        {
                            (recipes.length === 0)
                                ? "Loading recipes..."
                                : recipes.filter(recipe => {
                                    return formatString(recipe.title).indexOf(formatString(search)) !== (-1)
                                }).map(recipe => {
                                    return <RecipeItem key={recipe.id} recipe={recipe} path={path} refreshFeed={this.refreshFeed} />
                                })}
                        <div className="goUpPage"><a href="#page-title" className="upLink">Up</a></div>
                        <div className="open-modal">
                            <p onClick={this.openModal}>Add</p>
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
                                                value={veg} id="vegan"
                                                className="input-radio"
                                                checked={vegan} />
                                            <span className="radio-button">Vegan</span>
                                            <input type="radio" name="vegan-or-meat"
                                                onChange={this.getRadioValue}
                                                value={veg} id="meat"
                                                className="input-radio"
                                                checked={meat} />
                                            <span className="radio-button">Meat</span>
                                        </div>
                                        <textarea name="recipe-content"
                                            onChange={this.getTextareaValue}
                                            value={content}
                                            id="recipe-content" cols="70" rows="10" placeholder="Recipe text goes here..."></textarea>
                                        {(!title || !veg || !content)
                                            ? <div> <button disabled>Bon Appétit </button>
                                                <h6 className="modal-error-message">Please provide all fields.</h6>
                                            </div>
                                            : <button onClick={this.postRecipe}>Bon Appétit </button>
                                        }

                                    </div>
                                    <img className="image-chef" src="https://www.stickerforwall.com/16913-thickbox/vinyl-kitchen-bon-appetit.jpg" alt="chef" />
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </Fragment>
        )
    }
}


export {
    RecipeList
};