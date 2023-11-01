import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Title from "@/app/_components/Title";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  render(<Title handleScroll={jest.fn()} />);
});

describe("Title Component", () => {
  test("2 title and 1 btn exists in document", () => {
    const nameTitle = screen.getByRole("heading", { name: /Esrafil Elahi/i });
    const positionTitle = screen.getByRole("heading", {
      name: /Senior Frontend Engineer/i,
    });
    const btnAboutMe = screen.getByRole("button");

    expect(nameTitle).toBeInTheDocument();
    expect(positionTitle).toBeInTheDocument();
    expect(btnAboutMe).toBeInTheDocument();
  });

  test("snapshot test", () => {
    const { container } = render(<Title handleScroll={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
