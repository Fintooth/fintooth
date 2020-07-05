import React from "react";

import MainTable from "./main-table";

function createData(id, name, members, dateCreated, accounts) {
  return { id, name, members, dateCreated, accounts };
}

const addGroupsToRows = groups => {
  let rows = [];
  groups.map(group => {
    const { id, name, members, dateCreated, accounts } = group;
    return rows.push({ name, id, dateCreated, members, accounts });
  });

  return rows;
};

export default function GroupsTable(props) {
  const state = {
    columns: [
      { title: "Name", field: "name" },
      {
        title: "Date Created",
        field: "dateCreated"
      },
      { title: "Id", field: "id" },
      { title: "Members", field: "members" },

      { title: "Accounts", field: "accounts" }
    ],
    data: addGroupsToRows(props.groups)
  };

  return <MainTable state={state} />;
}
