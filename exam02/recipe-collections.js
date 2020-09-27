const recipes = {
    "0" : {
        title : "Italian Pasta",
        author : "Jakes Collin",
        ingredients : [
            "3/4 pound fusilli",
            "1 1/2 tablespoons extra-virgin olive oil",
            "1 large leek, white and light green parts only, thinly sliced",
            "1 cup heavy cream",
            "4 cups packed baby spinach (4 ounces), coarsely chopped",
            "1/2 cup lightly packed basil leaves, finely chopped",
            "Kosher salt and freshly ground pepper"
        ],
        instructions : [
            "In a large pot of boiling salted water, cook the fusilli until al dente, then drain.",
            "Meanwhile, in a large, deep skillet, heat the olive oil.",
            "Add the leek and cook over moderate heat until softened, about 10 minutes. ",
            "Add the cream and simmer over moderate heat until slightly thickened, about 5 minutes.",
            "Add the spinach and cook until wilted, about 2 minutes.", 
            "Add the cooked fusilli to the skillet and toss over moderately low heat until coated with the leek sauce, about 1 minute.",
            " Remove from the heat, add the chopped basil and toss. Season with salt and pepper. Spoon the fusilli into bowls and serve."
        ],    
    },
    "00" : {
        title : "Chicken Potpie",
        author : "Siddhi",
        ingredients : [
            "1 package (16 ounces) frozen vegetables for stew, thawed and coarsely chopped",
            "1 jar (12 ounces) chicken gravy, 2 cups shredded cheddar cheese, 2 cups cubed cooked chicken",
            "2 cups biscuit/baking mix, 1 teaspoon minced fresh or 1/4 teaspoon dried thyme",
            "2 large eggs, room temperature, 1/4 cup 2% milk"
        ],
        instructions : [
            "Combine vegetables and gravy in a large saucepan. Bring to a boil. Reduce heat; stir in cheese and chicken.",
            "Cook and stir until cheese is melted. Pour into a greased 2-qt. round or 11x7-in. baking dish.",
            "Combine biscuit mix and thyme in a small bowl. In another bowl, whisk eggs and milk; stir into dry ingredients just until moistened.",
            "Drop by tablespoonfuls over chicken mixture; spread gently.Bake, uncovered, at 375° until golden brown, 23-27 minutes.  ",
            "Let stand for 5 minutes before serving."
        ],
    },
};

const counter = () =>  {
    let count = 0;
    return () => {
        count += 1;
        return count;
    };
};
const nextId = counter();

module.exports = {
    recipes,
    nextId,
};