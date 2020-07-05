import React from "react";

import MainTable from "./main-table";

function createData(email, id, dateCreated, nickname, groups) {
  return { email, id, dateCreated, nickname, groups };
}

const addUsersToRows = users => {
  let rows = [];
  users.map(user => {
    const { email, id, dateCreated, nickname, groups } = user;
    return rows.push(createData(email, id, dateCreated, nickname, groups));
  });

  return rows;
};

export default function UserTable(props) {
  const state = {
    columns: [
      { title: "Email", field: "email" },
      { title: "Id", field: "id" },
      { title: "Date Created", field: "dateCreated" },
      {
        title: "Nickname",
        field: "nickname"
      },
      { title: "Groups", field: "groups" }
    ],
    data: addUsersToRows(props.users)
  };

  return <MainTable state={state} />;
}

