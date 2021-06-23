import React from "react";
import AdminMenu from "../../components/adminpage/AdminMenu";

function Admin() {
  return (
    <>
      <AdminMenu /> 
      <section className="dashboard-section">
      <h1>Welcome to admin dashboard</h1>
      <p>You can make your changes by choosing the options from the menu. 
        You can now either create, update or delete the articles found on this page</p>
    </section>
    </>
  );
}

export default Admin;
