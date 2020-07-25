import React from "react";

import MainTable from "./main-table";

const addUsersToRows = users => {
  return users.map(user => {
    const { email, id, dateCreated, nickname, groups } = user;
    return { email, id, dateCreated, nickname, groups: groups.length };
  });
};

export default function UserTable({ users }) {
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
    data: addUsersToRows(users)
  };

  return <MainTable state={state} />;
}
