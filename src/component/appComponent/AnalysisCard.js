import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import * as Progress from 'react-native-progress';

const { width } = Dimensions.get('window');

export default function AnalysisCard({ percentage }) {
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Add a small delay to ensure the component is fully rendered
    const timer = setTimeout(() => {
      setProgress(percentage / 100);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <View style={styles.analysisCard}>
      <View style={styles.midCont}>
        <Progress.Circle
          ref={progressRef}
          animated={true}
          color="#6A24FF"
          strokeCap="round"
          thickness={12}
          borderWidth={0}
          showsText={true}
          textStyle={styles.progressText}
          unfilledColor="#E2E2E2"
          size={140}
          indeterminate={false}
          progress={progress}
        />
      </View>
      {/* <Text style={styles.topText}>38m 36s Until last entry</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  analysisCard: {
    width: width - 30,
    paddingTop: 20,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 3.84,
    // elevation: 5,
    alignItems: 'center',
    alignSelf: "center"
  },
  topText: {
    color: '#000', // Change to your desired text color
    fontSize: 13,
    fontWeight: "500",
    marginVertical: 15,
  },
  midCont: {
    height: 150,
    width: 250,
    margin: 20,
    alignItems: "center",
  },
});