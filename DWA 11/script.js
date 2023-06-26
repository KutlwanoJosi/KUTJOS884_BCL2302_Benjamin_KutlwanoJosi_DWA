class Store {
    constructor(reducer) {
      this.state = reducer(undefined, {});
      this.listeners = [];
      this.reducer = reducer;
    }
  
    getState() {
      return this.state;
    }
  
    dispatch(action) {
      this.state = this.reducer(this.state, action);
      this.listeners.forEach(listener => listener());
    }
  
    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }
  }
  
  // Reducer function for the tally counter
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
  
  // Unsubscribe from state changes
  unsubscribe();
