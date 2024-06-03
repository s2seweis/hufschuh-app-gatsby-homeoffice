import React from "react";
import Layout from "../components/Layout";
import { login } from "../services/auth";
import { AuthBox } from "../components/AuthBox";

export default function LoginPage() {
  return (
    <Layout>
      <AuthBox mode={"login"} />
    </Layout>
  );
}
