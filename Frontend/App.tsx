/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import FeedIndexScreen from './components/Feed/FeedIndexScreen';
import Colors from './constants/Colors';
import Footer from './components/Utils/Footer';
import {NavigationContainer} from '@react-navigation/native';

// const Section: React.FC<{
//   title: string;
// }> = ({children, title}) => {
//   // const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: '#EFF0EB',
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: '#EFF0EB',
//             fontWeight: 'bold',
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    // backgroundColor: Colors.purple300,
    height: '100%',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <NavigationContainer>
        <Footer />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    color: '#EFF0EB ',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'DancingScript-Bold',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'NanumSquareRoundR',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
