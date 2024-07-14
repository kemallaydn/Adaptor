import { CommonActions } from '@react-navigation/native';

let navigator: { dispatch: (arg0: CommonActions.Action) => void; };

function setTopLevelNavigator(navigatorRef: { dispatch: (arg0: CommonActions.Action) => void; }) {
  navigator = navigatorRef;
}

function navigate(routeName: any) {
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
    })
  );
}

function navigateToParams(routeName: any, params: any) {
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    })
  );
}

function stackReset(routeName) {
  navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName}],
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator,
  navigateToParams,
  stackReset,
};
