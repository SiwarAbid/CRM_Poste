// frontend/src/components/ClientList.jsx

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchActiveClients();
  }, []);

  const fetchActiveClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clients/active'); // Endpoint pour récupérer les clients actifs
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      } else {
        console.error('Error fetching active clients');
      }
    } catch (error) {
      console.error('Error fetching active clients:', error);
    }
  };

//   const handleEditClient = async (client) => {
//     setSelectedClient(client);
//     setModalVisible(true);
//   };

  const handleUpdateClient = async () => {
    try {
        // 
      const response = await fetch(`http://localhost:5000/api/clients/`, { // Endpoint pour mettre à jour les coordonnées d'un client
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedClient),
      });
      if (response.ok) {
        fetchActiveClients();
        setModalVisible(false);
      } else {
        console.error('Error updating client');
      }
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  const columns = [
    // Colonnes du tableau avec les données des clients
    {
      title: 'Actions',
      dataIndex: '',
      key: 'actions',
    //   render: (_, record) => (
    //     <div>
    //       <Button onClick={() => handleEditClient(record)}>Modifier</Button>
    //     </div>
    //   ),
    },
  ];

  return (
    <div>
      <Table dataSource={clients} columns={columns} />

      {/* Modale pour modifier les coordonnées d'un client */}
      <Modal
        title="Modifier les coordonnées du client"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>Annuler</Button>,
          <Button key="submit" type="primary" onClick={handleUpdateClient}>Sauvegarder</Button>,
        ]}
      >
        {/* Formulaire pour modifier les coordonnées */}
        <Form layout="vertical">
          <Form.Item label="Nom d'utilisateur">
            {/* <Input value={selectedClient ? selectedClient.username : ''} onChange={(e) => setSelectedClient({ ...selectedClient, username: e.target.value })} /> */}
          </Form.Item>
          <Form.Item label="Nom">
            {/* <Input value={selectedClient ? selectedClient.lastName : ''} onChange={(e) => setSelectedClient({ ...selectedClient, lastName: e.target.value })} /> */}
          </Form.Item>
          <Form.Item label="Prénom">
            {/* <Input value={selectedClient ? selectedClient.firstName : ''} onChange={(e) => setSelectedClient({ ...selectedClient, firstName: e.target.value })} /> */}
          </Form.Item>
          <Form.Item label="Email">
            {/* <Input value={selectedClient ? selectedClient.email : ''} onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })} /> */}
          </Form.Item>
          <Form.Item label="Téléphone">
            {/* <Input value={selectedClient ? selectedClient.phone : ''} onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })} /> */}
          </Form.Item>
          <Form.Item label="Adresse">
            {/* <Input value={selectedClient ? selectedClient.address : ''} onChange={(e) => setSelectedClient({ ...selectedClient, address: e.target.value })} /> */}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClientList;
