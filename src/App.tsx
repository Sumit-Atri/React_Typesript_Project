
import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { Column } from 'react-table';
import {Row} from 'react-table';
import BarGraph from './components/BarGraph';

export interface Pizza {
  id: number;
  name: string;
  toppings: string[];
  fanFavorite: string;
  delivery: string;
}


function App() {
  const [data, setData] = useState<Pizza[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get<Pizza[]>("http://localhost:3000/pizzas");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/pizzas/${id}`);
      fetchData();
      alert("Pizza deleted successfully.");
    } catch (error) {
      console.error("Error deleting pizza:", error);
      alert("An error occurred while deleting the pizza.");
    }
  };

  const handleUpdate = (id: number) => {
    try {
      window.location.href = `/update-pizza/${id}`;
    } catch (error) {
      console.error("Error redirecting to update pizza page:", error);
      alert("An error occurred while redirecting to the update pizza page.");
    }
  };

  const handleAdd = () => {
    try {
      window.location.href = `/add-pizza/`;
    } catch (error) {
      console.error("Error redirecting to Add pizza page:", error);
      alert("An error occurred while redirecting to the add pizza page.");
    }
  };

  const columns: Column<Pizza>[] = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Pizza Name",
        accessor: "name",
      },
      {
        Header: "Toppings",
        accessor: "toppings",
      },
      {
        Header: "Fan Favorite",
        accessor: "fanFavorite",
      },
      {
        Header: "Delivery",
        accessor: "delivery",
      },
      {
        Header: "Action Delete",
        Cell: ({ row }) => (
          <button className="delete-button" onClick={() => handleDelete(row.original.id)}>Delete</button>
        ),
      },
      {
        Header: "Action Update",
        Cell: ({ row }) => (
          <button className="update-button" onClick={() => handleUpdate(row.original.id)}>Update</button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="App">
      <div className="container" id="table">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {Array.isArray(cell.value)
                        ? cell.value.join(", ")
                        : cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="update-button" onClick={() => handleAdd()}>Add</button>
        <div className="chart-container" style={{ width: '800px', height: '800px' }}>
          <BarGraph data={rows}/>
       </div>
      </div>
    </div>
  );
}



export default App;

