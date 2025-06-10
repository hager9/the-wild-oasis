import Heading from "../ui/Heading";
import CreateGuestFrom from "../features/guests/CreateGuestFrom";

function NewGuests() {
  return (
    <>
      <Heading as="h1">Create a new guest</Heading>
      <CreateGuestFrom />
    </>
  );
}

export default NewGuests;
