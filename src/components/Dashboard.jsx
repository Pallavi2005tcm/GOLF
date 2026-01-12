import React from 'react';
import Card from './Card';
import WaterLevelChart from './WaterLevelChart';
import RainfallChart from './RainfallChart';
import FloodMap from './FloodMap';
import Statistics from './Statistics';

const Dashboard = ({
  waterLevelData,
  rainfallData,
  waterLevel,
  rainfall,
  affectedAreas,
  lastUpdated,
  alertShown,
  setAlertShown
}) => {
  return (
    <div className="dashboard">
      <Card 
        title="Water Level Monitoring" 
        icon="fas fa-water"
        lastUpdated={lastUpdated.waterLevel}
      >
        <WaterLevelChart 
          data={waterLevelData} 
          currentValue={waterLevel}
          alertShown={alertShown}
          setAlertShown={setAlertShown}
        />
      </Card>
      
      <Card 
        title="Rainfall Measurement" 
        icon="fas fa-cloud-rain"
        lastUpdated={lastUpdated.rainfall}
      >
        <RainfallChart data={rainfallData} />
      </Card>
      
      <Card 
        title="Affected Areas" 
        icon="fas fa-map-marked-alt"
        lastUpdated={lastUpdated.map}
      >
        <FloodMap />
      </Card>
      
      <Card 
        title="Current Statistics" 
        icon="fas fa-chart-bar"
        lastUpdated={lastUpdated.stats}
      >
        <Statistics 
          waterLevel={waterLevel}
          rainfall={rainfall}
          affectedAreas={affectedAreas}
        />
      </Card>
    </div>
  );
};

export default Dashboard;