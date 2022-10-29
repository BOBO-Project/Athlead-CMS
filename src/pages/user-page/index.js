import User from "./User";
import { WEB_PATH } from "../../constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  path: WEB_PATH.user,
  element: <User />,
  sider: true,
};
