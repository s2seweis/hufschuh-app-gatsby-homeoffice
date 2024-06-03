import styled from "styled-components";
import { spacing } from "../../../constants/spacing";

export const PasswordReset = styled.div`
  margin: ${spacing.spaceMd};

  form {
    display: flex;
    flex-direction: column;

    .input-group {
      display: flex;
      flex-direction: column;
      margin-bottom: ${spacing.spaceMd};

      label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        margin-bottom: 4px;
      }

      input {
        padding: 8px 16px;
        border-style: solid;
        border-radius: 4px;
        border-color: hsl(0, 0%, 80%);
        border-width: 1px;
        font-size: 1rem;
        color: hsl(0, 0%, 20%);
      }
    }
  }

  .button-row {
    display: flex;
    justify-content: space-between;
  }
`;
