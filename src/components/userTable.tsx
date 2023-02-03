import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useMemo,
} from "react";
import {
  Column,
  useTable,
  useSortBy,
  usePagination,
  useFlexLayout,
} from "react-table";

import Tag from "./UI/tag";
import { UserTypes } from "../types/user";
import Button from "./UI/button";

interface UserTableProps {
  users: { loading: boolean; data: UserTypes[] };
  updateForm: Dispatch<
    SetStateAction<{
      visible: boolean;
      loading: boolean;
      user: UserTypes | null;
    }>
  >;
  setDeleteUserConfirmModal: Dispatch<React.SetStateAction<{
    visible: boolean;
    user: UserTypes | null;
}>>,
}

const UserTable: FunctionComponent<UserTableProps> = ({
  users,
  updateForm,
  setDeleteUserConfirmModal,
}) => {
  const columns: readonly Column[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: (cel) => {
          const rowData = cel.row.original as UserTypes;
          return (
            <div className="flex items-center">
              {rowData.profileImage ? (
                <img
                  src={rowData.profileImage}
                  className="rounded-full w-10 h-10 mr-3 object-cover"
                  alt="avatar"
                />
              ) : (
                <div className="bg-slate-100 rounded-full w-10 h-10 flex justify-center items-center text-2xl mr-3 text-gray-600">
                  {rowData.name[0]}
                </div>
              )}

              <div className="flex flex-col">
                <span className="font-semibold">{rowData.name}</span>
                <span className="text-gray-500 text-sm">{rowData.email}</span>
              </div>
            </div>
          );
        },
        width: 900,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (cel) =>
          cel.value === "ACTIVE" ? (
            <Tag color="green" dot={true} text={cel.value} />
          ) : (
            <Tag color="purple" dot={true} text={cel.value} />
          ),
        width: 150,
      },
      {
        Header: "Role",
        accessor: "role",
        Cell: (cel) => <div className="text-gray-500">{cel.value}</div>,
        maxWidth: 150,
        minWidth: 150,
      },
      {
        Header: "Last Login",
        accessor: "lastLogin",
        Cell: (cel) => {
          return (
            <div className="flex flex-col">
              <span className="font-medium">
                {new Date(cel.value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="text-gray-500 text-sm">
                {new Date(cel.value).toLocaleTimeString("en-US", {
                  timeStyle: "short",
                })}
              </span>
            </div>
          );
        },
        width: 150,
      },
      {
        accessor: "id",
        enableSorting: false,
        Cell: (cel) => (
          <div className="flex justify-center items-center">
            <div className="p-3 rounded-md hover:bg-blue-100" onClick={() => setDeleteUserConfirmModal({ visible: true, user: cel.row.original as UserTypes })}>
              <svg className="w-5 h-5" viewBox="0 0 20 20">
                <path
                  className="fill-red-600"
                  d="M7.083,8.25H5.917v7h1.167V8.25z M18.75,3h-5.834V1.25c0-0.323-0.262-0.583-0.582-0.583H7.667
								c-0.322,0-0.583,0.261-0.583,0.583V3H1.25C0.928,3,0.667,3.261,0.667,3.583c0,0.323,0.261,0.583,0.583,0.583h1.167v14
								c0,0.644,0.522,1.166,1.167,1.166h12.833c0.645,0,1.168-0.522,1.168-1.166v-14h1.166c0.322,0,0.584-0.261,0.584-0.583
								C19.334,3.261,19.072,3,18.75,3z M8.25,1.833h3.5V3h-3.5V1.833z M16.416,17.584c0,0.322-0.262,0.583-0.582,0.583H4.167
								c-0.322,0-0.583-0.261-0.583-0.583V4.167h12.833V17.584z M14.084,8.25h-1.168v7h1.168V8.25z M10.583,7.083H9.417v8.167h1.167V7.083
								z"
                ></path>
              </svg>
            </div>
            <div
              className="p-3 rounded-md hover:bg-blue-100"
              onClick={(e) => {
                e.preventDefault();
                updateForm((prev) => ({
                  ...prev,
                  visible: true,
                  user: cel.row.original as UserTypes,
                }))
              }
                
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-gray-600"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />{" "}
              </svg>
            </div>
          </div>
        ),
        maxWidth: 100,
        minWidth: 100,
      },
    ],
    [updateForm, setDeleteUserConfirmModal]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state:{ pageIndex }
  } = useTable(
    { columns, data: (users.data || []), initialState: { pageSize: 9 } },
    useSortBy,
    usePagination,
    useFlexLayout
  );
  return (
    <div>
      <div className="max-w-full overflow-x-auto">
        <table {...getTableProps()} className="w-full border-y">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="text-left p-3 text-gray-600 text-sm font-normal"
                  >
                    {column.render("Header")}
                    <span className="ml-2">
                      {column?.isSorted ? (
                        column?.isSortedDesc ? (
                          <>&#129139;</>
                        ) : (
                          <>&#129137;</>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="even:bg-gray-50 hover:bg-slate-100"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="p-3">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between p-3">
        <Button
          type={canPreviousPage ? "borderd" : "disabled"}
          onClick={() => previousPage()}
        >
          &#129128; Previous
        </Button>
        <div className="flex items-center">
          {new Array(pageCount).fill(0).map((_, idx) => (
            <Button
              key={idx}
              type={idx === pageIndex ? "primary" : "borderd"}
              onClick={() => gotoPage(idx)}
            >
              {idx + 1}
            </Button>
          ))}
        </div>
        <Button
          type={canNextPage ? "borderd" : "disabled"}
          onClick={() => nextPage()}
        >
          Next &#129130;
        </Button>
      </div>
    </div>
  );
};

export default UserTable;
