import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../lib/api';
import { StatusCodes } from 'http-status-codes';
import { DeviceTable } from '../../components/tables/DeviceTable';
import { CreateDeviceModal } from '../../components/modals/devices/CreateDeviceModal';
import { EditDeviceModal } from '../../components/modals/devices/EditDeviceModal';
import { Button } from "flowbite-react";

export const AdminPage = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  async function getMe() {
    const response = await axios.get('/me');

    if (response.status !== StatusCodes.OK || response.data.role !== 'admin') {
      localStorage.removeItem('accessToken');
      navigate('/signin');
    }
  }

  async function getDevices() {
    const response = await axios.get('/devices');

    if (response.status === StatusCodes.OK) {
      setDevices(response.data);
      setIsLoading(false);
    }
  }

  function onCloseModal() {
    setOpenModal(false);
  }

  function onCloseEditModal() {
    setEditModalOpen(false);
  }

  function handleAddDevice(newDevice) {
    setDevices((prevDevices) => [...prevDevices, newDevice]);
  }

  function handleUpdateDevice(updatedDevice) {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === updatedDevice.id ? updatedDevice : device
      )
    );
  }

  function handleEditDevice(device) {
    setSelectedDevice(device);
    setEditModalOpen(true);
  }

  async function handleDeleteDevice(deviceId) {
    const response = await axios.delete(`/devices/${deviceId}`);
    if (response.status === StatusCodes.NO_CONTENT) {
      setDevices((prevDevices) =>
        prevDevices.filter((device) => device.id !== deviceId)
      );
    }
  }

  useEffect(() => {
    getMe();
    getDevices();
  }, []);

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className="mr-2 mb-2 font-medium">Create Device</Button>
      {isLoading ? <div>Loading...</div> : <DeviceTable devices={devices} onEditDevice={handleEditDevice} onDeleteDevice={handleDeleteDevice} />}
      <CreateDeviceModal show={openModal} onClose={onCloseModal} onDeviceCreate={handleAddDevice} />
      {selectedDevice && (
        <EditDeviceModal show={editModalOpen} onClose={onCloseEditModal} onDeviceUpdate={handleUpdateDevice} device={selectedDevice} />
      )}
    </>
  );
};
