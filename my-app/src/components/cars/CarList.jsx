import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, dateFilter, Comparator } from 'react-bootstrap-table2-filter';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MyCustomImageEditingComponent from './MyCustomImageEditingComponent';
import { getCars, deleteData, updateData } from '../../redux/features/crud/carSlice';
import ImageUpload from './ImageUpload';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from 'react';
import moment from 'moment';

let inStockDateFilter;

const CarList = () => {
  const { cars } = useSelector((state) => ({ ...state.car }));
  const { loading } = useSelector((state) => ({ ...state.car }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch])

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      headerStyle: {
        color: 'white'
      }
    }, {
      dataField: 'name',
      text: 'Car Name',
      headerStyle: {
        color: 'white'
      },
      filter: textFilter(),
      validator: (newValue, row, column) => {
        if (newValue.length > 1) {
          return {
            valid: true,
          };
        } else {
          return {
            valid: false,
            message: 'The Car Name length at least have to be greater than 1'
          };
        }
      }
    }, {
      dataField: 'price',
      text: 'Car Price',
      headerStyle: {
        color: 'white'
      },
      validator: (newValue, row, column) => {
        const parsenewValue = parseInt(newValue);
        if (parsenewValue >= 20) {
          return {
            valid: true,
          };
        } else {
          return {
            valid: false,
            message: 'The Price have to be greater than 20'
          };
        }
      }
    }, {
      dataField: 'createdAt',
      text: 'CreatedAt',
      headerStyle: {
        color: 'white'
      },
      editable: false,
      filter: dateFilter({
        getFilter: (filter) => {
          inStockDateFilter = filter;
        }
      })
    }, {
      dataField: 'updatedAt',
      text: 'UpdatedAt',
      headerStyle: {
        color: 'white'
      },
      editable: false
    }, {
      dataField: 'image',
      text: 'image',
      formatter: (cell) => <MyCustomImageEditingComponent image={cell} />,
      headerStyle: {
        color: 'white'
      },
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <ImageUpload value={value} {...editorProps} />
      ),
      editorClasses: (cell, row, rowIndex, colIndex) => {
      }
    }, {
      dataField: 'carCreatedDate',
      text: 'Car Year',
      headerStyle: {
        color: 'white'
      },
      formatter: (cell) => {
        let carYear = cell;
        if (typeof cell !== 'object') {
          carYear = new Date(cell);
        }
        return moment(carYear).format('L');
      }
    }, {
      dataField: "remove",
      text: "Delete",
      headerStyle: {
        color: 'white'
      },
      formatter: (cellContent, row) => {
        return (
          <button
            className="btn btn-danger btn-xs"
            onClick={() => handleDelete(row.id, row.name)}
          >
            Delete
          </button>
        );
      }
    }
  ];

  const handleDelete = async (rowId, name) => {
    if (window.confirm("Are you sure you want to delete this tour ?")) {
      await dispatch(deleteData(rowId));
    }
  };

  function afterSaveCell(oldValue, newValue, carData) {
    const moment = require('moment');
    let carUpdatedDate = moment().format('LLL');
    dispatch(updateData({ id: carData?.id, carData: { ...carData, updatedAt: carUpdatedDate } }));
  }

  const selectRow = {
    mode: 'checkbox',
    clickToEdit: true
  };

  return (
    <div className='container'>
      <div className="carlist">
        {
          loading ? <ClipLoader
            color="white"
            loading={loading}
            size={50}
          /> : <>
            <h2 className='carlist-title'>Cars List</h2>
            <Link to='/addCar' className='create-btn'>Create</Link>
            <BootstrapTable keyField='id'
              data={JSON.parse(JSON.stringify(cars))}
              columns={columns}
              selectRow={selectRow}
              filter={filterFactory()}
              cellEdit={cellEditFactory({
                mode: 'dbclick',
                blurToSave: true,
                afterSaveCell
              })} condensed
              pagination={paginationFactory()}
            />
          </>
        }
      </div>
    </div>
  )
}

export default CarList;