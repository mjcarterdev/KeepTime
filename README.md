# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### Start Development Container in VS Code from local repo

- Git clone repo to host
- In VS Code ensure you have 'Dev Containers' extention installed [https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers]
- Open folder of downloaded repo
- VS Code should recognise the devcontainer.json and ask to start in a container, accept this prompt.
- VS Code will open the container and install the package.json
- Run `npm run dev`
- The application will start on `http://localhost:5173/`

### Starting Development Container in VS Code downloading from repo

- In VS Code ensure you have 'Dev Containers' extention installed [https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers]
- From VS Code open the pallete with `ctrl + shift + P` and type and select `Dev Containers: Clone Repository in Container Volume...`
- Enter the https of the git repo to be cloned and press enter.
- Select `Create a new volume...`
- Give the volume a name if prompted as well as a folder name if asked.
- Container should start to build
- Once it has finished running the repository will be mounted inside the container.
- Run `npm install`
- Run `npm run dev`
- The application will start on `http://localhost:5173/`

### Prisma and Postgres Setup

- Run `npx prisma generate` from the server root folder
- When you make a change to the prisma schema you need to run `npx prisma migrate dev` to update postges.

### Swagger API

- List of APIs can be accessed via `http://localhost:3001/api/swagger/api-docs/`
- You need to log in first to test the endpoints marked with a lock icon

