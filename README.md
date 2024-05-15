# Udacity project submission - Evaluate News Article with Natural Language Processing

This project creates a simple client-server NodeJs app that passes a URL to [MeaningCloud API](https://www.meaningcloud.com/).

## To run

- Use node: `nvm use node`
- Install all packages: `npm install`
- Setup server: `npm run start`
  - To test if server runs: Go to `http://localhost:8000`
- Setup client (dev): `npm run build-dev`

Then go to `http://localhost:3000` and pass in a URL e.g.

```
https://www.udacity.com/blog/2024/04/project-based-learning-in-tech-the-value-of-hands-on-education-in-a-digital-age.html
```

You should get the following output:

![Output](media/output_ok.png)

## To test

Testing is done with [Jest](https://jestjs.io/). Run the following command to run the test suites:

```
npm run test
```

You should get an output showing all tests ran successfully:

![Tests passed](media/tests_passed.png)
