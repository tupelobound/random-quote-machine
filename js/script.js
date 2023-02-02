// Function declaration
function getQuote() {
    // get JSON data from the Forismatic API
    $.getJSON('https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?', function (json) {
        var quote = json["quoteText"]; // set variable for the quote
        var author = json["quoteAuthor"]; // set variable for the quote's author
        // handle situations where there are one or more spaces at the end of the sentence
        while (quote[quote.length - 1] === " ") {
            quote = quote.slice(0, quote.length - 1);
        };

        if (author === "") {
            author = "Unknown"; // some quotes are from unknown sources - in this situation, set author to "Unknown"
        }

        var red = Math.floor(Math.random() * 170);
        var green = Math.floor(Math.random() * 170);
        var blue = Math.floor(Math.random() * 170);
        var mix = `rgb(${red}, ${green}, ${blue})`; // create a string variable for a random rgb color

        $('body').animate({ // animate a background color change on each click
            backgroundColor: mix,
        }, 500);

        $('#quote-box').animate({ // fade out the entire text
            opacity: 0,
        }, 500, function () {
            $('#quote').html('"' + quote + '" '); // set the text in the quote html to equal the quote variable
            $('#author').html('- ' + author); // set the text in the author html to the value of the author variable
            $('#twitter').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&text=%22' + quote + '%22 - ' + author) // change the href attribute of the Twitter link to contain the new quote
        });
        $('#quote-box').animate({ // fade in the new quote
            opacity: 1,
        }, 500);
    });
}

$('#btn').on('click', getQuote); // call getQuote when button is clicked
