# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## SDK integration for Vue 3
### Requirements
To integrate the Eniblock SDK into your project, you will have to customize the [Webpack configuration](https://cli.vuejs.org/guide/browser-compatibility.html#usebuiltins-usage) to add some [polyfills](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill).
Here are the requirements to use the Eniblock SDK:
- install the following dependencies:
   ```
   npm i --save-dev webpack@5.76.1
   npm i @eniblock/sdk buffer crypto-browserify stream-browserify node-polyfill-webpack-plugin
   ```
- update your vue.config.js file adding NodePolyfillPlugin in the plugins and resolve.fallback as well:
  ```
  const {defineConfig} = require('@vue/cli-service')
  const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
   
  module.exports = defineConfig({
    ...,
    transpileDependencies: true,
    configureWebpack: {
       plugins: [new NodePolyfillPlugin()],
       resolve: {
           extensions: ['.ts', '.js'],
           modules: ['src', 'node_modules'],
           fallback: {
               crypto: require.resolve('crypto-browserify'),
               stream: require.resolve('stream-browserify'),
               buffer: require.resolve('buffer'),
           }
       },
       ...
    }
  })
  ```
- check if babel.config.js file is present and contains:
  ```js
  module.exports = {
    presets: [
      '@vue/cli-plugin-babel/preset'
    ]
  }
  ```
#### For this demo
Finally, you will need to provide these environment variables in your .env(*) to be able to log in and get your access token:
```
AUTH_CLIENT_ID=<the client id of your auth provider>
AUTH_REDIRECT_URI=<the uri where your auth provider will redirect you after login>
AUTH_SDK_URL=https://auth.sdk.eniblock.com
```
