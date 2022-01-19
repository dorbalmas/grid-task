import React from "react";
import { useTable } from "react-table";

export const Grid = ({ gridConfig, gridData }) => {
  const columns = React.useMemo(
    () =>
      gridConfig.map((originalRow) => {
        if (originalRow.hasOwnProperty("component")) {
          return {
            Header: originalRow.title,
            accessor: originalRow.field,
            Cell: ({ value }) => {
              const GenericComponent = originalRow.component;
              return <GenericComponent data={value} />;
            },
          };
        } else
          return {
            Header: originalRow.title,
            accessor: originalRow.field,
          };
      }),
    []
  );

  const data = React.useMemo(() => gridData, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Grid;
