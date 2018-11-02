import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import DevTools from '../containers/devTools';


export function configureDevStore() {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant()), DevTools.instrument())
  );
}

export default function configureStore() {
  return createStore(
    rootReducer,
    DevTools.instrument(applyMiddleware(thunk))
  );
}
