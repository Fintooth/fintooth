import React from "react";

import MainTable from "./main-table";

const addGroupsToRows = (groups) => {
  return groups
    .filter((group) => group)
    .map((group) => {
      const { id, name, members, dateCreated, accounts } = group;
<<<<<<< HEAD
      return { id, name, members, dateCreated, accounts };
=======
      return { name, id, dateCreated, members, accounts };
>>>>>>> dcfa33e0204f61719e2d8edb08879c806025c258
    });
};

export default function GroupsTable(props) {
  const state = {
    columns: [
      { title: "Name", field: "name" },
      { title: "Date Created", field: "dateCreated" },
      { title: "Id", field: "id" },
    ],
    data: addGroupsToRows(props.groups),
  };

  return <MainTable state={state} />;
}
