import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, getAllByTestId, getByPlaceholderText, getByAltText, queryByText, queryByAltText } from "@testing-library/react";
import { getByText } from "@testing-library/react";
// required for scoped queries, and reading the container

import Application from "components/Application";

afterEach(cleanup);


describe("Application", () => {
  it("Defaults to monday and changes scheduale based on day pressed", async () => {
    // Renders w/o crashing tests arent very useful
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText('Monday'))
    
    fireEvent.click(getByText('Tuesday'))
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument()
  });
  


  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /Saving/i)).toBeInTheDocument()

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, /Monday/i));
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument()
  });



  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container} = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, /Archie Cohen/i));

    fireEvent.click(queryByAltText(appointment, "Delete"))

    expect(getByText(appointment, /are you sure you want to delete?/i)).toBeInTheDocument()

    fireEvent.click(queryByText(appointment, "Confirm"))
    expect(getByText(appointment, /Deleting/i)).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, /Monday/i));
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument()
  });



  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container} = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, /Archie Cohen/i));

    fireEvent.click(queryByAltText(appointment, "Edit"))    
    
    fireEvent.change(getByPlaceholderText(appointment, /Archie Cohen/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5. Click the "save" button on the confirmation.
    // 6. Check that the element with the text "saving" is displayed.
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, /Saving/i)).toBeInTheDocument()

    // 7. Wait until the element with the "edit" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Edit"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, /Monday/i));
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument()
  });



  it("shows the save error when failing to save an appointment", async () => {
    await axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />); 
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /Saving/i)).toBeInTheDocument()

    await waitForElement(() => getByText(appointment, /there was an error saving your appointment/i))
  });



  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, /Archie Cohen/i));

    fireEvent.click(queryByAltText(appointment, "Delete"))

    expect(getByText(appointment, /are you sure you want to delete?/i)).toBeInTheDocument()

    fireEvent.click(queryByText(appointment, "Confirm"))
    expect(getByText(appointment, /Deleting/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, /There was an error deleting your appointment/i))
  });
})
