import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// Mock the useSWR hook and fetcher function
jest.mock("swr");
jest.mock("./utils/fetcher");

describe("App component", () => {
  beforeEach(() => {
    // Reset mock data and other setups before each test
    jest.clearAllMocks();
  });

  it("renders the component with title and input", () => {
    render(<App />);
    const titleElement = screen.getByText("Elbi Movies");
    const searchInput = screen.getByPlaceholderText("Search Any Movies");
    expect(titleElement).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  it("updates search input value on typing", async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText("Search Any Movies");
    userEvent.type(searchInput, "Fast And Furious");
    expect(searchInput).toHaveValue("Fast And Furious");
  });

  it("displays loading spinner while fetching data", () => {
    render(<App />);
    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument();
  });

  it("renders movie items after data fetching", async () => {
    const mockData = {
      results: [
        {
          id: 1,
          title: "Mock Movie",
          poster_path: "mock-poster.jpg",
          release_date: "2023-08-25",
        },
      ],
      total_pages: 1,
    };
    // Mock the data returned by useSWR
    require("swr").useSWR.mockReturnValue({ data: mockData, isLoading: false });

    render(<App />);

    // Wait for the movie items to render
    await waitFor(() => {
      const movieTitle = screen.getByText("Mock Movie");
      expect(movieTitle).toBeInTheDocument();
    });
  });

  it("handles pagination buttons correctly", async () => {
    const mockData = {
      results: [],
      total_pages: 2,
    };
    require("swr").useSWR.mockReturnValue({ data: mockData, isLoading: false });

    render(<App />);

    // Wait for the pagination buttons to render
    await waitFor(() => {
      const nextButton = screen.getByText("Next");
      fireEvent.click(nextButton);
      const prevButton = screen.getByText("Previous");
      fireEvent.click(prevButton);
    });
  });
});