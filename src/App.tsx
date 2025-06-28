import { Navigation } from './navigation/navigation';
// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <Navigation />
    // <View style={styles.container}>
    //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //   <NewAppScreen templateFileName="App.tsx" />
    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

export default App;
