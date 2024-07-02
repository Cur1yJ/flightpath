

/**
 * Determines the start and end airports from a list of unordered flights.
 * Ensures that there is a valid flight path using all flights exactly once.
 * 
 * @param {Array<Array<string>>} flights - A list of flights, where each flight is represented as an origin-destination pair.
 * @returns {Array<string>|null} - Returns an array containing the start and end airports if a valid path exists; otherwise, returns null.
 * 
 * @example
 * // Single flight, simple case
 * findStartAndEnd([['SFO', 'EWR']]);
 * // returns ['SFO', 'EWR']
 * 
 * @example
 * // Two flights forming a connected path
 * findStartAndEnd([['ATL', 'EWR'], ['SFO', 'ATL']]);
 * // returns ['SFO', 'EWR']
 * 
 * @example
 * // Multiple flights forming a connected path
 * findStartAndEnd([['IND', 'EWR'], ['SFO', 'ATL'], ['GSO', 'IND'], ['ATL', 'GSO']]);
 * // returns ['SFO', 'EWR']
 * 
 * @example
 * // Flights not forming a valid path using all flights
 * findStartAndEnd([['SFO', 'EWR'], ['ATL', 'GSO']]);
 * // returns null
 */
function findStartAndEndFlight(flights) {
    // If there are no flights, we cannot determine start and end
    if (flights.length === 0) return null;
    
    // Create sets for origin and destination airports
    const originAirports = new Set();
    const destinationAirports = new Set();
    const flightMap = new Map(); // To trace connections
    
    // Populate the sets and flight map
    for (const [origin, destination] of flights) {
        originAirports.add(origin);
        destinationAirports.add(destination);
        if (!flightMap.has(origin)) {
            flightMap.set(origin, []);
        }
        flightMap.get(origin).push(destination);
    }
    
    // Determine the start airport (origin not in destinations)
    let startAirport;
    for (const origin of originAirports) {
        if (!destinationAirports.has(origin)) {
            startAirport = origin;
            break;
        }
    }
    
    // Determine the end airport (destination not in origins)
    let endAirport;
    for (const destination of destinationAirports) {
        if (!originAirports.has(destination)) {
            endAirport = destination;
            break;
        }
    }
    
    // Early exit if start or end airport is not determined properly
    if (!startAirport || !endAirport) return null;
    
    // Verify if we can construct a valid path using all flights exactly once
    const visitedFlights = new Set();
    
    function dfs(airport) {
        if (visitedFlights.size === flights.length) return airport === endAirport;
        
        if (!flightMap.has(airport)) return false;
        
        const destinations = flightMap.get(airport);
        
        for (let i = 0; i < destinations.length; i++) {
            const nextAirport = destinations[i];
            const flightKey = `${airport}-${nextAirport}`;
            
            if (!visitedFlights.has(flightKey)) {
                visitedFlights.add(flightKey);
                if (dfs(nextAirport)) return true;
                visitedFlights.delete(flightKey);
            }
        }
        return false;
    }
    
    // Start DFS from the determined start airport
    return dfs(startAirport) ? [startAirport, endAirport] : null;
}

module.exports = { findStartAndEndFlight };