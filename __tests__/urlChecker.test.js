import { handleSubmit } from '../src/client/js/formHandler';
import { checkForURL } from '../src/client/js/urlChecker';
jest.mock('../src/client/js/urlChecker');

describe('urlChecker', () => {
    let event;
    let form;
    let input;
    let results;
    const url = "http://example.com";

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
    });

    it("should have the checkForURL() function defined", () => {
        expect(checkForURL).toBeDefined();
    });

    it('should alert if URL is invalid', () => {
        // Mock the checkForURL function to return false
        checkForURL.mockReturnValue(false);
        
        // Mock the global alert function
        global.alert = jest.fn();

        // Dispatch the submit event
        document.getElementById('urlForm').dispatchEvent(
            new Event('submit', { bubbles: true, cancelable: true }));

        // Verify that alert was called with the correct message
        expect(alert).toHaveBeenCalledWith('The URL is invalid.');
    });
});