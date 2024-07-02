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
