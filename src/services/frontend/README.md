# ui-src

## Configuration - AWS Systems Manager Parameter Store (SSM)

The following values are used to configure the deployment of this service (see below for more background and context):
| Parameter | Required? | Purpose |
| --- | :---: | --- |
| None | - | - |

This project uses [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html), often shortened to just SSM, to inject environment specific, project specific, and/or sensitive information into the deployment.

SSM parameters for this project have a top level namespace of /{$PROJECT}/. The PROJECT environment variable resolves to the github repo name.

- For example: SSM Parameters for this project are all set under /webapp-accelerator/

This project has also implemented a pattern for specifying defaults for variables in default SSM parameters, while allowing for stage (branch, environment) specific overrides in stage specific SSM parameters.

- For example: Setting the SSM parameter "/webapp-accelerator/default/iam/permissionsBoundaryPolicy" to be "arn:aws:xxxxxx" in SSM would apply "arn:aws:xxxxxx" to all branches by default. However, if you also set "/webapp-accelerator/main/iam/permissionsBoundaryPolicy" to "arn:aws:yyyyyy", the main specific value of "arn:aws:yyyyyy" would take effect on just the main branch. This is the gist of stage specific overrides, and it's the nature of the {$STAGE || "default"} syntax above.

Please see the [SSM wiki section](wikilink) for more information.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
