const { findStartAndEndFlight } = require('./findStartAndEndFlight.js');

describe('findStartAndEndFlight', () => {
    it('should return the correct start and end airports for a single flight', () => {
        const flights = [['SFO', 'EWR']];
        const result = findStartAndEndFlight(flights);
        expect(result).toEqual(['SFO', 'EWR']);
    });

    it('should return the correct start and end airports for multiple flights forming a connected path', () => {
        const flights = [['ATL', 'EWR'], ['SFO', 'ATL']];
        const result = findStartAndEndFlight(flights);
        expect(result).toEqual(['SFO', 'EWR']);
    });

    it('should return the correct start and end airports for a more complex connected path', () => {
        const flights = [['IND', 'EWR'], ['SFO', 'ATL'], ['GSO', 'IND'], ['ATL', 'GSO']];
        const result = findStartAndEndFlight(flights);
        expect(result).toEqual(['SFO', 'EWR']);
    });

    it('should return null for flights not forming a valid path using all flights', () => {
        const flights = [['SFO', 'EWR'], ['ATL', 'GSO']];
        const result = findStartAndEndFlight(flights);
        expect(result).toBeNull();
    });

    it('should return null if there are no flights', () => {
        const flights = [];
        const result = findStartAndEndFlight(flights);
        expect(result).toBeNull();
    });

    it('should return null if no start or end airport is determined properly', () => {
        const flights = [['SFO', 'EWR'], ['SFO', 'ATL'], ['ATL', 'EWR']];
        const result = findStartAndEndFlight(flights);
        expect(result).toBeNull();
    });

    it('should handle circular paths correctly', () => {
        const flights = [['A', 'B'], ['B', 'C'], ['C', 'A']];
        const result = findStartAndEndFlight(flights);
        expect(result).toBeNull();
    });
});