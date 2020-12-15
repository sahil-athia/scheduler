import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("Defaults to monday and changes scheduale based on day pressed", () => {
  // Renders w/o crashing tests arent very useful
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText('Monday')).then(() => {
      fireEvent.click(getByText('Tuesday'))
      expect(getByText("Leopold Silvers")).toBeInTheDocument()
    })
});
