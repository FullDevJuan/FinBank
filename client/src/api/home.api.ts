import getAuthHeaders from "../utils/getAuthHeaders";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Get summary statistics for the dashboard
export async function getDashboardStats() {
  try {
    const [customers, accounts, transactions, interactions] = await Promise.all(
      [
        fetch(`${BACKEND_URL}/customers`, { headers: getAuthHeaders() }).then(
          (r) => r.json()
        ),
        fetch(`${BACKEND_URL}/accounts`, { headers: getAuthHeaders() }).then(
          (r) => r.json()
        ),
        fetch(`${BACKEND_URL}/transactions`, {
          headers: getAuthHeaders(),
        }).then((r) => r.json()),
        fetch(`${BACKEND_URL}/interactions`, {
          headers: getAuthHeaders(),
        }).then((r) => r.json()),
      ]
    );

    return {
      totalCustomers: Array.isArray(customers) ? customers.length : 0,
      totalAccounts: Array.isArray(accounts) ? accounts.length : 0,
      totalTransactions: Array.isArray(transactions) ? transactions.length : 0,
      totalInteractions: Array.isArray(interactions) ? interactions.length : 0,
    };
  } catch (error) {
    console.log(error);
    return {
      totalCustomers: 0,
      totalAccounts: 0,
      totalTransactions: 0,
      totalInteractions: 0,
    };
  }
}

// Get recent transactions
export async function getRecentTransactions(limit = 5) {
  try {
    const req = await fetch(`${BACKEND_URL}/transactions`, {
      headers: getAuthHeaders(),
    });
    const data = await req.json();

    if (Array.isArray(data)) {
      return data.slice(0, limit);
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Get recent interactions
export async function getRecentInteractions(limit = 5) {
  try {
    const req = await fetch(`${BACKEND_URL}/interactions`, {
      headers: getAuthHeaders(),
    });
    const data = await req.json();

    if (Array.isArray(data)) {
      return data.slice(0, limit);
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Get accounts summary with balances
export async function getAccountsSummary() {
  try {
    const req = await fetch(`${BACKEND_URL}/accounts`, {
      headers: getAuthHeaders(),
    });
    const data = await req.json();

    if (Array.isArray(data)) {
      const totalBalance = data.reduce(
        (sum: number, account: any) =>
          sum + (parseFloat(account.current_balance) || 0),
        0
      );

      const accountsByStatus = {
        active: data.filter((a: any) => a.status === "activo").length,
        inactive: data.filter((a: any) => a.status === "inactivo").length,
      };

      return {
        totalBalance,
        accountsByStatus,
        accounts: data,
      };
    }
    return {
      totalBalance: 0,
      accountsByStatus: { active: 0, inactive: 0 },
      accounts: [],
    };
  } catch (error) {
    console.log(error);
    return {
      totalBalance: 0,
      accountsByStatus: { active: 0, inactive: 0 },
      accounts: [],
    };
  }
}
