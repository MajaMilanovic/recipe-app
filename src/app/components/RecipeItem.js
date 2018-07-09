import React, { Component } from "react";
import { deleteData } from "../service/DELETEService";
import PropTypes from 'prop-types';

class RecipeItem extends Component {
    // constructor(props) {
    //     super(props);
    // }

    static defaultProps = {
        recipe: {
            title: "TBA",
            veg: true,
            date: "TBA",
            content: "TBA"
        }
    }
    static propTypes = {
        recipe: PropTypes.object.isRequired
    }

    deleteRecipe = (e) => {
        const { path, recipe, refreshFeed } = this.props;
        const id = recipe.id;
        const url = `${path}/${id}`;
        deleteData(url)
            .then(response => {
                refreshFeed(path)
            });
    }

    render() {
        const { recipe } = this.props;
        return (
            <div className="recipe-card">
                <h1>{recipe.title}</h1>
                <h5>For vegans: {(recipe.veg==="meat") ? "Not recommended" : "Okay, no meat here!"}</h5>
                <h6>posted on: {recipe.date}</h6>
                <p className="recipe-text">{recipe.content}</p>
                <span className="delete-recipe" onClick={this.deleteRecipe}>Delete</span>
            </div>

        )
    }
}
export { RecipeItem };