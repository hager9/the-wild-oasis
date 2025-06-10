import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNewGuest } from "./useNewGuest";

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  width: 100%;
`;

function CreateGuestFrom() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const [countries, setCountries] = useState();
  const { isCreating, createGuest } = useNewGuest();

  function onSubmit(data) {
    const country = countries.filter(
      (country) => country.name === data.nationality
    );
    const countryFlag = country[0].flag;
    const guestObject = {
      ...data,
      countryFlag,
    };
    createGuest(guestObject, {
      onSuccess: () => {
        reset?.();
      },
    });
  }

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flags")
      .then((res) => res.json())
      .then((data) => {
        const countryNames = data
          ?.map((country) => ({
            name: country.name.common,
            code: country.cca2,
            flag: country.flags.svg,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryNames);
      });
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isCreating}
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          disabled={isCreating}
          type="nationalID"
          id="nationalID"
          {...register("nationalID", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <StyledSelect
          id="nationality"
          {...register("nationality", {
            required: "This field is required",
          })}
        >
          <option value="">Select a country</option>
          {countries?.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          size="medium"
          type="reset"
          disabled={isCreating}
        >
          Cancel
        </Button>
        <Button variation="primary" size="medium" disabled={isCreating}>
          Create new Guest
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestFrom;
