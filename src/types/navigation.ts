import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationStackParamList = {
  Startup: undefined;
  Example: undefined;
  TabNavigation: undefined;
  UserDetail: {
    data?: any;
  };
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
