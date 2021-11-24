import { Fragment } from "react";
import { KidarEcharts } from '../src/index'

const App = () => {
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>
          <h1>Hello AsurRaa</h1>
          <KidarEcharts style={{ height: '420px', width: '660px' }}></KidarEcharts>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
