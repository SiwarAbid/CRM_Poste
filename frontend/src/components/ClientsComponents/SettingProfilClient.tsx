import React, { useState } from "react";
import ModalPI from "../ClientsComponents/ModalPI";
import ModalSP from "../ClientsComponents/ModalSocial";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import InfoUser from "./SettingInfoUser";
import InfoAccount from "./SettingAccountInfo";

import "../../assets/css/settingProfil.css";
interface PropsSettingProfil {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  prof: string;
  adresse: string;
  user_email: string;
  user_phone: number;
  date_birth: string;
  lieu_birth: string;
  status_civil: string;
  cat_prof: string;
}
interface DetailsUser {
  PI: {
    typePI: string;
    numPI: string;
    datePI: string;
    image: {
      recto: string;
      verso: string;
    };
  };
  reseaux_sociaux: {
    fcb: string;
    insta: string;
    whatsapp: string;
  };
}

function ProfilClient(props: PropsSettingProfil) {
  const [detailsUser, setDetailsUser] = useState<DetailsUser>({
    PI: {
      typePI: "",
      numPI: "",
      datePI: "",
      image: {
        recto: "",
        verso: "",
      },
    },
    reseaux_sociaux: {
      fcb: "",
      insta: "",
      whatsapp: "",
    },
  });

  const [isModalOpenPI, setIsModalOpenPI] = useState(false);
  const [isModalOpenSP, setIsModalOpenSP] = useState(false);

  const handleModalPI = () => {
    setIsModalOpenPI(true);
  };
  const handleModalSP = () => {
    setIsModalOpenSP(true);
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "User Info",
      children: <InfoAccount props={props} />,
    },
    {
      key: "2",
      label: "Additional Information",
      children: <InfoUser props={props} />,
    },
  ];
  return (
    <div className="containerSettingProfil">

      <div className="row">
        <div className="first-div" style={{ width: "210px" }}>
          <div className="col-xl-4">
            {/* <!-- Profile picture cardSettingProfil--> */}
            <div className="cardSettingProfil">
              <div className="cardSettingProfil-header">Profile Picture</div>
              <br />
              <div className="cardSettingProfil-body text-center">
                {/* <!-- Profile picture image--> */}
                <div className="img-account-profile rounded-circle" />
                {/* <!-- Profile picture help block--> */}
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                <br />
                {/* <!-- Profile picture upload button--> */}
                <button className="btnSettingProfil" type="button">
                  Upload new image
                </button>
              </div>
            </div>
          </div>
          <div className="buttons">
            <div>
              <button className="btnPI" onClick={handleModalPI}>
                Update Identity Document
              </button>
            </div>
            <div>
              <button className="btnSP" onClick={handleModalSP}>
                Social Profile
              </button>
            </div>
          </div>
        </div>
        <div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
        </div>
      </div>
      <div className="Models">
        <ModalPI
          isModalOpen={isModalOpenPI}
          setIsModalOpen={setIsModalOpenPI}
          data={{
            id: props.id,
            typePI: detailsUser.PI.typePI,
            numPI: detailsUser.PI.numPI,
            datePI: detailsUser.PI.datePI,
            imgPI_recto: detailsUser.PI.image.recto,
            imgPI_verso: detailsUser.PI.image.verso,
          }}
        />
        <ModalSP
          isModalOpen={isModalOpenSP}
          setIsModalOpen={setIsModalOpenSP}
          data={{ id: props.id, reseaux_sociaux: detailsUser.reseaux_sociaux }}
        />
      </div>
    </div>
  );
}

export default ProfilClient;
