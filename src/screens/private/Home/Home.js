import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { C_Text, Header } from '../../../component/commonComponent';
import Colors from '../../../Themes/Colors';
import { checkInternetConnection } from '../../../utils/networkUtils';
import { connect } from 'react-redux';
import AllTransctionContainer from '../../../container/AllTransctionContainer';
import { AddIcon } from '../../../assets/svg';
import { navigate } from '../../../service/navigationService';
import { AnalysisCard } from '../../../component/appComponent';

const Home = ({ loginRes, transactionRes }) => {
  const [ loading, setLoading ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const containerOpacity = useSharedValue(0);
  const containerTranslateY = useSharedValue(20);
  const animatedTextContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(containerOpacity.value, { duration: 1700 }),
      transform: [ { translateY: withTiming(containerTranslateY.value, { duration: 1700 }) } ],
    };
  });

  const checkInterNet = useCallback(async () => {
    const connected = await checkInternetConnection();
  }, []);

  useEffect(() => {
    containerOpacity.value = 1;
    containerTranslateY.value = 0;
    checkInterNet();
  }, []);

  useEffect(() => {
    const admittedPercentage = '90';
    setPercentage(admittedPercentage)
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    // Simulating network request
    setTimeout(() => {
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={[ 1 ]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <>
              <Animated.View style={[ styles.textContainer, animatedTextContainerStyle ]}>
                <C_Text text_title={loginRes?.data?.displayName ? `Welcome ${ loginRes?.data?.displayName }!` : ""} />
                <C_Text text_desc={loginRes?.data?.email ? `${ loginRes?.data?.email } Your email is ${ loginRes.emailVerified ? 'verified' : 'not verified' }.` : ""} />
                <C_Text text_desc={`Here's what's happening with\nyour expense today.`} />
                <AnalysisCard percentage={percentage} />
                <View style={styles.resentContainer}>
                  <C_Text text_title="Recent Transactions" />
                  <TouchableOpacity onPress={() => {
                    navigate("ManageReviews");
                  }}>
                    <AddIcon />
                  </TouchableOpacity>
                </View>
                {loading ? null : (
                  <AllTransctionContainer />
                )}
              </Animated.View>
            </>
          );
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  loginRes: state.loginReducers,
  transactionRes: state.transactionReducers,
});

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  textContainer: {
    padding: 10,
    paddingBottom: 25,
  },
  resentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
});
