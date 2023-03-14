import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}

export function TaskItem({ task, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState(task.title)

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setNewTaskTitle(task.title)
    setIsEditing(false)
  }

  function handleSubmitEditing() {
    editTask(task.id, newTaskTitle)
    setNewTaskTitle(task.title)
    setIsEditing(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <View style={{ flex: 1, }}>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => !isEditing && toggleTaskDone(task.id)}
      >
        <View
          testID={`marker-${index}`}
          style={task.done ? styles.taskMarkerDone : styles.taskMarker}
        >
          {task.done && (
            <Icon
              name="check"
              size={12}
              color="#FFF"
            />
          )}
        </View>

        <TextInput
          ref={textInputRef}
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          onSubmitEditing={handleSubmitEditing}
          editable={isEditing}
          style={task.done ? styles.taskTextDone : styles.taskText}
        />

        <View style={styles.iconsContainer} >
          {isEditing ? (
            <TouchableOpacity
              onPress={handleCancelEditing}
            >
              <Icon name="x" size={24} color="#b2b2b2" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleStartEditing}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
          )}

          <View
            style={styles.iconsDivider}
          />

          <TouchableOpacity
            disabled={isEditing}
            onPress={() => removeTask(task.id)}
          >
            <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
          </TouchableOpacity>
        </View>

      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconsDivider: {
    backgroundColor: '#C4C4C4',
    opacity: 0.24,
    height: 20,
    width: 1,
    marginHorizontal: 12,
  }
})