const express = require('express'),
      router = express.Router();

// Array of 20k most used english words
const fs = require('fs');
const wordArray = fs.readFileSync('20k.txt').toString().split("\n");

// Letter on keys of T9 keyboard
const numberValues = {
    "2" : ['a', 'b', 'c'],
    "3" : ['d', 'e', 'f'],
    "4" : ['g', 'h', 'i'],
    "5" : ['j', 'k', 'l'],
    "6" : ['m', 'n', 'o'],
    "7" : ['p', 'q', 'r', 's'],
    "8" : ['t', 'u', 'v'],
    "9" : ['w', 'x', 'y', 'z']
};

router.post('/parseNumbers/', function(req, res){
    const numbers = req.body.numbers;
    const useDict = req.body.useDict;

    let result;

    // Check if there are any numbers to generate from
    if (numbers) {
        // Get top 100 words from Iterator generating all possible combinations
        result = Array.from(generate(numbers, "", useDict)).slice(0, 100);
    } else {
        result = []
    }

    res.json({words: result});
  })

// Recursive iterator function to generate possible strings based on number at T9 keyboard
function* generate(numbers, resultSoFar, useDict) {
    
    // Get letters corresponding to given number
    const num = numbers[0];
    const letters = numberValues[num];
    
    let result;
    for (let i = 0; i < letters.length; i++) {

        // For each letter add it to current result
        result = resultSoFar + letters[i];

        if (useDict) {
            // If using dictionary try to find words with prefix of given string
            const words = wordArray.filter((word) => word.startsWith(result))
            
            if (words.length > 0) {
                if (numbers.length == 1) {
                    // If there are no numbers left check if word is correct and yield it
                    if (words.includes(result)) {
                        yield result;
                    }
                } else {
                    yield* generate(numbers.slice(1), result, useDict);
                }
            }
        } else {
            // Otherwise just yield every possible combination
            if (numbers.length == 1) {
                // If there are no numbers left yield the word
                yield result;
            } else {
                yield* generate(numbers.slice(1), result, useDict);
            }
        }
    }
}

module.exports = router;