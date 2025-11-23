import { render, screen } from "@testing-library/react";
import App from "./App.jsx";

test("renders Savvly navigation brand", () => {
  render(<App />);
  const brand = screen.getByText(/Savvly/i);
  expect(brand).toBeInTheDocument();
});
