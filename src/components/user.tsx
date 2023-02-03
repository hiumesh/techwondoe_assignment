import React, {
  FormEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {useQuery} from 'react-query';

import Tag from './UI/tag';
import UserTable from './userTable';
import TableSkeleton from './UI/tableSkeleton';
import Modal from './UI/modal';
import UserForm from './userForm';
import {UserTypes} from '../types/user';
import {csvmaker, download} from '../util/csv';
import Button from './UI/button';

const User: FunctionComponent = () => {
  const [createModal, setCreateModal] = useState({
    visible: false,
    loading: false,
  });
  const [deleteUserConfirmModal, setDeleteUserConfirmModal] = useState<{
    visible: boolean;
    user: null | UserTypes;
  }>({visible: false, user: null});
  const [updateModal, setupdateModal] = useState<{
    visible: boolean;
    loading: boolean;
    user: UserTypes | null;
  }>({
    visible: false,
    loading: false,
    user: null,
  });
  const [userdata, setUserdata] = useState<UserTypes[]>([]);

  const fetchUsers = async () => {
    const response = await fetch(
      'https://my-json-server.typicode.com/hiumesh/json_server/users'
    );
    return response.json();
  };
  const createUserHandler = (event: FormEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      email: {value: string};
      name: {value: string};
      role: {value: string};
      status: {value: string};
    };

    const name = target.name.value;
    const email = target.email.value;
    const status = target.status.value;
    const role = target.role.value;

    const data = {
      id: new Date().getTime().toString(),
      name,
      email,
      status,
      role,
      profileImage: null,
      lastLogin: new Date().toUTCString(),
    };

    setUserdata(prev => [...prev, data]);
    setCreateModal(prev => ({...prev, visible: false}));
  };
  const updateUserHandler = (event: FormEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      id: {value: string};
      role: {value: string};
      name: {value: string};
    };

    const id = target.id.value;
    const name = target.name.value;
    const role = target.role.value;

    const users = [...userdata];
    const index = users.findIndex(u => u.id === id);
    users[index] = {...users[index], name, role};
    setUserdata(users);
    setupdateModal(prev => ({...prev, visible: false}));
  };

  const deleteUserHandler = useCallback(
    (id: string) => {
      const users = userdata.filter(u => u.id !== id);
      setUserdata(users);
      setDeleteUserConfirmModal({visible: false, user: null});
    },
    [setUserdata, userdata]
  );

  const downloadCSV = () => {
    const csvdata = csvmaker(data);
    download(csvdata);
  };

  const {data, status} = useQuery('users', fetchUsers);

  useEffect(() => {
    if (typeof data === 'object') setUserdata(data);
  }, [data]);

  return (
    <div className="border shadow-md rounded-md my-2">
      <div className="p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="font-medium text-2xl mr-2">Users</h2>
            <Tag
              color="green"
              dot={false}
              text={`${userdata?.length || 0} users`}
            />
          </div>
          <div className="flex">
            <Button
              type="borderd"
              Icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-gray-600 mr-2"
                  viewBox="0 0 16 16"
                >
                  {' '}
                  <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />{' '}
                  <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />{' '}
                </svg>
              }
              onClick={downloadCSV}
            >
              Download CSV
            </Button>
            <Button
              onClick={() => setCreateModal(prev => ({...prev, visible: true}))}
              Icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 fill-white"
                  viewBox="0 0 16 16"
                >
                  {' '}
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{' '}
                </svg>
              }
            >
              Add User
            </Button>
          </div>
        </div>

        <p className="text-gray-500">
          Manage your team members and their account permissions here.
        </p>
      </div>
      {status === 'loading' && <TableSkeleton />}
      {status === 'success' && userdata?.length && (
        <UserTable
          users={{loading: false, data: userdata}}
          updateForm={setupdateModal}
          setDeleteUserConfirmModal={setDeleteUserConfirmModal}
        />
      )}
      <Modal
        title="Create User"
        visible={createModal.visible}
        onClose={() => {
          setCreateModal({visible: false, loading: false});
        }}
        onCancel={() => {
          setCreateModal({visible: false, loading: false});
        }}
        onOk={() => {}}
        okText="Submit"
        okProps={{form: 'userCreateForm', type: 'submit'}}
      >
        <UserForm
          user={null}
          onSubmit={createUserHandler}
          formId="userCreateForm"
        />
      </Modal>
      <Modal
        title="Update User"
        visible={updateModal.visible}
        onClose={() => {
          setupdateModal(prev => ({...prev, visible: false}));
        }}
        onCancel={() => {
          setupdateModal(prev => ({...prev, visible: false}));
        }}
        onOk={() => {}}
        okText="Update"
        okProps={{form: 'userUpdateForm', type: 'submit'}}
      >
        {updateModal.visible && (
          <UserForm
            user={updateModal.user}
            onSubmit={updateUserHandler}
            formId="userUpdateForm"
          />
        )}
      </Modal>
      <Modal
        title="Delete User"
        visible={deleteUserConfirmModal.visible}
        onClose={() => setDeleteUserConfirmModal({visible: false, user: null})}
        onCancel={() => setDeleteUserConfirmModal({visible: false, user: null})}
        onOk={() =>
          deleteUserHandler((deleteUserConfirmModal.user as UserTypes).id)
        }
        okText="Delete"
        okButtonColor="red"
      >
        <div>
          Are You sure want to delete the{' '}
          <span className="font-bold">{deleteUserConfirmModal.user?.name}</span>
          /
          <span className="font-bold">
            {deleteUserConfirmModal.user?.email}
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default User;
