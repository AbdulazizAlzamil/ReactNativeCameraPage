/* eslint-disable */

import React, {useCallback} from 'react';
import {
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const colors = {
  black: '#323F4E',
  red: '#F76A6A',
  text: '#ffffff',
};

const ITEM_SIZE = width * 0.25;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

export default function SwipeableItems({ data, isRecording, selectedMode, setSelectedMode }) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const list = React.useRef(null);

  const onViewableItemsChanged = useCallback((info: any) => {
    info.changed.filter((item: any) => {
      item.isViewable ? console.log(item.item) : null;
      setSelectedMode(item.item);
    });
  }, []);

  const renderItems = ({item}) => {
    return (
      <View style={styles.renderedItems}>
        <Text style={[styles.text]}>
          {item}
        </Text>
      </View>
    )
  }

  return (
    <View>
      <FlatList
        ref={list}
        data={data}
        keyExtractor={item => item.toString()}
        horizontal
        bounces={false}
        getItemLayout={(data, index) => ({
          length: ITEM_SIZE,
          offset: ITEM_SIZE * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        style={{flexGrow: 0}}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        viewabilityConfig={{
          itemVisiblePercentThreshold: 500,
          minimumViewTime: 0,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        contentContainerStyle={{
          paddingHorizontal: ITEM_SPACING
        }}
        onMomentumScrollEnd={(ev) => {
          const newIndex = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
          setSelectedMode(data[newIndex]);
        }}
        scrollEnabled={!isRecording}
        pagingEnabled
        renderItem={renderItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
  text: {
    fontSize: ITEM_SIZE * 0.2,
    fontFamily: 'Menlo',
    color: colors.text,
    fontWeight: '900',
  },
  renderedItems: {
    width: ITEM_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});