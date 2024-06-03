import React from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import { spacing } from "../constants/spacing";
import Layout from "../components/Layout";
import { Button } from "../components/App/Misc/Button";
import routes from "../constants/routes";

const ConfirmedModal = styled.div`
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

  h3 {
    text-align: center;
    max-width: 800px;
  }
`;

export default function ConfirmMailPage() {
  return (
    <Layout>
      <ConfirmedModal>
        <h3>
          Wir haben eine E-Mail mit Anweisungen zum Zurücksetzen des Passwortes
          versandt. Bitte überprüfe dein E-Mail-Postfach.
        </h3>
        <Button onClick={() => navigate(routes.login)} className={"secondary"}>
          Zurück zum Login
        </Button>
      </ConfirmedModal>
    </Layout>
  );
}
