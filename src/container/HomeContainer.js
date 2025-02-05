import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Colors from '../Themes/Colors';
import { StatisticCard } from '../component/appComponent';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const data = [
  {
    id: '1',
    title: 'Total Sales',
    value: 391820.75,
    percentage: 21.9,
    today: 67000,
    icon: 'dollar',
    color: Colors.blue,
  },
  {
    id: '2',
    title: 'Visitor',
    value: 831071,
    percentage: 13,
    today: 7000,
    icon: 'user',
    color: Colors.green,
  },
  {
    id: '3',
    title: 'Total orders',
    value: 1042665,
    percentage: 5.7,
    today: 5000,
    icon: 'cart',
    color: Colors.green,
  },
  {
    id: '4',
    title: 'Refunded',
    value: 50441,
    percentage: -11,
    today: 21,
    icon: 'refund',
    color: Colors.red,
  },
];

const HomeContainer = () => {
  const listItemX = useSharedValue(-10); // Start X position off-screen to the left

  const AnimatedCard = ({ item, index }) => {
    // Define the animation style for X translation
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: listItemX.value }],
      };
    });

    // Start the animation when the component is mounted
    React.useEffect(() => {
      listItemX.value = withTiming(0, { duration: 2000 + index * 100 }); // Animation duration with slight delay for each item
    }, [listItemX, index]);

    return (
      <Animated.View style={[styles.cardContainer, animatedStyle]}>
        <StatisticCard item={item} index={index} />
      </Animated.View>
    );
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <AnimatedCard item={item} index={index} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 5, // Spacing between cards
  },
});

export default HomeContainer;
