# Auth module (and more) built with vuejs. 

## TODO

- Implement redirect if token is invalid. (currently just loads dashboard template unauthenticated and is not so obviously err'd)
- Disable inputs after clikcing submit to prevent double submission of data to API
- Debug auth issue. Can be reproduced by logging in, make change on backend to reload api, send post request, get an unauothorized response back, hit home then sign in, get reauthenticated with the token THAT NEVER LEFT LOCAL STORAGE and then be able to call the api again 
- also styling.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


