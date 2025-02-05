import { CommonActions } from '@react-navigation/native';

let navigator;

export function setNavigator(ref) {
  navigator = ref;
}

export function navigate(name, params) {
  if (navigator) {
    navigator.dispatch(
      CommonActions.navigate({
        name,
        params,
      })
    );
  }
}

export function reset(routes) {
  if (navigator) {
    navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes,
      })
    );
  }
}

export function goBack() {
  if (navigator) {
    navigator.dispatch(CommonActions.goBack());
  }
}
