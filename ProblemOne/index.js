var arr = [
  {
    guest_type: "crew",
    first_name: "Marco",
    last_name: "Burns",
    guest_booking: {
      room_no: "A0073",
      some_array: [7, 2, 4],
    },
  },
  {
    guest_type: "guest",
    first_name: "John",
    last_name: "Doe",
    guest_booking: {
      room_no: "C73",
      some_array: [1, 3, 5, 2, 4, 3],
    },
  },
  {
    guest_type: "guest",
    first_name: "Jane",
    last_name: "Doe",
    guest_booking: {
      room_no: "C73",
      some_array: [1, 3, 5, 2, 4, 3],
    },
  },
  {
    guest_type: "guest",
    first_name: "Albert",
    last_name: "Einstein",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3],
    },
  },
  {
    guest_type: "crew",
    first_name: "Jack",
    last_name: "Daniels",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3],
    },
  },
  {
    guest_type: "guest",
    first_name: "Alan",
    last_name: "Turing",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3],
    },
  },
];

function mutateArray(a) {
  // 1. Update the `mutateArray` function to return `a` as a flattened array
  const flattenedArray = a.map((obj) => ({
    guest_type: obj.guest_type,
    first_name: obj.first_name,
    last_name: obj.last_name,
    room_no: obj.guest_booking.room_no,
    some_array: obj.guest_booking.some_array,
  }));

  // 2. Now update the `mutateArray` function so that the 'some_array' attribute in each item of the mutated array is changed to the sum of the array called 'some_total'
  const newArray = flattenedArray.map((obj) => ({
    guest_type: obj.guest_type,
    first_name: obj.first_name,
    last_name: obj.last_name,
    room_no: obj.room_no,
    some_total: obj.some_array.reduce((res, cur) => res + cur, 0),
  }));

  // 3. Now update the `mutateArray` function so that the resulting array only includes objects with a guest_type of 'guest'
  const filteredByGuestType = newArray.filter((obj) => obj.guest_type === "guest");

  // 4. Finally, update the `mutateArray` function so the resulting array is ordered alphabetically by last and first name
  const sortedArrayByNames = filteredByGuestType.sort((a, b) => {
    const lastName1 = a.last_name.toLowerCase();
    const lastName2 = b.last_name.toLowerCase();
    const firstName1 = a.first_name.toLowerCase();
    const firstName2 = b.first_name.toLowerCase();

    if (lastName1 < lastName2) {
      return -1;
    } else if (lastName1 > lastName2) {
      return 1;
    } else if (firstName1 < firstName2) {
      return -1;
    } else if (firstName1 > firstName2) {
      return 1;
    } else {
      return 0;
    }
  });

  return sortedArrayByNames;
}

$(document).ready(function () {
  $("#originalArray").html(JSON.stringify(arr, null, 2));
  $("#resultsArray").html(JSON.stringify(mutateArray(arr), null, 2));
});
