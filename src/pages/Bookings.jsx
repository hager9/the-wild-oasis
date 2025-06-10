import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import AddNewBooking from "../features/bookings/AddNewBooking";

function Bookings() {
  return (
    <>
      <Row type="horizontal" resize="resize">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row>
        <AddNewBooking />
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
