# Response Integration for FiveM

This is the base resource integration for FiveM. This will allow for communication from FiveM to Response and vice versa. Clients will authenticate by generating a token in Response Web Application and then saving that token via in game UI. This will not leave the clients machine nor will be be exchanged anywhere else but directly with the Response Application Server for your app. 

## Building Resource

using the command yarn or npm you can build either development or production versions as follows

    yarn run "build dev"
    yarn run "build prod"

    npm run "build dev"
    npm run "build prod"
