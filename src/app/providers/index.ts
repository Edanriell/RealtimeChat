import compose from "compose-function";
import { withReactHotToast } from "./with-react-hot-toast";

export const withProviders = compose(withReactHotToast);
