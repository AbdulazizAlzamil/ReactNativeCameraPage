/* eslint-disable */
import React, { useState, useEffect, useCallback, useRef } from 'react';

import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import SwipeableItems from './SwipeableItems';

enum CameraMode {
  Camera = 'Camera',
  Video = 'Video',
  Portrait = 'Portrait',
}

const data: CameraMode[] = [
  CameraMode.Camera,
  CameraMode.Video,
  CameraMode.Portrait,
];

function App() {
  const [selectedMode, setSelectedMode] = useState<CameraMode>();
  const [isRecording, setIsRecording] = useState(false);

  const getSelectedModeStyle = () => {
    switch (selectedMode) {
      case CameraMode.Portrait:
      case CameraMode.Camera:
        return {
          backgroundColor: 'white',
        }
      case CameraMode.Video:
        return {
          backgroundColor: 'red',
          borderRadius: isRecording ? 5 : 35,
          width: isRecording ? 50 : 70,
          height: isRecording ? 50 : 70,
        }
      default:
        return {
          backgroundColor: 'white',
        }
    }
  }

  const handleRecordButtonPress = () => {
    setIsRecording(prev => !prev);
  }

  return (
    <View style={{backgroundColor: 'gray', flex: 1}}>
      <View style={{position: 'absolute', top: 20, right: 20, gap: 20}}>
        <View style={styles.captureSettingsButton}></View>
        <View style={styles.captureSettingsButton}></View>
        <View style={styles.captureSettingsButton}></View>
      </View>
      <View style={styles.bottomBar}>
        <Text>Home</Text>
        <Text>Camera</Text>
        <Text>Map</Text>
        <Text>Profile</Text>
      </View>
      <View style={styles.horizontalScroll}>
        <SwipeableItems 
          isRecording={isRecording}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          data={data}
        />
      </View>
      <View>
        <View style={styles.captureButton}>
          <View style={styles.captureButtonOutline}>
            <TouchableOpacity 
              onPress={handleRecordButtonPress} 
              style={{...styles.captureButtonCircle, ...getSelectedModeStyle()}} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  captureButton: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
  },
  captureButtonOutline: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureSettingsButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  horizontalScroll: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 200,
  },
  horizontalScrollItem: {
    justifyContent: 'center',
    alignItems: 'center',
    // width,
    width: 80,
    marginHorizontal: 20,
  },
  horizontalScrollItemText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomBar: {
    backgroundColor: 'white',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 'auto',
  },
});

export default App;
