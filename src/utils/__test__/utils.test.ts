import { buildRoute, delay } from '../utils';

describe('utils', () => {
  describe('buildRoute', () => {
    it('should replace single parameter in route', () => {
      const route = '/quotes/:id';
      const params = { id: 123 };
      const result = buildRoute(route, params);
      expect(result).toBe('/quotes/123');
    });

    it('should replace multiple parameters in route', () => {
      const route = '/users/:userId/quotes/:quoteId';
      const params = { userId: 1, quoteId: 456 };
      const result = buildRoute(route, params);
      expect(result).toBe('/users/1/quotes/456');
    });

    it('should handle string and number parameters', () => {
      const route = '/quotes/:id/user/:name';
      const params = { id: 123, name: 'john' };
      const result = buildRoute(route, params);
      expect(result).toBe('/quotes/123/user/john');
    });

    it('should return original route if no parameters match', () => {
      const route = '/quotes/:id';
      const params = { otherId: 123 };
      const result = buildRoute(route, params);
      expect(result).toBe('/quotes/:id');
    });
  });

  describe('delay', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should delay for specified milliseconds', async () => {
      const delayPromise = delay(1000);
      jest.advanceTimersByTime(1000);
      await expect(delayPromise).resolves.toBeUndefined();
    });

    it('should not resolve before delay time', () => {
      const delayPromise = delay(1000);
      jest.advanceTimersByTime(500);
      expect(delayPromise).toEqual(expect.any(Promise));
    });
  });
});
