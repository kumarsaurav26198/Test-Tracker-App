import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native';
import {
  DownArrow,
  OverviewActive,
  OverviewInactive,
  ProductActive,
  ProductInactive,
  OrdersActive,
  OrdersInactive,
  CustomersActive,
  CustomersInactive,
  ManageReviewsActive,
  ManageReviewsInactive,
  CheckoutActive,
  CheckoutInactive,
  SettingsActive,
  SettingsInactive,
} from '../../assets/svg';
import Colors from '../../Themes/Colors';
import { useDispatch } from 'react-redux';
import { logOutRequest } from '../../store/redux/action/authActions';

const SideBarText = ({ navigation }) => {
  const dispatch = useDispatch();

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const Data = [
    {
      title: 'Home',
      navigate: 'Home',
      notificationsCount: 6,
      iconActive: <OverviewActive />,
      iconInactive: <OverviewInactive />,
    },
    {
      title: 'Post',
      navigate: "Product",
      // subScreens: [
      //   { title: 'Product 1 ', navigate: 'Product' },
      //   // { title: 'Product 2', navigate: 'Product' },
      //   // { title: 'Product 3', navigate: 'Product' },
      // ],
      iconActive: <ProductActive />,
      iconInactive: <ProductInactive />,
    },
    // {
    //   title: 'Orders',
    //   navigate: null,
    //   subScreens: [
    //     { title: 'Orders 1', navigate: 'Orders' },
    //     { title: 'Orders 2', navigate: 'Orders' },
    //   ],
    //   iconActive: <OrdersActive />,
    //   iconInactive: <OrdersInactive />,
    // },
    {
      title: 'Transaction',
      navigate: null,
      subScreens: [
        { title: 'Add Transaction', navigate: 'ManageReviews' },
        // { title: 'Get Transaction', navigate: 'Orders' },
      ],
      iconActive: <OrdersActive />,
      iconInactive: <OrdersInactive />,
    },

    // {
    //   title: 'Add Transaction',
    //   navigate: 'ManageReviews',
    //   notificationsCount: 6,
    //   iconActive: <ManageReviewsActive />,
    //   iconInactive: <ManageReviewsInactive />,
    // },
    {
      title: 'Checkout',
      navigate: 'Checkout',
      notificationsCount: 6,
      iconActive: <CheckoutActive />,
      iconInactive: <CheckoutInactive />,
    },
    {
      title: 'Contact Us',
      navigate: "ContactUs",
      // subScreens: [
      //   // { title: 'Customers', navigate: 'Customers' },
      //   { title: 'Contact Us', navigate: 'ContactUs' },
      // ],
      notificationsCount: 6,
      iconActive: <CustomersActive />,
      iconInactive: <CustomersInactive />,
    },
    {
      title: 'Settings',
      navigate: 'Settings',
      notificationsCount: 6,
      iconActive: <SettingsActive />,
      iconInactive: <SettingsInactive />,
    },
  ];

  const handleNavigation = (navigate, index) => {
    setSelectedIndex(index);
    if (navigate) {
      navigation.navigate(navigate);
    }
  };

  const toggleSubMenu = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const handleLogout = async () => {
    await dispatch(logOutRequest());
    navigation.closeDrawer()
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {Data.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                if (item.subScreens) {
                  toggleSubMenu(index);
                } else {
                  handleNavigation(item.navigate, index);
                }
              }}
              style={styles.menuItem}
              activeOpacity={0.7}
            >
              {selectedIndex === index || expandedIndex === index
                ? item.iconActive
                : item.iconInactive}
              <Text style={styles.menuText}>{item.title}</Text>
              {item.subScreens && (
                <DownArrow
                  style={[styles.redCircle, expandedIndex === index && styles.expanded]}
                />
              )}
            </TouchableOpacity>

            {expandedIndex === index && item.subScreens && (
              <View style={styles.subMenu}>
                {item.subScreens.map((subItem, subIndex) => (
                  <TouchableOpacity
                    key={subIndex}
                    onPress={() => handleNavigation(subItem.navigate, index)}
                    style={styles.subMenuItem}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.subMenuText}>{subItem.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
        activeOpacity={0.7}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SideBarText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
  },
  menuItem: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 45,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  menuText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10, // To add space between icon and text
  },
  redCircle: {
    position: 'absolute',
    right: 25,
    transform: [{ rotate: '90deg' }],
  },
  expanded: {
    transform: [{ rotate: '180deg' }],
  },
  subMenu: {
    paddingLeft: 20,
    backgroundColor: '#E2E2E2',
    marginHorizontal: 3,
  },
  subMenuItem: {
    paddingVertical: 5,
  },
  subMenuText: {
    color: 'black',
    fontSize: 16,
  },
  logoutButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth:0.7,
    borderColor:"#ccc"
  },
  logoutText: {
    color:Colors.black,
    fontSize: 18,
    fontWeight: '600',
  },
});
