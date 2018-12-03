 import { createStore, applyMiddleware, compose } from 'redux';
//import * as redux from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from 'reducers';
import thunk from 'redux-thunk';
import DevTools from 'containers/devTools';


export default function configureStore() {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant()),DevTools.instrument())
  );
}


//compose(
  //applyMiddleware(thunk, reduxImmutableStateInvariant()), DevTools.instrument())
  //);
// const middleware = applyMiddleware(thunk, immutableState());

// const storeFactory = compose(middleware, DevTools.instrument())(createStore);

// export default function configureStore(){
//   return storeFactory;
// }

