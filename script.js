let allMovies = [];
var size = 0;

//Movie object contructor
function Movie(title, rating, havewatched) {
    this.title = title;
    this.rating = rating;
    this.havewatched = havewatched;
}

//add a movie OBJECT to the allMovies array
function addMovie (movie) {
    console.log("A new movie is added");
    allMovies.push(movie);
    size += 1;
}

//iterate through all elements of allMovies array
//print out to console in a correct format
//print out the total number of movies in allMovies array
function printMovies () {
    var printing = "Printing all movies:....\n";
    count = 0;
    for (i = 0; i < allMovies.length; i++) {
        printing += allMovies[i].title; 
        printing += ", rating of " + allMovies[i].rating;
        printing += ", havewatched: " + allMovies[i].havewatched;
        printing += "\n";
        count += 1;
    }
    console.log(printing + "\nYou have " + count + " movies in total.");
}

//print out to console, only the movies that has a rating higher than rating(argument)
//print out the total number of matches
function highRatings (rating) {
    console.log("printing movie that have a higher rating of than " + rating + "\n");
    var total = 0;
    for (i = 0; i < allMovies.length; i++) {
        if (allMovies[i].rating > rating) {
            console.log(allMovies[i].title + " has a rating of " + allMovies[i].rating + "\n");
            total++;
        }
    }
    console.log("\nIn total, there are " + total + " matches");
}

//Toggle the 'haveWatched' property of the specified movie 
function changeWatched (title) {
    console.log("Changing the status of the movie...");
    for (i = 0; i < allMovies.length; i++) {
        if (allMovies[i].title == title) {
            if (allMovies[i].havewatched === "true") {
                var nope = "false"
                allMovies[i].havewatched = nope;
            } else if (allMovies[i].havewatched === "false") {
                allMovies[i].havewatched = "true";
            }
        }
    }
}

////////////////////////////////////////////////////////////
//Test code - DO NOT DELETE OR EDIT
let x = new Movie("Spiderman", 3, "true");
let y = new Movie("Citizen Kane", 4, "false");
let z = new Movie("Zootopia", 4.5, "true");

allMovies.push(x,y,z);

console.log("----------------");
console.log("running program......");
console.log("----------------");
printMovies();


let movie1 = new Movie("Parasite", 2, "false");


console.log("----------------");
addMovie(movie1);
console.log("----------------");



changeWatched("Spiderman");
console.log("----------------");

printMovies();
console.log("----------------");

changeWatched("Spiderman");
console.log("----------------");

printMovies();
console.log("----------------");

highRatings(3.5);
