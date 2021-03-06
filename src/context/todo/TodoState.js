import React, { useReducer, useContext } from 'react';
import {TodoContext} from './todoContext';
import {todoReducer} from './todoReducer'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, FETCH_TODOS } from '../types';
import {ScreenContext} from '../screen/screenContext';
import {Alert} from 'react-native';
import {SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR} from '../types'

export const TodoState = ({children}) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null
    }
    const [state, dispatch] = useReducer(todoReducer, initialState)
    const {changeScreen} = useContext(ScreenContext)

    const addToDos = async title => {
      const response = await fetch('https://rn-todo-app-9399c.firebaseio.com/todos.json', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title})
      })
      const data = await response.json()
      dispatch({type: ADD_TODO, title, id: data.name})
    }
    const removeToDo = id => {
        const todo = state.todos.find(t => t.id === id)
        Alert.alert(
                'Delete the element',
                `Are you sure to delete ${todo.title}?`,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed')
                  },
                  { text: 'OK', onPress: () => {
                    changeScreen(null)
                    dispatch({type: REMOVE_TODO, id})  
                  } }
                ],
                { cancelable: false }
              );         
    }

    const fetchToDos = async () => {
      const response = await fetch('https://rn-todo-app-9399c.firebaseio.com/todos.json', 
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
      const data = await response.json()
      console.log('Fetch data ', data)
      const todos = Object.keys(data).map(key => ({...data[key], id: key}))
      setTimeout(() => dispatch({type: FETCH_TODOS, todos}), 5000)
    } 
    const updateToDo = (id, title) => dispatch({type: UPDATE_TODO, id, title})

    const showLoader = () => {
      dispatch({type: SHOW_LOADER})
    }

    const hideLoader = () => {
      dispatch({type: HIDE_LOADER})
    }
    const showError = error => {
      dispatch({type: SHOW_ERROR, error})
    }

    const clearError = () => {
      dispatch({type: CLEAR_ERROR})
    }
    return (
    <TodoContext.Provider 
    value = {{
        todos: state.todos,
        addToDos,
        loading: state.loading,
        error: state.error,
        removeToDo,
        updateToDo,
        fetchToDos
    }}
    > 
    {children} 
    </TodoContext.Provider>
    )
}






