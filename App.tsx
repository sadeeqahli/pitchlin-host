import { App } from 'expo-router/build/qualified-entry';
import React, { memo } from 'react';
import { ErrorBoundaryWrapper } from './__create/SharedErrorBoundary';
import './src/__create/polyfills';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// GlobalErrorReporter removed for mobile app

const Wrapper = memo(() => {
  return (
    <ErrorBoundaryWrapper>
      <SafeAreaProvider
        initialMetrics={{
          insets: { top: 64, bottom: 34, left: 0, right: 0 },
          frame: {
            x: 0,
            y: 0,
            width: 390,
            height: 844,
          },
        }}
      >
        <App />
      </SafeAreaProvider>
    </ErrorBoundaryWrapper>
  );
});
const CreateApp = () => {
  return (
    <>
      <Wrapper />
    </>
  );
};

export default CreateApp;
