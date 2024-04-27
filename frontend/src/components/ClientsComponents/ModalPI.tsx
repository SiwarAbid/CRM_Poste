import React, { useState } from "react";
import { Modal, message } from "antd";
import "../../assets/css/ModalPI.css";
interface propModalPI {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    id: number;
    typePI: string;
    numPI: string;
    datePI: string;
    imgPI_recto: string;
    imgPI_verso: string;
  };
}
const App: React.FC<propModalPI> = ({ isModalOpen, setIsModalOpen, data }) => {
  const [dataPIUser, setDataPIUser] = useState<{
    typePI: string;
    numPI: string;
    datePI: string;
    imgPI_recto: string;
    imgPI_verso: string;
  }>({
    typePI: data.typePI,
    numPI: data.numPI,
    datePI: data.datePI,
    imgPI_recto: data.imgPI_recto,
    imgPI_verso: data.imgPI_verso,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };
  const handleOk = () => {
    fetch(`http://localhost:3000/updatePI/${data.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(dataPIUser),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Res: ", res);
          console.log("Success"); //Ajoutez le console.log pour indiquer le succès
          return res.json();
        } else {
          console.log("ERROR CASE: ", res);
          error();
          throw new Error("Erreur lors de la requête"); // Gérez les erreurs ici si nécessaire
        }
      })
      .then((data) => {
        console.log("Resultat Data: ", data);
        success();
        setIsModalOpen(false);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function formatDateStringToDate(dateString: string) {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = formatDateStringToDate(event.target.value);
    console.log("dateOfBirth: ", dateString);
    setDataPIUser({ ...dataPIUser, datePI: dateString });
  };

  const handleInputChangeSettingProfil = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDataPIUser({
      ...dataPIUser,
      [name]: value,
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileName: string
  ) => {
    const file = e.target.files?.[0]; // Récupère le premier fichier sélectionné
    if (file) {
      // Crée un objet URL à partir du fichier sélectionné
      const imgUrl = URL.createObjectURL(file);
      // Met à jour l'état local avec l'URL de l'image
      setDataPIUser({
        ...dataPIUser,
        [fileName]: imgUrl,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Update Identity Document"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="UPDATE"
      >
        <div className="boxModalPI">
          <div className="col-md-6">
            <div className="labels" style={{ display: "flex" }}>
              <label className="small mb-1">
                <input
                  type="radio"
                  style={{ width: 15 }}
                  name="typePI"
                  value="CIN"
                  onChange={handleInputChangeSettingProfil}
                />
                <p style={{ marginTop: -52, padding: 20 }}>CIN</p>
              </label>
              <div className="espacediv"></div>

              <label className="small mb-1">
                <input
                  type="radio"
                  style={{ width: 15 }}
                  name="typePI"
                  value="Carte Séjour"
                  onChange={handleInputChangeSettingProfil}
                />
                <p style={{ marginTop: -52, padding: 20 }}>Carte séjour</p>
              </label>
            </div>
            <label className="small mb-1" htmlFor="inputNumPI">
              Num Carte
            </label>
            <input
              className="form-control inputFirstName"
              id="inputNumPI"
              type="text"
              placeholder="Enter your num identity doc"
              name="numPI"
              value={dataPIUser.numPI}
              onChange={handleInputChangeSettingProfil}
            />
          </div>
          <div className="col-md-6">
            <label className="small mb-1" htmlFor="inputDatePI">
              Release date
            </label>
            <input
              className="form-control inputFirstName"
              id="inputDatePI"
              type="date"
              placeholder="Enter your release identity document date"
              name="date_pi"
              value={dataPIUser.datePI}
              onChange={handleDateChange}
            />
          </div>
          <div className="labels">
            <label>Version Recto: </label>
            <div className="espacediv"></div>
            <label className="secLabel">Version Verso: </label>
          </div>
          <form className="SettingProfilModalPI">
            <div className="jUploader panel-upload panel-upload-single">
              <div
                className="jUploadedImage panel-uploaded-image"
                style={{ display: "none" }}
              >
                <button
                  type="button"
                  className="jDestroyImage btn-image-close-red"
                >
                  &times
                </button>
                <img
                  className="jImage"
                  src={dataPIUser.imgPI_recto}
                  alt="identity doc recto"
                />
              </div>

              <div className="jUploadDropzone panel-upload-dropzone">
                <div className="panel-upload-help-message">
                  Drag file here or click button to upload.
                </div>
                <input
                  type="file"
                  style={{
                    appearance: "none",
                    width: 10,
                    marginLeft: 20,
                    zIndex: 1,
                    position: "absolute",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    paddingRight: "0px",
                    background: "transparent",
                    borderColor: "transparent",
                  }}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "imgPI_recto")}
                />
                <button className="jUploadButton btn btn-uploader" disabled>
                  Choose File
                </button>
                <div
                  className="jUploadProgress progress active"
                  style={{ display: "none" }}
                >
                  <div
                    className="jUploadProgressBar progress-bar"
                    role="progressbar"
                    aria-valuenow={10}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <div className="jUploadMessage panel-upload-message error"></div>
              </div>
            </div>
            <div className="espacediv"></div>
            <div className="jUploader panel-upload panel-upload-single">
              <div
                className="jUploadedImage panel-uploaded-image"
                style={{ display: "none" }}
              >
                <button
                  type="button"
                  className="jDestroyImage btn-image-close-red"
                >
                  &times
                </button>
                <img
                  className="jImage"
                  src={dataPIUser.imgPI_verso}
                  alt="identity doc verso"
                />
              </div>

              <div className="jUploadDropzone panel-upload-dropzone">
                <div className="panel-upload-help-message">
                  Drag file here or click button to upload.
                </div>
                <input
                  type="file"
                  style={{
                    appearance: "none",
                    width: 10,
                    marginLeft: 20,
                    zIndex: 1,
                    position: "absolute",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    paddingRight: "0px",
                    background: "transparent",
                    borderColor: "transparent",
                  }}
                  onChange={(e) => handleFileChange(e, "imgPI_verso")}
                />
                <button className="jUploadButton btn btn-uploader" disabled>
                  Choose File
                </button>

                <div
                  className="jUploadProgress progress active"
                  style={{ display: "none" }}
                >
                  <div
                    className="jUploadProgressBar progress-bar"
                    role="progressbar"
                    aria-valuenow={10}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <div className="jUploadMessage panel-upload-message error"></div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default App;
