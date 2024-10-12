import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'; // Install moment.js for date manipulation

export default function RankScreen() {
  const [tasks, setTasks] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [monthlyTasks, setMonthlyTasks] = useState([]);
  const [loggedEmail, setLoggedEmail] = useState('');
  const [userRank, setUserRank] = useState({ week: {}, month: {} });

  useEffect(() => {
    getEmail();
    fetchTasks();
  }, []);

  const getEmail = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('userEmail'); // Retrieve the logged-in user's email
      if (savedEmail !== null) {
        setLoggedEmail(savedEmail);
      }
    } catch (error) {
      console.error('Error retrieving email:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://192.168.8.130:3000/backend/task/taskview'); // Replace with your backend API URL
      const data = await response.json();

      // Group tasks by task_type
      const groupedTasks = groupByTaskType(data);

      // Filter tasks for the current week and month
      const currentWeeklyTasks = filterTasksByWeek(groupedTasks);
      const currentMonthlyTasks = filterTasksByMonth(groupedTasks);

      // Rank tasks within each group (weekly and monthly)
      const rankedWeeklyTasks = rankTasksByType(currentWeeklyTasks);
      const rankedMonthlyTasks = rankTasksByType(currentMonthlyTasks);

      setWeeklyTasks(rankedWeeklyTasks);
      setMonthlyTasks(rankedMonthlyTasks);

      // Calculate and set the user's rank for each task_type (weekly and monthly)
      calculateUserRank(rankedWeeklyTasks, 'week');
      calculateUserRank(rankedMonthlyTasks, 'month');
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Alert.alert('Error', 'Could not load tasks');
    }
  };

  const groupByTaskType = (tasks) => {
    return tasks.reduce((acc, task) => {
      if (!acc[task.task_type]) {
        acc[task.task_type] = [];
      }
      acc[task.task_type].push(task);
      return acc;
    }, {});
  };

  const filterTasksByWeek = (groupedTasks) => {
    let weeklyTasks = {};
    Object.keys(groupedTasks).forEach((taskType) => {
      if (taskType === 'week') { // Only include tasks with task_type = "week"
        weeklyTasks[taskType] = groupedTasks[taskType].filter(task =>
          moment(task.date).isSame(moment(), 'week') // Check if task is from the current week
        );
      }
    });
    return weeklyTasks;
  };

  const filterTasksByMonth = (groupedTasks) => {
    let monthlyTasks = {};
    Object.keys(groupedTasks).forEach((taskType) => {
      if (taskType === 'month') { // Only include tasks with task_type = "month"
        monthlyTasks[taskType] = groupedTasks[taskType].filter(task =>
          moment(task.date).isSame(moment(), 'month') // Check if task is from the current month
        );
      }
    });
    return monthlyTasks;
  };

  const rankTasksByType = (groupedTasks) => {
    let rankedTasks = [];
    Object.keys(groupedTasks).forEach((taskType) => {
      // Sort tasks by weight for each task_type
      const sortedTasks = groupedTasks[taskType].sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));

      // Assign ranks within each task_type
      sortedTasks.forEach((task, index) => {
        task.rank = index + 1; // Rank starts from 1
      });

      rankedTasks = [...rankedTasks, ...sortedTasks]; // Combine all ranked tasks into a single array
    });
    return rankedTasks;
  };

  const calculateUserRank = (rankedTasks, period) => {
    const userRanks = {};

    rankedTasks.forEach((task) => {
      if (task.email === loggedEmail) {
        if (!userRanks[task.task_type]) {
          userRanks[task.task_type] = task.rank; // Store the user's rank for each task_type
        }
      }
    });

    setUserRank((prev) => ({ ...prev, [period]: userRanks })); // Set the user's rank for each task_type and period
  };

  const renderItem = ({ item }) => {
    const isUserTask = item.email === loggedEmail; // Check if the task belongs to the logged-in user
    return (
      <View style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: isUserTask ? '#b2ebf2' : 'transparent', // Highlight user's task
      }}>
        <Text style={{ fontWeight: isUserTask ? 'bold' : 'normal', color: 'black' }}>Email: {item.email}</Text>
        <Text style={{ color: 'black' }}>Weight: {item.weight}</Text>
        <Text style={{ color: 'black' }}>Task Type: {item.task_type}</Text>
        <Text style={{ color: 'black' }}>Rank: {item.rank}</Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../assets/bg2.png')} // Replace with your image URL
      style={styles.background}
    >
      <View style={{ flex: 1, padding: 20 }}>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: 'white' }}>Rank Screen</Text>

        {/* Display Logged-in User's Ranks for Each Task Type (Weekly) */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: 'white' }}>Weekly Rankings</Text>
        {Object.keys(userRank.week).map((taskType) => (
          <View key={taskType} style={{ padding: 10, backgroundColor: '#e0f7fa', marginBottom: 20 }}>
            <Text style={{ color: 'black' }}>Your Weekly Rank for {taskType}: {userRank.week[taskType]}</Text>
          </View>
        ))}

        {/* List All Users with Weekly Ranks */}
        <FlatList
          data={weeklyTasks}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />

        {/* Display Logged-in User's Ranks for Each Task Type (Monthly) */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: 'green' }}>Monthly Rankings</Text>
        {Object.keys(userRank.month).map((taskType) => (
          <View key={taskType} style={{ padding: 10, backgroundColor: '#e0f7fa', marginBottom: 20 }}>
            <Text style={{ color: 'black' }}>Your Monthly Rank for {taskType}: {userRank.month[taskType]}</Text>
          </View>
        ))}

        {/* List All Users with Monthly Ranks */}
        <FlatList
          data={monthlyTasks}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});
