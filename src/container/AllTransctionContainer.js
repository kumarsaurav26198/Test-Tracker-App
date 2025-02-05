import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import Colors from '../Themes/Colors';
import moment from 'moment';
import { FontSize, FontsWeights } from '../Themes/Fonts';
import { AddIcon, ArrowDownIcon, ArrowUpIcon } from '../assets/svg';
import { navigate } from '../service/navigationService';

const AllTransctionContainer = ({ transactionRes }) => {
  const [ selectedCategory, setSelectedCategory ] = useState('All');

  const categories = [ 'All', ...new Set(transactionRes.transactions.map(item => item.category)) ];
  const filteredTransactions = selectedCategory === 'All'
    ? transactionRes.transactions.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
    : transactionRes.transactions
      .filter(item => item.category === selectedCategory)
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending for filtered transactions


  const renderCategoryFilter = () => {
    return (
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item}
            style={[ styles.categoryButton, selectedCategory === item && styles.selectedCategoryButton ]}
            onPress={() => setSelectedCategory(item)}>
            <Text style={[ styles.categoryButtonText, selectedCategory === item && styles.selectedCategoryButtonText ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryFilterContainer}
      />
    );
  };

  const renderTransactionItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.transactionItem} onPress={() => { navigate("EditTranscation", { item }); }}>
        <View>
          <Text style={styles.categoryText}>{item.category}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
        <View>

          <Text style={styles.descriptionText}>
          {item?.incomeOrExpense === 'expense' && (
          <ArrowDownIcon  />
        )}
        {item?.incomeOrExpense === 'income' && (
          <ArrowUpIcon />
        )}
            {`${ item?.incomeOrExpense === 'expense' ? ' -' : ' +' } $${ item.amount }`}

          </Text>
          <Text style={styles.descriptionText}>{moment(item?.date).format('MMM Do, YYYY, h:mm A')}</Text>
        </View>

      </TouchableOpacity>
    );
  };
  const renderEmptyList = () => (
    <View style={{ alignItems: 'center', marginTop: 50 }}>
      <Text>---- No Transcation Found ----</Text>
      <TouchableOpacity onPress={() => {
        navigate("ManageReviews");
      }}>
        <AddIcon />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderCategoryFilter()}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredTransactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={<View style={{ height: 100 }} />}
        
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  transactionRes: state.transactionReducers,
});

export default connect(mapStateToProps)(AllTransctionContainer);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  categoryFilterContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryButton: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: Colors.lightgrey,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center"
  },
  selectedCategoryButton: {
    backgroundColor: Colors.black, // Highlight selected category
  },
  categoryButtonText: {
    fontSize: FontSize.FS16,
    color: Colors.black,

  },
  selectedCategoryButtonText: {
    color: Colors.white,
    fontWeight: FontsWeights.FW600,
    alignItems: "center"
  },
  transactionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  categoryText: {
    fontSize: FontSize.FS18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  descriptionText: {
    fontSize: FontSize.FS16,
    color: 'gray',
  },
});
