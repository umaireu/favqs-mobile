import ErrorBoundary from 'react-native-error-boundary';
import { Navigation } from './navigation/navigation';
import { ErrorFallback } from './components';
import { logDetails } from './utils/utils';

// Development network logging
// import NetworkLogger from 'react-native-network-logger';
import { View } from 'react-native';
// import { ENABLE_NETWORK_LOGGING } from '@env';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={error => logDetails({ message: error })}
    >
      <View style={{ flex: 1 }}>
        <Navigation />
        {/* {ENABLE_NETWORK_LOGGING && <NetworkLogger />} */}
      </View>
    </ErrorBoundary>
  );
}

export default App;
