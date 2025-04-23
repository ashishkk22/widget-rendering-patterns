import { useReducer } from "react";
import { Button, Box } from "@mui/material";

import { TimeSeriesWidget } from "../../../Widgets/TimeSeriesWidget";
import { DashboardDataSourceType } from "../DataSources/types";
import RadialBarWidget from "../../../Widgets/RadialBarWidget";

const Dashboard = () => {
  const [refreshHandle, refresh] = useReducer((x: number) => x + 1, 0);

  return (
    <>
      <Box display="flex" justifyContent="flex-end" margin={3}>
        <Button variant="contained" onClick={refresh}>
          Refresh
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-evenly" marginTop={5}>
        <Box width="45vw" height="40vh" mr={2}>
          <TimeSeriesWidget
            dataSource={{
              properties: {},
              type: DashboardDataSourceType.DashboardTimeSeriesWidget,
            }}
            refreshHandle={refreshHandle}
          />
        </Box>
        <Box width="45vw" height="40vh">
          <RadialBarWidget
            dataSource={{
              properties: {
                minValue: 5,
                maxValue: 22,
              },
              type: DashboardDataSourceType.DashboardRadialBarWidget,
            }}
            refreshHandle={refreshHandle}
          />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
