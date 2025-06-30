import { renderHook, act } from '@testing-library/react-native';
import { useHttp } from '../../hooks/useHttp';

describe('useHttp Hook', () => {
  const mockSuccessFunction = jest.fn(() => Promise.resolve('success data'));
  const mockErrorFunction = jest.fn(() =>
    Promise.reject(new Error('Test error')),
  );
  const mockFunctionWithParams = jest.fn((params: string) =>
    Promise.resolve(`data-${params}`),
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('auto execute', () => {
    it('should auto execute function and return data', async () => {
      const { result } = renderHook(() =>
        useHttp({ functionToCall: mockSuccessFunction, autoExecute: true }),
      );

      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBe(null);
      expect(result.current.error).toBe(null);

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe('success data');
      expect(result.current.error).toBe(null);
      expect(mockSuccessFunction).toHaveBeenCalledTimes(1);
    });

    it('should handle errors during auto execute', async () => {
      const { result } = renderHook(() =>
        useHttp({ functionToCall: mockErrorFunction, autoExecute: true }),
      );

      expect(result.current.loading).toBe(true);

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe(null);
      expect(result.current.error).toEqual(expect.any(Error));
      expect(result.current.error?.message).toBe('Test error');
    });
  });

  describe('manual execute', () => {
    it('should not auto execute when autoExecute is false', () => {
      const { result } = renderHook(() =>
        useHttp({ functionToCall: mockSuccessFunction, autoExecute: false }),
      );

      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe(null);
      expect(result.current.error).toBe(null);
      expect(mockSuccessFunction).not.toHaveBeenCalled();
    });

    it('should execute manually via makeHttpRequest', async () => {
      const { result } = renderHook(() =>
        useHttp({ functionToCall: mockSuccessFunction, autoExecute: false }),
      );

      await act(async () => {
        await result.current.makeHttpRequest();
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe('success data');
      expect(result.current.error).toBe(null);
      expect(mockSuccessFunction).toHaveBeenCalledTimes(1);
    });

    it('should execute function with parameters', async () => {
      const { result } = renderHook(() =>
        useHttp({ functionToCall: mockFunctionWithParams, autoExecute: false }),
      );

      await act(async () => {
        await result.current.makeHttpRequest('test-param');
      });

      expect(result.current.data).toBe('data-test-param');
      expect(mockFunctionWithParams).toHaveBeenCalledWith('test-param');
    });
  });

  describe('error handling', () => {
    it('should handle network errors properly', async () => {
      const networkError = new Error('Network Error');
      networkError.name = 'NETWORK_ERROR';

      const mockNetworkErrorFunction = jest.fn(() =>
        Promise.reject(networkError),
      );

      const { result } = renderHook(() =>
        useHttp({
          functionToCall: mockNetworkErrorFunction,
          autoExecute: false,
        }),
      );

      await act(async () => {
        await result.current.makeHttpRequest();
      });

      expect(result.current.error?.message).toBe('Network Error');
      expect(result.current.error?.name).toBe('NETWORK_ERROR');
    });
  });
});
