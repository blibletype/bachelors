import { useState } from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';

import axios from '../../../lib/api';
import { StatusCodes } from 'http-status-codes';

export const CreateDeviceModal = ({ show, onClose, onDeviceCreate }) => {
  const [name, setName] = useState('');

  async function handleCreateDevice() {
    const response = await axios.post('devices', { name });

    setName('');
    if (response.status !== StatusCodes.CREATED) {
      alert('Invalid device. Please try again.');
      onClose();
      return;
    }

    onDeviceCreate(response.data);
    onClose();
  };

  return (
    <Modal show={show} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Create new device
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
            <Button onClick={handleCreateDevice}>Add</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
