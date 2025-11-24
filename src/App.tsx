import "./App.css";
import { Typography } from "antd";
const { Text, Title } = Typography;

export function App() {
  return (
    <div className="AppContainer">
      <Title level={2}>Web development interview</Title>
      <Text>Your app goes here</Text>
    </div>
  );
}
