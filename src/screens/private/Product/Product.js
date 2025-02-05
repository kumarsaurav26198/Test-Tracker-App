import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { C_Text, Header } from '../../../component/commonComponent';
import Colors from '../../../Themes/Colors';
import { connect, useDispatch } from 'react-redux';
import { fetchEventRequest } from '../../../store/redux/action/eventAction';
import { ProductCard } from '../../../component/appComponent';
import { FontsWeights } from '../../../Themes/Fonts';

const Product = ({ eventRes }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = useCallback(() => {
    dispatch(fetchEventRequest());
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
    setRefreshing(false);
  }, [fetchProducts]);

  const containerOpacity = useSharedValue(0);
  const containerTranslateY = useSharedValue(20);

  const animatedTextContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(containerOpacity.value, { duration: 1700 }),
      transform: [{ translateY: withTiming(containerTranslateY.value, { duration: 1700 }) }],
    };
  });

  useEffect(() => {
    fetchProducts();
    containerOpacity.value = 1;
    containerTranslateY.value = 0;
  }, [fetchProducts]);

  const renderItem = useCallback(
    ({ item, index }) => (
      <Animated.View style={[animatedTextContainerStyle]}>
        <ProductCard {...item} index={index} />
      </Animated.View>
    ),
    [animatedTextContainerStyle]
  );

  const data = useMemo(() => eventRes?.data || [], [eventRes?.data]);

  return (
    <View style={styles.container}>
      <Header />
      <C_Text text_title="All Post" />
      {eventRes?.loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.bubbleText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          initialNumToRender={10} // Virtualization - Reduce initial number of items
          maxToRenderPerBatch={10} // Batch rendering to prevent memory overload
          windowSize={21} // Controls how many items outside the viewport are kept in memory
          removeClippedSubviews={true} // Improves performance by unmounting off-screen items
          ListEmptyComponent={ <View style={[styles.loadingContainer,{marginTop:100}]}><Text style={styles.bubbleText}>No Products Available.</Text></View>}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  eventRes: state.eventReducers,
});

export default connect(mapStateToProps)(Product);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: FontsWeights.FW400,
  },
});
