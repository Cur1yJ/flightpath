## Story: 
There are over 100,000 flights a day, with millions of people and cargo being transferred worldwide. With so many people and different carrier/agency groups, tracking where a person might be can be hard. To determine a person's flight path, we must sort through all of their flight records.

## Goal: 
To create a microservice API to help us understand and track how a particular person’s flight path may be queried. The API should accept a request that includes a list of flights defined by a source and destination airport code. These flights may not be listed in order and must be sorted to find the total flight paths starting and ending at airports.

## Examples: 
- [['SFO', 'EWR']]                                                                    => ['SFO', 'EWR']
- [['ATL', 'EWR'], ['SFO', 'ATL']]                                               => ['SFO', 'EWR']
- [['IND', 'EWR'], ['SFO', 'ATL'], ['GSO', 'IND'], ['ATL', 'GSO']] => ['SFO', 'EWR']

## Specifications: 
Your microservice must listen on port 8080 and expose the flight path tracker under the /calculate endpoint.

Define and document the format of the API endpoint in the README.

Use JavaScript and any tools to help you best accomplish the task.

------------

# Flight Path Calculator

The Flight Path Calculator microservice provides an endpoint to determine the start and end airports from a list of unordered flights. It ensures that there is a valid flight path using all flights exactly once.

## Installing and Running

```bash
npm i
npm start
```

Upon running the above commands the server will run on `http://127.0.0.1:8080` by default. You can change the host and port with the `HOST` and `PORT` environment variables.

## Usage

To use the flight path calculator, send POST requests to the `/calculate` endpoint with a JSON body containing the list of flights.

## API Endpoint

### POST `/calculate`

#### Request Body

- `flights`: An array of arrays, each containing two strings representing the origin and destination airports.

#### Response Body

- `start`: The starting airport.
- `end`: The ending airport.

#### Example Request

```json
{
  "flights": [
    ["ATL", "EWR"],
    ["SFO", "ATL"]
  ]
}
```

#### Example Response

```json
{
  "start": "SFO",
  "end": "EWR"
}
```

## Example Requests

### Using Curl

```bash
curl -X POST http://localhost:8080/calculate \
  -H "Content-Type: application/json" \
  -d '{"flights": [["ATL", "EWR"], ["SFO", "ATL"]]}'
```

### Using Fetch in JavaScript

```javascript
const result = await fetch('http://localhost:8080/calculate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    flights: [
      ["ATL", "EWR"],
      ["SFO", "ATL"]
    ]
  })
});
console.log(await result.json());
```

## Testing

Integration and unit tests are provided. Test with:

```bash
npm run test:integration
npm run test:unit
```

## Building and Running the Docker Image

### Building the Docker Image

To build the Docker image for the Flight Path Microservice, navigate to the root directory of your project and run the following command:

```bash
docker build -t flight-path-calculator .
```

### Running the Docker Container

Run the Docker container with the following command:

```bash
docker run -p 8080:8080 flight-path-calculator
```

------------

# Notes

This is a Senior Software Engineer Take-Home Programming Assignment for JavaScript from [VolumeFi](https://volume.finance). This test took around 1.5 hours to complete. To accelerate development, I leaned heavily on ChatGPT. There is a simple API with one endpoint. I included a Dockerfile so it can easily be deployed to serverless or K8s. It detects flight paths if there is exactly one unambiguous flight path from start to end. It does not support round trips since the flights can be provided in any order. I also added some simple unit and integration tests using jest and mocha respectively. I could add more like an OpenAPI spec, build pipeline, etc, but don't see the point in overcooking this.

In the interest of calibrating expectations; if this was a real service I would of course have spent more time on it - my workflow isn't normally to have a conversation with ChatGPT and throw the hodgepodge of output over the fence, I would spend more time on testing, validation, assessing the output, etc, and if it hadn't converged on a solution right away I would have had to code it myself. In this case it worked out though.

Lastly, I assumed that VolumeFi was mature enough to know that completing a coding challenge to build a microservice in 1.5 hours doesn't mean we'll be building 5 microservices a day, hah.
