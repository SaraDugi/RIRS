import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminRequests from './components/AdminRequests';
import AverageLeaveDurationChart from './components/AverageLeaveDurationChart';
import Footer from './components/Footer/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import App from "./App";
import Header from './components/Header/Header';
import NotificationPage from './pages/NotificationPage';
import { getAllGroupedRequests, updateRequestStatus, getAllLeaves, getUserRequests } from './api/requestApi';

jest.mock('./api/userApi', () => ({
  getUsers: jest.fn(),
  toggleAdmin: jest.fn(),
}));

jest.mock('./api/requestApi', () => ({
  getAllGroupedRequests: jest.fn(),
  updateRequestStatus: jest.fn(),
  getAllLeaves: jest.fn(),
  getUserRequests: jest.fn(),
}));

jest.mock('./api/notificationApi', () => ({
  fetchNotifications: jest.fn(() =>
    Promise.resolve([
      { id: 1, title: "Approved", message: "Your leave request is approved", read: false },
      { id: 2, title: "Rejected", message: "Your leave request is rejected", read: true },
    ])
  ),
  markNotificationRead: jest.fn(() => Promise.resolve()),
}));

const originalConsoleError = console.error;

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

beforeEach(() => {
  jest.clearAllMocks();

  getAllGroupedRequests.mockResolvedValue([
    {
      id: 1,
      email: 'user@example.com',
      datum_zahteve: '2024-11-25T00:00:00Z',
      stanje: 'in progress',
      komentar: 'Initial comment',
    },
  ]);

  getAllLeaves.mockResolvedValue([]);

  updateRequestStatus.mockRejectedValue(new Error('Update Failed'));

  getUserRequests.mockResolvedValue([
    {
      id: 1,
      stanje: "accepted",
      datum_zahteve: "2024-12-08",
      komentar: "Test comment",
      dopusti: [],
    },
  ]);
});

describe('Komponenta AdminRequests', () => {
  test('onemogoči spustni meni statusa, ko posodobitev statusa zahteve ne uspe', async () => {
    render(<AdminRequests />);

    await waitFor(() => {
      expect(screen.getByText('In Progress')).toBeInTheDocument();
    });

    fireEvent.mouseDown(screen.getByText('In Progress'));
    fireEvent.click(screen.getByText('Denied'));

    await waitFor(() => {
      expect(screen.queryByText('Denied')).not.toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
    });
  });
});

describe('Komponenta AverageLeaveDurationChart', () => {
  test('obravnava scenarije brez podatkov o dopustu', async () => {
    render(<AverageLeaveDurationChart />);

    await waitFor(() => {
      expect(screen.getByText('No data available for leave duration.')).toBeInTheDocument();
    });
  });
});

describe('Komponenta Footer', () => {
  test('se pravilno upodobi z dodatnimi lastnostmi', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>
          <Footer additionalProp="Test Prop" />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/© 2024 Leave Management/i)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });
});

test('localStorage pravilno nastavi žeton', () => {
  localStorage.setItem('token', 'abc123');
  expect(localStorage.getItem('token')).toBe('abc123');
});

test('Stran AdminRequests obstaja', async () => {
  render(
    <MemoryRouter>
      <AdminRequests />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Leave Requests')).toBeInTheDocument();
  });
});

test('localStorage se počisti, ko žeton ne obstaja', () => {
  localStorage.setItem('token', '');
  expect(localStorage.getItem('token')).toBe('');
});

test('document.cookie vsebuje določene informacije o seji', () => {
  document.cookie = 'sessionID=12345';
  expect(document.cookie).toContain('sessionID=12345');
});

describe("Komponenta App", () => {
  test("upodobi domačo stran z glavnimi povezavami", () => {
    render(<App />);

    expect(screen.getByText("Leave Management")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /home/i })[0]).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /register/i })).toBeInTheDocument();
  });
});

test("Gumb za obvestila ni viden, ko uporabnik ni prijavljen", () => {
  localStorage.removeItem("token");

  render(
    <MemoryRouter>
      <ThemeProvider theme={createTheme()}>
        <Header />
      </ThemeProvider>
    </MemoryRouter>
  );

  expect(screen.queryByText(/notifications/i)).not.toBeInTheDocument();
});

test("Stran z obvestili se pravilno upodobi v izolaciji", async () => {
  localStorage.setItem("token", "dummy-token");

  render(
    <MemoryRouter>
      <ThemeProvider theme={createTheme()}>
        <NotificationPage />
      </ThemeProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/notifications/i)).toBeInTheDocument();
  });
});

test("NotificationPage ustrezno kategorizira in prikaže zahteve", async () => {
  const mockRequests = [
    {
      id: 120,
      stanje: "accepted",
      datum_zahteve: "2024-12-08T00:00:00Z",
      komentar: "/",
      dopusti: [
        {
          tip_dopusta: "Vacation Leave",
          zacetek: "2024-12-23T00:00:00Z",
          konec: "2024-12-30T00:00:00Z",
          razlog: "testni primer za novo funkcionalnost",
        },
      ],
    },
    {
      id: 122,
      stanje: "denied",
      datum_zahteve: "2024-12-08T00:00:00Z",
      komentar: "/",
      dopusti: [],
    },
  ];

  getUserRequests.mockResolvedValueOnce(mockRequests);

  render(
    <MemoryRouter>
      <ThemeProvider theme={createTheme()}>
        <NotificationPage />
      </ThemeProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/Accepted Requests/i)).toBeInTheDocument();
    expect(screen.getByText(/Request #120 - accepted/i)).toBeInTheDocument();
    expect(screen.getByText(/Leave Type: Vacation Leave/i)).toBeInTheDocument();
    expect(screen.getByText(/Denied Requests/i)).toBeInTheDocument();
    expect(screen.getByText(/Request #122 - denied/i)).toBeInTheDocument();
  });
});