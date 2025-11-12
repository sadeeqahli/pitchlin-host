import 'react-native-url-polyfill/auto';
import './src/__create/polyfills';
global.Buffer = require('buffer').Buffer;

import 'expo-router/entry';
import { AppRegistry, LogBox } from 'react-native';
import { App } from 'expo-router/build/qualified-entry';
import React from 'react';
import { DeviceErrorBoundaryWrapper } from './__create/DeviceErrorBoundary';
import { type ReactNode } from 'react';

if (__DEV__) {
  LogBox.ignoreAllLogs();
  LogBox.uninstall();
}

// Register with error boundary for better error handling
function WrapperComponentProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <DeviceErrorBoundaryWrapper>{children}</DeviceErrorBoundaryWrapper>;
}

AppRegistry.setWrapperComponentProvider(() => WrapperComponentProvider);
AppRegistry.registerComponent('main', () => App);