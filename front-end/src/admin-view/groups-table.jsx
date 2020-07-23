import React from "react";

import MainTable from "./main-table";

const addGroupsToRows = groups => {
  return groups.map(group => {
    const { id, name, members, dateCreated, accounts } = group;
    return { name, id, dateCreated, members, accounts };
  });
};

export default function GroupsTable(props) {
  const state = {
    columns: [
      { title: "Name", field: "name" },
      { title: "Date Created", field: "dateCreated" },
      { title: "Id", field: "id" }
    ],
    data: addGroupsToRows(props.groups)
  };

  return <MainTable state={state} />;
}
