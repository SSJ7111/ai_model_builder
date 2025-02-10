import React, { useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ReactPaginate from "react-paginate";
import { create } from "zustand";
import more_option from "../../assets/Outline-dots-vertical.svg";
import search_two from "../../assets/search_two.svg";
import add_icon from "../../assets/Outline-plus-sm.svg";
import left_arrow from "../../assets/angle-small-left.svg";
import right_arrow from "../../assets/angle-small-right.svg";
import calender_icon from "../../assets/calendar.svg";
import filter_icon from "../../assets/Filter.svg";
import sort_icon from "../../assets/arrows-down-up.svg";



const useDataGridStore = create((set) => ({
  data: Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    modelName: `Model ${index + 1}`,
    modelType: "Extraction",
    description: "Edit Customer Data Here",
    createdOn: "2024-02-29",
    lastTrainedOn: "2024-02-29",
    status: "Active",
  })),
  searchQuery: "",
  currentPage: 0,
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 0 }),
  setPage: (page) => set({ currentPage: page }),
  addModel: (newModel) =>
    set((state) => ({
      data: [{ ...newModel, id: state.data.length + 1 }, ...state.data]
    })),
}));


const DataGridComponent = () => {

  const { data, searchQuery, currentPage, setSearchQuery, setPage, addModel } = useDataGridStore();

  const filteredResults = useMemo(() => {
    return searchQuery
      ? data.filter(
        (row) =>
          row.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : data;
  }, [data, searchQuery]);


  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      modelName: "",
      modelType: "",
      description: "",
      llmType: "Neural",
    },
  });


  const columns = useMemo(
    () => [
      {
        Header: () => (
          <div className="flex items-center">
            Model Name
            <Button variant="ghost" size="icon" className="ml-2">
              <img src={sort_icon} alt="Sort" />
            </Button>
          </div>
        ),
        accessor: "modelName",
        Cell: ({ row }) => (
          <div>
            <div>{row.original.modelName}</div>
            <div className="text-sm text-gray-400">ID: #{row.original.id}</div>
          </div>
        ),
      },
      {
        Header: () => (
          <div className="flex items-center">
            Model Type
            <Button variant="ghost" size="icon" className="ml-2">
              <img src={sort_icon} alt="Sort" />
            </Button>
          </div>
        ), accessor: "modelType"
      },
      {
        Header: () => (
          <div className="flex items-center">
            Description
            <Button variant="ghost" size="icon" className="ml-2">
              <img src={sort_icon} alt="Sort" />
            </Button>
          </div>
        ),
        accessor: "description",
        Cell: ({ value }) => (
          <div className="w-32 overflow-hidden text-ellipsis whitespace-nowrap">
            {value}
          </div>
        ),
      },
      {
        Header: () => (
          <div className="flex items-center">
            Created On
            <Button variant="ghost" size="icon" className="ml-2">
              <img src={sort_icon} alt="Sort" />
            </Button>
          </div>
        ), accessor: "createdOn"
      },
      {
        Header: () => (
          <div className="flex items-center">
            Last Trained On
            <Button variant="ghost" size="icon" className="ml-2">
              <img src={sort_icon} alt="Sort" />
            </Button>
          </div>
        ), accessor: "lastTrainedOn"
      },
      {
        Header: () => (
          <div className="flex items-center">
            Status
            <Button variant="ghost" size="icon" className="ml-2">
              <img src={sort_icon} alt="Sort" />
            </Button>
          </div>
        ),
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${value === "Active" ? "bg-green-100 text-green-700 rounded-md px-6 py-3" :
              value === "Inactive" ? "bg-gray-100 text-gray-700 rounded-md px-6 py-3" :
                "bg-yellow-100 text-yellow-700 rounded-md px-6 py-3"
              }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Action",
        Cell: () => (
          <Button variant="ghost">
            <img src={more_option} alt="more_option" />
          </Button>
        ),
      },
    ],
    []
  );

  const paginatedData = useMemo(() => {
    return filteredResults.slice(currentPage * 10, currentPage * 10 + 10);
  }, [filteredResults, currentPage]);

  const tableInstance = useTable(
    { columns, data: paginatedData },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const handleCreateModel = (formData) => {
    addModel({
      ...formData,
      modelType: formData.modelType || "Classification",
      createdOn: new Date().toISOString().split("T")[0], // Use current date
      lastTrainedOn: new Date().toISOString().split("T")[0],
      status: "Active",
    });

    reset(); // Reset the form
  };


  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };


  return (
    <div className="font-aptos p-6 rounded-md bg-white min-h-screen relative">
      <div className="flex justify-between mb-4">
        <h1 className="font-semibold text-xl text-gray-800 sm:text-base">Model Library</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-custom_primary p-4">
              <img src={add_icon} alt="add_icon" className="font-semibold text-base sm:text-sm" />
              Create New Model
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Create New Model</DialogTitle>
            <form onSubmit={handleSubmit(handleCreateModel)} className="space-y-4 p-4">
              <div>
                <Label>Model Name</Label>
                <Input {...register("modelName", { required: "Model Name is required" })} />
                {errors.modelName && <p className="text-red-500">{errors.modelName.message}</p>}
              </div>

              <div>
                <Label>Model Type</Label>
                <Select onValueChange={(value) => setValue("modelType", value)} defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Model Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Classification">Classification</SelectItem>
                    <SelectItem value="Regression">Regression</SelectItem>
                    <SelectItem value="Clustering">Clustering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>LLM</Label>
                <Select onValueChange={(value) => setValue("llmType", value)} defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Neural (recommended)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Neural">Neural</SelectItem>
                    <SelectItem value="Transformer">Transformer</SelectItem>
                    <SelectItem value="RNN">RNN</SelectItem>
                    <SelectItem value="GPT">GPT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea {...register("description", { required: "Description is required" })} />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
              </div>

              <div className="flex justify-between space-x-2">
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full bg-custom_soft_blue text-custom_purple">Cancel</Button>
                </DialogTrigger>
                <Button type="submit" className="w-full bg-custom_purple text-white">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between space-x-2 mb-4">
        <div className="relative w-full">
          <img src={search_two} alt="search_icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
          <Input placeholder="Search by Name, ID" value={searchQuery} onChange={handleSearch} className="pl-10 py-5 bg-custom_gray focus:border-none focus:outline-none focus:ring-0 border-none text-base placeholder:text-base placeholder:text-lead-500 sm:placeholder:text-sm" />
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" className="bg-custom_gray text-custom_dark_gray hover:text-lead-600 text-base sm:text-sm px-6 py-5">
            <img src={filter_icon} alt="Filter" /> Filter
          </Button>
          <Button variant="ghost" className="bg-custom_gray text-custom_dark_gray hover:text-lead-600 text-base sm:text-sm px-6 py-5">
            <img src={calender_icon} alt="Calendar" /> April 11 - April 24
          </Button>
        </div>
      </div>


      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full bg-white rounded-lg border-gray-200"
        >
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="border-b text-gray-600 sm:text-sm hover:bg-gray-50"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="p-3 whitespace-nowrap"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        {/* Page count text */}
        <div className="text-sm text-gray-600">
          Showing {currentPage * 10 + 1} to {Math.min((currentPage + 1) * 10, data.length)} of {data.length} results
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center items-center space-x-2">
          <ReactPaginate
            previousLabel={<img src={left_arrow} alt="Prev" className="bg-blue-100 rounded-full p-2" />}
            nextLabel={<img src={right_arrow} alt="Next" className="bg-blue-100 rounded-full p-2" />}
            pageCount={Math.ceil(filteredResults.length / 10)}
            onPageChange={({ selected }) => setPage(selected)}
            className="flex justify-center items-center space-x-2 text-blue-600"
            containerClassName="flex space-x-2 items-center justify-center"
            pageClassName="flex p-2 w-[40px] h-[40px] items-center justify-center rounded-full cursor-pointer"
            activeClassName="bg-blue-600 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default DataGridComponent;