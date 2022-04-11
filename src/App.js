import logo from "./logo.svg";
import Pusher from "pusher-js";
import { PusherProvider } from "@harelpls/use-pusher";
import { Ui } from "./Application/ui";

const config = {
  clientKey: process.env.REACT_APP_KEY,
  cluster: process.env.REACT_APP_CLUSTER,

  triggerEndpoint: "/pusher/trigger",
  authEndpoint: "/pusher/auth",
  auth: {
    headers: { Authorization: "Bearer token" },
  },
};

const App = () => {
  return <div>
    <PusherProvider {...config}>
      <Ui/>
    </PusherProvider>;

  </div>
};

export default App;
