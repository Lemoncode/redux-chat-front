import { State } from './model';

// Root selectors.
export function coreSelector(state: State){ return state.core; }
export function podLobbySelector(state: State){ return state.podLobby; }
export function podChatSelector(state: State){ return state.podChat; }
