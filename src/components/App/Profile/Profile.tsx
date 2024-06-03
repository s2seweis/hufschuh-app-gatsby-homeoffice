import React, { SyntheticEvent, useEffect, useState } from "react";
import { UserForm, UserFormSkeleton } from "./styled";
import { Button } from "../Misc/Button";
import Select from "react-select";
import { Option, strapiArrayToOptions } from "../Misc/strapiArrayToOptions";
import BeatLoader from "react-spinners/BeatLoader";
import colors from "../../../constants/colors";
import { countries, Country } from "../../../assets/data/contries/countries";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { objectWithoutEmptyStrings } from "../../../services/objectWithoutEmptyStrings";
import { navigate } from "gatsby";
import routes from "../../../constants/routes";
import { pickProfileDataFromUser } from "../../../services/pickProfileDataFromUser";
import { RootState, useAppDispatch } from "../../../redux/store";
import { setCredentials } from "../../../redux/auth/authSlice";

export default function Profile({ cms }: { cms: any }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const {
    data: userData,
    isFetching,
    isLoading,
  } = useGetUserQuery(user?.id as string, {
    refetchOnMountOrArgChange: true,
    skip: !user?.id,
  });

  const initialState = {
    title: "",
    firstName: "",
    lastName: "",
    street: "",
    postcode: "",
    city: "",
    country: "Deutschland",
    phone: "",
    subscribedToNewsletter: false,
    grantedImageRights: false,
  };

  const [state, setState] = useState(
    userData
      ? Object.assign({}, initialState, pickProfileDataFromUser(userData))
      : initialState
  );
  // shows error message (if any)
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userData) {
      console.log("US ER DATA", userData);
      setState(
        Object.assign({}, initialState, pickProfileDataFromUser(userData))
      );
    }
  }, [isLoading, isFetching]);

  const titleOptions: Option[] = strapiArrayToOptions(
    cms.Anrede_Optionen.strapi_json_value
  );

  const [titleOption, setTitleOption] = useState<Option | null | undefined>(
    titleOptions.find((titleOption) => titleOption.label === state.title)
  );

  const getTitleOptionFromValue = (value: string) => {
    return titleOptions.find((titleOption) => titleOption.label === value);
  };

  const [countryOption, setCountryOption] = useState<
    Country | undefined | null
  >(countries.find((country) => country.label === state.country));

  // form change handler
  function onChange(event: React.SyntheticEvent) {
    event.persist();

    // @ts-ignore
    if (event.target.type === "checkbox") {
      setState((prev) => ({
        ...prev,
        // @ts-ignore
        [event.target.name]: event.target.checked,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        // @ts-ignore
        [event.target.name]: event.target.value,
      }));
    }
  }

  const [updateUser, { isLoading: isMutationLoading }] =
    useUpdateUserMutation();

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    // check if all fields are filled out
    let missing = [];
    Object.keys(state).map((key: string) => {
      if (
        // @ts-ignore
        !state[key] &&
        !["subscribedToNewsletter", "phone", "grantedImageRights"].includes(key)
      ) {
        missing.push(key);
      }
    });

    if (missing.length > 0) {
      setMessage(cms.Alle_Felder);
      return;
    }

    if (!state.grantedImageRights) {
      setMessage(cms.Bildrechte_nicht_akzeptiert);
      return;
    }

    // prepare data to POST
    const dataToSend = objectWithoutEmptyStrings(state);

    const res = await updateUser({ userId: user?.id, patch: dataToSend });

    // @ts-ignore
    if (res.error) {
      setMessage(cms.Fehler);
    } else {
      dispatch(setCredentials({ user }));
      await navigate(routes.app);
    }
  }

  // Skeleton, when waiting on strapi data
  if (isLoading || isMutationLoading || isFetching)
    return (
      <UserFormSkeleton>
        <h2>{cms.Ueberschrift}</h2>
        <UserForm>
          <div className={"spinner"}>
            <BeatLoader
              color={colors.primary["170"]}
              loading={isLoading || isMutationLoading || isFetching}
              size={30}
            />
          </div>

          <p className={"message"}>{message}</p>

          <div className={"button-row"}>
            <Button className={"primary"} type={"submit"}>
              {cms.Speichern}
            </Button>
          </div>
        </UserForm>
      </UserFormSkeleton>
    );

  return (
    <>
      <h2>{cms.Ueberschrift}</h2>
      <UserForm onSubmit={(event: SyntheticEvent) => onSubmit(event)}>
        <div className={"input-group"}>
          <label htmlFor={"title-select"}>
            <span className={"required"}>*</span> {cms.Anrede}
          </label>
          <Select
            id={"title-select"}
            options={titleOptions}
            name={"title"}
            value={titleOption || getTitleOptionFromValue(state.title)}
            onChange={(option: Option | null) => {
              setState((prevState) => ({
                ...prevState,
                title: option?.label || "",
              }));
              setTitleOption(option);
            }}
            placeholder={"Bitte wählen"}
            className={"title-select"}
          />
        </div>

        <div className={"input-group"}>
          <label htmlFor={"firstName-input"}>
            <span className={"required"}>*</span> {cms.Vorname}
          </label>
          <input
            id={"firstName-input"}
            type={"text"}
            name={"firstName"}
            value={state.firstName}
            onChange={onChange}
          />
        </div>

        <div className={"input-group"}>
          <label htmlFor={"lastName-input"}>
            <span className={"required"}>*</span> {cms.Nachname}
          </label>
          <input
            id={"lastName-input"}
            type={"text"}
            name={"lastName"}
            value={state.lastName}
            onChange={onChange}
          />
        </div>

        <div className={"input-group"}>
          <label htmlFor={"street-input"}>
            <span className={"required"}>*</span> {cms.Strasse}
          </label>
          <input
            id={"street-input"}
            type={"text"}
            name={"street"}
            value={state.street}
            onChange={onChange}
          />
        </div>

        <div className={"input-group"}>
          <label htmlFor={"postcode-input"}>
            <span className={"required"}>*</span> {cms.PLZ}
          </label>
          <input
            id={"postcode-input"}
            type={"number"}
            name={"postcode"}
            value={state.postcode}
            onChange={onChange}
          />
        </div>

        <div className={"input-group"}>
          <label htmlFor={"city-input"}>
            <span className={"required"}>*</span> {cms.Ort}
          </label>
          <input
            id={"city-input"}
            type={"text"}
            name={"city"}
            value={state.city}
            onChange={onChange}
          />
        </div>

        <div className={"input-group"}>
          <label htmlFor={"country-select"}>
            <span className={"required"}>*</span> {cms.Land}
          </label>
          <Select
            id={"country-select"}
            onChange={(option: Country | null, actionMeta: any) => {
              setState((prevState) => ({
                ...prevState,
                country: option?.label || "",
              }));
              setCountryOption(option);
            }}
            value={countryOption}
            options={countries}
            defaultValue={{
              value: 276,
              label: "Deutschland",
              alpha2: "de",
              alpha3: "deu",
            }}
          />
        </div>

        <p className={"hint-mobile"}>{cms.Hinweis_Mobil}</p>

        <div className={"input-group"}>
          <label htmlFor={"phone-input"}>{cms.Mobil}</label>
          <input
            id={"phone-input"}
            type={"tel"}
            name={"phone"}
            value={state.phone}
            onChange={onChange}
          />
        </div>

        <div className={"input-group newsletter-checkbox"}>
          <input
            id={"newsletter-input"}
            type={"checkbox"}
            name={"subscribedToNewsletter"}
            checked={state.subscribedToNewsletter}
            onChange={onChange}
            className={"newsletter-checkbox"}
          />
          <label htmlFor={"newsletter-input"}>{cms.Newsletter}</label>
        </div>

        <div className={"input-group newsletter-checkbox"}>
          <input
            id={"grantedImageRight-input"}
            type={"checkbox"}
            name={"grantedImageRights"}
            checked={state.grantedImageRights}
            onChange={onChange}
            className={"newsletter-checkbox"}
          />
          <label htmlFor={"grantedImageRight-input"}>{cms.Bilder_Rechte}</label>
        </div>

        <p className={"message"}>{message}</p>

        <div className={"button-row"}>
          <Button className={"primary"} type={"submit"}>
            {cms.Speichern}
          </Button>
        </div>
      </UserForm>
    </>
  );
}
