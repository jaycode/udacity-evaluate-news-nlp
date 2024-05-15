import { handleSubmit } from '../src/client/js/formHandler';
import { waitFor } from '@testing-library/dom';

describe('formHandler', () => {
    let event;
    let form;
    let input;
    let results;
    const url = "https://www.udacity.com/blog/2024/04/project-based-learning-in-tech-the-value-of-hands-on-education-in-a-digital-age.html";

    beforeEach(() => {
        document.body.innerHTML = `
            <form id="urlForm">
                <input type="text" id="url" name="url" value="${url}">
                <button type="submit">Submit</button>
            </form>
            <div id="results"></div>
        `;
        form = document.getElementById('urlForm');
        input = document.getElementById('url');
        results = document.getElementById('results');

        event = {
            preventDefault: jest.fn(),
        };

        document.getElementById('urlForm').addEventListener('submit', handleSubmit);

        // Mock global fetch
        global.fetch = jest.fn();
    });

    // The describe() function takes two arguments - a string description, and a test suite as a callback function.  
    // A test suite may contain one or more related tests    
    it("should have the handleSubmit() function defined", () => {
        expect(handleSubmit).toBeDefined();
    });

    it('should send POST request if URL is valid', async () => {
        // Mock the fetch function to resolve with a successful response
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ ok: true, score_tag: 'P+'}),
        });

        // Dispatch the submit event
        document.getElementById('urlForm').dispatchEvent(
            new Event('submit', { bubbles: true, cancelable: true }));

        // Verify that fetch was called with the correct arguments
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api', expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url }),
        }));
    });
    
    it('should update the results element', async () => {
        // Mock the fetch function to resolve with a successful response
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ ok: true, score_tag: 'P+' }),
        });

        // Dispatch the submit event
        document.getElementById('urlForm').dispatchEvent(
            new Event('submit', { bubbles: true, cancelable: true }));

        // console.log(document.getElementById('results').innerHTML);

        // Verify that the results div was updated with the response
        await waitFor(() => {
            expect(document.getElementById('results').innerHTML).toContain('strong positive');
        });
    });
});