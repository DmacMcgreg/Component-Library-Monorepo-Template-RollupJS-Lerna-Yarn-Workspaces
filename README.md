# Component-Library-Monorepo-Template-RollupJS-Lerna-Yarn-Workspaces
I found it difficult to find a simple and modern monorepo structure for individually-versioned React components, so I made one.

![image](https://user-images.githubusercontent.com/3266023/56816254-2706ca80-6811-11e9-91ec-661135c049d0.png)

- [Component-Library-Monorepo-Template-RollupJS-Lerna-Yarn-Workspaces](#component-library-monorepo-template-rollupjs-lerna-yarn-workspaces)
    - [Why a Monorepo?](#why-a-monorepo)
    - [Lerna](#lerna)
    - [Semantic Versioning](#semantic-versioning)
    - [Commitizen](#commitizen)
    - [RollupJS](#rollupjs)
    - [Publishing Packages](#publishing-packages)
    - [Storybook](#storybook)
    - [Jest Testing](#jest-testing)
    - [Yarn Workspaces](#yarn-workspaces)
    - [Inspiration and Credits](#inspiration-and-credits)


**I will try to make this repository a way for you to learn about Monorepos, and the tools to maintain, version and deploy them**


### Why a Monorepo?

  I'm sure there are many use cases for monorepos, but for me, the primary use case was to design a React Component library that had individual versions for each component. This meant that each component needed to be a seperate package that could be published onto NodePackageManager (NPM)

  The reason for this was so that anyone consuming my library could pick and choose individual components without needing to subscribe to every single component.

  An example of this would be if I published a set of components such as Buttons, Select Dropdowns, Modals, Tooltips, etc. 
  Let's say I had designed a great button component with minimal styling, and was done according to the latest accessibility standards (to help users with impairments of a functional type, such as blindness for instance).

  Any user could then use my button, without having to download the entire set of components (perhaps 30+ components)

  The reason for it being independently versioned would be that if I introduced a breaking change in the API, for instance using a label prop on the button, rather than passing down children props, then I could introduce a "breaking change" which would bump up the major version of SEMVER
  (version 1.0.0 -> 2.0.0)

  A monorepo itself is a great tool for building a component library, because it allows the maintainers to write common utility code that can be shared across components, as well as using a tool called Storybook to create a sandbox environment to develop these components. A monorepo also lends itself well to using tools such as Lerna to manage the publishing and versioning of each individual package in a more automated way.

### Lerna

  Lerna is the tool that easily allows running the same command across multiple packages in the monorepo. 

  By configuring lerna in the following way, we can achieve this result:

  `lerna.json`
  ```json
  {
    "packages": [
      "packages/*"
    ],
    "version": "independent",
    "command": {
      "publish": {
        "message": "chore(publish): 🤖update packages"
      }
    }
  }
  ```

  We are telling lerna to look in the packages folder of our repo for each individual package in the monorepo. Lerna will then look for folders that contain a `package.json` file. Each package.json file should contain a name, which will be the package name on NPM.org when we publish it. (In this example, I am assuming we will be publishing to npm, but this is up to you)


### Semantic Versioning
  Semantic Versioning will be the magic sauce that will allow us to automate the publishing and releasing of our packages.

  Semantic versioning consists of a version number in 3 sections:
  Major.Minor.Patch
  eg: 2.13.23

  Patch = Small change, bug fix, refactor
  Minor = Non-Breaking New Feature 
  Major = Breaking Change

  If we remove functionality, or change an external facing API to any of our components or modules, this would consist as a breaking change. It would change the semver from
  1.0.0 to 2.0.0 

  A new feature which does not break anything should bump the minor version
  1.0.0 to 1.1.0

  Any bug fix which does not add any new functionality should bump the patch version.


  This is important to note because NPM allows users to subscribe to individual package versions in different ways.

  We can subscribe to a fixed version:

  ```json
  {
    "my-package": "1.0.0"
  }
  ```

  We can subscribe to the latest patch version (>= 1.0.0 and < 1.1.0 ):

  ```json
  {
    "my-package": "~1.0.0" 
  }
  ```

  We can subscribe to the latest minor version (>= 1.0.0 and < 2.x.x ):

  ```json
  {
    "my-package": "~1.0.0" 
  }
  ```

  [image][https://bytearcher.com/articles/semver-explained-why-theres-a-caret-in-my-package-json/promopics/1-table-semver-plain.png]

### Commitizen
  ![image](https://user-images.githubusercontent.com/3266023/56816254-2706ca80-6811-11e9-91ec-661135c049d0.png)

  Commitizen will be a standard we use that forces the user to commit their changes in a particular format. 

  The reason for this is that once the commits are organized by features, bug fixes, and breaking changes, we can then automate the version number changing. 

  This might come as a eureka moment for those of you wondering how to automate all of this in a CI pipeline.

  If we commit a bunch of changes labeled as 'fix' or 'chore', then we can then tell lerna to publish all our packages that have changed since the last commits, and to use --conventional-comits flag to tell it that it can be intelligent and use the commit messages we have made to determine if there are any features or breaking changes.

  This takes the manual work out of updating every single version of all the packages we have changed.

### RollupJS

  Unfortunately for developers, one cannot simply write plain React code in JSX, and using all the latest features of es6, esnext etc.

  The module system of es6 does not currently work in NodeJS, and we may have to support older browsers.

  Therefore, we need to use a tool called Rollup in order to compile our code and transform it into something both NodeJS and the browser will support.

  If you've ever heard of webpack, rollup is very similar. Rollup seems to be the standard tool that is used to create bundled modules for NPM, whereas webpack seems to be a great tool for application development purposes. I believe the 2 are technically interchangeable, but this seems to be the consensus among the community.

  The rollup config file will lie under /config and it exposes a function which returns an object. 

  Each individual component package can now be responsible for importing the function, and calling it with some specific details about itself, such as the entry point file name.

  We can then create a build.js script which will invoke lerna to run rollup build on each individual package. We have configured rollup to spit out  .cjs.js and .es.js files, which will be good for NodeJS and the browser.

### Publishing Packages

  All that is needed to publish the packages that have changed is the following:
    1. Ensure every relevant commit has been done using commitizen
    2. run `npm run lerna:publish`

  Lerna will automatically detect which packages have changed, and will publish them to the npm repo for each package according to its name in package.json file.


### Storybook

  I have included a storybook instance for you to test your components.
  `npm run storybook` to start

  Just create a new file `*.stories.js` inside of stories (where * is the name of your story)

### Jest Testing

  I have included Jest, a config, and a babel setup to go ahead and get started testing!

### Yarn Workspaces

  Yarn workspaces is the cherry on top of this monorepo idea, as it will allow us to symlink all the packages together, and pull the node_modules folder to the root level of the project. 

  This is only useful for local development purposes. 

  Read more [here](https://yarnpkg.com/lang/en/docs/workspaces/)

### Inspiration and Credits

  **Heavily** inspired by [Telus Design System](https://github.com/telus/tds-core)
    I had a good vision as to how I wanted to accomplish this monorepo, and I found that Telus had already a great implementation, but without the documentation. 
    After some research, I came to my own conclusions that Commitizen was the magic that would be needed to allowing a CI pipeline to version all the packages automatically, and then alter I saw that TDS had come to the same conclusion.

    [Australian Government Design System](https://designsystem.gov.au/)

    [Kent C. Dodds - How to Write an Open Source Javascript Library](https://egghead.io/courses/how-to-write-an-open-source-javascript-library)
      Thanks to Kent for giving me the inspiration for commitizen and semantic-release in the first place!

