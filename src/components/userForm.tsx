import React, {FormEventHandler, FunctionComponent} from 'react';
import {UserTypes} from '../types/user';
interface UserFormProps {
  user: UserTypes | null;
  onSubmit: FormEventHandler<HTMLFormElement>;
  formId: string;
}

const UserForm: FunctionComponent<UserFormProps> = ({
  user,
  onSubmit,
  formId,
}) => {
  return (
    <form className="w-full sm:w-[400px]" onSubmit={onSubmit} id={formId}>
      <div className="mb-5 hidden">
        <label
          htmlFor="id"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          id="id"
          name="id"
          defaultValue={user ? user.id : ''}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="ID"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={user ? user.name : ''}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="John"
          required
        />
      </div>
      {!user && (
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="john.doe@company.com"
            required
          />
        </div>
      )}

      <div className="mb-5">
        <label
          htmlFor="role"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Role
        </label>
        <input
          type="text"
          id="role"
          name="role"
          defaultValue={user ? user.role : ''}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Manager"
          required
        />
      </div>
      {!user && (
        <div className="mb-5">
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Select Status"
          >
            <option value="ACTIVE">Active</option>
            <option value="INVITED">Invited</option>
          </select>
        </div>
      )}
    </form>
  );
};

export default UserForm;
