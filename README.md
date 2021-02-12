# covid-progress-bot

Twitter bot which scrapes the data of https://covid-vaccinatie.be/nl and then posts a tweet about the current progress of the Covid vaccination in Belgium at https://twitter.com/covidvaccins_be

## Run

`yarn execute` to run a single check this requires the correct secrets to be present in a local .dotenv file
`yarn start` also starts a mock server simultaneously which stubs the calls to the https://covid-vaccinatie.be/nl and Twitter apis

## Test

`yarn test` or `yarn test-watch` , the former also starts up the mockserver

## Build / Deploy

The function is deployed on aws lambda and is triggered by a schedule once every hour. This executes the `handler` function. The `yarn build` script compiles the typescript and makes a single js bundle using parcel. Then this is zipped to make uploading to aws easy. Every commit to main is automatically pushed to Aws by a Github action.
