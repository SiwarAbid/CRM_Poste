// import React from "react";

// const Dashboard = () => {


//   return (
//     <div>
       
//         {/* <iframe
//           title="PalasteniesDataAnalysis"
//           width="1240"
//           height="1541.25"
//           src="https://app.powerbi.com/reportEmbed?reportId=54a8f35c-e73a-4a48-bc34-4895dfddedaf&autoAuth=true&ctid=8ba21021-cbf0-4b53-94c5-98cd97b6e887"
//           // frameborder={0}
//           allowFullScreen={true}
//           style={{ marginLeft: "240px" }}
//         /> */}
      
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect } from 'react';
import * as pbi from 'powerbi-client';

const PowerBiDashboard: React.FC = () => {
    useEffect(() => {
        const embedContainer = document.getElementById('embedContainer');
        if (!embedContainer) return;

        const config: pbi.IEmbedConfiguration = {
            type: 'dashboard',
            id: 'ID_DU_TABLEAU_DE_BORD',
            embedUrl: '/BankChurners.pdix',
            // accessToken: 'VOTRE_JETON_D_ACCES',
            tokenType: pbi.models.TokenType.Embed,
            settings: {
                filterPaneEnabled: false,
                navContentPaneEnabled: true
            }
        };

        const powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        powerbi.embed(embedContainer, config);

        return () => {
            // Aucune action spécifique de nettoyage nécessaire ici
        };
    }, []);

    return (
        <div id="embedContainer" style={{ height: '100vh' }}></div>
    );
};

export default PowerBiDashboard;

