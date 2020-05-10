<h1 align="center"><a href="https://github.com/prk3/sundae-collab-server">sundae-collab</a></h1>
<p align="center">Delicious collaboration framework</p>

## demo-client

demo-client is a web application that shows how easy it is to add sundae collaboration to an existing React application. It offers an interface for manipulating cooking recipes - an example resource type persisted in sundae-collab-demo-api instance. The client communicates with sundae-collab-server using components and hooks from sundae-collab-react.

## Integration

Components and helpers enabling collaboration come from sundae-collab-react package. It can be installed by running
```
npm install --save https://github.com/prk3/sundae-collab-react.git
```
or
```
yarn add https://github.com/prk3/sundae-collab-react.git
```

Check out the following files to see how sundae-collab-react is used in demo-client.

### src/App.tsx

The main application component wraps application pages with a `Provider` element. `Provider` establishes connection with the collaboration server and authenticates the user with an identity supplied through the props.

```jsx
<CollaborationProvider url={sundaeCollabServerUrl} identity={identity}>
  {/* your pages here */}
</CollaborationProvider>
```

### src/pages/RecipesEdit.tsx

Recipe edit page reads a recipe id from the url, fetches recipe from the API and passes the data to a `Resource` element, which starts or joins a recipe edit session.

```jsx
<Resource type="recipe" id={idFromUrl} value={recipeFromTheApi}>
  {/* recipe form /*}
</Resource>
```

### src/components/RecipeFormEdit.tsx

Form component renders recipe fields and handles validation. Each field is wrapped with one of the Field components, e.g. `ReplaceField`, `TextField`.

`ReplaceField` is the simplest field wrapper. It supplies an input component with value and onChange, which is a function taking a new value as a parameter. `ReplaceField` is useful for discrete data types like on/off or LOW/MEDIUM/HIGH.

```jsx
<ReplaceField path="/visible">
  {({ value, onChange }) => (
    <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)}>
  ))}
</TextField>
```

That's enough to make a checkbox synchronize with other collaboration participants. Visit [sundae-collab-react](http://github.com/prk3/sundae-collab-react) to learn about other field components.

Another interesting element in the RecipeFormEdit is the list of participants working on a recipe. This simple component uses `useParticipants` hook to retrieve the list of participants from the session context, injected to the React components tree by the `Resource` element. The other hooks exported by sundae-collab-react include `useValue`, `useSelections`, `useClientId`. You can read more about them in the [sundae-collab-react doc](http://github.com/prk3/sundae-collab-react).

## Environment

If you run demo-client locally, copy `example.env` to `.env`. Adjust variables there to change how the app is built and run.

demo-client is exchanging data with two services: sundae-collab-server and sundae-collab-demo-api. You must start them separately and then provide demo-client with urls by setting two environment variables:

- REACT_APP_API_URL - url of a sundae-collab-demo-api instance
- REACT_APP_COLLAB_URL - url of a sundae-server instance (with ws or wss protocol)

The full command that runs demo-client locally looks like this:
```bash
env REACT_APP_API_URL=localhost:8000 REACT_APP_COLLAB_URL=localhost:8100 npm run start
```

Warning: `PUBLIC_URL` and `REACT_APP` variables must be provided at build time. Because Dockerfile builds demo-client at image construction stage, those variables must be passed through `--build-arg`/`args`, not `--env`/`--environment`. Check out `Dockerfile` to see which variables belong to which group.

## Useful commands

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run start`

Start serving compiled application. Use `-p` flag to change the port.

### `npm run lint`

Lints all source files and cypress integration tests.

### `npm run test`

Launches the test runner in the interactive watch mode.

### `npm run cypress`

Run automated interface tests in the console.

### `npx cypress --open`

Open cypress dashboard to select and run tests in a browser.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To learn more about sundae-collab project, visit [sundae-collab-server page](http://github.com/prk3/sundae-collab-server).
