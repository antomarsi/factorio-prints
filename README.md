# Factorion prints

## Testing locally

First you need to have to install all depedencies, for that you can run:

```yarn install```

The firebase emulator is not required for most of the time, but you need to run the nextjs and api.

### Running Next

That is simple, just run the following command:

```yarn dev```

### Running Firebase Emulator

That's is more tricky, you need to run the following command:

```
docker compose up -d
```

After that, you need to go inside the container and follow the instructions on firebase emulator (more instructions are WIP)

#### Running the API

The mock api uses express that relies on a json file, that is not the best tool to make a mock api and the json file is not available because it uses real users content (if you want, just ask), to run the API, just run the following command:
```
node .\mock-server\index.js
```
**Note**: Every change in the `index.js`, you need to restart the server