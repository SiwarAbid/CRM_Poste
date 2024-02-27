import React from "react";

const Dashboard = () => {
  return (
    <div>
      <iframe
        title="PalasteniesDataAnalysis"
        width="1240"
        height="1541.25"
        src="https://app.powerbi.com/reportEmbed?reportId=54a8f35c-e73a-4a48-bc34-4895dfddedaf&autoAuth=true&ctid=8ba21021-cbf0-4b53-94c5-98cd97b6e887"
        // frameborder={0}
        allowFullScreen={true}
        style={{marginLeft: "240px"}}
      ></iframe>
    </div>
  );
};

export default Dashboard;
