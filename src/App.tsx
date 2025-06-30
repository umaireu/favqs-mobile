import ErrorBoundary from 'react-native-error-boundary';
import { Navigation } from './navigation/navigation';
import { ErrorFallback } from './components';
import { logDetails } from './utils/utils';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={error => logDetails({ message: error })}
    >
      <Navigation />
    </ErrorBoundary>
  );
}

export default App;
