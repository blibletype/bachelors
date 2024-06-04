import React, { useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import { Button, Label, Modal, TextInput } from 'flowbite-react';

import axios from '../../../lib/api';

export const EditDeviceModal = ({ show, onClose, onDeviceUpdate, device }) => {
  const [name, setName] = useState(device.name);

  async function handleUpdateDevice() {
    try {
      const response = await axios.put(`devices/${device.id}`, { name });

      if (response.status !== StatusCodes.OK) {
        alert('Invalid device. Please try again.');
        onClose();
        return;
      }
  
      onDeviceUpdate(response.data);
      onClose();
    } catch (error) {
      setName(device.name);
      onClose();
    }
  };

  return (
    <Modal show={show} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit device
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              placeholder="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <Button onClick={handleUpdateDevice}>Update</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};