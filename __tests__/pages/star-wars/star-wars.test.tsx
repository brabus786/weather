import React from "react";
import { render } from "@testing-library/react";
import StarWars from "../../../src/pages/star-wars/index";
import * as hooks from "../../../src/store/hooks";
import * as nextRouter from "next/router";
import { getPersonsOperation } from "../../../src/store/starWars/starWarsOperations";

jest.mock("../../../src/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../src/store/starWars/starWarsOperations", () => ({
  getPersonsOperation: jest.fn(),
}));

describe("StarWars Page", () => {
  const mockDispatch = jest.fn();
  const mockPush = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (hooks.useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    (hooks.useAppSelector as jest.Mock).mockImplementation((selector) => {
      const mockState = {
        starWarsSlice: {
          persons: [],
          pagination: null,
        },
        runningProcesses: {
          processes: [],
        },
      };
      return selector(mockState);
    });

    (nextRouter.useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
      pathname: "/star-wars",
      query: {},
    });
  });

  test("redirects to page 1 with replace if query.page is missing", () => {
    render(<StarWars query={{}} />);

    expect(mockReplace).toHaveBeenCalledWith({
      pathname: "/star-wars",
      query: { page: "1" },
    });
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  test("dispatches getPersonsOperation with correct page", () => {
    render(<StarWars query={{ page: "5" }} />);

    expect(mockDispatch).toHaveBeenCalled();
    expect(getPersonsOperation).toHaveBeenCalledWith(5);
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
