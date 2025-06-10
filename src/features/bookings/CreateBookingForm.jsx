import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { differenceInDays, isBefore, isDate, startOfDay } from "date-fns";
import { useSettings } from "../settings/useSettings";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import { useCabins } from "../cabins/useCabins";
import styled from "styled-components";
import useGuests from "../guests/useGuests";
import Textarea from "../../ui/Textarea";
import { useState } from "react";
import Checkbox from "../../ui/Checkbox";
import Button from "../../ui/Button";
import { useNewBooking } from "./useNewBooking";

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  width: 100%;
`;

export default function CreateBookingForm({ onCloseModal }) {
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const { isLoading: isLoadingCabins, cabins } = useCabins();
  const { guests, isLoading: isLoadingGuests } = useGuests();
  const { isCreating, createBooking } = useNewBooking();

  const { register, getValues, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    const numNights = differenceInDays(
      new Date(data.endDate),
      new Date(data.startDate)
    );
    const today = startOfDay();

    if (numNights < 1) {
      toast.error("Start date must be before end date");
      return;
    }
    if (numNights < settings.minBookingLength) {
      toast.error(
        `Minimum nights per booking are ${settings.minBookingLength}`
      );
      return;
    }
    if (numNights > settings.maxBookingLength) {
      toast.error(
        `Maximum nights per booking are ${settings.maxBookingLength}`
      );
      return;
    }
    if (isBefore(new Date(data.startDate), today)) {
      toast.error("You can't start a booking before today");
      return;
    }

    //cabinPrice
    const reservedCabin = cabins
      .filter((cabin) => cabin.id === Number(data.cabinId))
      .at(0);
    const cabinPrice =
      (reservedCabin.regularPrice - reservedCabin.discount) * numNights;

    //extrasPrice
    const extrasPrice = addBreakfast
      ? settings.breakfastPrice * numNights * data.numGuests
      : 0;
    //totalPrice
    const totalPrice = cabinPrice + extrasPrice;

    const bookingObject = {
      ...data,
      cabinPrice,
      extrasPrice,
      totalPrice,
      isPaid,
      numNights,
      hasBreakfast: addBreakfast,
      cabinId: Number(data.cabinId),
      numGuests: Number(data.numGuests),
      guestId: Number(data.guestId),
      status: "unconfirmed",
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    };

    createBooking(bookingObject, {
      onSuccess: () => {
        reset?.();
        onCloseModal?.();
      },
    });
  }

  if (isLoadingSettings || isLoadingCabins || isLoadingGuests)
    return <Spinner />;

  return (
    <Form
      type="modal"
      onSubmit={handleSubmit(onSubmit)}
      error={errors?.startDate?.message}
    >
      <FormRow label="Start date">
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
            validate:
              isDate(getValues().startDate) || "You must choose a valid date",
          })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow label="End date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
            validate:
              isDate(getValues().endDate) || "You must choose a valid date",
          })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          min={1}
          defaultValue={1}
          {...register("numGuests", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum number of guests must be 1",
            },
            max: {
              value: settings.maxGuestsPerBooking,
              message: `Minimum number of guests must be ${settings.maxGuestsPerBooking}`,
            },
          })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow label="Select cabin" error={errors?.cabinId?.message}>
        <StyledSelect
          id="cabinId"
          {...register("cabinId")}
          disabled={isCreating}
        >
          {cabins.map((cabin) => (
            <option key={cabin.id} value={cabin.id}>
              {cabin.name}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow label="Select guest">
        <StyledSelect
          id="guestId"
          {...register("guestId")}
          disabled={isCreating}
        >
          {guests.map((guest) => (
            <option key={guest.id} value={guest.id}>
              {guest.fullName}
            </option>
          ))}
        </StyledSelect>
      </FormRow>
      <FormRow label="Observations">
        <Textarea
          defaultValue=""
          id="observations"
          {...register("observations")}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow>
        <Checkbox
          id="breakfast"
          onChange={() => setAddBreakfast((breakfast) => !breakfast)}
          disabled={isCreating}
        >
          Add breakfast
        </Checkbox>
        <Checkbox
          id="paid"
          onChange={() => setIsPaid((paid) => !paid)}
          disabled={isCreating}
        >
          Booking is paid ?
        </Checkbox>
      </FormRow>

      <FormRow modalForm="modalForm">
        <Button
          type="submit"
          variation="primary"
          size="medium"
          disabled={isCreating}
        >
          Submit
        </Button>
        <Button
          type="reset"
          variation="secondary"
          size="medium"
          disabled={isCreating}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
      </FormRow>
    </Form>
  );
}
