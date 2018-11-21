# JiraTestTool

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation.

**The [Electron API Demos](https://electronjs.org/#get-started) has API code examples to help you get started.**

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start).

## To Use

To clone and run this repository you'll need 
- [ ] [Git](https://git-scm.com) (or just [GitHub for Desktop](https://desktop.github.com/) which is easier on Windows) and 
- [ ] [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. 
  - it is possible to [install Node without an administrator](https://stackoverflow.com/q/37029089/5411712)

From your command line:

```bash
# Clone this repository
git clone https://github.com/JiraTestTool/JiraTestTool.git
# Go into the repository
cd JiraTestTool
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.


## Jira Rest API
* uses [Jira-Connector](https://github.com/floralvikings/jira-connector) which is a JavaScript Jira API Wrapper for NodeJS

## Windows executable
* https://github.com/JiraTestTool/JiraTestTool/blob/desktopJTT/bin/JiraTestTool_2.0.0_alpha1_setup.exe

## Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
