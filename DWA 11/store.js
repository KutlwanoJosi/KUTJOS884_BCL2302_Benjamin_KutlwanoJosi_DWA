/**
 * initializing the state by calling the reducer with undefined as the initial state and an empty action {}.
 * We also initialize an empty array listeners to keep track of the subscribers to the store.
 */
class Store {
    constructor(reducer) {
      this.state = reducer(undefined, {});
      this.listeners = [];
      this.reducer = reducer;
    }
  
//Return the current state of the store
    getState() {
      return this.state;
    }
  
/**
 * It invokes the reducer function with the current state and the action to calculate the new state. 
 * It then updates the state of the store. After that, it notifies all the listeners/subscribers by invoking each listener function.
 */
    dispatch(action) {
      this.state = this.reducer(this.state, action);
      this.listeners.forEach(listener => listener());
    }

/**
* It adds the listener to the listeners array. The method returns a function that can be used to unsubscribe the listener. 
* When the unsubscribe function is called, it removes the listener from the listeners array.
*/
    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }
  }
  
/** 
*Reducer function for the tally counter
*It uses a switch statement to determine the action type and perform the corresponding state update. 
*If the action type is not recognized, it returns the current state.
*/
  const tallyReducer = (state = 0, action) => {
    switch (action.type) {
      case 'ADD':
        return state + 1;
      case 'SUBTRACT':
        return state - 1;
      case 'RESET':
        return 0;
      default:
        return state;   
    }
  };
  
  // Create the store with the tallyReducer
  const store = new Store(tallyReducer);
  
  // Log the state to the console whenever it changes
  const unsubscribe = store.subscribe(() => {
    console.log('State:', store.getState());
  });
  
  /* Scenarios */
  // Increment the counter by one (initial state: 0)
  console.log('Scenario 1');
  console.log('Initial State:', store.getState());
  
  // Increment the counter by one (initial state: 0)
  console.log('Scenario 2');
  store.dispatch({ type: 'ADD' });
  store.dispatch({ type: 'ADD' });
  
  // Decrement the counter by one (initial state: 2)
  console.log('Scenario 3');
  store.dispatch({ type: 'SUBTRACT' });
  
  // Resetting the Tally Counter (initial state: 1)
  console.log('Scenario 4');
  store.dispatch({ type: 'RESET' });
  
  //Removes the previously subscribed listener from receiving further state changes.
  unsubscribe();
