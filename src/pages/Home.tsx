import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const task = tasks.find(task => task.title === newTaskTitle)
    if (task) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTasks => [...oldTasks, data])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(tasks.map(task => {
      if (task.id == id) {
        task.done = !task.done
      }
      return task
    }))
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        text: 'Não',
      },
      {
        text: 'Sim',
        onPress: () => setTasks(oldTasks => tasks.filter(task => task.id !== id))
      }
    ])

  }

  function handleEditTask(id: number, newTitle: string) {
    const task = tasks.find(task => task.title === newTitle)
    if (task) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return
    }

    setTasks(tasks.map(task => {
      if (task.id == id) {
        task.title = newTitle
      }
      return task
    }))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})