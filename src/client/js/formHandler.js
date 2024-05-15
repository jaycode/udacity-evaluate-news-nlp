// Make function that check url and import it here
import { checkForURL } from './urlChecker'

// If working on Udacity workspace, update this with the Server API URL.
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'http://localhost:8000/api'

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('urlForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('url').value;
    
    // Check if the URL is valid
    if (checkForURL(formText)) {
        // If the URL is valid, send it to the server
        // document.getElementById('results').innerHTML = formText;
        postData(serverURL, {url: formText})
            .then(function(res) {
                document.getElementById('results').innerHTML = '<ul>'
                    + '<li>Polarity: ' + res.score_tag + ' (' + getPolarityDescription(res.score_tag) + ')</li>'
                    + '<li>Agreement: ' + res.agreement + '</li>'
                    + '<li>Subjectivity: ' + res.subjectivity + '</li>'
                    + '<li>Confidence: ' + res.confidence + '</li>'
                    + '<li>Irony: ' + res.irony + '</li>'
                    + '</ul>'
            })
    } else {
        alert('The URL is invalid.');
    }
}

// Function to send data to the server
const postData = async (url = "", data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const answer = await response.json();
        console.log('Answer from server:', answer);
        return answer;
    } catch (error) {
        console.log('Fetch error', error);
    }
};

function getPolarityDescription(polarity) {
    const polarityDescriptions = {
        'P+': 'strong positive',
        'P': 'positive',
        'NEU': 'neutral',
        'N': 'negative',
        'N+': 'strong negative',
        'NONE': 'without polarity'
    };

    // Check if the polarity code exists in the map
    if (polarityDescriptions.hasOwnProperty(polarity)) {
        return polarityDescriptions[polarity];
    } else {
        return 'Invalid polarity code'; // or you could return undefined or any other default value
    }
}

export { handleSubmit };

