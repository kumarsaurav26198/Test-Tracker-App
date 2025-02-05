import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowDownIcon, ArrowUpIcon, RefreshCcwIcon, ShoppingCartIcon, UserIcon } from '../../assets/svg';
import Colors from '../../Themes/Colors';

const StatisticCard = ({ item, index }) => {

  const formatValue = (value, type) => {
    if (type === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatPercentage = (percentage) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(percentage / 100);
  };

  const formatToday = (value, type) => {
    if (type === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(value);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'dollar':
        return <Text style={styles.icon}>$</Text>;
      case 'user':
        return <UserIcon />;
      case 'cart':
        return <ShoppingCartIcon />;
      case 'refund':
        return <RefreshCcwIcon />;
      default:
        return null;
    }
  };

  const backgroundColor = index === 0 ? Colors.blue : Colors.white;
  const color = index === 0 ? Colors.white : Colors.black;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>{getIcon(item.icon)}</View>
        <Text style={[styles.title,{color}]}>{item.title}</Text>
      </View>
      <Text style={[styles.value,{color}]}>
        {formatValue(
          item.value,
          item.title === 'Total Sales' ? 'currency' : 'number',
        )}
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.percentageContainer}>
          {item.percentage > 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
          <Text style={[styles.percentageText,{color}]}>
            {formatPercentage(item.percentage)}
          </Text>
        </View>
        <Text style={[styles.todayIncrease,{color}]}>
          +
          {formatToday(
            item.today,
            item.title === 'Total Sales' ? 'currency' : 'number',
          )}{' '}
          today
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 16,
    borderBottomWidth: 1,
    marginBottom: 2, // Add marginBottom if needed for spacing
    borderBottomColor: Colors.gray,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 8,
  },
  icon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    color: '#e0e7ff',
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  todayIncrease: {
    color: '#e0e7ff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default StatisticCard;
