import React from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import { spacing } from "../constants/spacing";
import Layout from "../components/Layout";
import { Button } from "../components/App/Misc/Button";
import routes from "../constants/routes";

const NotConfirmedModal = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  box-sizing: border-box;
  background-color: white;
  padding: ${spacing.spaceMd};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function ConfirmMailPage() {
  return (
    <Layout>
      <NotConfirmedModal>
        <h3>Bitte bestätige deine E-Mail Adresse</h3>
        <Button onClick={() => navigate(routes.login)} className={"secondary"}>
          Zurück zum Login
        </Button>
      </NotConfirmedModal>
    </Layout>
  );
}
